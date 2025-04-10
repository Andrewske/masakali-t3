'use client';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function ButtonList() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 shadow-lg p-8 rounded-lg">
      <Button
        onClick={() => router.push('/admin/xendit/invoices/create')}
        className="cursor-pointer"
      >
        Create Xendit Invoice
      </Button>
      <Button
        onClick={() => router.push('/admin/xendit/invoices')}
        className="cursor-pointer"
      >
        View Xendit Invoices
      </Button>
      <Button
        onClick={() => router.push('/admin/email/send_confirmation')}
        className="cursor-pointer"
      >
        Send A Confirmation Email
      </Button>
      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
}
