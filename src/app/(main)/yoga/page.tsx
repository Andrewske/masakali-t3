import ContentContainer from '~/components/ContentContainer';
import HeroImage from '~/components/HeroImage';
import VideoContainer from '~/components/VideoContainer';

import {
  masakaliYogaMainImage,
  yogaClasses,
  yogaRetreatMeditation,
} from '~/lib/images';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yoga Classes and Retreats at Masakali Retreat | Wellness in Bali',
  description:
    'Discover the yoga classes and retreats at Masakali Retreat. Experience a transformative journey of yoga, meditation, and relaxation amidst the lush landscapes of Bali.',
  keywords: [
    'yoga classes Bali',
    'yoga retreats Bali',
    'wellness retreats',
    'meditation retreats Bali',
    'Kelusa village yoga',
  ],
  openGraph: {
    title: 'Yoga Classes and Retreats at Masakali Retreat | Wellness in Bali',
    description:
      'Discover the yoga classes and retreats at Masakali Retreat. Experience a transformative journey of yoga, meditation, and relaxation amidst the lush landscapes of Bali.',
  },
};

export default function Page() {
  return (
    <section className=" w-full grid place-items-center">
      <HeroImage
        imgSrc={masakaliYogaMainImage.src}
        imgAlt={masakaliYogaMainImage.alt}
      />

      <div className="py-16 px-4">
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          At Masakali Retreat, nestled in the heart of Bali’s stunning natural
          beauty, we offer more than just a place to stay. Our yoga shala is a
          sanctuary of peace and rejuvenation, designed to help you find
          balance, harmony, and inner peace.
        </p>
      </div>
      <ContentContainer
        heading="Yoga Classes"
        content="Whether you are a seasoned yogi or just beginning your journey, our experienced instructors guide you through each pose with care and expertise. Our classes are designed to accommodate all skill levels, ensuring a nurturing and inclusive environment."
        // buttonText="See our yoga class schedule"
        imgSrc={yogaClasses.src}
        imgPosition="left"
        imgAlt={yogaClasses.alt}
      />
      <ContentContainer
        heading="Yoga Retreats"
        content="Immerse yourself in a transformative experience with our yoga retreats. Our retreats are thoughtfully curated to provide a perfect blend of yoga, meditation, and relaxation amidst the lush landscapes of Bali."
        // buttonText="Explore our upcoming retreats"
        imgSrc={yogaRetreatMeditation.src}
        imgPosition="right"
        imgAlt={yogaRetreatMeditation.alt}
      />
      <VideoContainer
        title="Your Journey to wellness"
        text="At Masakali Retreat, we believe in the holistic approach to wellness. Our yoga shala is designed to provide a serene environment where you can connect with yourself and nature. Join us for a class or retreat, and embark on a journey of self-discovery and rejuvenation."
        // videoId="jeAphDoR-cc"
      />
    </section>
  );
}
