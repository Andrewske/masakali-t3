'use client';
import type { ReactElement } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './styles.module.scss';

const HeroCarousel = ({ children }: { children?: ReactElement[] }) => {
  return (
    children && (
      <Carousel
        className={styles.container}
        autoFocus={true}
        infiniteLoop={true}
        autoPlay={true}
        // renderArrowPrev https://github.com/leandrowd/react-responsive-carousel
        // renderArrowNext
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
      >
        {children}
      </Carousel>
    )
  );
};

export default HeroCarousel;
