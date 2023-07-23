'use client'
import styles from './styles.module.scss';

const Location = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15786.190373739935!2d115.2544616!3d-8.4460073!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf1eb428a134748a1!2sMasakali%20Retreat!5e0!3m2!1sen!2sus!4v1661891834000!5m2!1sen!2sus"
          className={styles.iframe}
          loading="lazy"
          allowFullScreen
          title="Google Maps Masakali Retreat"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Location & Contacts</h2>
        <div className={styles.distanceWrapper}>
          <p>
            9km<span className={styles.small}>/5.6 miles</span>
          </p>
          <p>distance to ubud</p>
        </div>
        <div className={styles.distanceWrapper}>
          <p>
            43km<span className={styles.small}>/27 miles</span>
          </p>
          <p>distance to airport</p>
        </div>
        <div className={styles.contactWrapper}>
          <div className={styles.contact}>
            <p className={styles.title}>hotel address</p>
            <p>Masakali Retreat</p>
            <p>Br. Ayah Kelusa Payangan</p>
            <p>Gianyar Bali 80572</p>
          </div>
          <div className={styles.contact}>
            <p className={styles.title}>hotel contact</p>
            <p>
              <a href="mailto: info@masakaliretreat.com">
                info@masakaliretreat.com
              </a>
            </p>
            <p>
              <a href="mailto: info@masakaliretreat.com">
                facebook.com/masakaliretreat
              </a>
            </p>
            <p>
              <a href="mailto: info@masakaliretreat.com">
                instagram.com/masakaliretreat
              </a>
            </p>
            <p>+62 821-4635-5565</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
