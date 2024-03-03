import Image from 'next/image';
// TODO - Formatting and icons

type FeatureProps = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
};

const Feature = ({ iconSrc, iconAlt, title, description }: FeatureProps) => (
  <div className="grid grid-col-1 place-items-center max-w-[350px]">
    <span className="flex items-center gap-4">
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={25}
        height={25}
      />
      <h4>{title}</h4>
    </span>
    <p>{description}</p>
  </div>
);

const features = [
  {
    iconSrc: 'icons/material-pool.svg',
    iconAlt: 'pool-icon',
    title: 'private infinity pools',
    description:
      'Each villa has its own private infinity pool overlooking the rice fields. The luxurious pools are surrounded by beautiful gardens to ensure your privacy while enjoying a relaxing dip where you can also enjoy an amazing floating breakfast.',
  },
  {
    iconSrc: 'icons/awesome-binoculars.svg',
    iconAlt: 'view-icon',
    title: 'beautiful views',
    description:
      'Cascading Balinese rice fields, majestic mountains, and a spectacular view of the dense and wild jungle. If you’re lucky, you may even see monkeys swinging in the trees! Make sure you experience the magic of Masakali at sunset and then the fire flies that light up the rice terraces at night.',
  },
  {
    iconSrc: 'icons/awesome-spa.svg',
    iconAlt: 'spa-icon',
    title: 'spa services',
    description:
      'Each villa has its own private infinity pool overlooking the rice fields. The luxurious pools are surrounded by beautiful gardens to ensure your privacy while enjoying a relaxing dip where you can also enjoy an amazing floating breakfast.',
  },
];

const WhyChoose = () => {
  return (
    <div className="bg-purple text-white grid grid-col-1 place-items-center w-full p-8">
      <div className="">
        <h2 className="p-4  ">Why choose masakali retreat</h2>
      </div>
      <div className="flex flex-wrap justify-evenly w-full p-4">
        {features.map((feature, index) => (
          <Feature
            key={index}
            {...feature}
          />
        ))}
      </div>
    </div>
  );
};
export default WhyChoose;
