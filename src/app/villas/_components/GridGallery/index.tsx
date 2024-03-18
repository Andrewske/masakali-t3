'use client';
import { useState } from 'react';
import Image from 'next/image';
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
  {
    src: AkashaBed,
    alt: 'Akasha at Masakali view of the bathroom 2',
  },
];

const GridGallery = () => {
  const [indexOfExpandedImage, setIndexOfExpandedImage] = useState(0);

  return (
    <div className={styles.grid}>
      {images?.map(({ src, alt }, index) => (
        <Image
          key={`villa_image_${index}`}
          id={`grid-image-${index}`}
          priority={index === 0}
          className={`${styles.image ?? ''} ${
            index === indexOfExpandedImage ? styles.expanded ?? '' : ''
          }`}
          src={src}
          alt={alt}
          onClick={() => setIndexOfExpandedImage(index)}
        />
      ))}
    </div>
  );
};

export default GridGallery;
