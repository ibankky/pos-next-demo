export async function GET(req) {
    const { searchParams } = new URL(req.url);
  
    const location = searchParams.get("location");
    const groupMenuId = searchParams.get("groupMenuId");
  
    if (!location || !groupMenuId) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }
  
    const url = `http://139.59.223.142/api/pos-menu/sale/list?location=${location}&groupMenuId=${groupMenuId}`;
  
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Basic YWRtaW46MTIzNA==",
      },
    });
  
    const data = await res.json();
  
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }