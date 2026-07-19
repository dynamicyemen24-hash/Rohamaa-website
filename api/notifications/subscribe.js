// Push Notification Subscription API
// Handles push subscription management

const subscriptions = new Map();

/**
 * Save a push subscription
 */
async function saveSubscription(req, res) {
  const { endpoint, keys } = req.body;

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return res.status(400).json({ error: 'Invalid subscription data' });
  }

  subscriptions.set(endpoint, { keys, createdAt: new Date().toISOString() });
  console.log(`New subscription: ${endpoint.substring(0, 50)}...`);

  res.status(200).json({ success: true });
}

/**
 * Remove a push subscription
 */
function removeSubscription(req, res) {
  const { endpoint } = req.body;
  subscriptions.delete(endpoint);
  res.status(200).json({ success: true });
}

/**
 * Handle unsupported methods
 */
function methodNotAllowed(res) {
  res.status(405).json({ error: 'Method not allowed' });
}

/**
 * Main handler function
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      return saveSubscription(req, res);
    } else if (req.method === 'DELETE') {
      return removeSubscription(req, res);
    } else {
      return methodNotAllowed(res);
    }
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
}

// Export subscriptions for use in sending notifications
export function getSubscriptions() {
  return subscriptions;
}