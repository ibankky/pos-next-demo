export async function POST(req) {
    try {
      const body = await req.json();
  
      const response = await fetch('http://139.59.223.142/api/card/topup-pos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic YWRtaW46MTIzNA==',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const error = await response.json();
        return Response.json({ error }, { status: response.status });
      }
  
      const result = await response.json();
      return Response.json(result);
    } catch (err) {
      return Response.json({ message: 'Internal Server Error', error: String(err) }, { status: 500 });
    }
  }