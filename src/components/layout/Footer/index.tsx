import Image from 'next/image';
import Link from 'next/link';

import facebookIcon from '~/../public/icons/icons8-facebook-50.png';
import instagramIcon from '~/../public/icons/icons8-instagram-50.png';
import emailIcon from '~/../public/icons/icons8-email-50.png';
import LinkWithUnderline from '~/components/LinkWithUnderline';

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
    <section className="flex flex-wrap p-8 bg-purple w-full text-white">
      <div className="flex w-1/2 flex-col items-center justify-center min-w-content gap-2">
        <span className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p>Masakali</p>
            <p>Br. Ayah Kelusa Payangan</p>
            <p>Gianyar Bali 80572</p>
            <p className="font-montserrat">+62 821-4635-5565</p>
          </div>

          <Link href="https://www.instagram.com/masakaliretreat">
            <span className="flex justify-start">
              <Image
                src={instagramIcon}
                alt="instagram"
                className="mr-2 h-6 w-6 my-auto"
              />
              /masakaliretreat
            </span>
          </Link>

          <Link href="https://www.facebook.com/masakaliretreat">
            <span className="flex  justify-start">
              <Image
                src={facebookIcon}
                alt="facebook"
                className="mr-2 h-6 w-6 my-auto"
              />
              /masakaliretreat
            </span>
          </Link>

          <Link href="mailto: info@masakaliretreat.com">
            <span className="flex">
              {' '}
              <Image
                src={emailIcon}
                alt="email"
                className="mr-2 h-6 w-6 my-auto"
              />
              info@masakaliretreat.com
            </span>
          </Link>
        </span>
      </div>
      <div className="w-1/2 grid place-items-center grid-col-1 gap-4 font-montserrat uppercase">
        {sectionLinks.map((link) => (
          <LinkWithUnderline
            key={link}
            href={`/#${link}`}
          >
            {link}
          </LinkWithUnderline>
        ))}
      </div>
    </section>
  );
};

export default Footer;
