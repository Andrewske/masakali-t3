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
import { getAllBlockedDates } from '~/actions/reservations';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import HideHeader from '~/components/layout/HideHeader';
import YogaShala from './(home)/YogaShala';

const Page = async () => {
  const disabledDates = await getAllBlockedDates();

  return (
    <>
      <HideHeader>
        <Header />
      </HideHeader>
      <HeroSlideShow />
      <Availability disabledDates={disabledDates} />
      <About />
      <WhyChoose />
      <Villas />
      <Dining />
      <Amenities />
      <YogaShala />
      <Location />
      <Footer />
    </>
  );
};

export default Page;
