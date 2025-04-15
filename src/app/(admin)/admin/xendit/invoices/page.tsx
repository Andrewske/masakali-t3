import { getInvoices } from '~/actions/xendit/getInvoices';
import XenditInvoices from '../_components/invoices';
import { tryCatch } from '~/utils/tryCatch';
import { logError } from '~/utils/logError';

export default async function InvoicesPage() {
  const { data, error } = await tryCatch(getInvoices());

  if (error) {
    logError({
      message: 'Error getting invoices',
      error,
      level: 'error',
      data: { location: 'InvoicesPage' },
    });

    return <div>Error getting invoices</div>;
  }

  return <XenditInvoices data={data ?? []} />;
}
