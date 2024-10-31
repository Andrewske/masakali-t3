// Components

import HeroSlideShow from '~/app/(home)/HeroSlideShow';
// import Availability from '~/app/(home)/Availability';
import About from '~/app/(home)/About';
import WhyChoose from '~/app/(home)/WhyChoose';
import Villas from '~/app/(home)/Villas';
// import { getAllBlockedDates } from '~/actions/reservations';

import Reviews from './(home)/Reviews';
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
        videoId="in8GqtSGIJ0"
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
