export async function GET() {
  const body = {
    categories: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Fantasy' },
      { id: 3, name: 'Romance' },
    ],
  };

  return Response.json(body);
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}
