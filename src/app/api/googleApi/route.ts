// import { sheets, auth } from '@googleapis/sheets';
// import { GoogleAuth, type GoogleAuthOptions } from 'google-auth-library';
import { Auth, google } from 'googleapis';
import { Impersonated, OAuth2Client, type JWTInput } from 'google-auth-library';

import { env } from '~/env.mjs';

import jwt from 'jsonwebtoken';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

export function generateJWT(payload: object, secretKey: string): string {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

const GOOGLE_SERVICE_KEY = process.env.GOOGLE_SERVICE_KEY ?? '';
const SECRET_KEY = 'mysupersupersecretkey';

export async function GET(request: Request) {
  const credential = GOOGLE_SERVICE_KEY
    ? (JSON.parse(
        Buffer.from(GOOGLE_SERVICE_KEY, 'base64').toString()
      ) as JWTInput)
    : null;

  console.log(credential);

  if (!credential) {
    return new Response(null, { status: 402 });
  }

  const auth = new google.auth.GoogleAuth({
    credentials: credential,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // const client = await auth.getClient();

  // const a = google.auth.fromJSON(credential);

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: '1I4j5yzK7dLYK5UtPb4OAgEduvXZVtqh9TWj4xK1hp1Q',
      range: 'A1:Z100',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            'test',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
          ],
        ],
      },
    });
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }

  return new Response(null, { status: 402 });
}
