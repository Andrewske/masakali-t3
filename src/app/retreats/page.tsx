import HeroImage from '~/components/HeroImage';

import ContentContainer from '~/components/ContentContainer';

import { masakaliYogaShala, yogaRetreatPose } from '~/lib/images';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yoga Retreats at Masakali Retreat | Serenity in Bali',
  description:
    'Immerse yourself in tranquility at Masakali Retreat’s yoga retreats. Experience six-day transformative journeys with yoga, meditation, and nature in the heart of Bali’s stunning landscapes.',
  keywords: [
    'yoga retreats Bali',
    'Masakali Retreat',
    'yoga shala Bali',
    'wellness retreats',
    'meditation retreats Bali',
    'Kelusa village yoga',
  ],
  openGraph: {
    title: 'Yoga Retreats at Masakali Retreat | Serenity in Bali',
    description:
      'Join our yoga retreats at Masakali Retreat for a transformative experience. Practice yoga, connect with nature, and rejuvenate your mind and body amidst Bali’s breathtaking beauty.',
    // images: [
    //   {
    //     url: 'https://www.masakaliretreat.com/retreats/retreats-og-image.jpg', // Replace with actual image URL
    //     width: 1200,
    //     height: 630,
    //     alt: 'Yoga Shala at Masakali Retreat with Balinese Landscape',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return (
    <section className="h-full w-full">
      <HeroImage
        imgSrc={masakaliYogaShala.src}
        imgAlt={masakaliYogaShala.alt}
      />
      <div className="w-full flex justify-center py-16 px-4">
        <p className="w-full max-w-[885px]  text-center font-baskerville m-auto">
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
