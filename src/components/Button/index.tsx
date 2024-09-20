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
    <button
      className={`uppercase font-montserrat text-2xl px-8 py-2 mx-auto ${
        isWhite ? 'bg-white text-purple' : 'bg-purple text-white'
      } ${className ?? ''}`}
      onClick={() => handleClick()}
      type="button"
    >
      {callToAction}
    </button>
  );
};

export default Button;
