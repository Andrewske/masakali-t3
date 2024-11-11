'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

import { villaDetails, type VillaNamesType } from '~/lib/villas';

const GridGallery = ({ villaName }: { villaName: VillaNamesType }) => {
  const [indexOfExpandedImage, setIndexOfExpandedImage] = useState(0);

  const images = villaDetails[villaName].images;

  return (
    // Don't change to tailwind
    <div className={styles.grid}>
      {images?.map(({ src, alt }, index) => (
        <Image
          key={`villa_image_${index}`}
          id={`grid-image-${index}`}
          priority={index === 0}
          className={`${styles.image ?? ''} ${
            index === indexOfExpandedImage ? styles.expanded ?? '' : ''
          } object-cover object-center`}
          src={src}
          alt={alt}
          width={1600}
          height={1600}
          onClick={() => setIndexOfExpandedImage(index)}
        />
      ))}
    </div>
  );
};

export default GridGallery;
