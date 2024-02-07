export async function GET() {
  const categories = [
    { id: 1, name: 'Science' },
    { id: 2, name: 'Fantasy' },
    { id: 3, name: 'Romance' },
  ];

  return Response.json(categories);
}
