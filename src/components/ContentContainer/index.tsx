'use client';
import Image from 'next/image';
import type { ReactNode } from 'react';
import HeroCarousel from '~/app/(main)/(home)/HeroSlideShow/Carousel';

const ContentContainer = ({
  id,
  heading,
  content,
  buttonText,
  buttonLink,
  imgSrc,
  imgAlt,
  images,
  imgPosition,
  newTab = true,
}: {
  id?: string;
  heading: string;
  content: string | ReactNode;
  buttonText?: string;
  buttonLink?: string;
  imgSrc?: string;
  imgAlt?: string;
  images?: { src: string; alt: string }[];
  imgPosition: 'left' | 'right';
  newTab?: boolean;
}) => {
  const contentBox = (
    <div className="w-full sm:max-h-[600px] max-w-[600px] bg-gray flex flex-col  justify-center gap-8  px-4 py-8 sm:px-8 text-left ">
      <h2 className="">{heading}</h2>
      <div className="w-full h-content leading-relaxed">{content}</div>
      {buttonText && (
        <span className="w-full py-4 ">
          <button
            className="py-3 px-6 border-solid border border-purple  w-auto font-montserrat uppercase text-purple hover:bg-purple hover:text-white"
            type="button"
            onClick={() => window.open(buttonLink, newTab ? '_blank' : '_self')}
          >
            {buttonText}
          </button>
        </span>
      )}
    </div>
  );

  const image = (
    <div className="max-h-[600px] max-w-[600px] w-full aspect-[1/1] bg-gray flex  flex-wrap items-center">
      {images ? (
        <HeroCarousel showArrows={true}>
          {images.map((image) => (
            <div
              key={image.alt}
              className="max-h-[600px] max-w-[600px] w-full aspect-[1/1] relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill={true}
                className="object-cover h-full"
              />
            </div>
          ))}
        </HeroCarousel>
      ) : (
        <Image
          className="object-cover h-full"
          src={imgSrc ?? ''}
          alt={imgAlt ?? ''}
          width={600}
          height={600}
        />
      )}
    </div>
  );

  return (
    <section
      className={`relative flex justify-center ${
        imgPosition === 'left' ? 'flex-wrap' : 'flex-wrap-reverse '
      } sm:px-8 sm:py-8 font-baskerville`}
      id={id}
    >
      {imgPosition === 'left' ? image : contentBox}
      {imgPosition === 'left' ? contentBox : image}
    </section>
  );
};

export default ContentContainer;
