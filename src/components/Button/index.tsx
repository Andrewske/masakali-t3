'use client';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
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

export const LoginButton = ({ isWhite }: { isWhite?: boolean }) => {
  return (
    <button
      className={`${styles.container ?? ''} ${
        isWhite ? `${styles.white ?? ''}` : ''
      }`}
      onClick={() => void signIn('google')}
    >
      Log In
    </button>
  );
};
