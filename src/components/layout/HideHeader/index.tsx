'use client';

import { useState, useEffect, type ReactNode } from 'react';

const HideHeader = ({ children }: { children: ReactNode }) => {
  const [isHidden, setHidden] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      //   console.log(currentScrollY, lastScrollY, isHidden);
      if (currentScrollY > 10) {
        setHidden(false);
      } else {
        setHidden(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHidden]);

  return (
    <div
      className={`${
        isHidden ? 'h-0 m-0 p-0 overflow-hidden' : 'min-h-[200px]'
      } fixed top-0 w-full overflow-hidden transition-all duration-500 ease-in-out z-50`}
    >
      {children}
    </div>
  );
};

export default HideHeader;
