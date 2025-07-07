export async function GET(req, { params }) {
  const { cardno } = await params;
  try {
    const response = await fetch(`http://139.59.223.142/api/card/check/${cardno}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic YWRtaW46MTIzNA==',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return Response.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { message: 'Internal Server Error', error: String(err) },
      { status: 500 }
    );
  }
}