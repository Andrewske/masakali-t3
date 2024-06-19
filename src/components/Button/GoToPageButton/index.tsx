'use client';

import Link from 'next/link';

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
      className={`py-3 px-6 ${
        isWhite
          ? `bg-white text-purple border-white hover:bg-purple hover:text-white `
          : 'bg-purple text-white hover:bg-white hover:text-purple border-purple'
      } font-montserrat uppercase border border-solid `}
      href={path}
    >
      {callToAction}
    </Link>
  );
};
