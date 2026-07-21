// Subscribers API - Handle newsletter subscriptions
import { query, pool } from './database.js';

const ALLOWED_ORIGINS = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];

export default async function handler(req, res) {
  // CORS headers
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email, name, phone, country } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'البريد الإلكتروني مطلوب ويجب أن يكون صالحاً' });
    }

    // Insert subscriber with validation
    const result = await query(
      `INSERT INTO subscribers (email, name, phone, country, subscribed_at, status) 
       VALUES ($1, $2, $3, $4, NOW(), 'active') 
       ON CONFLICT (email) DO UPDATE SET 
         name = COALESCE($2, subscribers.name),
         phone = COALESCE($3, subscribers.phone),
         country = COALESCE($4, subscribers.country),
         status = 'active',
         unsubscribed_at = NULL
       RETURNING *`,
      [email, name || null, phone || null, country || null]
    );

    // Return success without exposing sensitive data
    return res.status(200).json({
      success: true,
      message: 'تم الاشتراك في نشرتنا البريدية بنجاح!',
      data: {
        id: result.rows[0]?.id,
        email: result.rows[0]?.email,
        name: result.rows[0]?.name,
      },
    });
  } catch (error) {
    console.error('Subscriber error:', error);
    return res.status(500).json({ error: 'حدث خطأ في الاشتراك' });
  }
}