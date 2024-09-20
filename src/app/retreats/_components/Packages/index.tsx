import Image from 'next/image';

import SuryaImage from '~/../public/surya/surya-bed.webp';
import JalaImage from '~/../public/jala/jala-bed.webp';
import AkashaImage from '~/../public/akasha/akasha-bed.webp';
import TwinImage3 from '~/../public/lakshmi/lakshmi-bedroom-2a.webp';
import LumbungImage from '~/../public/lumbungs/lumbung-renders.jpg';
import ExploreVillasButton from '../ExploreVillasButton';

const packageDetails = [
  {
    title: 'Twin Bed Shared Villa',
    price1: '$850 (per person)',
    listItems: [
      'Shared Villa',
      'Max 3 people',
      '2 twin beds upstairs',
      '1 Pullout sofa downstairs',
      'Communal Pool',
    ],
    image: TwinImage3,
  },
  {
    title: 'Upstairs Queen Bed in a Shared Villa',
    price1: '$1015 (1 person)',
    price2: '$1675 (2 people)',
    listItems: [
      'Private Room in shared villa',
      'Max 2 people',
      '1 queen bed',
      'Communal Pool',
    ],
    image: LumbungImage,
  },
  {
    title: 'Twin Bed Shared room',
    price1: '$1,150 (1 person)',
    price2: '$1,830 (2 people)',
    listItems: ['Shared Room', 'Max 2 people', 'Communal Pool'],
    image: TwinImage3,
  },
  {
    title: 'Private Room with King Bed',
    price1: '$1325 (1 person)',
    price2: '$2030 (2 people)',
    listItems: [
      'Private Room in shared villa',
      'Max 2 people',
      '1 king bed',
      'Communal Pool',
    ],
    image: AkashaImage,
  },
  {
    title: '2 story private villa with queen bed',
    price1: '$1325 (1 person)',
    price2: '$2030 (2 people)',
    listItems: [
      'Private Villa',
      'Max 2 people',
      '1 queen bed',
      'Communal Pool',
    ],
    image: LumbungImage,
  },
  {
    title: 'Private Villa with queen bed and private pool',
    price1: '$1387 (1 person)',
    price2: '$2047 (2 people)',
    listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
    image: JalaImage,
  },
  {
    title: 'Private Villa with king bed and private pool',
    price1: '$1480 (1 person)',
    price2: '$2140 (2 people)',
    listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
    image: SuryaImage,
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
              {/* <span className="font-bold">
                <p>{packageDetail.price1}</p>
                {packageDetail.price2 && <p>{packageDetail.price2}</p>}
              </span> */}
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
