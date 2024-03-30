import Image from 'next/image';
import DiningImage from '~/../public/hero-images/akasha-pool.webp';

import ScrollOffset from '~/components/ScrollOffset';

const Dining = () => {
  return (
    <section
      id="diningWrapper"
      className="relative flex justify-center flex-wrap p-8"
    >
      <ScrollOffset id="dining" />
      <div className="md:h-[450px] w-full md:max-w-[450px] bg-gray flex flex-col items-center">
        <Image
          className="object-cover w-full h-full"
          src={DiningImage}
          alt="Photo of breakfast on Surya's porch"
        />
      </div>
      <div className="md:h-[450px]  w-full md:max-w-[450px] bg-gray flex flex-col gap-4  p-8 ">
        <h2 className="">Dining</h2>
        <p className="w-full leading-relaxed">
          Masakali offers a full range of options for dining, all with the taste
          and charm of fresh Balinese ingredients. Our curated selection of
          savory cuisine includes many local Balinese dishes as well as
          international dishes. Our staff will prepare you breakfast which is
          included in the price of your villa from select items on the menu as
          well as offer lunch and dinner so you can enjoy your meal in the
          privacy of your own villa.
        </p>
      </div>
    </section>
  );
};

export default Dining;
