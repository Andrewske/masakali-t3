'use client';
import type { ReactElement } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HeroCarousel = ({
  children,
  showArrows = false,
}: {
  children?: ReactElement[];
  showArrows?: boolean;
}) => {
  return (
    children && (
      <Carousel
        className="w-full h-full m-auto [&>div>button]:hover:!bg-purple "
        // autoFocus={true}
        infiniteLoop={true}
        autoPlay={true}
        // renderArrowPrev //https://github.com/leandrowd/react-responsive-carousel
        // renderArrowNext={(onClickHandler, hasNext, label) =>
        //   hasNext && (
        //     <button
        //       type="button"
        //       onClick={onClickHandler}
        //       title={label}
        //       className=" right-0 bg-purple text-white px-4 py-2 rounded-lg z-10"
        //     >
        //       next
        //     </button>
        //   )
        // }
        // dynamicHeight={true}
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
        showArrows={showArrows}
        showIndicators={false}
        interval={10000}
      >
        {children}
      </Carousel>
    )
  );
};

export default HeroCarousel;
