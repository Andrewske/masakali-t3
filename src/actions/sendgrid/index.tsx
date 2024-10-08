'use server';
import sgMail from '@sendgrid/mail';
import { env } from '~/env.mjs';

const retreatBookingEmailTemplate = 'd-60fce1dc0ea0423c92948e59fb505a6e';
const villaBookingEmailTemplate = 'd-df670819866341e3b360ea6a373e429e';
const adminBookingEmailTemplate = 'd-56beee67bc0245539a249c95b72c11a9';

export type EmailTemplateData = {
  name: string;
  email: string;
  country: string;
  villaName: string;
  startDate: string;
  endDate: string;
  numDays: number;
  pricePerNight: string;
  discount: string;
  taxes: string;
  total: string;
};

export const sendBookingConfirmation = async ({
  data,
  isRetreat = false,
}: {
  data: EmailTemplateData;
  isRetreat?: boolean;
}) => {
  sgMail.setApiKey(env.SENDGRID_API_KEY);

  console.log({ data });

  const templateId = isRetreat
    ? retreatBookingEmailTemplate
    : villaBookingEmailTemplate;

  const msg = {
    to: data.email,
    from: 'admin@masakaliretreat.com',
    templateId,
    dynamicTemplateData: data,
  };

  console.log({ msg });
  const response = await sgMail.send(msg);
  console.log(response);
  return;
};

export const sendAdminBookingConfirmation = async ({
  data,
}: {
  data: EmailTemplateData;
}) => {
  sgMail.setApiKey(env.SENDGRID_API_KEY);

  console.log({ data });

  const templateId = adminBookingEmailTemplate;

  const msg = {
    to: 'info@masakaliretreat.com',
    from: 'admin@masakaliretreat.com',
    templateId,
    dynamicTemplateData: data,
  };

  console.log({ msg });
  const response = await sgMail.send(msg);
  console.log(response);
  return;
};
