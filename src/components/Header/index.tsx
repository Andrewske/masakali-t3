'use client';

import { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import useBreakpoint from '~/hooks/useBreakpoint';

const HeaderLinks = () => {
  return (
    <nav>
      <Link
        className={styles.link}
        href="#home"
      >
        Home
      </Link>
      <Link
        className={styles.link}
        href="#villas"
        scroll={false}
      >
        Villas
      </Link>
      <Link
        className={styles.link}
        href="#dining"
        scroll={false}
      >
        Dining
      </Link>
      <Link
        className={styles.link}
        href="#amenities"
        scroll={false}
      >
        Amenities
      </Link>
      <Link
        className={styles.link}
        href="/retreats"
      >
        Retreats
      </Link>
    </nav>
  );
};

const Header = () => {
  const size = useBreakpoint();
  const [isExpanded, setExpanded] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Image
          src="/FullWhiteLogo_TransparentBackground.png"
          width={125}
          height={125}
          alt="Masakali Retreat Logo in white with transparent background"
          className={styles.logo}
        />
        {size === 'md' || size === 'lg' ? (
          <div className={styles.container}>
            <HeaderLinks />
          </div>
        ) : (
          <div className={styles.expander}>
            <div
              className={
                isExpanded
                  ? `${styles.expanderContent ?? ''}  ${styles.open ?? ''}`
                  : styles.expanderContent
              }
            >
              <HeaderLinks />
            </div>
            <span
              className={styles.expanderIcon}
              onClick={() => setExpanded(!isExpanded)}
            >
              {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
            </span>
          </div>
        )}

        <div className={styles.button}>
          <Link
            href="/villas"
            className="button white"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

// const AuthShowcase = () => {
//   const { data: sessionData } = useSession();

//   return (
//     <div className={styles.authContainer}>
//       <p className={styles.showcaseText}>
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//       </p>
//       <button
//         className={styles.loginButton}
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? 'Sign out' : 'Sign in'}
//       </button>
//     </div>
//   );
// };
