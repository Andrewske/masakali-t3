import { env } from '~/env.mjs';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const discountCode = searchParams.get('discountCode');

  if (discountCode === env.DISCOUNT_CODE) {
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 402 });
}
