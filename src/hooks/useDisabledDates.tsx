import { type Reservation } from '@prisma/client';
import { villas } from '~/utils/smoobu';
import { addDays, eachDayOfInterval, isBefore, parseISO } from 'date-fns';

const useDisabledDates = (reservations: Reservation[], villaId?: number) => {
  let filteredReservations = reservations;

  //console.log('useDisabledDates', { reservations });
  // Filter by villaId if provided
  if (villaId) {
    filteredReservations = reservations.filter(
      (res) => res.villaId === villaId
    );
  }

  // Extract the blocked dates from the filtered reservations
  const disabledDates = new Set<Date>();

  filteredReservations.forEach((reservation) => {
    const arrival: Date = parseISO(reservation.arrival) ?? new Date();
    const departure: Date = parseISO(reservation.departure) ?? new Date();

    const startDate = addDays(arrival, 1); // Start from the day after arrival
    const endDate = addDays(departure, -1); // End a day before the departure

    // If it's a two-night stay, only block the day after arrival
    if (isBefore(startDate, departure) && isBefore(arrival, endDate)) {
      disabledDates.add(startDate);
    } else if (isBefore(startDate, endDate)) {
      // For longer stays, block the interval
      const intervalDates = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });
      intervalDates.forEach((date) => disabledDates.add(date));
    }
  });

  // If no villaId is provided, filter dates that are blocked across all villas
  if (!villaId) {
    const villaCount = new Map<Date, number>();
    disabledDates.forEach((date) => {
      const count = villaCount.get(date) || 0;
      villaCount.set(date, count + 1);
    });

    const allVillasCount = Object.keys(villas).length;
    console.log(villaCount); // Assuming `villas` is defined in the outer scope
    disabledDates.forEach((date) => {
      if (villaCount.get(date) !== allVillasCount) {
        disabledDates.delete(date);
      }
    });
  }

  return [...disabledDates];
};

export default useDisabledDates;
