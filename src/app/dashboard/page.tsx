import styles from './styles.module.scss';
// import { type NextPage } from 'next';
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { GoToPageButton, LoginButton } from '~/components/Button';

import jurassicParkGif from '~/../public/jurassicParkGif.gif';
import { UpdateReservationsButton } from '~/components/Button';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/utils/authOptions';

export default async function Page() {
  const session = await getServerSession(authOptions);

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
}
