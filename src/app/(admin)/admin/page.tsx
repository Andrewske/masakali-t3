import Button from '~/components/Button';
import ButtonList from './_components/buttonList';
import posthogServerError from '~/utils/posthogServerError';

import { tryCatch } from '~/utils/tryCatch';
export default async function Page() {
  const sendError = async () => {
    'use server';
    const { error } = await tryCatch(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Test error'));
        }, 1000);
      })
    );
    await posthogServerError({ error, context: { location: 'admin' } });
    if (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <h1>Hello</h1>
      <Button
        callToAction="Test Error"
        handleClick={sendError}
      />
      <ButtonList />
    </main>
  );
}
