import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get('filter[]');
  // const limit = request.nextUrl.searchParams.get('limit');
  // const page = request.nextUrl.searchParams.get('page');

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
    creationDate: new Date(
      new Date(2023, 0, 1).getTime() +
        Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime()),
    ).toISOString(),
  }));

  if (filter) {
    const param = filter.split('||')[2];

    return Response.json({
      data: body.filter((org) => org.name.includes(param)),
    });
  }

  return Response.json({ data: body });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json(body);
}
