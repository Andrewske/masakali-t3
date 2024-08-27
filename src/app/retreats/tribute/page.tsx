import Image from 'next/image';

import Packages from '../_components/Packages';
import { format } from 'date-fns';
import ContentContainer from '~/components/ContentContainer';
import MainImage from '~/../public/retreats/tribute/main_image.jpg';
import MeditationDroneImage from '~/../public/yoga/Meditation-drone1.jpg';
import YogaRetreat4 from '~/../public/yoga/yoga-retreat-4.jpg';
import ExpectImage from '~/../public/retreats/tribute/expect.jpeg';
import ActivitiesImage from '~/../public/retreats/tribute/activities.jpg';
import YogaRetreat5 from '~/../public/yoga/yoga-retreat-5.jpg';
import ContactFormImage from '~/../public/retreats/tribute/contact_form.jpg';
import ContactForm from '../_components/ContactForm';

const retreatDetails = {
  name: 'Tribute Yoga Retreat',
  startDate: '2025-04-06',
  endDate: '2025-04-11',
  whyChose:
    'Experience a transformative journey at Masakali Retreat with our six-day, five-night yoga retreat, set against the breathtaking backdrop of Balinese mountains, lush forests, and serene rice fields. Practice yoga, connect with nature, and find inner peace as you absorb the tranquility of one of the most spectacular places in the world',
  details: `At the Tribute Yoga Retreat from April 6-11, you’ll immerse yourself in a harmonious blend of yoga, adventure, and cultural experiences. Each day begins with invigorating yoga sessions and a healthy breakfast, setting the tone for the day. You will explore the vibrant town of Ubud, visit the Yoga Barn, and embark on nature excursions to the Tepalang Rice Fields and Sebatu Waterfalls. The retreat includes spiritual experiences such as a traditional Malukat ceremony and a heart-opening cacao ceremony. You’ll also have the opportunity to participate in an ecstatic dance session, trek to Mount Batur for a stunning sunrise, and visit the Pyramids of Chi for meditation and sound healing. Enjoy relaxing spa services, including acupuncture & massages, and savor delicious meals, with a special welcome dinner and closing dinner to bookend your transformative journey. Additional highlights include the Campuhan Ridge walk and a trip to Ubud’s renowned attractions. Join us for a retreat that nurtures your body, mind, and spirit in the serene beauty of Bali.`,
  included: (
    <div>
      <ul>
        <li>6 days, 5 nights accommodation</li>
        <li>Morning & Evening Flow</li>
        <li>Morning breakfast</li>
        <li>Opening & Closing Dinner</li>
        <li>Activities Program (Tours + Healing)</li>
      </ul>
      <br />
      <ul>
        <li className="font-bold">Extras Include:</li>
        <li>Airport transfer</li>
        <li>Full butler service</li>
        <li>Additional Spa treatments</li>
      </ul>
    </div>
  ),
  activities: (
    <div>
      <ul className="list-disc px-4 text-left ">
        <li>Ubud Trip</li>
        <li>Pyramids of Chi</li>
        <li>Mount Batur Sunrise Trek/ Volcano View Breakfast</li>
        <li>Sebatu Waterfalls</li>
        <li>Campuhan Ridgewalk </li>
        <li>Yoga Barn Ubud Trip</li>
        <li>Melukat Ceremony</li>
        <li>Cacao Ceremony</li>
        <li>Acupuncture</li>
        <li>Ecstatic Dance</li>
      </ul>
    </div>
  ),
  expect: `Immerse yourself in a transformative yoga-centered retreat designed to nurture your body, mind, and spirit. Through daily yoga sessions, you’ll work through stress, anxiety, and fear, finding a path to a calmer and more peaceful life. Gain deeper self-awareness and begin to shift old patterns and conditioning that may be affecting your relationships and overall well-being. Experience a profound connection to your body, supported by a healthy, organic diet. Engage in various activities, including spiritual ceremonies, nature excursions, and wellness treatments, all aimed at enhancing your inner peace and emotional healing. Our retreat offers a supportive and guided environment, helping you achieve the personal growth and transformation you desire, leading to a deeper connection with yourself and what truly matters to you.`,
  whoIsItFor: (
    <div className="flex flex-col gap-2">
      <p>
        The Tribute Power Yoga Retreat in Bali is designed for those who seek a
        deeper connection to themselves and the world around them. This retreat
        is for:
      </p>
      <ul className="list-disc px-4 text-left text-sm">
        <li>
          <strong>⁠Yoga Enthusiasts:</strong> Whether you are a seasoned yogi or
          new to the practice, our daily yoga sessions will guide you through a
          journey of self-discovery, strength, and flexibility.
        </li>
        <li>
          <strong>Mindfulness Seekers:</strong> If you are looking to cultivate
          inner peace and mindfulness, our guided meditation sessions will help
          you find balance and clarity amidst the beauty of Bali&apos;s natural
          surroundings.
        </li>
        <li>
          <strong>Adventure Lovers:</strong> For those who crave exploration,
          our excursions will take you beyond the yoga mat to experience Bali’s
          breathtaking landscapes, vibrant culture, and rich traditions.
        </li>
        <li>
          <strong>⁠Wellness Warriors:</strong> If you are on a path to holistic
          well-being, this retreat offers a nurturing environment where you can
          focus on your physical, mental, and spiritual health.
        </li>
        <li>
          <strong>Cultural Explorers:</strong> Immerse yourself in the local
          culture through authentic experiences that connect you to the heart of
          Bali, from its lush jungles to its serene beaches.
        </li>
      </ul>
      <p>
        If you&apos;re ready to rejuvenate your spirit, explore new horizons,
        and connect with like-minded individuals, this retreat is for you.
      </p>
    </div>
  ),
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
        <div className="relative text-center bg-purple z-10 py-16 px-24 text-white grid place-items-center gap-8">
          <h2>Join Us</h2>
          <h1>{retreatDetails.name}</h1>
        </div>
      </div>
      <div
        id="details"
        className="flex flex-wrap justify-center sm:px-4"
      >
        <div
          id="when"
          className="flex flex-col gap-4 items-center sm:items-end w-[50%] min-w-[312px] px-4 py-16 bg-gray-100 text-gray-800"
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
          className="flex flex-col gap-4  items-start w-[50%] min-w-[312px] px-4 py-16 bg-gray-100 text-gray-800"
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
          Experience a transformative journey at Masakali Retreat with our
          six-day, five-night yoga retreat, set against the breathtaking
          backdrop of Balinese mountains, lush forests, and serene rice fields.
          Practice yoga, connect with nature, and find inner peace as you absorb
          the tranquility of one of the most spectacular places in the world.
        </p>
      </div>
      <ContentContainer
        heading="Contact Us to book your retreat"
        content={<ContactForm />}
        imgSrc={ContactFormImage}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      {/* <About /> */}
      <ContentContainer
        heading="The Details"
        content={retreatDetails.details}
        // buttonText="See our yoga class schedule"
        imgSrc={MeditationDroneImage}
        imgPosition="right"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`${retreatDetails.name} Includes`}
        content={retreatDetails.included}
        // buttonText="See our yoga class schedule"
        imgSrc={YogaRetreat4}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`Include Activities`}
        content={retreatDetails.activities}
        // buttonText="See our yoga class schedule"
        imgSrc={ActivitiesImage}
        imgPosition="right"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`WHAT CAN YOU EXPECT DURING YOUR STAY`}
        content={retreatDetails.expect}
        // buttonText="See our yoga class schedule"
        imgSrc={ExpectImage}
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
