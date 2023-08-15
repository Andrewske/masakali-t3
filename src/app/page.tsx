import styles from './styles.module.scss';
import { prisma } from '~/app/api/db';
// Components

import HeroSlideShow from '~/app/(home)/HeroSlideShow';
import Availability from '~/app/(home)/Availability';
import About from '~/app/(home)/About';
import WhyChoose from '~/app/(home)/WhyChoose';
import Villas from '~/app/(home)/Villas';
import Dining from '~/app/(home)/Dining';
import Amenities from '~/app/(home)/Amenities';
import Location from '~/app/(home)/Location';
import { addDays } from 'date-fns';
import { getCurrentDateInBali } from '~/utils';

const today = getCurrentDateInBali();
const twoDaysAgo: string = addDays(today, -2).toISOString();

const Page = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      arrival: {
        gt: twoDaysAgo,
        lt: '2023-10-01',
      },
      cancelled: false,
    },
  });

  return (
    <main className={styles.main}>
      <HeroSlideShow />
      <Availability reservations={reservations} />
      <About />
      <WhyChoose />
      <Villas />
      <Dining />
      <Amenities />
      <Location />
    </main>
  );
};

export default Page;
