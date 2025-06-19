export async function GET(req, { params }) {
    const { memberTel } = params;
    // ค้นหาบัตรทั้งหมดของเบอร์นี้
    return Response.json({ memberTel, cards: [/* card list */] });
  }