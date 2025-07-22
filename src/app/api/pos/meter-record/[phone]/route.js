export async function GET(req, { params }) {
  const { phone } = await params;
    const res = await fetch(`http://139.59.223.142/api/meter-record/list?memberTel=${phone}`, {
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