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
import YogaShala from './(home)/YogaShala';
import Reviews from './(home)/Reviews';
import VideoContainer from '~/components/VideoContainer';

const Page = async () => {
  const disabledDates = await getAllBlockedDates();

  return (
    <>
      <Header />

      <HeroSlideShow />
      <Availability disabledDates={disabledDates} />
      <About />
      <WhyChoose />
      <Villas />
      <VideoContainer
        title="Your Journey to wellness"
        text="At Masakali Retreat, we believe in the holistic approach to wellness. Our yoga shala is designed to provide a serene environment where you can connect with yourself and nature. Join us for a class or retreat, and embark on a journey of self-discovery and rejuvenation."
        videoId="jeAphDoR-cc"
      />
      <Reviews />
      {/* <Dining />
      <Amenities />
      <YogaShala />
      <Location /> */}
      <Footer />
    </>
  );
};

export default Page;
