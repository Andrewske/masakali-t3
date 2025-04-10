import ButtonList from './_components/buttonList';

import { auth } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      {/* <UpdateReservationsButton /> */}
      {/* <Button
        isWhite={false}
        callToAction={'Click Me'}
        handleClick={handleButtonClick}
      /> */}
      <h1>Hello</h1>
      <ButtonList />
    </main>
  );
}
