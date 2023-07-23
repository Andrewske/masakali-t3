import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

/**
 * Returns the device configuration based on the width.
 *
 * @param width - The width of the device screen.
 * @returns The device configuration ('xs', 'sm', 'md', 'lg').
 */
const getDeviceConfig = (width: number): BreakPoint => {
  if (width < 320) return 'xs';
  if (width < 720) return 'sm';
  if (width < 1024) return 'md';
  return 'lg';
};

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Returns the current breakpoint based on the window's inner width.
 * @returns The current breakpoint.
 */
const useBreakpoint = (): BreakPoint => {
  const [breakPoint, setBreakpoint] = useState<BreakPoint>(() =>
    getDeviceConfig(window.innerWidth)
  );

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBreakpoint(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);

    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakPoint;
};

export default useBreakpoint;
