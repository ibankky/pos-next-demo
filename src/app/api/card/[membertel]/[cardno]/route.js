export async function GET(req, { params }) {
    const { memberTel, cardNo } = params;
    // ดึงบัตรเฉพาะของเบอร์นั้นกับเลขบัตร
    return Response.json({ memberTel, cardNo, status: "active" });
  }