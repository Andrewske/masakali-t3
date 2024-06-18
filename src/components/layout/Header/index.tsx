import Link from 'next/link';
import Image from 'next/image';

import HeaderLinks from '~/components/layout/Header/Links';

const Header = () => {
  return (
    <nav className="relative md:fixed top-0 w-full flex flex-col z-50 h-[150px]">
      <div className="z-50 flex flex-col md:flex-row md:justify-between bg-purple w-full relative flex-wrap h-full ">
        <span className="flex flex-wrap justify-center items-center p-4">
          <Image
            src="/FullWhiteLogo_TransparentBackground.png"
            width="150"
            height="0"
            alt="Masakali Retreat Logo in white with transparent background"
            className="object-contain order-1"
          />
        </span>
        <span className="flex flex-wrap items-center justify-center p-4 gap-16">
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
