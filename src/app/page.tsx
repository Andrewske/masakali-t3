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
import { addDays, format } from 'date-fns';
import { getCurrentDateInBali } from '~/utils';
import { getAllBlockedDates } from '~/actions/reservations';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import HideHeader from '~/components/layout/HideHeader';
import YogaShala from './(home)/YogaShala';
import type { VillaIdsType } from '~/lib/villas';

const today = getCurrentDateInBali();
const twoDaysAgo: Date = addDays(today, -2);

const Page = async () => {
  const reservations = await prisma.reservation.findMany({
    where: {
      departure: {
        gt: twoDaysAgo,
        lt: new Date('2023-12-01'),
      },
      cancelled: false,
    },
  });

  const villaPricing = await prisma.villaPricing
    .findMany({
      where: {
        AND: {
          date: {
            gte: today,
          },
          available: true,
        },
      },
      select: {
        date: true,
        villaId: true,
      },
    })
    .then((data) =>
      data.map((d) => ({
        date: d.date,
        villaId: d.villaId as VillaIdsType,
      }))
    );

  const disabledDates = await getAllBlockedDates();

  return (
    <>
      <HideHeader>
        <Header />
      </HideHeader>
      <HeroSlideShow />
      <Availability
        reservations={reservations}
        disabledDates={disabledDates}
        villaPricing={villaPricing}
      />
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
