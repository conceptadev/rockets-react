export function GET() {
  const body = new Array(50).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Organization ${index + 1}`,
    address: 'Baker St.',
    city: 'Orlando',
    state: 'FL',
    postalCode: '12345',
    phone: '5555551234',
    owner: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    },
    creationDate: new Date().toISOString(),
  }));

  return Response.json({ data: body });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}
