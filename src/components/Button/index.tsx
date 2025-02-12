'use client';

interface ButtonStyle {
  callToAction: string;
  isWhite?: boolean;
  handleClick: () => void;
  className?: string;
}

const Button = ({
  callToAction,
  isWhite,
  handleClick,
  className,
}: ButtonStyle) => {
  return (
    <a
      className={`uppercase font-montserrat text-xl px-8 py-4 mx-auto cursor-pointer ${
        isWhite
          ? 'bg-white text-purple hover:bg-purple hover:text-white'
          : 'bg-purple text-white hover:bg-white hover:text-purple'
      } ${className ?? ''} border border-purple`}
      onClick={() => handleClick()}
    >
      {callToAction}
    </a>
  );
};

export default Button;
