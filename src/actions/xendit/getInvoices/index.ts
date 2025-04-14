'use server';
import { Invoice } from 'xendit-node';
import { env } from '~/env.mjs';

export async function getInvoices() {
  const xendit = new Invoice({ secretKey: env.XENDIT_TEST_SECRET_KEY });
  const response = await xendit.getInvoices();

  return response;
}
