import { NextResponse } from 'next/server';

const WEBHOOK_URL =
  'https://nsfqezhitjycwbkovtnd.supabase.co/functions/v1/ffs-webhook';

export async function POST(request: Request) {
  const secret = process.env.FFS_WEBHOOK_SECRET;
  if (!secret) {
    console.error('FFS_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Server misconfigured' },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': secret,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Webhook error:', res.status, data);
      return NextResponse.json(
        { error: 'Webhook request failed', details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
