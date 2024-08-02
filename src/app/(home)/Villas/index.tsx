import Image from 'next/image';

import styles from './styles.module.scss';

import { GoToPageButton } from '~/components/Button/GoToPageButton';
import { villaDetails } from '~/lib/villas';
import Link from 'next/link';
import VillaImage from '~/components/VillaImage';

const Villas = () => {
  return (
    <section
      id="villasWrapper"
      className="relative flex flex-col items-center justify-center w-full h-auto py-16 px-4 md:px-16 gap-8"
    >
      {/* <ScrollOffset id="villas" /> */}
      <h2 className={styles.title}>Villas</h2>
      <div className="w-full max-w-[600px] text-center">
        <p>
          All the villas have their own private infinity pools overlooking the
          Balinese rice fields, fully equipped kitchenettes, luxurious outdoor
          showers, high-quality mattresses and bedding to make sure you have a
          restful sleep. On the patios you will find lounge chairs inviting you
          to sit back and relax outside as well as tables and chairs for eating
          a delicious meal on your deck or inside your villa. And some of the
          villas have bathtubs.
        </p>
      </div>
      <div className="flex flex-wrap justify-evenly w-full gap-4 h-full">
        {Object.values(villaDetails).map((villa) => (
          <VillaImage
            key={`${villa.name}-image`}
            villaName={villa.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Villas;
