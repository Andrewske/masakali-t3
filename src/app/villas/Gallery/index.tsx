'use client';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './styles.module.scss';

import AkashaFront from '~/../public/hero-images/akasha-front.webp';
import AkashaPool from '~/../public/hero-images/akasha-pool.webp';
import AkashaKitchen from '~/../public/hero-images/akasha-kitchen.webp';
import AkashaBed from '~/../public/hero-images/akasha-bed.webp';
import AkashaBathroom from '~/../public/hero-images/akasha-bathroom.webp';

const images = [
  {
    src: AkashaFront,
    alt: 'Akasha at Masakali view from the front',
  },
  {
    src: AkashaPool,
    alt: 'Akasha at Masakali view of the pool',
  },
  {
    src: AkashaKitchen,
    alt: 'Akasha at Masakali view of the kitchen',
  },
  {
    src: AkashaBed,
    alt: 'Akasha at Masakali view of the bed',
  },
  {
    src: AkashaBathroom,
    alt: 'Akasha at Masakali view of the bathroom',
  },
];

const VillasGallery = ({ villaName }: { villaName: string }) => {
  return (
    <Carousel
      className={`${styles['presentation-mode'] ?? ''} ${
        styles.carousel ?? ''
      }`}
      autoFocus={true}
      infiniteLoop={true}
      // renderArrowPrev https://github.com/leandrowd/react-responsive-carousel
      // renderArrowNext
      showStatus={false}
      showThumbs={false}
      useKeyboardArrows={true}
    >
      {images?.map(({ src, alt }, index) => (
        <Image
          priority={index === 0}
          className={styles.image}
          key={alt}
          src={src}
          alt={alt}
        />
      ))}
    </Carousel>
  );
};

export default VillasGallery;
