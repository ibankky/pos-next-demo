export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const billNo = searchParams.get("billNo");
    try {
      const res = await fetch(`http://139.59.223.142/api/pos-sub-transaction/${billNo}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46NDMyMQ==", // admin:1234
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