// // instrumentation.js
// import type { NextRequest } from 'next/server';
// import type { PostHog } from 'posthog-node';

// // Define the PostHog cookie data interface
// interface PostHogCookieData {
//   distinct_id: string;
//   [key: string]: string | number | boolean; // More specific type for additional properties
// }

// export function register(): void {
//   // No-op for initialization
// }

// export const onRequestError = async (
//   err: Error,
//   request: NextRequest,
//   context: Record<string, string | number | boolean>
// ): Promise<void> => {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     // Use dynamic import type for PostHog
//     // const { getPostHogServer } = await import('./app/posthog-server');
//     const posthog = getPostHogServer();

//     let distinctId: string | null = null;
//     const cookieString = request.headers.get('cookie');

//     if (cookieString) {
//       const postHogCookieMatch = cookieString.match(
//         /ph_phc_.*?_posthog=([^;]+)/
//       );

//       if (postHogCookieMatch?.[1]) {
//         try {
//           const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
//           const postHogData = JSON.parse(decodedCookie) as PostHogCookieData;
//           distinctId = postHogData.distinct_id;
//         } catch (e) {
//           console.error(
//             'Error parsing PostHog cookie:',
//             e instanceof Error ? e.message : e
//           );
//         }
//       }
//     }

//     posthog.captureException(err, distinctId ?? undefined, context);
//   }
// };
