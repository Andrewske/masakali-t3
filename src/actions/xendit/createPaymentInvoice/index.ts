'use server';
export type XenditInvoiceData = {
  external_id: string;
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
  };
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
};

// export const createPaymentLink = async (data: PaymentLinkData) => {

//     const invoiceData: XenditInvoiceData = {
//         external_id: data.email,
//         amount: data.pricePerNight * data.nights,
//         customer: {
//             email: data.email,
//         },
//         customer_notification_preference: {
//             invoice_created: ['email'],
//             invoice_reminder: ['email'],
//             invoice_paid: ['email'],
//         },
//         invoice_duration: 172800,
//         payment_methods: ['CREDIT_CARD'],
//         currency: 'IDR',
//         locale: 'en',
//         items: [{
//             name: data.villa,
//             quantity: data.nights,
//             price: data.pricePerNight,
//         }],
//     }

//     return
// }
