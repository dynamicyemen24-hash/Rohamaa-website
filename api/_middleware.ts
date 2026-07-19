// API Middleware - Security Layer
// CSRF Protection + Rate Limiting + Security Headers

// CORS Configuration - Restrict origins
export const corsConfig = {
  allowedOrigins: [
    'https://rohamaa.org',
    'https://rbdcye.org',
    'https://www.rohamaa.org',
    'https://www.rbdcye.org',
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Security Headers
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

// CSRF Protection
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function validateCSRFToken(token: string, expectedToken: string): boolean {
  return token === expectedToken && token.length > 0;
}

// Rate Limiting
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
};

export default { corsConfig, securityHeaders, rateLimitConfig };