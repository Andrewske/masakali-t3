'use client';
import styles from './styles.module.scss';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GoToPageButton, LoginButton } from '~/components/Button';
import UpdateReservations from '~/app/dashboard/UpdateReservations';
import jurassicParkGif from '~/../public/jurassicParkGif.gif';

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user?.admin) {
    return (
      <main className={styles.main}>
        <Image
          src={jurassicParkGif}
          width="480"
          height="372"
          alt="jurassic park dennis ah ah ah gif"
        />

        <GoToPageButton
          path={'/'}
          callToAction="Go to Homepage"
        />

        <LoginButton />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <UpdateReservations />
    </main>
  );
};
export default Dashboard;
