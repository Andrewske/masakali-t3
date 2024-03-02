import { getCurrency } from '~/actions/currencyApi';
import { NextResponse } from 'next/server';

export async function GET() {
  const currency = await getCurrency();

  return NextResponse.json({ success: true, currency });
}
