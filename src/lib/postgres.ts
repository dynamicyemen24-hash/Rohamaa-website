// PostgreSQL Client (Neon Integration) - Serverless Compatible
// Security Fix: Removed hardcoded DATABASE_URL - use environment variables only

// Helper function for API calls (works in browser)
export async function query(text: string, params?: any[]) {
  const response = await fetch('/api/database', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: text, params }),
  });
  return response.json();
}

// Messages table queries
export const messagesQueries = {
  create: `
    INSERT INTO messages (
      name, email, phone, country_code, country, subject, message, status, is_read,
      device_info, geo_location, ip_address, user_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'new', false, $8, $9, $10, $11)
    RETURNING *
  `,
  
  findAll: `
    SELECT * FROM messages 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,
  
  findById: `
    SELECT * FROM messages WHERE id = $1
  `,
  
  updateStatus: `
    UPDATE messages 
    SET status = $1, updated_at = NOW() 
    WHERE id = $2 
    RETURNING *
  `,
  
  delete: `
    DELETE FROM messages WHERE id = $1
  `,
  
  getStats: `
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'new') as new,
      COUNT(*) FILTER (WHERE status = 'read') as read,
      COUNT(*) FILTER (WHERE status = 'replied') as replied,
      COUNT(*) FILTER (WHERE status = 'archived') as archived
    FROM messages
  `,
};

// Donations table queries
export const donationsQueries = {
  create: `
    INSERT INTO donations (
      donor, email, phone, amount, currency, project, method, type, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
    RETURNING *
  `,
  
  findAll: `
    SELECT * FROM donations 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,
  
  updateStatus: `
    UPDATE donations 
    SET status = $1, updated_at = NOW() 
    WHERE id = $2 
    RETURNING *
  `,
};

// Donation approvals table queries
export const donationApprovalsQueries = {
  create: `
    INSERT INTO donation_approvals (
      donation_id, action, status, reviewed_by, review_notes, notification_sent, metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
  findByDonationId: `
    SELECT * FROM donation_approvals 
    WHERE donation_id = $1 
    ORDER BY created_at DESC
  `,
  findPendingByDonationId: `
    SELECT * FROM donation_approvals 
    WHERE donation_id = $1 AND status = 'pending'
    ORDER BY created_at DESC
    LIMIT 1
  `,
  updateStatus: `
    UPDATE donation_approvals 
    SET status = $1, reviewed_by = $2, review_notes = $3, notification_sent = $4, notification_sent_at = NOW(), metadata = $5, created_at = NOW()
    WHERE id = $6 
    RETURNING *
  `,
};

// Request approvals table queries
export const requestApprovalsQueries = {
  create: `
    INSERT INTO request_approvals (
      request_id, request_type, action, status, handled_by, response_message, notification_sent, metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,
  findByRequestId: `
    SELECT * FROM request_approvals 
    WHERE request_id = $1 
    ORDER BY created_at DESC
  `,
  updateStatus: `
    UPDATE request_approvals 
    SET status = $1, handled_by = $2, response_message = $3, notification_sent = $4, notification_sent_at = NOW(), metadata = $5, updated_at = NOW()
    WHERE id = $6 
    RETURNING *
  `,
};

// Notifications table queries
export const notificationsQueries = {
  create: `
    INSERT INTO notifications (
      type, recipient_email, recipient_id, title, message, data, status, priority
    ) VALUES ($1, $2, $3, $4, $5, $6, 'unread', $7)
    RETURNING *
  `,
  findByRecipient: `
    SELECT * FROM notifications 
    WHERE recipient_id = $1 OR recipient_email = $2
    ORDER BY created_at DESC
    LIMIT $3 OFFSET $4
  `,
  findUnreadByRecipient: `
    SELECT * FROM notifications 
    WHERE recipient_id = $1 AND status = 'unread'
    ORDER BY created_at DESC
  `,
  markAsRead: `
    UPDATE notifications 
    SET status = 'read', read_at = NOW() 
    WHERE id = $1 AND status = 'unread'
    RETURNING *
  `,
  markAllAsRead: `
    UPDATE notifications 
    SET status = 'read', read_at = NOW() 
    WHERE recipient_id = $1 AND status = 'unread'
    RETURNING *
  `,
  archive: `
    UPDATE notifications 
    SET status = 'archived' 
    WHERE id = $1
    RETURNING *
  `,
};

// Movements/Transactions table queries
export const movementsQueries = {
  create: `
    INSERT INTO movements (
      type, category, amount, currency, reference_id, reference_type, from_account, to_account, description, status, created_by, metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', $10, $11)
    RETURNING *
  `,
  findAll: `
    SELECT * FROM movements 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,
  findByReference: `
    SELECT * FROM movements 
    WHERE reference_id = $1 AND reference_type = $2
    ORDER BY created_at DESC
  `,
  updateStatus: `
    UPDATE movements 
    SET status = $1, approved_by = $2, approved_at = NOW(), updated_at = NOW()
    WHERE id = $3 
    RETURNING *
  `,
  getStats: `
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE status = 'completed') as completed,
      COALESCE(SUM(amount) FILTER (WHERE status IN ('completed', 'approved')), 0) as total_amount,
      COALESCE(SUM(amount) FILTER (WHERE status = 'pending'), 0) as pending_amount
    FROM movements
  `,
};

// Volunteers table queries
export const volunteersQueries = {
  create: `
    INSERT INTO volunteers (
      name, email, phone, field, motivation, status
    ) VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING *
  `,
  
  findAll: `
    SELECT * FROM volunteers 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,
  
  updateStatus: `
    UPDATE volunteers 
    SET status = $1, updated_at = NOW() 
    WHERE id = $2 
    RETURNING *
  `,
};
