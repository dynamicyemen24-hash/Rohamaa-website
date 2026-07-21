// Stripe Checkout Session API - Serverless Function
// Creates a Stripe checkout session for donations
import Stripe from 'stripe';

// تهيئة Stripe مع التحقق من وجود المفتاح
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY is not defined. Payment functionality will be limited.');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const ALLOWED_ORIGINS = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'https://rohamaa.org'];

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // التحقق من وجود Stripe
  if (!stripe) {
    return res.status(503).json({ 
      error: 'خدمة الدفع غير متاحة حالياً',
      message: 'يرجى التواصل مع المؤسسة مباشرةً للتبرع'
    });
  }

  try {
    const { amount, currency, donor, email, phone, project, type } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'مبلغ التبرع مطلوب ويجب أن يكون أكبر من صفر' });
    }

    // التحقق من صحة البريد الإلكتروني
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'البريد الإلكتروني غير صالح' });
    }

    // التحقق من صيغة العملة
    const validCurrencies = ['usd', 'eur', 'gbp', 'aud', 'cad', 'jpy'];
    const validatedCurrency = (currency || 'usd').toLowerCase();
    if (!validCurrencies.includes(validatedCurrency)) {
      return res.status(400).json({ error: 'عملة غير مدعومة' });
    }

    // تحويل المبلغ إلى سنتات (Stripe يستخدم الوحدات الصغيرة)
    // ملاحظة: المبالغ تُرسل بالسنتات (100 سنت = 1 دولار)
    const amountInCents = Math.round(Number(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: validatedCurrency,
            product_data: {
              name: `تبرع لمؤسسة رحماء بينهم${project ? ` - ${project}` : ''}`,
              description: `دعم ${project || 'المشاريع الخيرية'} | المتبرع: ${donor || 'كريم'}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL || 'https://rohamaa.org'}/donate?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL || 'https://rohamaa.org'}/donate?cancelled=1`,
      metadata: {
        donor: donor || 'anonymous',
        email: email || '',
        phone: phone || '',
        project: project || 'general',
        type: type || 'once',
      },
      customer_email: email || undefined,
      automatic_payment_methods: {
        enabled: true,
      },
      // إضافة البيانات للـ receipt
      payment_intent_data: {
        description: `تبرع خيري لمؤسسة رحماء بينهم`,
        statement_descriptor_suffix: 'Rohamaa',
      },
    });

    res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Stripe error:', error);
    // إرجاع رسالة خطأ واضحة للمستخدم
    res.status(500).json({ 
      error: error.message || 'فشل إنشاء جلسة الدفع',
      message: 'يرجى المحاولة مرة أخرى أو استخدام طريقة دفع أخرى'
    });
  }
}