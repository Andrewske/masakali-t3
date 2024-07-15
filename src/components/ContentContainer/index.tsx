'use client';
import Image, { type StaticImageData } from 'next/image';

const ContentContainer = ({
  heading,
  content,
  buttonText,
  buttonLink,
  imgSrc,
  imgAlt,
  imgPosition,
}: {
  heading: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  imgPosition: 'left' | 'right';
}) => {
  const contentBox = (
    <div className="w-full sm:max-h-[600px] max-w-[600px] bg-gray flex flex-col  justify-center gap-8  p-8 text-left ">
      <h2 className="">{heading}</h2>
      <p className="w-full h-content leading-relaxed">{content}</p>
      <span className="w-full py-4 ">
        {buttonText && (
          <button
            className="py-3 px-6 border-solid border border-purple  w-auto font-montserrat uppercase text-purple hover:bg-purple hover:text-white"
            type="button"
            onClick={() => window.open(buttonLink, '_blank')}
          >
            {buttonText}
          </button>
        )}
      </span>
    </div>
  );

  const image = (
    <div className="max-h-[600px] max-w-[600px] w-full aspect-[1/1] bg-gray flex  flex-wrap items-center">
      <Image
        className="object-cover w-full h-full"
        src={imgSrc}
        alt={imgAlt}
      />
    </div>
  );
  return (
    <section
      className={`relative flex justify-center ${
        imgPosition === 'left' ? 'flex-wrap' : 'flex-wrap-reverse '
      } p-8 font-baskerville`}
    >
      {imgPosition === 'left' ? image : contentBox}
      {imgPosition === 'left' ? contentBox : image}
    </section>
  );
};

export default ContentContainer;
