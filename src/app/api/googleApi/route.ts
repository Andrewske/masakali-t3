import { google } from 'googleapis';
import { type JWTInput } from 'google-auth-library';

import { env } from '~/env';

export type LeadDataValues = {
  date: string;
  fullName: string;
  email: string;
  phone: string;
  villa: string;
  adults: number;
  notes: string;
};

const GOOGLE_SERVICE_KEY = env.GOOGLE_SERVICE_KEY;

function prepareGoogleSheetData(data: LeadDataValues): string[] {
  const { date, fullName, email, phone, adults, notes, villa } = data;

  return [
    date,
    fullName,
    email,
    phone,
    villa,
    String(adults),
    '',
    'Tribute',
    '',
    '',
    notes,
  ];
}

export async function POST(request: Request) {
  const leadsData = (await request.json()) as LeadDataValues;

  const values = prepareGoogleSheetData(leadsData);

  const credential = GOOGLE_SERVICE_KEY
    ? (JSON.parse(
        Buffer.from(GOOGLE_SERVICE_KEY, 'base64').toString()
      ) as JWTInput)
    : null;

  if (!credential) {
    return new Response(null, { status: 402 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: credential,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: env.RETREAT_LEADS_SPREADSHEET_ID,
      range: "'Lead Data'!A:L",
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });
    console.log(result.data);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 402 });
  }
}
