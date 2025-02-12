'use client';
import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

import { villaDetails, type VillaNamesType } from '~/lib/villas';

const GridGallery = ({ villaName }: { villaName: VillaNamesType }) => {
  const [indexOfExpandedImage, setIndexOfExpandedImage] = useState(0);

  const images = useMemo(() => villaDetails[villaName].images, [villaName]);

  const handleImageClick = useCallback((index: number) => {
    setIndexOfExpandedImage(index);
  }, []);

  const getClassName = useCallback(
    (index: number) => {
      if (index === indexOfExpandedImage) {
        if (index < 5) {
          return 'relative min-h-[350px] xl:col-span-2 xl:row-span-2';
        }
        return 'relative min-h-[350px] row-start-2 col-start-2 row-end-4 col-end-4';
      }
      return 'relative min-h-[350px]';
    },
    [indexOfExpandedImage]
  );

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-0 p-0 h-full w-full grid-flow-dense ">
      {images?.map(({ src, alt }, index) => (
        <span
          key={`villa_image_${index}`}
          className={getClassName(index)}
        >
          <Image
            id={`grid-image-${index}`}
            priority={index === 0}
            className="object-cover"
            src={src}
            alt={alt}
            fill={true}
            sizes="(max-width: 1600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onClick={handleImageClick.bind(null, index)}
          />
        </span>
      ))}
    </div>
  );
};

export default GridGallery;
