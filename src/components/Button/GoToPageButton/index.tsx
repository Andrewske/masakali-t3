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
      }`}
      href={path}
    >
      {callToAction}
    </Link>
  );
};
