'use client';

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
