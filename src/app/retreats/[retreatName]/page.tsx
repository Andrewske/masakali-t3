import Image from 'next/image';

import Packages from '../_components/Packages';
import { format } from 'date-fns';
import ContentContainer from '~/components/ContentContainer';

import MainImage from '~/../public/yoga/yoga-shala-landscape-2.jpg';
import MeditationDroneImage from '~/../public/yoga/Meditation-drone1.jpg';
import YogaRetreat4 from '~/../public/yoga/yoga-retreat-4.jpg';
import RetreatActivity from '~/../public/yoga/retreat_activity_1.jpeg';
import YogaRetreat5 from '~/../public/yoga/yoga-retreat-5.jpg';

const retreatDetails = {
  name: 'Tribute Yoga Retreat',
  startDate: '2025-04-06',
  endDate: '2025-04-11',
  whyChose:
    'Experience a transformative journey at Masakali Retreat with our six-day, five-night yoga retreat, set against the breathtaking backdrop of Balinese mountains, lush forests, and serene rice fields. Practice yoga, connect with nature, and find inner peace as you absorb the tranquility of one of the most spectacular places in the world',
  details: `At the Tribute Yoga Retreat from April 6-11, you’ll immerse yourself in a harmonious blend of yoga, adventure, and cultural experiences. Each day begins with invigorating yoga sessions and a healthy breakfast, setting the tone for the day. You will explore the vibrant town of Ubud, visit the Yoga Barn, and embark on nature excursions to the Tepalang Rice Fields and Sebatu Waterfalls. The retreat includes spiritual experiences such as a traditional Malukat ceremony and a heart-opening cacao ceremony. You’ll also have the opportunity to participate in an ecstatic dance session, trek to Mount Batur for a stunning sunrise, and visit the Pyramids of Chi for meditation and sound healing. Enjoy relaxing spa services, including acupuncture & massages,, and savor delicious meals, with a special welcome dinner and closing dinner to bookend your transformative journey. Additional highlights include the Campuhan Ridge walk and a trip to Ubud’s renowned attractions. Join us for a retreat that nurtures your body, mind, and spirit in the serene beauty of Bali.`,
  included: (
    <div>
      <span>
        <p>6 days, 5 nights of yoga</p>
        <p>Accommodation</p>
        <p>Morning breakfast</p>
        <p>Opening & Closing Dinner</p>
        <p>Activities Program (Tours + Healing)</p>
      </span>
      <br />
      <span>
        <p className="font-bold">Extras Include:</p>
        <p>Airport transfer</p>
        <p>Full butler service</p>
        <p>Additional Spa treatments</p>
      </span>
    </div>
  ),
  expect: `Immerse yourself in a transformative yoga-centered retreat designed to nurture your body, mind, and spirit. Through daily yoga sessions, you’ll work through stress, anxiety, and fear, finding a path to a calmer and more peaceful life. Gain deeper self-awareness and begin to shift old patterns and conditioning that may be affecting your relationships and overall well-being. Experience a profound connection to your body, supported by a healthy, organic diet. Engage in various activities, including spiritual ceremonies, nature excursions, and wellness treatments, all aimed at enhancing your inner peace and emotional healing. Our retreat offers a supportive and guided environment, helping you achieve the personal growth and transformation you desire, leading to a deeper connection with yourself and what truly matters to you.`,
  whoIsItFor: `We welcome Tribute Yoga members to join us on this transformative journey. Whether you are a complete beginner or an experienced yogi, this retreat is for anyone who deeply desires to cultivate a profound relationship with themselves and lead a passionate, purposeful life. Open to both singles and couples, men and women, this retreat invites those with an authentic yearning to embrace new possibilities, take self-responsibility, and choose love over fear. Join us for an extraordinary experience that fosters personal growth, inner peace, and a deeper connection to your true self.`,
};

const parseDates = (startDate: string, endDate: string) => {
  const [startYear, startMonth, startDay] = startDate.split('-');
  const endDay = endDate.slice(-2);

  const dates = `${startDay ?? ''}-${endDay ?? ''}`;
  const month = `${format(new Date(0, parseInt(startMonth ?? ''), 0), 'MMMM')}`;
  const year = `${startYear ?? ''}`;

  return { dates, month, year };
};

