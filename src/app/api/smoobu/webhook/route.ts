import { villaIdsArray, type VillaIdsType } from '~/lib/villas';

import type { SmoobuReservation, SmoobuRatesResponse } from '~/types/smoobu';
import {
  cancelReservation,
  deleteReservation,
  updateReservation,
  batchVillaPricing,
  createReservation,
} from '~/utils/smoobu';

// TODO: find new upsertPricing

type WebhookBody = {
  action: string;
  user: number;
  data: SmoobuRatesResponse | SmoobuReservation;
};

const actionTypes = [
  'updateRates',
  'updateReservation',
  'cancelReservation',
  'deleteReservation',
  'newReservation',
];

// Type "NextApiRequest" is not a valid type for the function's first argument.
// Expected "Request | NextRequest", got "NextApiRequest".

// async function parseRequestBody(request: Request): Promise<WebhookBody> {
//   if (typeof request.body === 'string') {
//     // If the body is already a string, parse it as JSON
//     return JSON.parse(request.body) as WebhookBody;
//   } else {
//     // If the body is a stream, read it and parse the result
//     const chunks = [];
//     for await (const chunk of request.body) {
//       chunks.push(chunk);
//     }
//     const bodyString = Buffer.concat(chunks).toString();
//     return JSON.parse(bodyString) as WebhookBody;
//   }
// }

export async function POST(request: Request) {
  console.log('Webhook hit');

  try {
    const { action, data } = (await request.json()) as WebhookBody;

    if (!actionTypes.includes(action)) {
      return new Response('Invalid action type', { status: 200 });
    }

    // TODO: Test
    if (action === 'updateRates' && isSmoobuRatesResponse(data)) {
      await batchVillaPricing(data);
    }

    if (action === 'updateReservation' && isSmoobuReservation(data)) {
      await updateReservation(data);
    }

    if (action === 'cancelReservation' && isSmoobuReservation(data)) {
      const smoobuId = data.id;
      await cancelReservation(smoobuId);
    }

    if (action === 'deleteReservation' && isSmoobuReservation(data)) {
      const smoobuId = data.id;
      await deleteReservation(smoobuId);
    }

    if (action === 'newReservation' && isSmoobuReservation(data)) {
      if (data['guest-name'] === 'Masakali Blocked') {
        console.log('guest-name is Masakali Blocked');
        return;
      }

      await createReservation(data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return new Response('OK', { status: 200 });
  }
}

function isSmoobuRatesResponse(obj: unknown): obj is SmoobuRatesResponse {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  // Check if any key of obj can be converted to a number and is included in villaIdsArray
  return Object.keys(obj).some((id) => {
    const numericId = Number(id);
    return (
      !isNaN(numericId) && villaIdsArray.includes(numericId as VillaIdsType)
    );
  });
}

function isSmoobuReservation(obj: unknown): obj is SmoobuReservation {
  return !!obj && typeof obj === 'object' && obj.hasOwnProperty('reference-id');
}
