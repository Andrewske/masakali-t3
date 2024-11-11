import HeroImage from '~/components/HeroImage';

import ContentContainer from '~/components/ContentContainer';

import { masakaliYogaShala, yogaRetreatPose } from '~/lib/images';

export default function Page() {
  return (
    <section className="h-full w-full">
      <HeroImage
        imgSrc={masakaliYogaShala.src}
        imgAlt={masakaliYogaShala.alt}
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
          imgSrc={yogaRetreatPose.src}
          imgPosition="left"
          imgAlt={yogaRetreatPose.alt}
          buttonText="Learn More"
          buttonLink="/retreats/tribute"
          newTab={false}
        />
      </div>
    </section>
  );
}
