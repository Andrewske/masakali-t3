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
