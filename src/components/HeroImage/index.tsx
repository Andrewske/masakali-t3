import Image from 'next/image';

const HeroImage = ({
  imgSrc,
  imgAlt,
  topText,
  bottomText,
}: {
  imgSrc: string;
  imgAlt: string;
  topText: string;
  bottomText: string;
}) => {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src={imgSrc}
        alt={imgAlt}
        className="object-cover md:object-cover w-full h-full z-0"
        fill={true}
      />
      <span className="absolute left-0 right-0 bottom-32 w-full flex justify-center">
        <span className="text-white bg-black bg-opacity-65 py-8 px-32 z-10 w-auto flex flex-col gap-8">
          <h2 className="uppercase text-lg font-montserrat text-center">
            {topText}
          </h2>
          <h3 className="uppercase text-3xl font-montserrat text-center">
            {bottomText}
          </h3>
        </span>
      </span>
    </div>
  );
};

export default HeroImage;
