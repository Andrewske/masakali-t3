// import { UpdateReservationsButton } from '~/components/Button/UpdateReservations';
import { auth, signIn } from '~/server/auth';
// import { getPricing } from '~/actions/smoobu';
// import { suryaId } from '~/lib/villas';

export default async function Page() {
  const session = await auth();

  if (!session) {
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  console.log(session);

  return (
    <main className="h-screen w-full grid place-items-center">
      {/* <UpdateReservationsButton /> */}
      {/* <Button
        isWhite={false}
        callToAction={'Click Me'}
        handleClick={handleButtonClick}
      /> */}
      <h1>Hello</h1>
    </main>
  );
}