export default function Page() {
  const { dates, month, year } = parseDates(
    retreatDetails.startDate,
    retreatDetails.endDate
  );

  return (
    <section className="h-full w-full">
      <div
        id="main-image"
        className="h-screen flex justify-center items-center relative overflow-hidden"
      >
        <Image
          src={MainImage}
          alt="Akasha Pool"
          fill={true}
          className="object-cover object-bottom"
        />
        <div className="relative bg-purple z-10 px-8 py-16 text-white grid place-items-center gap-8">
          <h2>Masakali Presents</h2>
          <h1>{retreatDetails.name}</h1>
        </div>
      </div>
      <div
        id="details"
        className="flex flex-wrap justify-center"
      >
        <div
          id="when"
          className="flex flex-col gap-4 sm:items-end w-[50%] min-w-[312px]    px-8 py-16 bg-gray-100 text-gray-800"
        >
          <h2 className="">When</h2>
          <span className="flex gap-2">
            <p className="text-5xl whitespace-nowrap font-montserrat">
              {dates}
            </p>
            <span className="font-montserrat">
              <p>{month}</p>
              <p>{year}</p>
            </span>
          </span>
        </div>
        <div
          id="where"
          className="flex flex-col gap-4  items-start w-[50%] min-w-[312px] px-8 py-16 bg-gray-100 text-gray-800"
        >
          <h2>Where</h2>
          <span className="flex flex-col gap-2 max-w-[600px]">
            <h3 className="">Resort address</h3>
            <span className="text-sm">
              <p>Masakali Retreat</p>
              <p>Br. Ayah Kelusa Payangan</p>
              <p>Gianyar Bali 80572</p>
            </span>
            <h3>Description</h3>
            <p className="text-sm">
              Masakali Retreat is located about 8 kilometers outside of Ubud,
              offering a serene escape that remains conveniently close to the
              city’s attractions. The land was meticulously chosen for its
              natural beauty, harmony with nature, and peaceful ambiance.
              Overlooking lush Balinese rice fields and framed by the majestic
              backdrop of volcanic mountains, our retreat provides a stunning
              and tranquil setting for your journey of spiritual awakening and
              rejuvenation.
            </p>
          </span>
        </div>
      </div>
      <div
        id="why-choose"
        className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
      >
        <h2>WHY CHOOSE {retreatDetails.name.toUpperCase()}</h2>
        <p className="max-w-[600px]">
          Breathe, connect, move, and meditate overlooking a spectacular view of
          Balinese mountains, lush tropical forests, and traditional Balinese
          rice fields with this transformational five-day breathwork retreat.
          Absorb the nature around you while finding balance and inner peace in
          one of the most spectacular places in the world.
        </p>
      </div>
      {/* <About /> */}
      <ContentContainer
        heading="The Details"
        content={retreatDetails.details}
        // buttonText="See our yoga class schedule"
        imgSrc={MeditationDroneImage}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`${retreatDetails.name} Includes`}
        content={retreatDetails.included}
        // buttonText="See our yoga class schedule"
        imgSrc={YogaRetreat4}
        imgPosition="right"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`WHAT CAN YOU EXPECT DURING YOUR STAY`}
        content={retreatDetails.expect}
        // buttonText="See our yoga class schedule"
        imgSrc={RetreatActivity}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`Who is this retreat for?`}
        content={retreatDetails.whoIsItFor}
        // buttonText="See our yoga class schedule"
        imgSrc={YogaRetreat5}
        imgPosition="right"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <div
        id="the-space"
        className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
      >
        <h2>THE SPACE</h2>
        <p className="max-w-[600px]">
          Located near Ubud, Masakali Retreat offers the perfect blend of
          tranquility and accessibility. Far enough from the bustling city to
          provide peace and serenity, yet close enough to enjoy local
          attractions and exquisite cuisine, our retreat is designed to help you
          connect deeply with yourself. The space is purposefully built to
          support the practice of yoga, focusing on spiritual awakening and
          rejuvenation. Every element of Masakali Retreat embodies the idea of
          balance, creating an environment that nurtures personal growth and
          inner harmony. Surrounded by the natural beauty of Bali, our retreat
          provides a sanctuary where you can immerse yourself in the
          transformative power of yoga and rediscover a balanced, mindful way of
          living.
        </p>
      </div>

      <Packages />
    </section>
  );
}
