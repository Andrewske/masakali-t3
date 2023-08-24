import { useEffect, useCallback } from 'react';

const useKeyDown = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      console.log('down');
      callback();
    }
  }, []);

  return;
};

export default useKeyDown;
