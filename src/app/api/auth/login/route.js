import { cookies } from 'next/headers';
import { getRabbitMQChannel } from '@/app/lib/rabbitmq';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    let token = '';
    let user = ''
    if (!data.success) {
      return Response.json({ success: false, message: data.message || 'Invalid credentials' }, { status: res.status });
    }else{
      token = data.data.token
      user = data.data.username
    }
  

    // 🍪 Set cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, { httpOnly: true, path: '/' });

    /* // 🔁 ส่ง event ไปยัง RabbitMQ
    const channel = await getRabbitMQChannel();
    await channel.assertQueue('auth_events');
    channel.sendToQueue('auth_events', Buffer.from(JSON.stringify({
      type: 'LOGIN',
      username,
      time: new Date().toISOString(),
    }))); */

    return Response.json({ success: true, token , user });
  } catch (err) {
    console.error('[Login Error]', err);
    return Response.json({ success: false, message: 'Login error' }, { status: 500 });
  }
}