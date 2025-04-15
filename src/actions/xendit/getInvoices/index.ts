'use server';
import { Invoice } from 'xendit-node';
import { env } from '~/env.mjs';
import { tryCatch } from '~/utils/tryCatch';
import { logAndPosthog } from '~/utils/posthogServerError';

export async function getInvoices() {
  const xendit = new Invoice({ secretKey: env.XENDIT_TEST_SECRET_KEY });
  const { error, data } = await tryCatch(xendit.getInvoices());

  if (error) {
    await logAndPosthog({
      message: 'Error getting invoices',
      error,
      level: 'error',
      data: { location: 'getInvoices' },
    });
  }

  return data ?? [];
}
