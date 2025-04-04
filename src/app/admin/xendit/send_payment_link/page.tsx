import { auth, signIn } from '~/server/auth';
import PaymentForm from './PaymentForm';

export default async function Page() {
  const session = await auth();

  if (!session) {
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  //   const sendPaymentLink = async () => {
  //     console.log('Sent');
  //   };

  return (
    <div className="h-screen w-full grid place-items-center">
      <PaymentForm />
    </div>
  );
}
