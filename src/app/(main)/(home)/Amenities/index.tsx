import Image from 'next/image';
import ScrollOffset from '~/components/ScrollOffset';

import { akashaPool } from '~/lib/images';

const Amenities = () => {
  return (
    <section className="relative flex items-center flex-wrap p-8 justify-center">
      <ScrollOffset id="amenities" />
      <div className="md:h-[600px] w-full md:max-w-[450px] bg-gray flex flex-col gap-4 p-8 ">
        <h2 className="">Amenities</h2>
        <p className="w-full leading-relaxed">
          At Masakali, our goal is to go above and beyond your expectations and
          to make your stay exceptional. The owner put her heart and soul into
          every aspect of this place and her vision is to share this gift with
          the rest of the world and it is truly our honor to offer our guests
          the best experience imaginable.
        </p>
        <p className="w-full leading-relaxed">
          That’s why we are offering a full range of services and amenities such
          as:
        </p>
        <ul className="list-disc list-inside columns-2 text-sm w-full leading-relaxed">
          <li>Private infinity pool</li>
          <li>Kitchenette</li>
          <li>Ensuite bathrooms</li>
          <li>Outdoor showers</li>
          <li>Tour packages</li>
          <li>Airport transfer</li>
          <li>Motorbike rental</li>
          <li>Laundry Services</li>
          <li>Safety deposit box</li>
          <li>Onsite security</li>
          <li>Toiletries</li>
          <li>Bathrobes</li>
          <li>Free WiFi</li>
          <li>Free parking</li>
          <li>Spa services</li>
          <li>Room service</li>
        </ul>
      </div>
      <div className="h-[600px] w-full md:max-w-[450px] bg-gray flex  flex-wrap items-center">
        <Image
          className="object-cover w-full h-full"
          src={akashaPool.src}
          alt={akashaPool.alt}
        />
      </div>
    </section>
  );
};

export default Amenities;
