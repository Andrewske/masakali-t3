'use client';
import styles from './styles.module.scss';
import { type NextPage } from 'next';
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GoToPageButton, LoginButton } from '~/components/Button';

import jurassicParkGif from '~/../public/jurassicParkGif.gif';
import { UpdateReservationsButton } from '~/components/Button';

const Dashboard: NextPage = () => {
  // const { data: session } = useSession();
  const session = {
    user: {
      admin: false,
    },
  };

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
      <UpdateReservationsButton />
    </main>
  );
};
export default Dashboard;
