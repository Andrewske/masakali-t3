'use client';
import Button from '~/components/Button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function ButtonList() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 shadow-lg p-8 rounded-lg">
      <Button
        callToAction="Create Xendit Invoice"
        isWhite={false}
        handleClick={() => router.push('/admin/xendit/invoices/create')}
        className="w-full"
      />

      <Button
        callToAction="View Xendit Invoices"
        isWhite={false}
        handleClick={() => router.push('/admin/xendit/invoices')}
        className="w-full"
      />

      <Button
        callToAction="Send A Confirmation Email"
        isWhite={false}
        handleClick={() => router.push('/admin/email/send_confirmation')}
        className="w-full"
      />

      <Button
        callToAction="Logout"
        isWhite={false}
        handleClick={() => signOut({ callbackUrl: '/' })}
        className="w-full"
      />
    </div>
  );
}
