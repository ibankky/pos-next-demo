export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const res = await fetch(`http://139.59.223.142/api/pos-menu/list?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Basic YWRtaW46MTIzNA==",
    },
  });

  const response = await res.json();

  return new Response(JSON.stringify(response), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}