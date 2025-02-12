'use client';
import React from 'react';
import Link from 'next/link';

type GoToPageButtonProps = {
  callToAction: string;
  isWhite?: boolean;
  path: string;
  target?: string;
};

export const GoToPageButton: React.FC<GoToPageButtonProps> = ({
  callToAction,
  isWhite = true,
  path,
  target = '',
}) => {
  return (
    <Link
      className={`whitespace-nowrap py-3 px-6 ${
        isWhite
          ? `bg-white text-purple border-white hover:bg-purple hover:text-white `
          : 'bg-purple text-white hover:bg-white hover:text-purple border-purple'
      } font-montserrat uppercase border border-solid `}
      href={path}
      target={target}
      rel="noreferrer"
    >
      {callToAction}
    </Link>
  );
};
