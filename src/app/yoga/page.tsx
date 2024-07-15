import ContentContainer from '~/components/ContentContainer';
import YogaMain from '../../../public/hero-images/masakali-yoga-tiny.jpeg';
import YogaClasses from '../../../public/yoga/yoga-retreat-1.jpg';
import YogaRetreats from '../../../public/yoga/yoga-retreat-2.jpg';
import HeroImage from '~/components/HeroImage';
import VideoContainer from '~/components/VideoContainer';

export default function Page() {
  return (
    <section className=" w-full grid place-items-center">
      <HeroImage
        imgSrc={YogaMain}
        imgAlt="Akasha at Masakali view of the pool"
        topText="Embrace"
        bottomText="Serenity And Wellness"
      />

      <div>
        <p className="w-full max-w-[885px] text-center p-16 font-baskerville m-auto">
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
        imgSrc={YogaClasses}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading="Yoga Retreats"
        content="Immerse yourself in a transformative experience with our yoga retreats. Our retreats are thoughtfully curated to provide a perfect blend of yoga, meditation, and relaxation amidst the lush landscapes of Bali."
        // buttonText="Explore our upcoming retreats"
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
