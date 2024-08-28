import { type LeadDataValues } from '~/app/api/googleApi/route';

export const sendRetreatDataToGoogleSheets = async (data: LeadDataValues) => {
  return await fetch('/api/googleApi', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
    }),
  });
};
