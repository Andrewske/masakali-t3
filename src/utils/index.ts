import { utcToZonedTime } from 'date-fns-tz';
import { addDays } from 'date-fns';

export const normalizeDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getUTCDate();
  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};

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

// Function to get the current date and time in Bali
export function getCurrentDateInBali(): Date {
  // Create a Date object for the current UTC date and time
  const nowUtc = new Date();

  // Define Bali's IANA time zone identifier
  const baliTimeZone = 'Asia/Jakarta';

  // Convert the current UTC time to Bali time
  return utcToZonedTime(nowUtc, baliTimeZone);
}
