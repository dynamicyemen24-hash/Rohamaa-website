-- Migration: Create Messages and Donations tables for ERP
-- Run this on Neon PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  country_code VARCHAR(5) DEFAULT '+966',
  country VARCHAR(100),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  is_read BOOLEAN DEFAULT FALSE,
  replied_at TIMESTAMP,
  replied_by VARCHAR(100),
  reply_message TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_country ON messages(country);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'YER',
  project VARCHAR(100),
  method VARCHAR(20) CHECK (method IN ('card', 'bank', 'cash', 'online')),
  type VARCHAR(20) DEFAULT 'once' CHECK (type IN ('once', 'monthly', 'yearly')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  date DATE,
  notes TEXT,
  anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for donations
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(date DESC);
CREATE INDEX IF NOT EXISTS idx_donations_amount ON donations(amount);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  field VARCHAR(50),
  motivation TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  hours INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for volunteers
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);

-- Contact requests table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  type VARCHAR(50),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for contacts
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  interests JSONB,
  source VARCHAR(50) DEFAULT 'website',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'confirmed', 'unsubscribed')),
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for subscribers
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- Users table for admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'manager', 'editor', 'viewer')),
  avatar_url VARCHAR(500),
  phone VARCHAR(20),
  bio TEXT,
  permissions JSONB,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create function for stats
CREATE OR REPLACE FUNCTION get_messages_stats()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'total', (SELECT COUNT(*) FROM messages),
    'new', (SELECT COUNT(*) FROM messages WHERE status = 'new'),
    'read', (SELECT COUNT(*) FROM messages WHERE status = 'read'),
    'replied', (SELECT COUNT(*) FROM messages WHERE status = 'replied'),
    'archived', (SELECT COUNT(*) FROM messages WHERE status = 'archived')
  );
END;
$$ LANGUAGE plpgsql;

-- Insert sample data
INSERT INTO contacts (id, name, email, phone, type, subject, message, status) VALUES
('00000000-0000-0000-0000-000000000001', 'منظمة الخير الدولية', 'info@alkhair.org', '+967 777 111 222', 'منظمة داعمة', 'نرغب في الشراكة', 'نرغب في الشراكة مع المؤسسة في مشاريع المياه', 'new', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;