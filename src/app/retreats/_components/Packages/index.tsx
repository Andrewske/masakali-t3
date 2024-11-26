import Image from 'next/image';

// import ExploreVillasButton from '../ExploreVillasButton';

import {
  lumbungRenders,
  tributeSurya1,
  tributeSurya2,
  tributeSurya3,
  tributeSurya4,
  tributeSurya5,
  tributeSurya6,
  tributeSurya7,
  tributeSurya8,
  tributeSurya9,
  tributeSurya10,
  tributeSurya11,
  tributeChandra1,
  tributeChandra2,
  tributeChandra3,
  tributeChandra4,
  tributeChandra5,
  tributeChandra6,
  tributeChandra7,
  tributeChandra8,
  tributeChandra9,
  tributeChandra10,
  tributeChandra11,
  tributeChandra12,
  tributeChandra13,
  tributeJala1,
  tributeJala2,
  tributeJala3,
  tributeJala4,
  tributeJala5,
  tributeJala6,
  tributeJala7,
  tributeJala8,
  tributeJala9,
  tributeJala10,
  tributeCommunalBath,
  tributeCommunalDining,
  tributeCommunalKitchen,
  tributeCommunalLivingRoom2,
  tributeCommunalLivingRoom,
  tributeCommunalPoolDetail,
  tributeCommunalPoolHangout,
  tributeCommunalPool,
  tributeIsvara1,
  tributeIsvara2,
  tributeIsvara3,
  tributeIsvara4,
  tributePriya1,
  tributePriya2,
  tributePriya3,
  tributePriya4,
  tributePriya5,
} from '~/lib/images';
import HeroCarousel from '~/app/(home)/HeroSlideShow/Carousel';
import ContactButton from './ContactButton';

const suryaImages = [
  tributeSurya1,
  tributeSurya2,
  tributeSurya3,
  tributeSurya4,
  tributeSurya5,
  tributeSurya6,
  tributeSurya7,
  tributeSurya8,
  tributeSurya9,
  tributeSurya10,
  tributeSurya11,
];

const chandraImages = [
  tributeChandra1,
  tributeChandra2,
  tributeChandra3,
  tributeChandra4,
  tributeChandra5,
  tributeChandra6,
  tributeChandra7,
  tributeChandra8,
  tributeChandra9,
  tributeChandra10,
  tributeChandra11,
  tributeChandra12,
  tributeChandra13,
];

const jalaImages = [
  tributeJala1,
  tributeJala2,
  tributeJala3,
  tributeJala4,
  tributeJala5,
  tributeJala6,
  tributeJala7,
  tributeJala8,
  tributeJala9,
  tributeJala10,
];

const isvaraImages = [
  tributeIsvara1,
  tributeIsvara2,
  tributeIsvara3,
  tributeIsvara4,
  tributeCommunalBath,
  tributeCommunalDining,
  tributeCommunalKitchen,
  tributeCommunalLivingRoom2,
  tributeCommunalLivingRoom,
  tributeCommunalPoolDetail,
  tributeCommunalPoolHangout,
  tributeCommunalPool,
];

const priyaImages = [
  tributePriya1,
  tributePriya2,
  tributePriya3,
  tributePriya4,
  tributePriya5,
  tributeCommunalBath,
  tributeCommunalDining,
  tributeCommunalKitchen,
  tributeCommunalLivingRoom2,
  tributeCommunalLivingRoom,
  tributeCommunalPoolDetail,
  tributeCommunalPoolHangout,
  tributeCommunalPool,
];

const lumbungImages = [lumbungRenders];

const villas = [
  {
    title: 'Surya',
    details: [
      'Private 1-bedroom villa',
      'Max. 3 people',
      'King bed, pullout sofa',
      'Private Kitchen',
      'Private Infinity Pool',
      'Rice field view',
      'Tropical jungle',
      'Mountain view',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1400),
        price: 1550,
      },
      {
        title: '2 people',
        discount: Math.round(2068),
        price: 2368,
      },
      {
        title: 'Pullout Sofa',
        discount: Math.round(850),
        price: 950,
      },
    ],
    images: suryaImages,
  },
  {
    title: 'Chandra',
    details: [
      'Private 1-bedroom villa',
      'Private Infinity Pool',
      'Private Kitchen',
      'King Bed',
      'Max. 2 people',
      'Rice field view',
      'Tropical jungle',
      'Mountain view',
      'Hammock over the rice fields',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1400),
        price: 1550,
      },
      {
        title: '2 people',
        discount: Math.round(2068),
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
      'Max. 2 people',
      'Private Kitchen',
      'Private Infinity Pool',
      'Rice field view',
      'Tropical jungle',
      'Mountain view',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1270),
        price: 1425,
      },
      {
        title: '2 people',
        discount: Math.round(1935),
        price: 2245,
      },
    ],
    images: jalaImages,
  },
  {
    title: 'Priya',
    details: [
      'Private room',
      'Max. 2 people',
      'Deck/patio',
      'King or Twin configuration',
      'TV, fridge, and A/C',
      'Bathtub',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1120),
        price: 1268,
      },
      {
        title: '2 people',
        discount: Math.round(1794),
        price: 2090,
      },
    ],
    images: priyaImages,
  },
  {
    title: 'Isvara',
    details: [
      'Private room',
      'Max. 2 people',
      'Patio',
      'King or Twin configuration',
      'TV, fridge, and A/C',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person',
        discount: Math.round(1050),
        price: 1205,
      },
      {
        title: '2 people',
        discount: Math.round(1718),
        price: 2028,
      },
    ],
    images: isvaraImages,
  },
  {
    title: 'Lumbung',
    details: [
      'Private 2 story villa',
      'Max. 3 people',
      'Pool view',
      'King or Twin configuration upstairs',
      'Pullout sofa downstairs',
      'Minibar',
      'Communal Pool',
    ],
    packages: [
      {
        title: '1 person (Upstairs)',
        discount: Math.round(1250),
        price: 1396,
      },
      {
        title: '2 people (Upstairs)',
        discount: Math.round(1927),
        price: 2219,
      },
      {
        title: 'Pullout Sofa (Downstairs)',
        discount: Math.round(850),
        price: 950,
      },
    ],
    images: lumbungImages,
  },
];

// const scrollIntoViewWithOffset = (selector: string, offset: number) => {
//   const element = document.querySelector<HTMLElement>(selector);
//   if (!element) {
//     throw new Error(`Element with selector "${selector}" not found`);
//   }

//   const top = element.getBoundingClientRect().top;
//   window.scrollTo({
//     behavior: 'smooth',
//     top: top - document.body.getBoundingClientRect().top - offset,
//   });
// };

const Packages = () => {
  // const handleScroll = () => {
  //   scrollIntoViewWithOffset('#contact-form', 132);
  // };

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
                      className="border-2  border-gray p-2 ml-4 flex justify-between hover:scale-105"
                    >
                      <p>{villaPackage.title}</p>
                      <p>
                        <span className="text-red-500">{`$${villaPackage.discount}`}</span>{' '}
                        <span className="line-through">{`$${villaPackage.price}`}</span>
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
