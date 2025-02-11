import { useEffect } from 'react';
import { supportsPassiveEvents } from 'detect-it';

type Ref<T> = React.RefObject<T | null>;

type EventHandler = (event: Event) => void;

const useOnClickOutside = <T extends HTMLElement>(
  ref: Ref<T>,
  handler: EventHandler
): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(
      'mousedown',
      listener,
      supportsPassiveEvents ? { passive: true } : false
    );
    document.addEventListener(
      'touchstart',
      listener,
      supportsPassiveEvents ? { passive: true } : false
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        listener,
        supportsPassiveEvents
          ? ({ passive: true } as EventListenerOptions)
          : false
      );
      document.removeEventListener(
        'touchstart',
        listener,
        supportsPassiveEvents
          ? ({ passive: true } as EventListenerOptions)
          : false
      );
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
