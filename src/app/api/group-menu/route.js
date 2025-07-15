export async function GET() {
    try {
      const res = await fetch("http://139.59.223.142/api/group-menu", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46NDMyMQ==", // 👈 Basic Auth encoded (admin:1234)
        },
      });
  
      if (!res.ok) {
        return Response.json({ error: "Failed to fetch group-menu" }, { status: res.status });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ error: "Server error", detail: err.message }, { status: 500 });
    }
  }