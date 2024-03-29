import Link from 'next/link';
import Image from 'next/image';

import HeaderLinks from '~/components/layout/Header/Links';

const Header = () => {
  return (
    <nav className="relative w-full flex flex-col z-50">
      <div className="z-50 flex flex-col md:flex-row md:justify-between bg-purple w-full relative min-h-[200px] flex-wrap h-auto ">
        <span className="flex flex-wrap justify-center items-center p-4">
          <Image
            src="/FullWhiteLogo_TransparentBackground.png"
            width={150}
            height={150}
            alt="Masakali Retreat Logo in white with transparent background"
            className="object-contain order-1"
          />
        </span>
        <span className="flex flex-wrap items-center justify-center p-4">
          <HeaderLinks />

          <Link
            href="/villas"
            className="button white"
          >
            Book Now
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
