'use client';

import Link from 'next/link';
import styles from '../styles.module.scss';

type GoToPageButtonProps = {
  callToAction: string;
  isWhite?: boolean;
  path: string;
};

export const GoToPageButton: React.FC<GoToPageButtonProps> = ({
  callToAction,
  isWhite = true,
  path,
}) => {
  return (
    <Link
      className={`${styles.container ?? ''} ${
        isWhite ? `${styles.white ?? ''}` : ''
      } font-montserrat uppercase hover:bg-white hover:text-purple hover:border-purple hover:border border-solid`}
      href={path}
    >
      {callToAction}
    </Link>
  );
};
