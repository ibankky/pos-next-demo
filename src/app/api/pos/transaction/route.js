import { getBasicAuthHeader } from "@/app/lib/basicAuth"; 
export async function GET(req) {
    const baseUrl = process.env.POS_API_BASE_URL;
    const { searchParams } = new URL(req.url);
    //const startDate = searchParams.get("startDate");
    //const endDate = searchParams.get("endDate");
    const startDate = "2025-07-09"
    const endDate = "2025-07-09"
    const memberTel = searchParams.get("memberTel");
    const billNo = searchParams.get("billNo");

    
    try {
    const apiUrl = `${baseUrl}/pos-transaction/list?startDate=${startDate}&endDate=${endDate}&memberTel=${memberTel}&billNo=${billNo}`;  
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: getBasicAuthHeader(),
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
          Authorization: "Basic YWRtaW46NDMyMQ==",
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
