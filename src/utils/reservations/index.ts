import { type Reservation } from '@prisma/client';
import { type VillaIdsType, villaIdsArray } from '~/lib/villas';
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
}: getBlockedDatesAllVillasType): VillaIdsType[] => {
  const blockedVillasSet = new Set<VillaIdsType>();

  const formattedArrivalDate = format(arrivalDate, 'yyyy-MM-dd');
  const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');

  reservations.forEach((reservation) => {
    const arrival = reservation?.arrival;
    const departure = reservation?.departure;
    const resVillaId = reservation?.villaId as VillaIdsType;
    if (arrival < formattedDepartureDate && formattedArrivalDate < departure) {
      blockedVillasSet.add(resVillaId);
    }
  });

  return villaIdsArray.filter((villaId) => !blockedVillasSet.has(villaId));
};

export const getDisabledDatesOld = (
  reservations: Reservation[],
  villaId?: VillaIdsType
) => {
  // This map gives a date and the count of villaIds that have reservations on that date
  const dateCounts = new Map<string, Set<VillaIdsType>>();

  // Loop through each reservation
  for (const reservation of reservations) {
    const resVillaId = reservation.villaId as VillaIdsType;
    // If a villaId is given and the reservation doesn't match, skip it
    if (villaId && reservation.villaId !== villaId) {
      continue;
    }

    // Create a function to add to dateCounts to limit code duplication
    const setDateCounts = (dateString: string, villaId: VillaIdsType) => {
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
      setDateCounts(dateString, resVillaId);
    }

    // check if the reserations arrival date is in the list of depature dates
    const hasArrival = reservations.some(
      (r) => r.departure === reservation.arrival && r.villaId === resVillaId
    );

    if (hasArrival) {
      setDateCounts(reservation.arrival, resVillaId);
    }

    // check if the reservations departure date is in the list of arrival dates
    const hasDeparture = reservations.some(
      (r) => r.arrival === reservation.departure && r.villaId === resVillaId
    );

    if (hasDeparture) {
      setDateCounts(reservation.departure, resVillaId);
    }
  }

  const disabledDates = new Set<string>();

  for (const [date, villas] of dateCounts.entries()) {
    if (!villaId && villaIdsArray.length === villas.size) {
      disabledDates.add(date);
    } else if (villaId && villaIdsArray.includes(villaId)) {
      disabledDates.add(date);
    }
  }

  return disabledDates;
};
