'use server';
import { Invoice } from 'xendit-node';
import { env } from '~/env.mjs';
import { tryCatch } from '~/utils/tryCatch';
import { posthogServerError } from '~/utils/posthogServerError';
import { logError } from '~/utils/logError';

export async function expireInvoice(invoiceId: string) {
  const xendit = new Invoice({ secretKey: env.XENDIT_TEST_SECRET_KEY });
  const { error } = await tryCatch(
    xendit.expireInvoice({
      invoiceId,
    })
  );

  if (error) {
    logError({
      message: 'Failed to expire invoice',
      error,
      level: 'error',
      data: { location: 'expireInvoice', invoiceId },
    });
    await posthogServerError({
      error,
      context: { location: 'expireInvoice', invoiceId },
    });

    throw new Error('Failed to expire invoice');
  }
}
