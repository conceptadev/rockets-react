export async function PATCH(request: Request) {
  const body = await request.json();
  return Response.json(body);
}

export async function DELETE() {
  return Response.json({});
}
