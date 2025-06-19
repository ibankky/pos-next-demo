export async function POST(req) {
    const body = await req.json();
    // ลงทะเบียนบัตรใหม่
    return Response.json({ message: "Card registered", data: body });
  }