import Image from 'next/image';
import styles from './styles.module.scss';
import DiningImage from '../../../public/hero-images/akasha-pool.webp';

const Amenities = () => {
  return (
    <section
      id="amenities"
      className={styles.wrapper}
    >
      <div
        id="amenities"
        className={styles.container}
      >
        <h2 className={styles.title}>Amenities</h2>
        <p className={styles.description}>
          At Masakali, our goal is to go above and beyond your expectations and
          to make your stay exceptional. The owner put her heart and soul into
          every aspect of this place and her vision is to share this gift with
          the rest of the world and it is truly our honor to offer our guests
          the best experience imaginable.
        </p>
        <p className={styles.subText}>
          That’s why we are offering a full range of services and amenities such
          as:
        </p>
        <ul className={styles.list}>
          <li>Private infinity pool</li>
          <li>Kitchenette</li>
          <li>Ensuite bathrooms</li>
          <li>Outdoor showers</li>
          <li>Tour packages</li>
          <li>Airport transfer</li>
          <li>Motorbike rental</li>
          <li>Laundry Services</li>
          <li>Safety deposit box</li>
          <li>Onsite security</li>
          <li>Toiletries</li>
          <li>Bathrobes</li>
          <li>Free WiFi</li>
          <li>Free parking</li>
          <li>Spa services</li>
          <li>Room service</li>
        </ul>
      </div>
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={DiningImage}
          alt="Photo of breakfast on Surya's porch"
        />
      </div>
    </section>
  );
};

export default Amenities;
