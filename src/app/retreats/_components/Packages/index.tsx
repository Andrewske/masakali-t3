import Image from 'next/image';

// import ExploreVillasButton from '../ExploreVillasButton';

import {
  lumbungRenders,
  suryaFront,
  suryaPool,
  suryaKitchen,
  suryaBed,
  suryaBathroom,
  chandraBathroom,
  chandraBed,
  chandraFront,
  chandraPool,
  chandraHammock,
  chandraKitchen,
  jalaBathroom,
  jalaBed,
  jalaKitchen,
  jalaFront,
  jalaPool,
  lakshmiBedroom1,
  lakshmiBedroom2,
  lakshmiBathroom,
  lakshmiKitchen,
  lakshmiPool,
} from '~/lib/images';
import HeroCarousel from '~/app/(home)/HeroSlideShow/Carousel';
import ContactButton from './ContactButton';

const suryaImages = [
  suryaFront,
  suryaPool,
  suryaKitchen,
  suryaBed,
  suryaBathroom,
];

const chandraImages = [
  chandraFront,
  chandraPool,
  chandraHammock,
  chandraKitchen,
  chandraBathroom,
  chandraBed,
];

const jalaImages = [jalaFront, jalaPool, jalaKitchen, jalaBed, jalaBathroom];

const isvaraImages = [
  lakshmiBedroom1,
  lakshmiPool,
  lakshmiKitchen,
  lakshmiBathroom,
];

const priyaImages = [
  lakshmiBedroom2,
  lakshmiPool,
  lakshmiKitchen,
  lakshmiBathroom,
];

const lumbungImages = [lumbungRenders];

const villas = [
  {
    title: 'Surya',
    details: [
      'Private 1 Bedroom',
      'Max. 3 People',
      'King or Twin Beds',
      'Private Kitchen',
      'Private Infinity Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1550 * 0.85),
        price: 1550,
      },
      {
        title: '2 people',
        discount: Math.round(2368 * 0.85),
        price: 2368,
      },
      {
        title: 'Pullout Sofa',
        discount: Math.round(850 * 0.85),
        price: 850,
      },
    ],
    images: suryaImages,
  },
  {
    title: 'Chandra',
    details: [
      'Max. 2 People',
      'King or Twin Beds',
      'Private Kitchen',
      'Bathtub',
      'Private Infinity Pool',
      'Hammock over the rice fields',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1550 * 0.85),
        price: 1550,
      },
      {
        title: '2 people',
        discount: Math.round(2368 * 0.85),
        price: 2368,
      },
    ],
    images: chandraImages,
  },
  {
    title: 'Jala',
    details: [
      'Private 1 Bedroom',
      'Max. 2 People',
      'Queen Bed',
      'Private Kitchen',
      'Private Infinity Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1425 * 0.85),
        price: 1425,
      },
      {
        title: '2 people',
        discount: Math.round(2245 * 0.85),
        price: 2245,
      },
    ],
    images: jalaImages,
  },
  {
    title: 'Priya',
    details: [
      'Max. 2 People',
      'Shared Room',
      'King or Twin Bed',
      'TV, fridge, and A/C',
      'Bathtub',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1268 * 0.85),
        price: 1268,
      },
      {
        title: '2 people',
        discount: Math.round(2090 * 0.85),
        price: 2090,
      },
    ],
    images: priyaImages,
  },
  {
    title: 'Isvara',
    details: [
      'Max. 2 People',
      'Shared Room',
      'King or Twin Bed',
      'TV, fridge, and A/C',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1205 * 0.85),
        price: 1205,
      },
      {
        title: '2 people',
        discount: Math.round(2028 * 0.85),
        price: 2028,
      },
    ],
    images: isvaraImages,
  },
  {
    title: 'Lumbung',
    details: [
      'Max. 3 People',
      'Shared Villa',
      'King or Twin Bed',
      'Minibar',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person (Upstairs)',
        discount: Math.round(1396 * 0.85),
        price: 1396,
      },
      {
        title: '2 people (Upstairs)',
        discount: Math.round(2219 * 0.85),
        price: 2219,
      },
      {
        title: 'Pullout Sofa (Downstairs)',
        discount: Math.round(850 * 0.85),
        price: 850,
      },
    ],
    images: lumbungImages,
  },
];

