'use client';
import styles from './styles.module.scss';

const WhyChoose = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.header}>why choose masakali retreat</h2>
      </div>
      <div className={styles.container}>
        <div className={styles['feature-container']}>
          <span className={styles.header}>
            <span className="material-symbols-outlined">pool</span>
            <h4>private infinity pools</h4>
          </span>

          <p>
            Each villa has its own private infinity pool overlooking the rice
            fields. The luxurious pools are surrounded by beautiful gardens to
            ensure your privacy while enjoying a relaxing dip where you can also
            enjoy an amazing floating breakfast.
          </p>
        </div>
        <div className={styles['feature-container']}>
          <span className={styles.header}>
            <span className="material-symbols-outlined">pool</span>
            <h4>beautiful views</h4>
          </span>

          <p>
            Cascading Balinese rice fields, majestic mountains, and a
            spectacular view of the dense and wild jungle. If you’re lucky, you
            may even see monkeys swinging in the trees! Make sure you experience
            the magic of Masakali at sunset and then the fire flies that light
            up the rice terraces at night.
          </p>
        </div>
        <div className={styles['feature-container']}>
          <span className={styles.header}>
            <span className="material-symbols-outlined">pool</span>
            <h4>spa services</h4>
          </span>

          <p>
            Each villa has its own private infinity pool overlooking the rice
            fields. The luxurious pools are surrounded by beautiful gardens to
            ensure your privacy while enjoying a relaxing dip where you can also
            enjoy an amazing floating breakfast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
