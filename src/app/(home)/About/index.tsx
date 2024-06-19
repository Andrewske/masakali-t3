import Image from 'next/image';
import PoolImg from '../../../../public/home/masakali-surya-pool-walk.webp';

const About = () => {
  return (
    <section
      id="about"
      className="flex flex-wrap"
    >
      <div className="px-4 py-16 md:px-16 flex flex-col text-center justify-center gap-8 md:basis-6/12 ">
        <h1>Masakali Retreat</h1>
        <span className="flex flex-col justify-center align-middle mx-auto gap-4 max-w-[800px]">
          <p>
            Join us on the island of the Gods surrounded by serene landscapes
            and rich culture.
          </p>
          <p>
            In the traditional Balinese village of Kelusa you will find Masakali
            Retreat - the perfect romance between an extraordinary destination,
            nourishment of your whole being and premium accommodations with
            exemplary service.
          </p>
          <p>
            Whether you are looking for a refreshing holiday, to spend quality
            time with your partner, or family, to celebrate your anniversary,
            honeymoon or wedding/vow renewal or to immerse yourself in the
            spiritually and magic that is Bali, every aspect of Bali and
            Masakali invites you to take a step on your journey towards inner
            peace and liberation.
          </p>
          <p>
            Our goal is to create a space where we invite you to reconnect with
            yourself, others and nature. Let the sanctuary that is Masakali
            empower and enchant you.
          </p>
        </span>
      </div>

      <div className="md:basis-6/12 grid place-items-center">
        <Image
          src={PoolImg}
          alt="Masakali Surya pool view"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default About;
