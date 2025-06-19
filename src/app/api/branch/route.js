export async function GET() {
    try {
      const res = await fetch("http://139.59.223.142/api/branch", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46MTIzNA==", // 👈 Basic Auth encoded (admin:1234)
        },
      });
  
      if (!res.ok) {
        return Response.json({ error: "Failed to fetch branch" }, { status: res.status });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ error: "Server error", detail: err.message }, { status: 500 });
    }
  }