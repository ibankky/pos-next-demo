import { cookies } from 'next/headers';
import { getRabbitMQChannel } from '@/app/lib/rabbitmq';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'my-secret';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  // 🧪 Mock user auth
  if (username !== 'admin' || password !== '123456') {
    return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

  // 🍪 Set cookie
  const cookieStore = await cookies();
  cookieStore.set('token', token, { httpOnly: true, path: '/' });

  // 🔁 ส่ง event ไปยัง RabbitMQ
  const channel = await getRabbitMQChannel();
  await channel.assertQueue('auth_events');
  channel.sendToQueue('auth_events', Buffer.from(JSON.stringify({
    type: 'LOGIN',
    username,
    time: new Date().toISOString(),
  })));

  return Response.json({ success: true, token });
}