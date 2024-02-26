import styles from './styles.module.scss';
import { prisma } from '~/db/prisma';
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
import { getAllDisabledDates } from '~/actions/smoobu';

const today = getCurrentDateInBali();
const twoDaysAgo: string = addDays(today, -2).toISOString();

const Page = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      departure: {
        gt: twoDaysAgo,
        lt: '2023-12-01',
      },
      cancelled: false,
    },
  });

  const disabledDates = await getAllDisabledDates();

  return (
    <main className={styles.main}>
      <HeroSlideShow />
      <Availability
        reservations={reservations}
        disabledDates={disabledDates}
      />
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
