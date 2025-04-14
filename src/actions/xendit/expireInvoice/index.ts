'use server';
import { Invoice } from 'xendit-node';

import { env } from '~/env.mjs';

export async function expireInvoice(invoiceId: string) {
  const xendit = new Invoice({ secretKey: env.XENDIT_TEST_SECRET_KEY });
  await xendit.expireInvoice({
    invoiceId,
  });
}
