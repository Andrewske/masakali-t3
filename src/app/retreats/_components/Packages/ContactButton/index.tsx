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
const ContactButton = ({ children }: { children: React.ReactNode }) => {
  const handleScroll = useCallback(() => {
    scrollIntoViewWithOffset('#contact-form', 132);
  }, []);

  return (
    <button
      onClick={handleScroll}
      type="button"
    >
      {children}
    </button>
  );
};

export default ContactButton;
