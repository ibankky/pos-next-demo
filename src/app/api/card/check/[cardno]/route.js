export async function GET(req, { params }) {
    const { cardNo } = params;
    // ดึงข้อมูลบัตรตาม cardNo
    return Response.json({ cardNo, balance: 100 });
  }