import Image from 'next/image';
import React from 'react';

import { villaDetails, type VillaNamesType } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';
import VillaImage from '~/components/VillaImage';

const Item = ({ className, text }: { className: string; text: string }) => {
  return (
    <div className="flex gap-2 items-center">
      {/* <span className="relative w-8 h-8"> */}

      <span
        className={`${className} relative flex items-center justify-center text-lg`}
      >
        <p className="font-montserrat ml-2 my-auto uppercase"> {text}</p>
      </span>
    </div>
  );
};

interface Amenity {
  icon: string;
  text: string;
}

interface Amenities {
  [key: string]: Amenity;
}

const amenities: Amenities = {
  kitchen: {
    icon: 'icon-kitchen',
    text: 'Fully Equipped Kitchen',
  },
  'infinity-pool': {
    icon: 'icon-pool',
    text: 'Private Infitity Pool',
  },
  bath: {
    icon: 'icon-bath',
    text: 'Ensuite Bathrooms',
  },
  shower: {
    icon: 'icon-shower',
    text: 'Outdoor Showers',
  },
  safetydeposit: {
    icon: 'icon-security',
    text: 'Safety Deposit Box',
  },
  security: {
    icon: 'icon-security',
    text: 'Onsite Security',
  },
  tv: {
    icon: 'icon-tv',
    text: 'Television',
  },
  toiletries: {
    icon: 'icon-bath',
    text: 'Toiletries',
  },
  bathrobes: {
    icon: 'icon-bath',
    text: 'Bathrobes',
  },
  wifi: {
    icon: 'icon-connection',
    text: 'Free Wifi',
  },
  parking: {
    icon: 'icon-directions_car',
    text: 'Free Parking',
  },
  service: {
    icon: 'icon-kitchen',
    text: 'Room Service',
  },
  garden: {
    icon: 'icon-leaf',
    text: 'Garden view',
  },
  mosquito: {
    icon: 'icon-bug',
    text: 'Mosquito net',
  },
  bluetooth: {
    icon: 'icon-music',
    text: 'Bluetooth speaker system',
  },
  events: {
    icon: 'icon-camera',
    text: 'Suitable for events',
  },
  fans: {
    icon: 'icon-thermometer',
    text: 'Portable fans',
  },
  workspace: {
    icon: 'icon-display',
    text: 'Dedicated workspace',
  },
  breakfast: {
    icon: 'icon-spoon-knife',
    text: 'Breakfast included',
  },
  hammock: {
    icon: 'icon-tree',
    text: 'Hammock',
  },
};

const VillaDetails = ({ villaName }: { villaName: VillaNamesType }) => {
  return (
    <div className="flex justify-center w-full flex-wrap ">
      <div className="max-w-[800px] flex flex-col gap-4 p-4 text-left divide-y">
        <div className="flex flex-col gap-4">
          <h2>The Details</h2>
          <p>{villaDetails[villaName].details}</p>
          <div className="flex gap-4 ">
            {/* <span className="relative w-8 h-8">
                <Image
                  src={bedIcon}
                  alt="bed icon"
                  fill
                />
              </span>
              <p className="font-montserrat">1-2</p> */}
            <Item
              className="icon-bed"
              text={villaDetails[villaName].beds}
            />
            <Item
              className="icon-bath"
              text={villaDetails[villaName].baths}
            />
          </div>
        </div>
        <div className="w-full py-8 flex flex-col gap-4">
          <p className="font-montserrat uppercase text-lg text-light-purple-7 font-semibold">
            Included Amenities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {villaDetails[villaName].amenities.map((item) => {
              const amenity = amenities[item];
              if (!amenity) {
                return null;
              }

              return (
                <Item
                  key={amenity.icon}
                  className={amenity.icon}
                  text={amenity.text}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full py-8 flex flex-col gap-4">
          <p className="font-montserrat uppercase text-lg text-light-purple-7 font-semibold">
            Available Extras
          </p>
          <div className="flex flex-wrap justify-center items gap-4">
            <p className="bg-gray py-2 px-4 border border-solid border-light-purple-7 font-montserrat uppercase">
              Laundry Services
            </p>
            <p className="bg-gray py-2 px-4 border border-solid border-light-purple-7 font-montserrat uppercase">
              Spa Services
            </p>
            <p className="bg-gray py-2 px-4 border border-solid border-light-purple-7 font-montserrat uppercase">
              Private Tours
            </p>
            <p className="bg-gray py-2 px-4 border border-solid border-light-purple-7 font-montserrat uppercase">
              Personal Driver
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-w-[400px] items-center md:items-end py-16">
        <div className="flex flex-col">
          <p className="bg-purple py-4 px-8 w-[300px] text-center text-white border border-solid border-light-purple-7 font-montserrat uppercase">
            Key Details
          </p>
          {villaDetails[villaName].keyDetails.map((item) => {
            return (
              <p
                key={item}
                className="bg-gray py-4 px-8 w-[300px] text-center  border border-solid border-light-purple-7 font-montserrat uppercase"
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>

      <div className="bg-gray w-full py-8">
        <h2 className="font-montserrat uppercase w-full text-center py-16">
          Explore Our Other Villas
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {Object.values(villaDetails).map((villa) => {
            return villa.name !== villaName ? (
              <VillaImage
                key={`${villa.name}-image`}
                villaName={villa.name}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
