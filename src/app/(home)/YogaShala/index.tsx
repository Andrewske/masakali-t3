import Image from 'next/image';

import ScrollOffset from '~/components/ScrollOffset';

import { yogaShalaJungle } from '~/lib/images';

const YogaShala = () => {
  return (
    <section
      id="diningWrapper"
      className="relative flex justify-center flex-wrap p-8"
    >
      <ScrollOffset id="yoga" />
      <div className="h-min-[450px] w-full md:max-w-[450px] bg-gray flex  flex-wrap items-center">
        <Image
          className="object-cover w-full h-full"
          src={yogaShalaJungle.src}
          alt={yogaShalaJungle.alt}
        />
      </div>
      <div className="md:min-h-[450px]  w-full md:max-w-[450px] bg-gray flex flex-col gap-4  p-8 ">
        <h2 className="">Yoga Shala</h2>
        <p className="w-full h-content leading-relaxed">
          At our serene yoga shala, we invite you to embrace tranquility and
          balance through our thoughtfully scheduled yoga sessions. Immerse
          yourself in the spiritual essence of Bali with our Morning Flow class
          at 8:15 am, a perfect way to awaken and energize your body and spirit
          with the first light of day. As dusk settles, join us for our Evening
          Flow class at 6:00 pm, designed to help you unwind and reflect,
          promoting a sense of peace as the day draws to a close. Both classes
          are led by experienced instructors who integrate the beauty of
          Balinese nature and philosophy into their teaching, offering a
          harmonious blend of local tradition and yoga practice. These sessions
          are a complimentary part of your stay, allowing you to enhance your
          wellness journey in the privacy and comfort of our yoga shala, set
          against the backdrop of Bali&apos;s breathtaking landscapes.
        </p>
      </div>
    </section>
  );
};

export default YogaShala;
