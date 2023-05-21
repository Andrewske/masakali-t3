import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

import facebookIcon from '../../../public/icons/icons8-facebook-50.png';
import instagramIcon from '../../../public/icons/icons8-instagram-50.png';
import emailIcon from '../../../public/icons/icons8-email-50.png';

const sectionLinks = [
  'home',
  'availability',
  'about',
  'villas',
  'dining',
  'amenities',
];

const Footer = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.address}>
          <p>Masakali</p>
          <p>Br. Ayah Kelusa Payangan</p>
          <p>Gianyar Bali 80572</p>
          <p>+62 821-4635-5565</p>
        </div>
        <div className={styles.socialLink}>
          <a href="https://www.instagram.com/masakaliretreat">
            <Image
              src={instagramIcon}
              alt="instagram"
              className={styles.icon}
            />
            <span className={styles.text}>/masakaliretreat</span>
          </a>
        </div>
        <div className={styles.socialLink}>
          <a href="https://www.facebook.com/masakaliretreat">
            <Image
              src={facebookIcon}
              alt="facebook"
              className={styles.icon}
            />
            <span>/masakaliretreat</span>
          </a>
        </div>
        <div className={styles.socialLink}>
          <a href="mailto: info@masakaliretreat.com">
            <Image
              src={emailIcon}
              alt="facebook"
              className={styles.icon}
            />
            <span>info@masakaliretreat.com</span>
          </a>
        </div>
      </div>
      <div className={styles.container}>
        {sectionLinks.map((link) => (
          <Link
            key={link}
            href={`#${link}`}
            scroll={false}
            className={styles.link}
          >
            {link}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Footer;
