'use client';
import { api } from '~/utils/api';

// Components

import HeroSlideShow from '~/components/HomePage/HeroSlideShow';
import Availability from '~/components/HomePage/Availability';
import About from '~/components/HomePage/About';
import WhyChoose from '~/components/HomePage/WhyChoose';
import Villas from '~/components/HomePage/Villas';
import Dining from '~/components/HomePage/Dining';
import Amenities from '~/components/HomePage/Amenities';
import Location from '~/components/HomePage/Location';

const Page = () => {
  return (
    <>
      <HeroSlideShow />
      <Availability />
      <About />
      <WhyChoose />
      <Villas />
      <Dining />
      <Amenities />
      <Location />
    </>
  );
};

export default api.withTRPC(Page);
