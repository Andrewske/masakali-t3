'use client';
import Image from 'next/image';

import HeaderLinks from '~/components/layout/Header/Links';
import { useState, useMemo } from 'react';

import { usePathname } from 'next/navigation';

import RetreatButton from './RetreatButton';
import VillasButton from './VillasButton';

const Header = ({ isAdmin }: { isAdmin?: boolean }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathName = usePathname();

  const memoizedHeaderLinks = useMemo(
    () => <HeaderLinks isAdmin={isAdmin} />,
    [isAdmin]
  );

  return (
    <nav>
      <div className="w-full h-[132px]">
        <div className="flex justify-between bg-purple w-full relative h-full ">
          <span className="flex items-center w-full max-w-[150px] h-full p-4">
            <Image
              src="/masakali-logo-sm.png"
              width={150}
              height={100}
              alt="Masakali Retreat Logo in white with transparent background"
              // priority={true}
            />
          </span>
          <span className="flex items-center justify-end p-4 gap-16 flex-1 ">
            <span className="hidden md:flex flex-wrap items-center justify-center p-4 gap-16 ">
              {memoizedHeaderLinks}
            </span>

            {pathName === '/retreats/tribute' ? (
              <RetreatButton />
            ) : (
              <VillasButton />
            )}
          </span>

          <span className="block md:hidden">
            <div
              className={
                isNavOpen
                  ? 'hidden'
                  : 'space-y-2 absolute top-0 right-0 p-2 flex flex-col items-center justify-center'
              }
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8  bg-white"></span>
              <span className="block h-0.5 w-8  bg-white"></span>
              <span className="block h-0.5 w-8  bg-white"></span>
            </div>

            <div
              className={
                isNavOpen
                  ? 'absolute w-full h-full top-0 left-0 z-10 bg-purple flex flex-col justify-evenly items-center'
                  : 'hidden'
              }
            >
              <div className="flex flex-wrap items-center gap-4 text-center justify-center font-montserrat uppercase px-8">
                {memoizedHeaderLinks}
              </div>
              <div
                className="absolute top-0 right-0 p-2"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </svg>
              </div>
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
