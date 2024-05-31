import React, { useEffect } from 'react';
import { useXenditStore } from '~/stores/xenditStore';
import { env } from '~/env.mjs'; // Ensure this path is correct

const XenditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setError } = useXenditStore();

  useEffect(() => {
    const initializeXendit = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        window?.Xendit?.setPublishableKey(
          env.NEXT_PUBLIC_XENDIT_PUBLIC_TEST_KEY
        );
      } catch (error) {
        console.log('Xendit setup failed:', error);
        setError('Failed to initialize Xendit.');
      }
    };
    // Load Xendit.js dynamically if it's not already loaded
    if (!window.Xendit) {
      const script = document.createElement('script');
      script.src = 'https://js.xendit.co/v1/xendit.min.js';
      script.async = true;
      script.onload = () => initializeXendit();
      document.body.appendChild(script);
    } else {
      initializeXendit();
    }
  }, [setError]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default XenditProvider;
