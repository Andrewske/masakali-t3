import Image from 'next/image';

import Logo from '~/../public/FullOffWhiteLogo.svg';

import HeroCarousel from './Carousel';
import {
  akashaFront,
  akashaPool,
  akashaKitchen,
  akashaBed,
  akashaBathroom,
} from '~/lib/images';

const images = [
  {
    src: akashaFront.src,
    alt: akashaFront.alt,
  },
  {
    src: akashaPool.src,
    alt: akashaPool.alt,
  },
  {
    src: akashaKitchen.src,
    alt: akashaKitchen.alt,
  },
  {
    src: akashaBathroom.src,
    alt: akashaBathroom.alt,
  },
  {
    src: akashaBed.src,
    alt: akashaBed.alt,
  },
];

const renderImages = () => {
  return images.map((image, index) => (
    <div
      className="h-[calc(100vh-132px)]"
      key={image.alt}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill={true}
        className="object-cover"
        priority={index === 0}
      />
    </div>
  ));
};
const HeroSlideShow = () => {
  return (
    <section
      id="home"
      className="h-[calc(100vh-132px)] w-full relative flex"
    >
      <HeroCarousel>{renderImages()}</HeroCarousel>

      <div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center">
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Logo}
          alt="Masakali Retreat Logo"
          className="w-[min(600px,80%)] h-full"
        />
      </div>
    </section>
  );
};

export default HeroSlideShow;
