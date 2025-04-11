'use server';
import { Invoice } from 'xendit-node';
import { env } from '~/env';
import { v4 as uuidv4 } from 'uuid';
import { tryCatch } from '~/utils/tryCatch';
import type { NotificationChannel } from 'xendit-node/invoice/models';

export type XenditInvoiceData = {
  externalId: string;
  amount: number;
  customer: {
    given_names?: string;
    surname?: string;
    email: string;
  };
  customer_notification_preference: {
    invoice_created: ['email'];
    invoice_reminder: ['email'];
    invoice_paid: ['email'];
  };
  invoice_duration: 172800;
  payment_methods: ['CREDIT_CARD'];
  description?: string;
  currency: 'IDR';
  locale: 'en';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  fees: {
    type: 'tax' | 'discount';
    value: number;
  }[];
};

type PaymentLinkData = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  villa: string;
  nights: number;
  pricePerNight: number;
  discount: boolean;
  tax: boolean;
  discountAmount: number;
  taxAmount: number;
};

export const createPaymentLink = async (data: PaymentLinkData) => {
  const xendit = new Invoice({ secretKey: env.XENDIT_TEST_SECRET_KEY });

  const total = data.pricePerNight * data.nights;
  const discount = data.discount ? (data.discountAmount / 100) * total : 0;
  const withDiscount = total - discount;
  const tax = data.tax ? (data.taxAmount / 100) * withDiscount : 0;
  const withTax = withDiscount + tax;

  const fees: { type: 'tax' | 'discount'; value: number }[] = [];

  if (data.discount) {
    fees.push({
      type: 'discount',
      value: discount,
    });
  }

  if (data.tax) {
    fees.push({
      type: 'tax',
      value: tax,
    });
  }

  const invoiceData = {
    externalId: uuidv4(),
    amount: withTax,
    payerEmail: data.email,
    shouldSendEmail: true,
    customer: {
      givenNames: data.firstName,
      surname: data.lastName,
      email: data.email,
    },
    invoiceDuration: '172800',
    paymentMethods: ['CREDIT_CARD'],
    description: data.description,
    currency: 'IDR',
    locale: 'en',
    items: [
      {
        name: data.villa,
        quantity: data.nights,
        price: data.pricePerNight,
      },
    ],
    fees,
  };

  console.log('Sending to Xendit:', JSON.stringify(invoiceData, null, 2));

  const { error } = await tryCatch(xendit.createInvoice({ data: invoiceData }));

  if (error) {
    throw error;
  }

  return;
};
