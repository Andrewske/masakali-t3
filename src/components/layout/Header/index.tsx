import Link from 'next/link';
import Image from 'next/image';

import HeaderLinks from '~/components/layout/Header/Links';

const Header = () => {
  return (
    <nav className="relative md:fixed top-0 w-full flex flex-col z-50 h-auto lg:h-[150px]">
      <div className="z-50 flex flex-col md:flex-row md:justify-between bg-purple w-full relative h-full ">
        <span className="flex items-center justify-center p-4 gap-16">
          <div className="w-[150px] h-[100px] relative object-contain">
            <Image
              src="/FullWhiteLogo_TransparentBackground.png"
              fill={true}
              alt="Masakali Retreat Logo in white with transparent background"
              sizes="(max-width: 600px) 200px, (max-width: 1000px) 300px, 400px"
              priority={true}
            />
          </div>
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
