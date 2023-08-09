'use client';
import { useState, useEffect, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import styles from './styles.module.scss';

import AkashaFront from '~/../public/hero-images/akasha-front.webp';
import AkashaPool from '~/../public/hero-images/akasha-pool.webp';
import AkashaKitchen from '~/../public/hero-images/akasha-kitchen.webp';
import AkashaBed from '~/../public/hero-images/akasha-bed.webp';
import AkashaBathroom from '~/../public/hero-images/akasha-bathroom.webp';

import { wrapGrid } from 'animate-css-grid';

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

type ImageType = {
  src: StaticImageData;
  alt: string;
  index: number;
};

const GridGallery = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [indexOfExpandedImage, setIndexOfExpandedImage] = useState(0);

  // useEffect(() => {
  //   const grid = gridRef.current;
  //   if (grid) {
  //     console.log('grid');
  //     wrapGrid(grid, { easing: 'backOut', stagger: 10, duration: 400 });
  //   }
  // }, []);

  return (
    <div
      ref={gridRef}
      className={styles.grid}
    >
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
