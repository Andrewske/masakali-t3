import Image from 'next/image';

import ExploreVillasButton from '../ExploreVillasButton';

import {
  lumbungRenders,
  suryaBed,
  jalaBed,
  akashaBed,
  lakshmiBedroom1,
} from '~/lib/images';

const packageDetails = [
  {
    title: 'Twin Bed Shared Villa',
    price1: (
      <p>
        <span className="line-through text-red-500">$850</span> $
        {Math.round(850 * 0.85)}
        <span> (per person)</span>
      </p>
    ),
    listItems: [
      'Shared Villa',
      'Max 3 people',
      '2 twin beds upstairs',
      '1 Pullout sofa downstairs',
      'Communal Pool',
    ],
    image: lakshmiBedroom1.src,
  },
  {
    title: 'Upstairs Queen Bed in a Shared Villa',
    price1: (
      <p>
        <span className="line-through text-red-500">$1015</span> $
        {Math.round(1015 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$1675</span> $
        {Math.round(1675 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: [
      'Private Room in shared villa',
      'Max 2 people',
      '1 queen bed',
      'Communal Pool',
    ],
    image: lumbungRenders.src,
  },
  {
    title: 'Twin Bed Shared room',
    price1: (
      <p>
        <span className="line-through text-red-500">$1115</span> $
        {Math.round(1115 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$1830</span> $
        {Math.round(1830 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: ['Shared Room', 'Max 2 people', 'Communal Pool'],
    image: lakshmiBedroom1.src,
  },
  {
    title: 'Private Room with King Bed',
    price1: (
      <p>
        <span className="line-through text-red-500">$1325</span> $
        {Math.round(1325 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$2030</span> $
        {Math.round(2030 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: [
      'Private Room in shared villa',
      'Max 2 people',
      '1 king bed',
      'Communal Pool',
    ],
    image: akashaBed.src,
  },
  {
    title: '2 story private villa with queen bed',
    price1: (
      <p>
        <span className="line-through text-red-500">$1325</span> $
        {Math.round(1235 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$2030</span> $
        {Math.round(2030 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: [
      'Private Villa',
      'Max 2 people',
      '1 queen bed',
      'Communal Pool',
    ],
    image: lumbungRenders.src,
  },
  {
    title: 'Private Villa with queen bed and private pool',
    price1: (
      <p>
        <span className="line-through text-red-500">$1387</span> $
        {Math.round(1387 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$2047</span> $
        {Math.round(2047 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
    image: jalaBed.src,
  },
  {
    title: 'Private Villa with king bed and private pool',
    price1: (
      <p>
        <span className="line-through text-red-500">$1480</span> $
        {Math.round(1480 * 0.85)}
        <span> (1 person)</span>
      </p>
    ),
    price2: (
      <p>
        <span className="line-through text-red-500">$2014</span> $
        {Math.round(2014 * 0.85)}
        <span> (2 people)</span>
      </p>
    ),
    listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
    image: suryaBed.src,
  },
];

const Packages = () => {
  return (
    <div
      id="packages"
      className="w-full flex flex-col justify-center bg-gray items-center gap-8 px-4 py-16 bg-gray-100 text-gray-800 text-center font-montserrat"
    >
      <h2>PACKAGES</h2>
      <span className="flex flex-col gap-8 max-w-[800px]">
        <p>
          Each room is a comfortable and luxurious choice for relaxation and
          rejuvenation during the retreat.
        </p>
        <p>
          We recommend booking a private room (Surya or Jala) if you are
          traveling with a partner or friend whom you do not mind sharing a bed
          with. These two villas are also great for singles who prefer privacy
          and extra luxuries during their stay. Surya and Jala both have their
          own private infinity pools and kitchenettes in addition to the shared
          spaces you may use to mingle with other retreat guests.
        </p>
        <p>
          If you are traveling solo and would like to make new friends or if you
          are traveling with a friend and don’t want to share a bed, we
          recommend choosing one of our shared rooms (Priya or Isvara) which has
          twin configurations. These rooms have their own gardens and easy
          access to communal spaces with a kitchen, living room, dining, and a
          beautiful luxury pool.
        </p>
      </span>
      {/* <p className="font-bold">
        For booking inquiries, please contact us at{' '}
        <a href="mailto:info@masakaliretreat.com">info@masakaliretreat.com</a>
      </p> */}
      <ExploreVillasButton />

      <div className="flex flex-wrap w-full justify-evenly">
        <span className="w-full flex justify-center text-lg text-red-700 underline">
          <p>All packages 15% off until Nov 20th</p>
        </span>
        {packageDetails.map((packageDetail) => (
          <div
            key={packageDetail.title}
            className="flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300 max-w-[300px] my-4"
          >
            <span className="w-full h-[300px]">
              <Image
                src={packageDetail.image}
                alt={packageDetail.title}
                width={300}
                height={300}
                className="object-cover h-full"
              />
            </span>
            <span className="flex flex-col gap-8 p-4">
              <h3 className="text-xl">{packageDetail.title}</h3>
              <span className="font-bold">
                {packageDetail.price1}
                {packageDetail.price2 && packageDetail.price2}
              </span>
              <ul>
                {packageDetail.listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
