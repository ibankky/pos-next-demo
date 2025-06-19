export async function POST(req) {
    const data = await req.json();
  
    const res = await fetch("http://139.59.223.142/api/pos-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic YWRtaW46MTIzNA==", // ✅ ใส่ auth ได้ปลอดภัย
      },
      body: JSON.stringify(data),
    });
  
    const response = await res.json();
  
    return new Response(JSON.stringify(response), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }