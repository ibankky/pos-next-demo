export async function POST(req) {
    const body = await req.json();
    // เติมเงินผ่าน POS
    return Response.json({ message: "Top-up success", amount: body.amount });
  }