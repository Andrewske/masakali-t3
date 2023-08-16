import { type Reservation } from '@prisma/client';
import { villaIds } from '~/utils/smoobu';
import { format, parseISO } from 'date-fns';
import { getDatesBetweenDates } from '..';

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

  const formattedArrivalDate = format(arrivalDate, 'yyyy-MM-dd');
  const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');

  reservations.forEach((reservation) => {
    const arrival = reservation?.arrival;
    const departure = reservation?.departure;

    if (arrival < formattedDepartureDate && formattedArrivalDate < departure) {
      blockedVillasSet.add(reservation.villaId);
    }
  });

  return [...villaIds].filter((villaId) => !blockedVillasSet.has(villaId));
};

export const getDisabledDates = (
  reservations: Reservation[],
  villaId?: number
) => {
  // This map gives a date and the count of villaIds that have reservations on that date
  const dateCounts = new Map<string, Set<number>>();

  // Loop through each reservation
  for (const reservation of reservations) {
    // If a villaId is given and the reservation doesn't match, skip it
    if (villaId && reservation.villaId !== villaId) {
      continue;
    }

    // Create a function to add to dateCounts to limit code duplication
    const setDateCounts = (dateString: string, villaId: number) => {
      const ids = dateCounts.get(dateString) || new Set();
      dateCounts.set(dateString, ids.add(villaId));
    };

    // Get each day between the arrival and departure not inclusive.
    const betweenDates = getDatesBetweenDates(
      parseISO(reservation.arrival),
      parseISO(reservation.departure)
    );

    // For each date in between Dates add the villaId
    for (const date of betweenDates) {
      const dateString = format(date, 'yyyy-MM-dd');
      setDateCounts(dateString, reservation.villaId);
    }

    // check if the reserations arrival date is in the list of depature dates
    const hasArrival = reservations.some(
      (r) =>
        r.departure === reservation.arrival && r.villaId === reservation.villaId
    );

    if (hasArrival) {
      setDateCounts(reservation.arrival, reservation.villaId);
    }

    // check if the reservations departure date is in the list of arrival dates
    const hasDeparture = reservations.some(
      (r) =>
        r.arrival === reservation.departure && r.villaId === reservation.villaId
    );

    if (hasDeparture) {
      setDateCounts(reservation.departure, reservation.villaId);
    }
  }

  const disabledDates = new Set<string>();

  for (const [date, villas] of dateCounts.entries()) {
    if (!villaId && villaIds.size === villas.size) {
      disabledDates.add(date);
    } else if (villaId && villaIds.has(villaId)) {
      disabledDates.add(date);
    }
  }

  return disabledDates;
};