// const packageDetails = [
//   {
//     title: 'Pullout sofa',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$850</span> $
//         {Math.round(850 * 0.85)}
//         <span> (per person)</span>
//       </p>
//     ),
//     listItems: ['available in Surya & Lumbung', 'Shared Villa'],
//     image: lakshmiBedroom1.src,
//   },
//   {
//     title: 'Upstairs Queen Bed in a Shared Villa',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1015</span> $
//         {Math.round(1015 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$1675</span> $
//         {Math.round(1675 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: [
//       'Private Room in shared villa',
//       'Max 2 people',
//       '1 queen bed',
//       'Communal Pool',
//     ],
//     image: lumbungRenders.src,
//   },
//   {
//     title: 'Twin Bed Shared room',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1115</span> $
//         {Math.round(1115 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$1830</span> $
//         {Math.round(1830 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: ['Shared Room', 'Max 2 people', 'Communal Pool'],
//     image: lakshmiBedroom1.src,
//   },
//   {
//     title: 'Private Room with King Bed',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1325</span> $
//         {Math.round(1325 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$2030</span> $
//         {Math.round(2030 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: [
//       'Private Room in shared villa',
//       'Max 2 people',
//       '1 king bed',
//       'Communal Pool',
//     ],
//     image: akashaBed.src,
//   },
//   {
//     title: '2 story private villa with queen bed',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1325</span> $
//         {Math.round(1235 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$2030</span> $
//         {Math.round(2030 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: [
//       'Private Villa',
//       'Max 2 people',
//       '1 queen bed',
//       'Communal Pool',
//     ],
//     image: lumbungRenders.src,
//   },
//   {
//     title: 'Private Villa with queen bed and private pool',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1387</span> $
//         {Math.round(1387 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$2047</span> $
//         {Math.round(2047 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
//     image: jalaBed.src,
//   },
//   {
//     title: 'Private Villa with king bed and private pool',
//     price1: (
//       <p>
//         <span className="line-through text-red-500">$1480</span> $
//         {Math.round(1480 * 0.85)}
//         <span> (1 person)</span>
//       </p>
//     ),
//     price2: (
//       <p>
//         <span className="line-through text-red-500">$2014</span> $
//         {Math.round(2014 * 0.85)}
//         <span> (2 people)</span>
//       </p>
//     ),
//     listItems: ['Private Villa', 'Max 2 people', '1 queen bed', 'Private Pool'],
//     image: suryaBed.src,
//   },
// ];

const scrollIntoViewWithOffset = (selector: string, offset: number) => {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }

  const top = element.getBoundingClientRect().top;
  window.scrollTo({
    behavior: 'smooth',
    top: top - document.body.getBoundingClientRect().top - offset,
  });
};

const Packages = () => {
  const handleScroll = () => {
    scrollIntoViewWithOffset('#contact-form', 132);
  };

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
      {/* <ExploreVillasButton /> */}

      {/* <div className="flex flex-wrap w-full justify-evenly">
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
      </div> */}

      {villas.map((villa) => (
        <div
          key={villa.title}
          className="flex flex-wrap w-full justify-center sm:px-8 py-8 font-baskerville"
        >
          <div className="w-[600px] max-h-[600px] relative">
            <HeroCarousel showArrows={true}>
              {villa.images.map((image) => (
                <div
                  key={image.alt}
                  className="max-h-[600px] max-w-[600px] w-full aspect-[1/1] relative"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    key={image.alt}
                    fill={true}
                    className="object-cover h-full"
                  />
                </div>
              ))}
            </HeroCarousel>
          </div>
          <div className="w-full sm:max-h-[600px] max-w-[600px] bg-white flex flex-col gap-8  px-4 py-8 sm:px-8 text-left ">
            <span className="w-full flex flex-col gap-4">
              <h2 className="text-3xl">{villa.title}</h2>
              <span className="flex flex-wrap gap-2 justify-evenly w-full">
                {villa.details.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </span>
            </span>
            <span className="flex-grow flex flex-col justify-evenly">
              <h3>Packages</h3>
              {villa.packages.map((villaPackage) => (
                <ContactButton key={villaPackage.title}>
                  <span
                    key={`${villa.title} ${villaPackage.title}`}
                    className="border-2 border-gray p-4 ml-4 flex justify-between hover:scale-105"
                  >
                    <p>{villaPackage.title}</p>
                    <p>
                      {`$${villaPackage.discount}`}{' '}
                      <span className="line-through text-red-500">{`$${villaPackage.price}`}</span>
                    </p>
                  </span>
                </ContactButton>
              ))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Packages;
