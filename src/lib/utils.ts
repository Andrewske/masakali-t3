import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '~/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clientUrl = () => {
  if (env.NODE_ENV === 'production') {
    return 'https://www.masakaliretreat.com/';
  }

  return 'http://localhost:3000/';
};
export const serverUrl = () => {
  if (env.NODE_ENV === 'production') {
    return 'https://www.masakaliretreat.com/api';
  }
  return 'http://localhost:5000/api';
};
