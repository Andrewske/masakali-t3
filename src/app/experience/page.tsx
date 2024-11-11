import ContentContainer from '~/components/ContentContainer';

import HeroImage from '~/components/HeroImage';

import Availability from '../(home)/Availability';

import { getAllBlockedDates } from '~/actions/reservations';

import {
  akashaFront,
  masakaliSpaImage,
  masakaliExperienceImage,
  masakaliYogaShala,
  masakaliDining,
  masakaliFlowerPool,
} from '~/lib/images';

export default async function Page() {
  const disabledDates = await getAllBlockedDates();

  return (
    <section className=" w-full grid place-items-center">
      <HeroImage
        imgSrc={akashaFront.src}
        imgAlt={akashaFront.alt}
        topText="Experience"
        bottomText="Our resort"
      />
      <Availability disabledDates={disabledDates} />

      <div className="flex flex-col gap-8 w-full p-16">
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          Perched in Kelusa Village with breathtaking panoramic views of the
          rice fields, mountains and tropical jungle, you&apos;ll feel instantly
          relaxed the moment you enter Masakali Retreat. Just a mere 12.5km
          north of the hustle and bustle of Ubud, Masakali Retreat offers a very
          secluded and peaceful atmosphere; however, it’s still just a short
          drive away from the vibrant Ubud city center which is filled with
          diverse activities, cultural attractions and culinary works of art.
          And closer still, to the east, west and north of us, are remarkable
          waterfalls, ATV rides, white water rafting, the elephant park, the
          famous Tegallalang rice terraces, zip lining, shopping, Mount Batur
          and other family-friendly activities. This area has something for
          everyone.
        </p>
        <p className="w-full max-w-[885px] text-center font-baskerville m-auto">
          Masakali Retreat offers more than just luxury accommodations. Enjoy
          our daily yoga classes and retreats, dine in with room service
          featuring local ingredients, or indulge in spa services or our romance
          packages designed to create unforgettable memories.
        </p>
      </div>
      <ContentContainer
        heading="Yoga"
        content="We invite you to embrace tranquility and balance through yoga and breathwork sessions at Masakali’s very own yoga shala. Immerse yourself in the spiritual essence of Bali with our Morning Flow class at 8:15 am, a perfect way to awaken and energize your body and spirit with the first light of day. As dusk settles, join us for our Evening Flow class at 6:00 pm, designed to help you unwind and reflect, promoting a sense of peace as the day draws to a close. Both classes are led by experienced instructors who integrate the beauty of Balinese nature and philosophy into their teaching, offering a harmonious blend of local tradition and yoga practice. These sessions allow you to enhance your health and wellness in the privacy and comfort of our yoga shala, set against the backdrop of Bali's breathtaking landscapes. Additionally, we are and will be scheduling various yoga retreats and workshops for guests to attend."
        imgSrc={masakaliYogaShala.src}
        imgPosition="left"
        imgAlt={masakaliYogaShala.alt}
      />
      <ContentContainer
        heading="Tour Packages"
        content="At Masakali Retreat, we offer a range of curated tour packages that showcase the best of Bali's natural beauty and cultural heritage. Each tour package is designed to provide a unique and immersive experience, perfect for adventurers and culture enthusiasts alike."
        imgSrc={masakaliExperienceImage.src}
        imgPosition="right"
        imgAlt={masakaliExperienceImage.alt}
        buttonText="Explore our tour packages"
        buttonLink={'/pdf/tour_packages.pdf'}
      />
      <ContentContainer
        heading="Romance Packages"
        content="At Masakali Retreat, we specialize in creating unforgettable romantic experiences for couples. Our exclusive romance packages are designed to offer the perfect blend of luxury and, intimacy, ensuring that your stay is truly special. Enjoy a private candlelight dinner under the stars, relax and rejuvenate with our signature spa treatments designed for couples, delight in a unique and enchanting experience with our flower-filled pool or bath service or floating breakfast .Let us take care of all the details while you focus on enjoying quality time together. Our romance packages are designed to cater to your every need, creating an idyllic setting for love and connection."
        imgSrc={masakaliFlowerPool.src}
        imgPosition="left"
        imgAlt={masakaliFlowerPool.alt}
        buttonText="Explore our romance packages"
        buttonLink={'/pdf/romance_packages.pdf'}
      />
      <ContentContainer
        heading="Spa Services"
        content="Let our accomplished therapists work their magic and pamper you from head to toe with the vast variety of spa treatments we have on offer. From luxury manicures and pedicures to full body therapeutic massages, no matter what indulgent experience you’re chasing, we can help provide it. Our spa services are set up in the privacy of your own villa - where we can set up treatment beds in your room or private deck overlooking the Balinese rice fields. We strive to deliver divine experiences in stunning surroundings, making for a sublime place to relax, heal and nurture."
        buttonText="Browse spa services menu"
        imgSrc={masakaliSpaImage.src}
        imgPosition="right"
        imgAlt={masakaliSpaImage.alt}
        buttonLink={'/pdf/spa_services.pdf'}
      />
      <ContentContainer
        heading="Dining"
        content="Masakali offers a full range of options for dining, all with the taste and charm of fresh Balinese ingredients. Our curated selection of savory cuisine includes many local Balinese dishes as well as international dishes. Our staff will prepare you breakfast which is included in the price of your villa from select items on the menu as well as offer beverages, lunch and dinner so you can enjoy your meal in the privacy of your own villa."
        // buttonText="Browse food and cocktail menu"
        imgSrc={masakaliDining.src}
        imgPosition="left"
        imgAlt={masakaliDining.alt}
      />
    </section>
  );
}
