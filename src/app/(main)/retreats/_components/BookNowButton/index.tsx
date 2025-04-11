// In src/components/Button/index.tsx
'use client';
import Button from '~/components/Button';

const BookNowButton = () => {
  return (
    <Button
      className="hover:scale-105 z-10"
      isWhite={true}
      callToAction="Book Retreat"
      href="#contact-form"
      scrollOffset={132}
    />
  );
};

export default BookNowButton;
