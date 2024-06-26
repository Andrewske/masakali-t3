import Image from 'next/image';

import styles from './styles.module.scss';

import { GoToPageButton } from '~/components/Button/GoToPageButton';
import { villaDetails } from '~/lib/villas';
import Link from 'next/link';

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
          <div
            key={villa.id}
            className=" w-[450px] h-[550px] md:h-[450px] relative z-10"
          >
            <Image
              src={villa.defaultImage}
              alt={villa.name}
              width={300}
              height={300}
              className="relative object-cover w-full h-full z-0"
            />
            <span className="absolute top-0 left-0  h-full z-20">
              <span className="bg-white bg-opacity-70 p-4 w-full h-full grid grid-col-1 place-items-center">
                <h3 className="uppercase text-2xl">{villa.name}</h3>
                <p className="font-medium">{villa.description}</p>
                <GoToPageButton
                  callToAction="Book Now"
                  isWhite={false}
                  path={`/villas/${villa.name}`}
                />
              </span>
            </span>
          </div>
        ))}
      </div>
      <GoToPageButton
        callToAction="View All Villas"
        isWhite={false}
        path="/villas"
      />
    </section>
  );
};

export default Villas;
