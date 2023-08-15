export const normalizeDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getUTCDate();
  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};

import { addDays } from 'date-fns';

export function getDatesBetweenDates(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = addDays(startDate, 1); // Don't include the arrival date

  while (currentDate < endDate) {
    // Don't iclude the departure date
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

export function getCurrentDateInBali(): Date {
  const localNow: Date = new Date();

  // Get the local timezone offset in minutes and convert it to milliseconds
  const localOffset: number = localNow.getTimezoneOffset() * 60000;

  // Bali, Indonesia is in the UTC+8 time zone (480 minutes ahead of UTC)
  const baliOffset: number = 480 * 60000;

  // Calculate the Bali time in milliseconds
  const baliNow: number = localNow.getTime() + localOffset + baliOffset;

  return new Date(baliNow);
}
