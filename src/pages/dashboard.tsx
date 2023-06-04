import styles from './index.module.scss';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../components/Header';
import Button from '../components/Button';
import UpdateReservations from '../components/Dashboard/UpdateReservations';
import jurassicParkGif from '../../public/jurassicParkGif.gif';

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

        <Button
          handleClick={() => router.push('/')}
          callToAction="Go to Homepage"
        />

        <Button
          handleClick={() => router.push('/api/auth/signin')}
          callToAction="Sign In"
        />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header />
      <UpdateReservations />
    </main>
  );
};
export default Dashboard;
