import HeroCarousel from '../HeroSlideShow/Carousel';

import { villaDetails } from '~/lib/villas';

const renderImages = () => {
  const reviews = Object.values(villaDetails)
    .map((villa) => villa.reviews)
    .flat();

  return reviews.map((review) => (
    <div
      key={review.name}
      className="w-full m-auto flex flex-col gap-4"
    >
      <p className="max-w-[800px] m-auto px-8">{review.reviewText}</p>
      <p className=" font-bold font-montserrat uppercase">{review.name}</p>
    </div>
  ));
};

const Reviews = () => {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center w-full h-auto py-16 md:px-16 gap-16"
    >
      <h2 className="uppercase font-montserrat text-3xl text-center">
        What our guest have to say
      </h2>
      <span className="w-full m-auto">
        <HeroCarousel showArrows={true}>{renderImages()}</HeroCarousel>
      </span>
    </section>
  );
};

export default Reviews;
