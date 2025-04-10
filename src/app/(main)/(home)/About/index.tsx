import Image from 'next/image';
import { suryaNameImage } from '~/lib/images';

const About = () => {
  return (
    <section className="flex flex-col lg:flex-row ">
      <div className="w-full lg:w-1/2 px-4 md:px-16 py-16">
        <div className="max-w-xl mx-auto flex flex-col gap-4 justify-center">
          <h1 className="mb-8 text-center">Masakali Retreat</h1>
          <div className="flex flex-col gap-4">
            <p>
              Join us on the island of the Gods surrounded by serene landscapes
              and rich culture.
            </p>
            <p>
              In the traditional Balinese village of Kelusa you will find
              Masakali Retreat - the perfect romance between an extraordinary
              destination, nourishment of your whole being and premium
              accommodations with exemplary service.
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
              Our goal is to create a space where we invite you to reconnect
              with yourself, others and nature. Let the sanctuary that is
              Masakali empower and enchant you.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative min-h-[600px]">
        <Image
          src={suryaNameImage.src}
          alt={suryaNameImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};

export default About;
