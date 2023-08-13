import styles from './styles.module.scss';
import { prisma } from '~/server/api/db';
// Components

import HeroSlideShow from '~/components/HomePage/HeroSlideShow';
import Availability from '~/components/HomePage/Availability';
import About from '~/components/HomePage/About';
import WhyChoose from '~/components/HomePage/WhyChoose';
import Villas from '~/components/HomePage/Villas';
import Dining from '~/components/HomePage/Dining';
import Amenities from '~/components/HomePage/Amenities';
import Location from '~/components/HomePage/Location';

const Page = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      arrival: {
        gt: new Date(),
      },
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
