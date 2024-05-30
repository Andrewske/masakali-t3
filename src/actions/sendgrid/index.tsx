'use server';
import sgMail from '@sendgrid/mail';
import { format } from 'date-fns';

import { env } from '~/env.mjs';
import { PaymentData } from '~/hooks/useFetchPaymentData';
import { UserState } from '~/stores/userStore';
import { formatCurrency } from '~/utils/helpers';

const retreatBookingEmailTemplate = 'd-60fce1dc0ea0423c92948e59fb505a6e';
const villaBookingEmailTemplate = 'd-df670819866341e3b360ea6a373e429e';

export type EmailTemplateData = {
  name: string;
  email: string;
  country: string;
  villaName: string;
  startDate: string;
  endDate: string;
  numDays: number;
  price: string;
  discount: string;
  taxes: string;
  total: string;
};

export const createBookingConfirmationData = ({
  user,
  paymentData,
}: {
  user: UserState['user'];
  paymentData: PaymentData;
}) => {
  const currency = paymentData.currency;
  return {
    name: user.fullName,
    email: user.email,
    country: user.address.country,
    villaName: paymentData.villaName,
    startDate: format(paymentData.checkin, "MMMM d' yyyy"),
    endDate: format(paymentData.checkout, 'MMMM d yyyy'),
    numDays: paymentData.numNights,
    price: formatCurrency(paymentData.pricePerNight, currency),
    discount: formatCurrency(paymentData.discount, currency),
    taxes: formatCurrency(paymentData.taxes, currency),
    total: formatCurrency(paymentData.finalPrice, currency),
  };
};

export const sendBookingConfirmation = async ({
  data,
  isRetreat = false,
}: {
  data: EmailTemplateData;
  isRetreat?: boolean;
}) => {
  sgMail.setApiKey(env.SENDGRID_API_KEY);

  const templateId = isRetreat
    ? retreatBookingEmailTemplate
    : villaBookingEmailTemplate;

  const msg = {
    to: data.email,
    from: 'admin@masakaliretreat.com',
    templateId,
    dynamicTemplateData: data,
  };

  console.log(msg);
  const response = await sgMail.send(msg);
  console.log(response);
  return;
};

export const sendAdminBookingConfirmation = async () => {
  return await Promise.resolve();
};
