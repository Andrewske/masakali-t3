import Image, { type StaticImageData } from 'next/image';
import React from 'react';

import bedIcon from '~/../public/icons/bed_icon.png';
import bathIcon from '~/../public/icons/bath_icon.png';
import { villaDetails } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';

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

const amenities = [
  {
    icon: 'icon-kitchen',
    text: 'Fully Equipped Kitchen',
  },
  {
    icon: 'icon-pool',
    text: 'Private Infitity Pool',
  },
  {
    icon: 'icon-bath',
    text: 'Ensuite Bathrooms',
  },
  {
    icon: 'icon-shower',
    text: 'Outdoor Showers',
  },
  {
    icon: 'icon-security',
    text: 'Safety Deposit Box',
  },
  {
    icon: 'icon-security',
    text: 'Onsite Security',
  },
  {
    icon: 'icon-tv',
    text: 'Television',
  },
  {
    icon: 'icon-bath',
    text: 'Toiletries',
  },
  {
    icon: 'icon-bath',
    text: 'Bathrobes',
  },
  {
    icon: 'icon-connection',
    text: 'Free Wifi',
  },
  {
    icon: 'icon-directions_car',
    text: 'Free Parking',
  },
  {
    icon: 'icon-kitchen',
    text: 'Room Service',
  },
];

const VillaDetails = () => {
  return (
    <div className="flex justify-center w-full flex-wrap ">
      <div className="max-w-[800px] flex flex-col gap-4 p-4 text-left divide-y">
        <div className="flex flex-col gap-4">
          <h2>The Details</h2>
          <p>
            Originally built as the owner’s private dream residence, it now
            offers our guests two floors of three uniquely designed bedrooms,
            each with en-suite bathrooms and walk in closets. The grand
            residence also boasts a personal office, two living rooms, a fully
            equipped kitchen, grand outdoor dining area, and beautiful infinity
            pool with cascading fountains.
          </p>
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
              className="icon-bath"
              text="1-2"
            />
            <Item
              className="icon-bath"
              text="1"
            />
          </div>
        </div>
        <div className="w-full py-8 flex flex-col gap-4">
          <p className="font-montserrat uppercase text-lg text-light-purple-7 font-semibold">
            Included Amenities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {amenities.map((item) => (
              <Item
                key={item.icon}
                className={item.icon}
                text={item.text}
              />
            ))}
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
          <p className="bg-gray py-4 px-8 w-[300px] text-center  border border-solid border-light-purple-7 font-montserrat uppercase">
            1-3 Bedrooms
          </p>
          <p className="bg-gray py-4 px-8 w-[300px] text-center  border border-solid border-light-purple-7 font-montserrat uppercase">
            Ensuit Bathrooms
          </p>
          <p className="bg-gray py-4 px-8 w-[300px] text-center  border border-solid border-light-purple-7 font-montserrat uppercase">
            Dedicated Workspace
          </p>
          <p className="bg-gray py-4 px-8 w-[300px] text-center  border border-solid border-light-purple-7 font-montserrat uppercase">
            Full Kitchen
          </p>
        </div>
      </div>

      <div className="bg-gray w-full py-32">
        <h2 className="font-montserrat uppercase w-full text-center">
          Explore Our Other Villas
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {Object.values(villaDetails).map((villa, index) => {
            if (index < 4) {
              return (
                <div
                  key={villa.name}
                  className="relative group cursor-pointer"
                >
                  <Image
                    src={villa.defaultImage}
                    alt={villa.name}
                    width={400}
                    height={400}
                    className="w-[500px] h-[500px] object-cover z-0"
                  />
                  <span className="absolute top-0 left-0 right-0 h-full z-10 hidden group-hover:block">
                    <span className="bg-white bg-opacity-70 p-4 w-full h-full grid grid-cols-1 place-items-center">
                      <h3 className="uppercase text-2xl">{villa.name}</h3>
                      <GoToPageButton
                        callToAction={`Book ${villa.name}`}
                        path={`/villas/${villa.name}`}
                        isWhite={false}
                      />
                    </span>
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default VillaDetails;
