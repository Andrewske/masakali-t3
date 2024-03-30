import Image from 'next/image';
import YogaShalaImage from '~/../public/hero-images/akasha-pool.webp';

import ScrollOffset from '~/components/ScrollOffset';

const YogaShala = () => {
  return (
    <section
      id="diningWrapper"
      className="relative flex justify-center flex-wrap p-8"
    >
      <ScrollOffset id="dining" />
      <div className="h-[450px] w-full md:max-w-[450px] bg-gray flex  flex-wrap items-center">
        <Image
          className="object-cover w-full h-full"
          src={YogaShalaImage}
          alt="Photo of breakfast on Surya's porch"
        />
      </div>
      <div className="md:h-[450px]  w-full md:max-w-[450px] bg-gray flex flex-col gap-4  p-8 ">
        <h2 className="">Yoga Shala</h2>
        <p className="w-full h-content leading-relaxed">
          Our retreat features a serene yoga shala, welcoming you to partake in
          yoga sessions twice daily amidst the tranquility of nature. Designed
          for all levels of practitioners, from beginners to advanced, our
          classes are led by experienced instructors who focus on traditional
          yoga practices. These sessions are a perfect complement to your day,
          inviting you to start each morning with vitality and conclude your
          evenings with peace. It&apos;s an idyllic space for deepening your
          practice or discovering tranquility, seamlessly integrating with the
          natural beauty of our surroundings.
        </p>
      </div>
    </section>
  );
};

export default YogaShala;
