export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}
