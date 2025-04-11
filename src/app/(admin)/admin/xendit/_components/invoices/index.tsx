'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '~/components/ui/card';
import Button from '~/components/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import type { Invoice } from 'xendit-node/invoice/models';
import { formatCurrency } from '~/utils/helpers';
import { expireInvoice } from '~/actions/xendit/expireInvoice';
import { getInvoices } from '~/actions/xendit/getInvoices';

export default function XenditInvoices({ data }: { data: Invoice[] }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInvoices(data);
    setLoading(false);
  }, [data]);

  const handleVoidPayment = async (invoiceId: string) => {
    setLoading(true);
    try {
      console.log('voiding invoice', invoiceId);
      await expireInvoice(invoiceId);

      // Refresh invoices after voiding
      setInvoices(await getInvoices());
    } catch (err) {
      //   setError(err instanceof Error ? err.message : 'Failed to void payment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col  justify-items-start min-h-screen">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold">Xendit Invoices</h1>
        <Button
          href="/admin/xendit/invoices/create"
          callToAction="Create Invoice"
          isWhite={false}
        />
      </div>

      <div className="space-y-4">
        {data.length > 0 &&
          invoices.map((invoice) => (
            <Card key={invoice.id}>
              <Accordion
                type="single"
                collapsible
              >
                <AccordionItem
                  value={invoice.id ?? ''}
                  className="mr-4"
                >
                  <AccordionTrigger>
                    <CardHeader className="grid grid-cols-1 sm:grid-cols-5 w-full text-left">
                      <div className="font-semibold">
                        {invoice.customer?.givenNames}{' '}
                        {invoice.customer?.surname}
                      </div>
                      <div
                        className={`${
                          invoice.status === 'PAID'
                            ? 'text-green-600'
                            : invoice.status === 'EXPIRED'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                        }`}
                      >
                        {invoice.status}
                      </div>
                      <div>{formatCurrency(invoice.amount, 'IDR')}</div>
                      <div>
                        {new Date(invoice.created).toLocaleDateString()}
                        <p className="text-[10px]! text-gray-500">Created On</p>
                      </div>
                      <div>
                        {new Date(invoice.expiryDate).toLocaleDateString()}
                        <p className="text-[10px]! text-gray-500">Expires On</p>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <h3 className="font-semibold mb-2">
                            Customer Details
                          </h3>
                          <p>Email: {invoice.customer?.email}</p>
                          <p>
                            Name: {invoice.customer?.givenNames}{' '}
                            {invoice.customer?.surname}
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <h3 className="font-semibold mb-2">
                            Invoice Details
                          </h3>
                          <p>Description: {invoice.description}</p>
                          <p>Invoice ID: {invoice.id}</p>
                        </div>
                      </div>

                      {invoice.status !== 'EXPIRED' &&
                        invoice.status !== 'PAID' && (
                          <Button
                            onClick={() => handleVoidPayment(invoice.id ?? '')}
                            className="mt-4 bg-red-600 hover:bg-red-700"
                            disabled={loading}
                          >
                            {loading ? 'Voiding...' : 'Void Payment Link'}
                          </Button>
                        )}
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
      </div>
    </div>
  );
}
