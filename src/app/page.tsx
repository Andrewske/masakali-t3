// Components

import HeroSlideShow from '~/app/(main)/(home)/HeroSlideShow';

import About from '~/app/(main)/(home)/About';
import WhyChoose from '~/app/(main)/(home)/WhyChoose';
import Villas from '~/app/(main)/(home)/Villas';

import Reviews from '~/app/(main)/(home)/Reviews';
import VideoContainer from '~/components/VideoContainer';

const Page = () => {
  // const disabledDates = await getAllBlockedDates();

  return (
    <>
      {/* <Header /> */}

      <HeroSlideShow />
      {/* <Availability disabledDates={disabledDates} /> */}
      <About />
      <WhyChoose />
      <Villas />
      <VideoContainer
        title="Take a Tour"
        text="When it comes to Masakali Retreat’s design, customer service, location, and overall atmosphere, no detail is overlooked. We have meticulously crafted every aspect to ensure a perfect balance between luxury and nature, providing you with top-tier service and amenities amidst the stunning natural beauty of Bali. Discover the serene elegance and exceptional comfort that awaits you at Masakali Retreat, where every moment is designed to offer an unforgettable experience."
      />
      <Reviews />
      {/* <Dining />
      <Amenities />
      <YogaShala />
      <Location /> */}
    </>
  );
};

export default Page;
