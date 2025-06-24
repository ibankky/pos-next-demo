export async function GET(req, { params }) {
    const id = params.id;
    try {
      const res = await fetch(`http://139.59.223.142/api/branch-group/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic YWRtaW46MTIzNA==",
        },
      });
  
      if (!res.ok) {
        return Response.json({ error: "Failed to fetch" }, { status: res.status });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ error: "Server error", detail: err.message }, { status: 500 });
    }
  }
  
  export async function PUT(req, { params }) {
    const id = params.id;
    try {
      const body = await req.json();
      const res = await fetch(`http://139.59.223.142/api/branch-group/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46MTIzNA==",
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        return Response.json({ error: "Failed to update" }, { status: res.status });
      }
  
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ error: "Server error", detail: err.message }, { status: 500 });
    }
  }
  