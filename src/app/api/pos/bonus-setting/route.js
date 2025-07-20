export async function GET() {
  
    const baseUrl = process.env.POS_API_BASE_URL;
    const res = await fetch(`${baseUrl}/bonus-setting`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46NDMyMQ==",
        },
      });

    const response = await res.json();
  
    return new Response(JSON.stringify(response), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }