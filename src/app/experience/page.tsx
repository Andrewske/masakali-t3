import ContentContainer from '~/components/ContentContainer';

import YogaRetreats from '../../../public/yoga/yoga-retreat-2.jpg';
import HeroImage from '~/components/HeroImage';
import VideoContainer from '~/components/VideoContainer';
import AkashaPhoto from '../../../public/hero-images/akasha-front.webp';
import DiningPhoto from '../../../public/home/dining.jpg';
import Availability from '../(home)/Availability';

import { getAllBlockedDates } from '~/actions/reservations';

export default async function Page() {
  const disabledDates = await getAllBlockedDates();

  return (
    <section className=" w-full grid place-items-center">
      <HeroImage
        imgSrc={AkashaPhoto}
        imgAlt="Akasha at Masakali view of the pool"
        topText="Experience"
        bottomText="Our resort"
      />
      <Availability disabledDates={disabledDates} />

      <div className="flex flex-col gap-8 w-full p-16">
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          Though a mere 12.5km drive from the hustle and bustle of Ubud,
          Masakali Retreat is nestled in the beautiful Kelusa village, offering
          a retreat that feels like a million miles from the touristic hub.
        </p>
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          Sitting pretty in the hills of Kelusa and sporting million-dollar
          views, you’ll instantly feel relaxed the second you enter our private
          villas. However, a quick drive away is the beautiful Ubud city centre,
          offering a million things to do.
        </p>
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          From its waterfalls, ATV rides, rice terraces, zip lining, shopping,
          and a wide variety of activities for all ages, cultural attractions
          and sights, the area has something for everyone.
        </p>
      </div>
      <ContentContainer
        heading="Dining"
        content="Masakali offers a full range of options for dining, all with the taste and charm of fresh Balinese ingredients. Our curated selection of savory cuisine includes many local Balinese dishes as well as international dishes. Our staff will prepare you breakfast which is included in the price of your villa from select items on the menu as well as offer lunch and dinner so you can enjoy your meal in the privacy of your own villa."
        buttonText="Browse food and cocktail menu"
        imgSrc={DiningPhoto}
        imgPosition="left"
        imgAlt="Masakali Dining Photo"
      />
      <ContentContainer
        heading="Spa Services"
        content="Let our accomplished therapists work their magic and pamper you from head to toe with the vast variety of spa treatments we have on offer. From luxury manicures and pedicures to full body therapeutic massages, no matter what indulgent experience you’re chasing, we can help provide it. Our spa services are set up in the privacy of your own villa - where we can set up treatment beds in your room or private deck overlooking the Balinese rice fields. We strive to deliver divine experiences in stunning surroundings, making for a sublime place to relax, heal and nurture."
        buttonText="Explore our upcoming retreats"
        imgSrc={YogaRetreats}
        imgPosition="right"
        imgAlt="Masakali Yoga Retreat Image 2"
      />
      <VideoContainer
        title="Your Journey to wellness"
        text="At Masakali Retreat, we believe in the holistic approach to wellness. Our yoga shala is designed to provide a serene environment where you can connect with yourself and nature. Join us for a class or retreat, and embark on a journey of self-discovery and rejuvenation."
        videoId="jeAphDoR-cc"
      />
    </section>
  );
}
