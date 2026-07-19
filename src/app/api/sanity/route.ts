// Sanity API Proxy Route - solves CORS for App Router
import { sanityClient } from '@/sanity/client';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const params = searchParams.get('params') || '{}';

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await sanityClient.fetch(query, JSON.parse(params));

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch from Sanity';
    console.error('Sanity API error:', error);
    return new Response(JSON.stringify({ error: errorMessage, success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, params = {} } = body;

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await sanityClient.fetch(query, params);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch from Sanity';
    console.error('Sanity API error:', error);
    return new Response(JSON.stringify({ error: errorMessage, success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}