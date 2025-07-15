// src/app/api/master-payment/route.js

export async function GET() {
    try {
      const response = await fetch('http://139.59.223.142/api/master-payment', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic YWRtaW46NDMyMQ==',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        return Response.json({ error }, { status: response.status });
      }
  
      const data = await response.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ message: 'Internal Server Error', error: String(err) }, { status: 500 });
    }
  }
  