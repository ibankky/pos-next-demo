import macaddress from 'macaddress';

export async function GET() {
  console.log('check get mac')
  try {
    const mac = await macaddress.one();
    return Response.json({ mac });
  } catch (err) {
    return Response.json({ error: 'Cannot get MAC address' }, { status: 500 });
  }
}