'use client';
import Link from 'next/link';
import styles from './styles.module.scss';

interface ButtonStyle {
  callToAction: string;
  isWhite?: boolean;
  handleClick: () => any;
}

const Button = ({ callToAction, isWhite, handleClick }: ButtonStyle) => {
  return (
    <button
      className={`${styles.container ?? ''} ${
        isWhite ? `${styles.white ?? ''}` : ''
      }`}
      onClick={handleClick}
    >
      {callToAction}
    </button>
  );
};

export default Button;

type GoToPageButtonProps = {
  callToAction: string;
  isWhite: boolean;
  path: string;
};

export const GoToPageButton: React.FC<GoToPageButtonProps> = ({
  callToAction,
  isWhite,
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
