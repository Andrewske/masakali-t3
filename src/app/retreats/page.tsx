import HeroImage from '~/components/HeroImage';
import MainImage from '~/../public/yoga/yoga-shala-landscape-2.jpg';

import ContentContainer from '~/components/ContentContainer';
import YogaClasses from '../../../public/yoga/yoga-retreat-3.jpg';

export default function Page() {
  return (
    <section className="h-full w-full">
      <HeroImage
        imgSrc={MainImage}
        imgAlt="Akasha at Masakali view of the pool"
        topText="Masakali"
        bottomText="Yoga Retreats"
      />
      <div>
        <p className="w-full max-w-[885px] text-center p-16 font-baskerville m-auto">
          At Masakali Retreat, nestled in the heart of Bali’s stunning natural
          beauty, we offer more than just a place to stay. Our yoga shala is a
          sanctuary of peace and rejuvenation, designed to help you find
          balance, harmony, and inner peace.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full p-8">
        <h1 className="text-center">Future Yoga Retreats</h1>
        <ContentContainer
          heading="Tribute Yoga Retreat"
          content={`Experience a transformative journey at Masakali Retreat with our six-day, five-night yoga retreat, set against the breathtaking backdrop of Balinese mountains, lush forests, and serene rice fields. Practice yoga, connect with nature, and find inner peace as you absorb the tranquility of one of the most spectacular places in the world`}
          imgSrc={YogaClasses}
          imgPosition="left"
          imgAlt="Masakali Yoga Retreat Image"
          buttonText="Learn More"
          buttonLink="/retreats/tribute"
          newTab={false}
        />
      </div>
    </section>
  );
}
