import Image from 'next/image';

import Packages from '../_components/Packages';
import { format } from 'date-fns';
import ContentContainer from '~/components/ContentContainer';

import {
  masakaliArial,
  meditationDrone,
  cacaoCeremony,
  yogaRetreatPose,
  retreatGroupPhoto,
  yogaShalaJungle,
  tributeYoga1,
  tributeYoga2,
  tributeYoga3,
  tribueActivities1,
  tribueActivities2,
  tribueActivities3,
  tribueActivities4,
  tribueActivities5,
  tribueActivities6,
  tributeCommunalBath,
  tributeCommunalDining,
  tributeCommunalKitchen,
  tributeCommunalLivingRoom2,
  tributeCommunalLivingRoom,
  tributeCommunalPoolDetail,
  tributeCommunalPoolHangout,
  tributeCommunalPool,
} from '~/lib/images';

import ContactForm from '../_components/ContactForm';
import BookNowButton from '~/app/(main)/retreats/_components/BookNowButton';

const retreatDetails = {
  name: 'Tribute Yoga Retreat',
  startDate: '2025-06-29',
  endDate: '2025-07-04',
  whyChose:
    'Experience a transformative journey at Masakali Retreat with our six-day, five-night yoga retreat, set against the breathtaking backdrop of Balinese mountains, lush forests, and serene rice fields. Practice yoga, connect with nature, and find inner peace as you absorb the tranquility of one of the most spectacular places in the world.',
  details: (
    <div className="flex flex-col gap-2">
      <p>
        Join the Tribute Yoga Retreat here at Masakali from April 6-11 for a
        relaxing and uplifting experience in Bali! Start each day with yoga and
        meditation and enjoy a healthy breakfast to set the tone for the day.
        You will explore the vibrant town of Ubud, visit the Yoga Barn, and
        discover nature excursions to the Tegallalang Rice Fields and Sebatu
        Waterfalls to name a few. The retreat includes spiritual experiences
        such as a traditional Melukat ceremony and a heart-opening Cacao
        ceremony.
      </p>
      <p>
        You’ll have the opportunity to join an ecstatic dance session, trek to
        Mount Batur for a stunning sunrise, and visit the Pyramids of Chi for
        meditation and sound healing.
      </p>
      <p>
        Between all those adventures you can enjoy relaxing spa services,
        including acupuncture and massages to recharge.
      </p>
      <p>
        This retreat is the perfect way to connect with yourself, relax deeply,
        and soak in Bali’s beauty.
      </p>
      <p>Your time is now!</p>
    </div>
  ),
  included: (
    <div>
      <ul>
        <li>6 days, 5 nights accommodation</li>
        <li>Daily yoga and meditation</li>
        <li>Daily organic breakfast buffet</li>
        <li>Opening & Closing Dinner</li>
        <li>Welcome spa treatment</li>
        <li>Transportation to and from the Excursions</li>
      </ul>
      <br />
      <ul>
        <li className="font-bold">Extra costs include:</li>
        <li>Airport transfer</li>
        <li>Lunch and other offsite meals</li>
        <li>Mount Batur Sunrise Trek/ Volcano View Breakfast</li>
        <li>Additional Spa treatments</li>
        <li>Entry into Activities and Excursions</li>
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
        <li>Ecstatic Dance</li>
        <li>Melukat Ceremony*</li>
        <li>Cacao Ceremony*</li>
        <li>Fire Ceremony*</li>
        <li>Acupuncture and Moksha Session*</li>
      </ul>
      <p className="text-sm">*Included in retreat package pricing</p>
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
  space: (
    <p className="max-w-[600px]">
      Located near Ubud, Masakali Retreat offers the perfect blend of
      tranquility and accessibility. Far enough from the bustling city to
      provide peace and serenity, yet close enough to enjoy local attractions
      and exquisite cuisine, our retreat is designed to help you connect deeply
      with yourself. The space is purposefully built to support the practice of
      yoga, focusing on spiritual awakening and rejuvenation. Every element of
      Masakali Retreat embodies the idea of balance, creating an environment
      that nurtures personal growth and inner harmony. Surrounded by the natural
      beauty of Bali, our retreat provides a sanctuary where you can immerse
      yourself in the transformative power of yoga and rediscover a balanced,
      mindful way of living.
    </p>
  ),
};

// const parseDates = (startDate: string, endDate: string) => {
//   const [startYear, startMonth, startDay] = startDate.split('-');
//   const endDay = endDate.slice(-2);

//   const dates = `${startDay ?? ''}-${endDay ?? ''}`;
//   const month = `${format(new Date(0, parseInt(startMonth ?? ''), 0), 'MMMM')}`;
//   const year = `${startYear ?? ''}`;

//   return { dates, month, year };
// };

export default function Page() {
  // const { dates, month, year } = parseDates(
  //   retreatDetails.startDate,
  //   retreatDetails.endDate
  // );

  return (
    <>
      <div
        id="main-image"
        className="w-full grid grid-cols-1 xl:grid-cols-5 justify-center items-center relative overflow-hidden"
      >
        <div className="h-[calc(100vh-132px)] xl:col-span-4 relative">
          <Image
            src={masakaliArial.src}
            alt={masakaliArial.alt}
            // fill={true}
            width={7403}
            height={5552}
            className="object-cover object-center h-full"
            priority={true}
            sizes="(min-width: 1280px) 80vw, 100vw"
          />
        </div>

        <span className="text-white bg-purple w-auto h-full flex flex-col py-8 px-4 gap-8 xl:col-span-1 justify-center items-center text-center">
          <h2 className="text-xl xl:text-3xl text-nowrap">Join Us</h2>
          <h1 className="text-xl xl:text-3xl ">{retreatDetails.name}</h1>
          <BookNowButton />
        </span>
      </div>
      <div
        id="details"
        className="flex flex-wrap justify-center bg-gray-100 text-gray-800 py-16"
      >
        <div
          id="when"
          className="flex flex-col gap-4 items-center sm:items-end w-[50%] min-w-[312px] px-4 mb-4 text-left sm:text-right"
        >
          <h2 className="w-full">When</h2>

          <p className="w-full text-lg! whitespace-nowrap font-montserrat">
            Jun 29 - Jul 4 2025
          </p>
        </div>
        <div
          id="where"
          className="flex flex-col gap-4  items-start w-[50%] min-w-[312px] px-4 "
        >
          <h2>Where</h2>
          <span className="flex flex-col gap-8 max-w-[600px]">
            <span className="flex flex-col gap-2">
              <h3 className="">Resort address</h3>
              <span className="text-sm">
                <p>Masakali Retreat</p>
                <p>Br. Ayah Kelusa Payangan</p>
                <p>Gianyar Bali 80572</p>
              </span>
            </span>
            <span className="flex flex-col gap-2">
              <h3>The Location</h3>
              <p className="text-sm!">
                Discover the magic of Masakali, where luxury meets the lush
                beauty of Ubud’s most serene landscapes– the spiritual capital
                of Bali. Ubud literally means “medicine” and is where you want
                to be to start or perhaps continue your journey towards healing
                and a connection with your higher self. Just a short 8
                kilometers from Ubud’s lively center, Masakali offers a peaceful
                hideaway that&apos;s close enough to explore but feels like a
                world away. Here, you&apos;ll wake up to sweeping views of rice
                fields, tropical jungles and mountains, a breathtaking backdrop
                for your journey to inner peace, restoration, and spiritual
                discovery.
              </p>
            </span>
          </span>
        </div>
      </div>
      <div
        id="why-choose"
        className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
      >
        <h2>WHY CHOOSE {retreatDetails.name.toUpperCase()}</h2>
        <p className="max-w-[600px]">
          Escape to Bali’s hidden paradise and experience a six-day journey of
          self-discovery at the Tribute Yoga Retreat to nurture your body, mind
          and spirit. With daily yoga and meditation, nourishing organic meals,
          and sacred Balinese ceremonies, this retreat offers everything you
          need to unwind, reconnect, and transform. Wander through lush rice
          terraces, dive into Bali’s spiritual culture, and enjoy soothing
          wellness treatments in a setting that feels like pure magic. Join us
          at Masakali to rediscover balance, inner peace, and a deep connection
          with nature.
        </p>
        <p>
          Don’t miss this once-in-a-lifetime experience in one of the most
          spectacular places in the world.
        </p>
      </div>

      {/* <About /> */}
      <ContentContainer
        heading="The Details"
        content={retreatDetails.details}
        // buttonText="See our yoga class schedule"
        imgSrc={meditationDrone.src}
        imgPosition="right"
        imgAlt={meditationDrone.alt}
      />
      <ContentContainer
        heading={`Activities and Excursions`}
        content={retreatDetails.activities}
        // buttonText="See our yoga class schedule"
        images={[
          tribueActivities1,
          tribueActivities2,
          tribueActivities3,
          tribueActivities4,
          tribueActivities5,
          tribueActivities6,
        ]}
        imgPosition="left"
      />
      <ContentContainer
        heading={`${retreatDetails.name} Includes The Following`}
        content={retreatDetails.included}
        // buttonText="See our yoga class schedule"
        imgSrc={yogaRetreatPose.src}
        imgAlt={yogaRetreatPose.alt}
        imgPosition="right"
      />

      <ContentContainer
        heading={`WHAT CAN YOU EXPECT DURING YOUR STAY`}
        content={retreatDetails.expect}
        // buttonText="See our yoga class schedule"
        imgSrc={cacaoCeremony.src}
        imgPosition="left"
        imgAlt={cacaoCeremony.alt}
      />
      <ContentContainer
        heading={`Who is this retreat for?`}
        content={retreatDetails.whoIsItFor}
        // buttonText="See our yoga class schedule"
        imgSrc={retreatGroupPhoto.src}
        imgPosition="right"
        imgAlt={retreatGroupPhoto.alt}
      />
      {/* <div
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
      </div> */}
      <ContentContainer
        id="the-space"
        heading="The Space"
        content={retreatDetails.space}
        images={[
          tributeYoga1,
          tributeYoga2,
          tributeYoga3,
          tributeCommunalBath,
          tributeCommunalDining,
          tributeCommunalKitchen,
          tributeCommunalLivingRoom2,
          tributeCommunalLivingRoom,
          tributeCommunalPoolDetail,
          tributeCommunalPoolHangout,
          tributeCommunalPool,
        ]}
        imgPosition="left"
      />
      <ContentContainer
        id="contact-form"
        heading="Contact Us to book your retreat"
        content={<ContactForm />}
        imgSrc={yogaShalaJungle.src}
        imgPosition="right"
        imgAlt={yogaShalaJungle.alt}
      />
      <Packages />
    </>
  );
}
