'use client';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function ButtonList() {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push('/admin/invoices/create')}>
        Create Xendit Invoice
      </Button>
      <Button onClick={() => router.push('/admin/invoices')}>
        View Xendit Invoices
      </Button>
      <Button onClick={() => router.push('/admin/email/send_confirmation')}>
        Send A Confirmation Email
      </Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
