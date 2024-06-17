import Image, { type StaticImageData } from 'next/image';
import YogaShalaImage from '~/../public/hero-images/akasha-pool.webp';

import ScrollOffset from '~/components/ScrollOffset';

const ContentContainer = ({
  heading,
  content,
  buttonText,
  imgSrc,
  imgAlt,
  imgPosition,
}: {
  heading: string;
  content: string;
  buttonText: string;
  imgSrc: StaticImageData;
  imgAlt: string;
  imgPosition: 'left' | 'right';
}) => {
  const contentBox = (
    <div className="w-full sm:max-h-[600px] max-w-[600px] bg-gray flex flex-col  justify-center gap-8  p-8 text-left ">
      <h2 className="">{heading}</h2>
      <p className="w-full h-content leading-relaxed">{content}</p>
      <span className="w-full py-4 ">
        <button
          className="py-3 px-6 border-solid border border-purple  w-auto font-montserrat uppercase text-purple hover:bg-purple hover:text-white"
          type="button"
        >
          {buttonText}
        </button>
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
    <section className="relative flex justify-center flex-wrap p-8 font-baskerville">
      {imgPosition === 'left' ? image : contentBox}
      {imgPosition === 'left' ? contentBox : image}
    </section>
  );
};

export default ContentContainer;
