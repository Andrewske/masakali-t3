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
          }`}
          src={src}
          alt={alt}
          width={800}
          height={800}
          onClick={() => setIndexOfExpandedImage(index)}
          placeholder="blur"
        />
      ))}
    </div>
  );
};

export default GridGallery;
