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
      'Private 1-bedroom villa',
      'Sleeps 3',
      'King bed, pullout sofa',
      // 'Private Kitchen',
      // 'Private Infinity Pool',
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
      'Private 1-bedroom villa',
      'King Bed',
      'Sleeps 2',
      'Rice field view',
      'Tropical jungle',
      'Mountain view',
      // 'Hammock over the rice fields',
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
      'Private 1-bedroom villa',
      'Queen Bed',
      'Sleeps 2',
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
      'Private room',
      'Deck/patio',
      'King or Twin configuration',
      // 'TV, fridge, and A/C',
      // 'Bathtub',
      // 'Communal Pool',
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
      'Private room',
      'Patio',
      'King or Twin configuration',
      // 'TV, fridge, and A/C',
      // 'Communal Pool',
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
      'Private 2 story villa',
      'Pool view',
      'King or Twin configuration upstairs',
      'Pullout sofa downstairs',
      // 'Minibar',
      // 'Communal Pool',
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
          We know that everyone is different. So are all of our villas/rooms -
          designed to meet your particular preferences and allow you to tap into
          full relaxation during your retreat.
        </p>
        <p>
          We recommend booking a private villa (Surya, Chandra or Jala) if you
          are traveling with a partner or a friend whom you do not mind sharing
          a room or bed with (Surya and Chandra have King beds and Jala has a
          Queen bed).
        </p>
        <p>
          These three villas are also great for singles who prefer privacy and
          extra luxuries during their stay.
        </p>
        <p>
          All three villas have their own private infinity pool with a view of
          lush rice fields, the tropical jungle and the mountains and
          kitchenettes in addition to the shared spaces you may use to mingle
          with other retreat guests.
        </p>
        <p>
          If you are traveling solo and would like to share a room, we recommend
          choosing our rooms (Priya or Isvara) which can either be a King or
          Twin configuration or one of our Lumbungs (Vayu, Pritvi or Tara) which
          are currently being constructed. Isvara and Priya have their own
          patios/gardens and easy access to the communal space which includes a
          spacious kitchen, bar, living room, dining room, entertainment room
          and a luxury communal pool with waterfalls and sunbeds overlooking the
          rice fields, jungle and mountains. Vayu, Pritvi and Tara also have a
          separate communal pool directly in front of these lumbung two story
          villas.
        </p>
        <p>
          Of course, all rooms have access to the communal areas and the yoga
          shala to relax and commune with your fellow yogis.
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
      <div className="flex flex-wrap w-full justify-evenly">
        {villas.map((villa) => (
          <div
            key={villa.title}
            className="flex flex-col justify-center sm:px-8 py-8 font-baskerville"
          >
            <div className="w-[400px] h-[400px] relative">
              <HeroCarousel showArrows={true}>
                {villa.images.map((image) => (
                  <div
                    key={image.alt}
                    className="max-h-[400px] max-w-[400px] w-full aspect-[1/1] relative"
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
            <div className="w-[400px] h-full bg-white flex flex-col gap-8  px-4 py-8 sm:px-8 text-left ">
              <span className="w-full flex flex-col gap-4">
                <h2 className="text-xl">{villa.title}</h2>
                <span className="flex flex-wrap gap-2 justify-stretch  w-full">
                  {villa.details.map((item, index) => (
                    <p
                      className="text-xs bg-gray border border-light-purple-700 p-2 grow text-center uppercase"
                      key={index}
                    >
                      {item}
                    </p>
                  ))}
                </span>
              </span>
              <span className="flex-grow flex flex-col justify-evenly gap-1">
                <h3>Packages</h3>
                {villa.packages.map((villaPackage) => (
                  <ContactButton key={villaPackage.title}>
                    <span
                      key={`${villa.title} ${villaPackage.title}`}
                      className="border-2 border-gray p-2 ml-4 flex justify-between hover:scale-105"
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
    </div>
  );
};

export default Packages;
