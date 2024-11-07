import Image from 'next/image';

import Packages from '../_components/Packages';
import { format } from 'date-fns';
import ContentContainer from '~/components/ContentContainer';
import MainImage from '~/../public/hero-images/masakali_arial.jpg';
import MeditationDroneImage from '~/../public/yoga/Meditation-drone1.jpg';
import YogaRetreat4 from '~/../public/yoga/yoga-retreat-4.jpg';
import ExpectImage from '~/../public/retreats/tribute/expect.jpeg';
import ActivitiesImage from '~/../public/retreats/tribute/sacred_monkey_forest.jpg';
// import YogaRetreat5 from '~/../public/yoga/yoga-retreat-5.jpg';
import ContactFormImage from '~/../public/retreats/tribute/yoge_shala_jungle.jpg';
import ContactForm from '../_components/ContactForm';
import GroupPhoto from '~/../public/retreats/tribute/group_photo.jpg';
import BookNowButton from '~/app/retreats/_components/BookNowButton';

const retreatDetails = {
  name: 'Tribute Yoga Retreat',
  startDate: '2025-04-06',
  endDate: '2025-04-11',
  whyChose:
    'Experience a transformative journey at Masakali Retreat with our six-day, five-night yoga retreat, set against the breathtaking backdrop of Balinese mountains, lush forests, and serene rice fields. Practice yoga, connect with nature, and find inner peace as you absorb the tranquility of one of the most spectacular places in the world',
  details: `At the Tribute Yoga Retreat from April 6-11, you’ll immerse yourself in a harmonious blend of yoga, adventure, and cultural experiences. Each day begins with invigorating yoga and meditation sessions and a healthy breakfast, setting the tone for the day. You will explore the vibrant town of Ubud, visit the Yoga Barn, and embark on nature excursions to the Tegallalng Rice Fields and Sebatu Waterfalls to name a few. The retreat includes spiritual experiences such as a traditional Melukat ceremony and a heart-opening Cacao ceremony. You’ll also have the opportunity to participate in an ecstatic dance session, trek to Mount Batur for a stunning sunrise, and visit the Pyramids of Chi for meditation and sound healing. Enjoy relaxing spa services, including acupuncture & massages, and savor delicious meals, with a special welcome dinner and closing dinner to bookend your transformative journey. Additional highlights include the Campuhan Ridge walk and a trip to Ubud’s renowned attractions. Join us for a retreat that nurtures your body, mind, and spirit in the serene beauty of Bali.`,
  included: (
    <div>
      <ul>
        <li>6 days, 5 nights accommodation</li>
        <li>Daily yoga and meditation</li>
        <li>Daily organic breakfast buffet</li>
        <li>Opening & Closing Dinner</li>
      </ul>
      <br />
      <ul>
        <li className="font-bold">Extra costs include:</li>
        <li>Airport transfer</li>
        <li>Lunch and other offsite meals</li>
        <li>Entry fees/guides for offsite activities</li>
        <li>Additional Spa treatments</li>
      </ul>
    </div>
  ),
  activities: (
    <div>
      <ul className="list-disc px-4 text-left ">
        <li>Special class at Yoga Barn</li>
        <li>Pyramids of Chi Sound Healing</li>
        <li>Tegallalang Rice Terrace Visit</li>
        <li>Mount Batur Sunrise Trek/ Volcano View Breakfast</li>
        <li>Sebatu Waterfalls</li>
        <li>Campuhan Ridgewalk</li>
        <li>Melukat Ceremony</li>
        <li>Cacao Ceremony</li>
        <li>Fire Ceremony</li>
        <li>Acupuncture and Moksha Session</li>
        <li>Ecstatic Dance</li>
      </ul>
    </div>
  ),
  expect: `Immerse yourself in a transformative yoga retreat designed to nurture your body, mind, and spirit. Through daily yoga and meditation sessions, you’ll work through stress, anxiety, and fear, finding a path to a calmer and more peaceful life. Gain deeper self-awareness and begin to shift old patterns and conditioning that may be affecting your relationships and overall well-being. Experience a profound connection to your body, supported by a healthy, organic diet. Engage in various activities, including spiritual ceremonies, nature excursions, and wellness treatments, all aimed at enhancing your inner peace and emotional well being. Our retreat offers a supportive and guided environment, helping you achieve the personal growth and transformation you desire, leading to a deeper connection with yourself and nature and what truly matters to you.`,
  whoIsItFor: (
    <div className="flex flex-col gap-2">
      <p>
        The Tribute Yoga Retreat in Bali is for those who seek a deeper
        connection to themselves, nature and the world around them. This retreat
        is for:
      </p>
      <ul className="list-disc px-4 text-left text-sm">
        <li>
          <strong>⁠Yoga Enthusiasts:</strong> Whether you are a seasoned yogi or
          new to the practice, our daily yoga sessions are fit for all levels
          and will guide you through a practice of self-discovery and
          empowerment.
        </li>
        <li>
          <strong>Mindfulness Seekers:</strong> If you want to cultivate inner
          peace and mindfulness, our guided meditation sessions will help you
          find balance and clarity amidst the beauty of Bali&apos;s natural
          surroundings.
        </li>

        <li>
          <strong>Adventure Lovers:</strong> For those who crave exploration,
          our excursions will take you beyond the yoga mat to experience
          Bali&apos;s breathtaking landscapes, vibrant culture, and rich
          traditions.
        </li>
        <li>
          <strong>⁠Wellness Warriors:</strong> If you are on a path to holistic
          well-being, this retreat offers a nurturing environment to focus on
          your physical, mental, and spiritual health.
        </li>
        <li>
          <strong>Cultural Explorers:</strong> Immerse yourself in the local
          culture through authentic spiritual practices and culinary experiences
          that connect you to the heart of Bali, from its lush jungles to its
          serene beaches.
        </li>
      </ul>
      <p className="font-bold">
        If you&apos;re ready to rejuvenate your spirit, explore new horizons,
        and connect with like-minded individuals, this retreat is for you!
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
    <>
      <div
        id="main-image"
        className="w-full grid grid-cols-1 xl:grid-cols-5 justify-center items-center relative overflow-hidden"
      >
        <div className="h-[calc(100vh-132px)] w-full xl:col-span-4">
          <Image
            src={MainImage}
            alt="Akasha Pool"
            // fill={true}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <span className="text-white bg-purple w-auto h-full flex flex-col px-4 gap-8 xl:col-span-1 justify-center items-center text-center">
          <h2 className="text-xl xl:text-3xl text-nowrap">Join Us</h2>
          <h1 className="text-xl xl:text-3xl ">{retreatDetails.name}</h1>
          <BookNowButton />
        </span>
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
            <h3>The Location</h3>
            <p className="text-sm">
              Experience Masakali Reatreat’s luxury accommodations amidst the
              breathtaking tropical jungles of Ubud – the spiritual capital of
              Bali. Located about 8 kilometers north of Ubud, Masakali Retreat
              offers a serene escape conveniently close to the city’s
              attractions. Overlooking lush Balinese rice fields framed by the
              majestic backdrop of volcanic mountains, our retreat center
              provides a stunning and tranquil setting for your journey of
              spiritual awakening and rejuvenation.
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
          Experience a transformative six-day, five-night yoga retreat to
          nurture your body, mind, and spirit. Enjoy daily yoga among the
          stunning Balinese landscape, nourishing organic meals, cultural
          ceremonies, nature adventures, and wellness treatments to enhance
          inner peace, emotional healing, and overall well-being. Our retreat
          offers a supportive and guided environment, leading to a deeper
          connection with yourself and nature. Don’t miss this
          once-in-a-lifetime experience in one of the most spectacular places in
          the world.
        </p>
      </div>

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
        heading={`Activities and Excursions`}
        content={retreatDetails.activities}
        // buttonText="See our yoga class schedule"
        imgSrc={ActivitiesImage}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`${retreatDetails.name} Includes The Following`}
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
        imgSrc={ExpectImage}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <ContentContainer
        heading={`Who is this retreat for?`}
        content={retreatDetails.whoIsItFor}
        // buttonText="See our yoga class schedule"
        imgSrc={GroupPhoto}
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
      <ContentContainer
        id="contact-form"
        heading="Contact Us to book your retreat"
        content={<ContactForm />}
        imgSrc={ContactFormImage}
        imgPosition="left"
        imgAlt="Masakali Yoga Retreat Image"
      />
      <Packages />
    </>
  );
}
