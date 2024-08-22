'use server';
import sgMail from '@sendgrid/mail';
import { env } from '~/env.mjs';

const retreatInquiryEmailTemplate = 'd-4d24facf421a406ea4dc100b57e8905e';

export type EmailTemplateData = {
  retreatName: string;
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  notes: string;
};

export const sendRetreatInquiry = async ({
  data,
}: {
  data: EmailTemplateData;
}) => {
  try {
    sgMail.setApiKey(env.SENDGRID_API_KEY);

    const templateId = retreatInquiryEmailTemplate;

    const msg = {
      to: 'info@masakaliretreat.com',
      from: 'admin@masakaliretreat.com',
      templateId,
      dynamicTemplateData: data,
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Failed to send inquiry:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
