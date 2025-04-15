'use server';
import sgMail from '@sendgrid/mail';
import { env } from '~/env.mjs';
import { logError } from '~/utils/logError';
import { posthogServerError, logAndPosthog } from '~/utils/posthogServerError';
import { tryCatch } from '~/utils/tryCatch';

// Move template IDs to environment variables for better maintainability
const TEMPLATE_IDS = {
  RETREAT_BOOKING: 'd-60fce1dc0ea0423c92948e59fb505a6e',
  VILLA_BOOKING: 'd-df670819866341e3b360ea6a373e429e',
  ADMIN_BOOKING: 'd-56beee67bc0245539a249c95b72c11a9',
  DIRECT_BOOKING: 'd-1c83fd31688c40f3b920d826b8c1c1d3',
} as const;

// Common email configuration
const EMAIL_CONFIG = {
  from: {
    email: 'admin@masakaliretreat.com',
    name: 'Masakali Retreat',
  },
} as const;

// Initialize SendGrid once
sgMail.setApiKey(env.SENDGRID_API_KEY);

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
  const templateId = isRetreat
    ? TEMPLATE_IDS.RETREAT_BOOKING
    : TEMPLATE_IDS.VILLA_BOOKING;

  const msg = {
    to: data.email,
    ...EMAIL_CONFIG,
    templateId,
    dynamicTemplateData: data,
  };

  const { error } = await tryCatch(sgMail.send(msg));

  if (error) {
    await logAndPosthog({
      message: 'Error sending booking confirmation',
      error,
      level: 'error',
      data: { location: 'sendBookingConfirmation', data },
    });
  }
};

export const sendAdminBookingConfirmation = async ({
  data,
}: {
  data: EmailTemplateData;
}) => {
  const msg = {
    to: 'info@masakaliretreat.com',
    ...EMAIL_CONFIG,
    templateId: TEMPLATE_IDS.ADMIN_BOOKING,
    dynamicTemplateData: data,
  };

  const { error } = await tryCatch(sgMail.send(msg));

  if (error) {
    await logAndPosthog({
      message: 'Error sending admin booking confirmation',
      error,
      level: 'error',
      data: { location: 'sendAdminBookingConfirmation', data },
    });
  }
};

export type DirectBookingTemplateData = {
  email: string;
  name: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  total: string;
};

export const sendDirectBookingConfirmation = async (
  data: DirectBookingTemplateData
) => {
  const msg = {
    to: data.email,
    ...EMAIL_CONFIG,
    templateId: TEMPLATE_IDS.DIRECT_BOOKING,
    dynamicTemplateData: data,
  };

  const { error } = await tryCatch(sgMail.send(msg));

  if (error) {
    await logAndPosthog({
      message: 'Error sending direct booking confirmation',
      error,
      level: 'error',
      data: { location: 'sendDirectBookingConfirmation', data },
    });
  }
};
