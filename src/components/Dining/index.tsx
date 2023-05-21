import Image from 'next/image';
import styles from './styles.module.scss';
import DiningImage from '../../../public/hero-images/akasha-pool.webp';

const Dining = () => {
  return (
    <section
      id="dining"
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={DiningImage}
          alt="Photo of breakfast on Surya's porch"
        />
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Dining</h2>
        <p className={styles.description}>
          Masakali offers a full range of options for dining, all with the taste
          and charm of fresh Balinese ingredients. Our curated selection of
          savory cuisine includes many local Balinese dishes as well as
          international dishes. Our staff will prepare you breakfast which is
          included in the price of your villa from select items on the menu as
          well as offer lunch and dinner so you can enjoy your meal in the
          privacy of your own villa.
        </p>
      </div>
    </section>
  );
};

export default Dining;
