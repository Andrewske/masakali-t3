'use client';
import Link from 'next/link';
import styles from './styles.module.scss';
import { signIn } from 'next-auth/react';

import { UpdateReservationsResponse } from '~/types/smoobu';

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
      onClick={() => void signIn('email')}
    >
      Log In
    </button>
  );
};

export const UpdateReservationsButton = ({
  isWhite,
}: {
  isWhite?: boolean;
}) => {
  const handleClick = async () => {
    const response = await fetch('/api/smoobu/updateReservations');
    if (response.ok) {
      const data =
        (await response?.json()) as typeof UpdateReservationsResponse;
      console.log(data);
    } else {
      console.log('Error fetching data:', response.statusText);
    }
  };

  return (
    <button
      className={`${styles.container ?? ''} ${
        isWhite ? `${styles.white ?? ''}` : ''
      }`}
      onClick={() => void handleClick()}
    >
      Update Reservations
    </button>
  );
};
