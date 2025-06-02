'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button as ButtonUI } from '~/components/ui/button';

interface ButtonPropType {
  callToAction: string;
  isWhite?: boolean;
  handleClick?: () => Promise<void> | void;
  className?: string;
  href?: string;
  isLoadingText?: string;
  scrollOffset?: number;
  disabled?: boolean;
}

const Button = ({
  callToAction,
  isWhite,
  handleClick,
  className,
  href,
  isLoadingText,
  scrollOffset = 0,
  disabled = false,
}: ButtonPropType) => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClasses = `${className ?? ''} whitespace-nowrap uppercase font-montserrat text-xl px-8 py-2 mx-auto cursor-pointer text-center transition-colors duration-50 ${
    isLoading
      ? 'bg-gray-400 text-white !cursor-progress'
      : isWhite
        ? 'bg-white text-purple [&:hover]:bg-purple [&:hover]:text-white [&:hover]:border-white'
        : 'bg-purple text-white [&:hover]:bg-white [&:hover]:text-purple'
  } border border-purple`;

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      await handleClick?.();
    } finally {
      setIsLoading(false);
    }
  };

  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={(e) => {
          if (scrollOffset > 0) {
            e.preventDefault();
            const element = document.querySelector<HTMLElement>(href);
            if (element) {
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - scrollOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
              });
            }
          }
        }}
      >
        {callToAction}
      </Link>
    );
  }

  return (
    <ButtonUI
      className={`${className ?? ''}`}
      variant={
        disabled
          ? 'default'
          : isLoading
            ? 'isLoading'
            : isWhite
              ? 'isWhite'
              : 'isPurple'
      }
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        void handleButtonClick();
      }}
    >
      {isLoading ? (isLoadingText ?? 'Loading...') : callToAction}
    </ButtonUI>
  );
};

export default Button;
