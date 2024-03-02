'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import useBreakpoint from '~/hooks/useBreakpoint';
import LinkWithUnderline from './LinkWithUnderline';

// .link {
//   color: $white;
//   width: max-content;
//   text-align: center;

//   &:after {
//     display: block;
//     content: '';
//     border-bottom: 1px solid white;
//     transform: scaleX(0);
//     transition: transform 250ms ease-in-out;
//   }

const HeaderLinks = () => {
  return (
    <nav className="flex flex-grow flex-wrap items-center gap-4 text-center justify-center">
      <LinkWithUnderline href="#home">Home</LinkWithUnderline>
      <LinkWithUnderline href="#villas">Villas</LinkWithUnderline>
      <LinkWithUnderline href="#dining">Dining</LinkWithUnderline>
      <LinkWithUnderline href="#amenities">Amenities</LinkWithUnderline>
      <LinkWithUnderline href="/retreats">Retreats</LinkWithUnderline>
    </nav>
  );
};

const Header = () => {
  const size = useBreakpoint();
  const [isExpanded, setExpanded] = useState(false);

  return (
    <nav className="fixed w-full flex flex-col z-50">
      <div className="flex flex-col md:flex-row md:justify-between bg-purple w-full relative min-h-[200px] flex-wrap h-auto ">
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
