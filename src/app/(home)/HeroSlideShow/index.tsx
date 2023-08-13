import Image from 'next/image';

import styles from './styles.module.scss';

import AkashaFront from '~/../public/hero-images/akasha-front.webp';
import AkashaPool from '~/../public/hero-images/akasha-pool.webp';
import AkashaKitchen from '~/../public/hero-images/akasha-kitchen.webp';
import AkashaBed from '~/../public/hero-images/akasha-bed.webp';
import AkashaBathroom from '~/../public/hero-images/akasha-bathroom.webp';

import Logo from '~/../public/FullOffWhiteLogo.svg';

import HeroCarousel from './Carousel';

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
];

const renderImages = () => {
  return images.map(({ src, alt }, index) => (
    <Image
      priority={index === 0}
      className={styles.image}
      key={alt}
      src={src}
      alt={alt}
    />
  ));
};

const HeroSlideShow = () => {
  return (
    <section
      id="home"
      className={styles.wrapper}
    >
      <HeroCarousel>{renderImages()}</HeroCarousel>
      <div className={styles.logoContainer}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={Logo}
          alt="Masakali Retreat Logo"
          className={styles.logo}
        />
      </div>
    </section>
  );
};

export default HeroSlideShow;
