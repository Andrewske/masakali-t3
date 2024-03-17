'use server';
import sgMail from '@sendgrid/mail';

import { env } from '~/env.mjs';

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

export const sendBookingConfirmation = async ({
  data,
  isRetreat = false,
}: {
  data: EmailTemplateData;
  isRetreat: boolean;
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
  const response = await sgMail.send(msg);
  console.log(response);
  return;
};

export const sendAdminBookingConfirmation = async () => {
  return await Promise.resolve();
};
