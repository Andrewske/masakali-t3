import { type Reservation } from '@prisma/client';
import { villas } from '~/utils/smoobu';
import { addDays, eachDayOfInterval, isBefore } from 'date-fns';

type getBlockedDatesAllVillasType = {
  reservations: Reservation[];
  arrivalDate: Date;
  departureDate: Date;
};

export const getAvailableVillas = ({
  reservations,
  arrivalDate,
  departureDate,
}: getBlockedDatesAllVillasType): number[] => {
  const blockedVillasSet = new Set<number>();
  const allVillas = [...villas].map(([, { id }]) => id);

  reservations.forEach((reservation) => {
    if (
      isBefore(reservation.arrival, departureDate) &&
      isBefore(arrivalDate, reservation.departure)
    ) {
      blockedVillasSet.add(reservation.villaId);
    }
  });

  return allVillas.filter((villaId) => !blockedVillasSet.has(villaId));
};

type getDisabledDatesParams = {
  reservations: Reservation[];
  villaId?: number;
};

export const getDisabledDates = ({
  reservations,
  villaId,
}: getDisabledDatesParams): Date[] => {
  let filteredReservations = reservations;

  // Filter by villaId if provided
  if (villaId) {
    filteredReservations = reservations.filter(
      (res) => res.villaId === villaId
    );
  }

  // Extract the blocked dates from the filtered reservations
  const disabledDates = new Set<Date>();

  filteredReservations.forEach((reservation) => {
    const startDate = addDays(reservation.arrival, 1); // Start from the day after arrival
    const endDate = addDays(reservation.departure, -1); // End a day before the departure

    // If it's a two-night stay, only block the day after arrival
    if (
      isBefore(startDate, reservation.departure) &&
      isBefore(reservation.arrival, endDate)
    ) {
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

    const allVillasCount = Object.keys(villas).length; // Assuming `villas` is defined in the outer scope
    disabledDates.forEach((date) => {
      if (villaCount.get(date) !== allVillasCount) {
        disabledDates.delete(date);
      }
    });
  }

  return [...disabledDates];
};
