import { Suspense } from 'react';
import PaymentForm from './PaymentForm';

export default async function Page() {
  return (
    <div className="h-screen w-full grid place-items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentForm />
      </Suspense>
    </div>
  );
}
