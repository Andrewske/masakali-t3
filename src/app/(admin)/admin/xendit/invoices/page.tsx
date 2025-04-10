import { getInvoices } from '~/actions/xendit/getInvoices';
import XenditInvoices from '../_components/invoices';

export default async function InvoicesPage() {
  const data = await getInvoices();

  return <XenditInvoices data={data} />;
}
