-- Notifications and Movements tables for donation workflow
-- This enables real-time approval workflow and donor notifications

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('donation_approved', 'donation_rejected', 'request_approved', 'request_replied', 'volunteer_approved', 'system', 'reminder')),
  recipient_email VARCHAR(255),
  recipient_id UUID,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Movements/Transactions table for financial tracking
CREATE TABLE IF NOT EXISTS movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('donation', 'withdrawal', 'transfer', 'expense', 'refund')),
  category VARCHAR(100),
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'YER',
  reference_id UUID,
  reference_type VARCHAR(50) CHECK (reference_type IN ('donation', 'project', 'expense', 'transfer')),
  from_account VARCHAR(100),
  to_account VARCHAR(100),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'rejected', 'cancelled')),
  approved_by UUID,
  approved_at TIMESTAMP,
  attachments JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_movements_status ON movements(status);
CREATE INDEX IF NOT EXISTS idx_movements_type ON movements(type);
CREATE INDEX IF NOT EXISTS idx_movements_reference ON movements(reference_id, reference_type);
CREATE INDEX IF NOT EXISTS idx_movements_created_at ON movements(created_at DESC);

-- Donation approvals table (for manager approval workflow)
CREATE TABLE IF NOT EXISTS donation_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donation_id UUID NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL CHECK (action IN ('submitted', 'under_review', 'approved', 'rejected', 'completed', 'on_hold')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES admin_users(id),
  review_notes TEXT,
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donation_approvals_donation_id ON donation_approvals(donation_id);
CREATE INDEX IF NOT EXISTS idx_donation_approvals_action ON donation_approvals(action);
CREATE INDEX IF NOT EXISTS idx_donation_approvals_status ON donation_approvals(status);
CREATE INDEX IF NOT EXISTS idx_donation_approvals_created_at ON donation_approvals(created_at DESC);

-- Service requests/contact requests approvals
CREATE TABLE IF NOT EXISTS request_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('contact', 'service', 'partnership', 'volunteer')),
  action VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'in_progress')),
  handled_by UUID REFERENCES admin_users(id),
  response_message TEXT,
  notification_sent BOOLEAN DEFAULT FALSE,
  notification_sent_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_request_approvals_request_id ON request_approvals(request_id);
CREATE INDEX IF NOT EXISTS idx_request_approvals_status ON request_approvals(status);

-- Triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_movements_updated_at BEFORE UPDATE ON movements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_request_approvals_updated_at BEFORE UPDATE ON request_approvals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Functions for statistics
CREATE OR REPLACE FUNCTION get_donations_stats()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'total', (SELECT COUNT(*) FROM donations),
    'pending', (SELECT COUNT(*) FROM donations WHERE status = 'pending'),
    'completed', (SELECT COUNT(*) FROM donations WHERE status = 'completed'),
    'failed', (SELECT COUNT(*) FROM donations WHERE status = 'failed'),
    'refunded', (SELECT COUNT(*) FROM donations WHERE status = 'refunded'),
    'total_amount', COALESCE((SELECT SUM(amount) FROM donations WHERE status = 'completed'), 0),
    'pending_amount', COALESCE((SELECT SUM(amount) FROM donations WHERE status = 'pending'), 0)
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_movements_stats()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'total_movements', (SELECT COUNT(*) FROM movements),
    'pending', (SELECT COUNT(*) FROM movements WHERE status = 'pending'),
    'completed', (SELECT COUNT(*) FROM movements WHERE status = 'completed'),
    'rejected', (SELECT COUNT(*) FROM movements WHERE status = 'rejected'),
    'total_amount', COALESCE((SELECT SUM(amount) FROM movements WHERE status IN ('completed', 'approved')), 0),
    'pending_amount', COALESCE((SELECT SUM(amount) FROM movements WHERE status = 'pending'), 0)
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_notifications_stats(user_id UUID)
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'unread', (SELECT COUNT(*) FROM notifications WHERE recipient_id = user_id AND status = 'unread'),
    'total', (SELECT COUNT(*) FROM notifications WHERE recipient_id = user_id),
    'urgent', (SELECT COUNT(*) FROM notifications WHERE recipient_id = user_id AND priority = 'urgent' AND status = 'unread')
  );
END;
$$ LANGUAGE plpgsql;