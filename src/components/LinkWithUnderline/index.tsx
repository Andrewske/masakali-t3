import type { ReactNode } from 'react';
import Link from 'next/link';

interface LinkWithUnderlineProps {
  children: ReactNode;
  href: string;
}

const LinkWithUnderline: React.FC<LinkWithUnderlineProps> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      className="text-white text-center relative group font-montserrat uppercase"
    >
      {children}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-250 ease-in-out group-hover:scale-x-100"></div>
    </Link>
  );
};

export default LinkWithUnderline;
