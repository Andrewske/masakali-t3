import Image from 'next/image';

import PoolImg from '../../../public/home/masakali-surya-pool-walk.webp';
import styles from './styles.module.scss';

const About = () => {
  return (
    <section
      id="about"
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <div className={styles['text-container']}>
          <h1 className={styles.heading}>Masakali Retreat</h1>
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
        </div>
      </div>
      <div className={styles.container}>
        <Image
          src={PoolImg}
          alt="Masakali Surya pool view"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default About;
