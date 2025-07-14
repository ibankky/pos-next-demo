export async function GET() {
    try {
      const res = await fetch("http://139.59.223.142/api/pos-transaction/list", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46MTIzNA==", // admin:1234
        },
      });
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
          status: res.status,
        });
      }
  
      const data = await res.json();
      return Response.json({ data });
    } catch (err) {
      console.error("API proxy error:", err);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }


  export async function POST(req) {
    try {
      const body = await req.json(); // รับข้อมูลจากฝั่ง client
      const res = await fetch("http://139.59.223.142/api/pos-transaction", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46MTIzNA==",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to post data" }), {
          status: res.status,
        });
      }
  
      const data = await res.json();
      return Response.json({ data });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
