// In src/components/Button/index.tsx
'use client';
import { useCallback } from 'react';

const scrollIntoViewWithOffset = (selector: string, offset: number) => {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found`);
  }

  const top = element.getBoundingClientRect().top;
  window.scrollTo({
    behavior: 'smooth',
    top: top - document.body.getBoundingClientRect().top - offset,
  });
};
const BookNowButton = () => {
  const handleScroll = useCallback(() => {
    scrollIntoViewWithOffset('#contact-form', 132);
  }, []);

  return (
    <button
      className="fixed bottom-4 right-4 hover:scale-105 z-10 uppercase font-montserrat text-xl px-8 py-2 mx-auto bg-purple text-white"
      onClick={handleScroll}
      type="button"
    >
      Book Retreat
    </button>
  );
};

export default BookNowButton;
