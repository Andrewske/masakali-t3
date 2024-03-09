import { villaDetails } from '~/lib/villas';
import Section from './Section';
import Link from 'next/link';

const listSections = [
  {
    title: 'YOUR TRANSFORMATIONAL RETREAT INCLUDE',
    listItems: [
      '5 days and 4 nights of Breathwork and Yoga immersion',
      'Opening ‘Melukat’ purification ceremony with a Balinese priest',
      `Diverse workshops including – Inspire Breathwork, Yoga Classes,
          Kundalini Activation, Cacao and Tea Ceremonies, Sound Healing,
          Ecstatic Dance with Closing Fire Ceremony`,
      `Tourist Activities - Tirta Empul Temple (for Balinese water
          purification ritual), trip to see one or more breathtaking
          waterfalls and a sunrise hike up Mount Batur`,
      `2 free spa services`,
      `3 freshly prepared meals per day and fresh juices all day`,
      `Free time which you can spend by the pool and waterfalls or attend
          a Balinese cultural activity such as Balinese dancing or a
          Balinese cooking class in the afternoons`,
      `Intimate sized group of maximum 8 people`,
      `Luxurious accommodations in the middle of the Balinese rice fields, lush tropical jungles, and mountain views`,
      `And a lot more magic that will allow you to connect with yourself
        and nature on a deeper level!`,
    ],
    imageUrl: villaDetails['akasha'].defaultImage,
  },
  {
    title: 'WHAT YOU CAN EXPECT DURING OUR 5 DAYS TOGETHER',
    listItems: [
      `Dive deep with an intimate group to release stress, anxiety, fears
        and unresolved past situations so you can gain more peace of mind
        and a life filled with joy`,
      `Gain a better understanding of patterns and conditioning that
        might be affecting your life and relationships in order to shift
        old stories and perspectives`,
      `Reconnect with your inner child & begin emotional healing`,
      `Establish a better presence and connection to your body and
        intuition, learning how to control your thoughts and perceptions`,
      `Be held, supported and guided through the changes you want to
        create in life`,
      `Gain a deeper understanding of who you are and how you can benefit
        the world around you`,
      `Take part in cultural activities to feel the vibrant magic of Bali
        at it’s best`,
    ],
    imageUrl: villaDetails['akasha'].defaultImage,
  },
];

const textSections = [
  {
    title:
      'LEARN TO USE YOUR BREATH AND BODY TO IGNITE YOUR POWER AND TRUE AUTHENTIC SELF!',
    boldText: { 2: 'What does it take?', 3: 'What does this look like?' },
    listItems: [
      'Join your facilitators for a transformative journey into oneself to relax, decompress, and awaken your life force to joy, connections, and mindset changes!',
      `Shanti in Sanskrit means calmness, peace, tranquility, quietness, rest, and stillness. Living Shanti offers you a different mindset in the path of mastering the flow of nature – embracing both pleasure and pain, your light as well as your dark. It’s having the confidence to be unapologetically yourself in every moment - to be free!`,
      `A willingness to undergo a next-level upgrade of your emotional, energetic, physical and spiritual being. Clearing stagnant energies, unresolved situations and past traumas, awakening your life force energy, integrating your shadows, igniting your self-expression, aligning your life purpose, opening your intuition, and entering the world of the magic that is you!`,
      `Through transformative Breathwork, Yoga and other workshops, practices, ceremonies, song, movement and stillness sessions, you will come home to the wisdom and power of your body and heart – where the confidence to be yourself and embrace your real, raw and wild being lives!`,
      `If you’re ready to breathe, to reconnect with yourself and nature, to relax and to gain peace and calm this retreat is for you.`,
    ],
    imageUrl: villaDetails['akasha'].defaultImage,
  },
  {
    title: 'WHO THIS RETREAT IS FOR',
    listItems: [
      'This retreat is for anyone who deeply desires a transformational shift in life, who desires to improve relationships with themselves and others, and to anyone who aspires to have a deep and powerful connection with all parts of themselves: body, mind and soul. This retreat will be a once in a lifetime opportunity for you! We welcome couples and singles, men & women, anyone that has an authentic willingness to open their heart to new possibilities, take self-responsibility and to choose love over fear.',
    ],
    imageUrl: villaDetails['akasha'].defaultImage,
  },
];

const About = () => {
  return (
    <div
      id="about"
      className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16  text-center"
    >
      <h2>ABOUT THE RETREAT</h2>
      <p className="max-w-[700px]">
        Welcome to a 5 day, 4 night retreat in one of the most magical resorts
        in Bali - Masakali. Relax and decompress with transformational
        activities such as breathwork classes, yoga, meditation, workshops, and
        ceremonies, while immersing yourself in Balinese cultural activities,
        and connecting with beautiful, like-minded people.
      </p>

      {listSections.map((section, index) => (
        <Section
          key={section.title}
          section={section}
          index={index}
        />
      ))}
      {textSections.map((section, index) => (
        <Section
          key={section.title}
          section={section}
          isList={false}
          index={index}
        />
      ))}
      <Link
        href="/"
        className="bg-purple text-white px-8 py-4 hover:shadow-light-purple transition-shadow duration-300"
      >
        <h3>Get Started</h3>
      </Link>
    </div>
  );
};

export default About;
