import { type Reservation } from '@prisma/client';
import { villas } from '~/utils/smoobu';
import {
  addDays,
  eachDayOfInterval,
  isBefore,
  format,
  parseISO,
} from 'date-fns';

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

  const formattedArrivalDate = format(arrivalDate, 'yyyy-MM-dd');
  const formattedDepartureDate = format(departureDate, 'yyyy-MM-dd');

  reservations.forEach((reservation) => {
    const arrival = reservation?.arrival;
    const departure = reservation?.departure;

    if (arrival < formattedDepartureDate && formattedArrivalDate < departure) {
      blockedVillasSet.add(reservation.villaId);
    }
  });

  return allVillas.filter((villaId) => !blockedVillasSet.has(villaId));
};

// type getDisabledDatesParams = {
//   reservations: Reservation[];
//   villaId?: number;
// };

// export const getDisabledDates = ({
//   reservations,
//   villaId,
// }: getDisabledDatesParams): Date[] => {
//   let filteredReservations = reservations;

//   // Filter by villaId if provided
//   if (villaId) {
//     filteredReservations = reservations.filter(
//       (res) => res.villaId === villaId
//     );
//   }

//   // Extract the blocked dates from the filtered reservations
//   const disabledDates = new Set<Date>();

//   filteredReservations.forEach((reservation) => {
//     const startDate = addDays(new Date(reservation.arrival), 1); // Start from the day after arrival
//     const endDate = addDays(new Date(reservation.departure), -1); // End a day before the departure

//     // If it's a two-night stay, only block the day after arrival
//     if (
//       isBefore(startDate, new Date(reservation.departure)) &&
//       isBefore(new Date(reservation.arrival), endDate)
//     ) {
//       disabledDates.add(startDate);
//     } else if (isBefore(startDate, endDate)) {
//       // For longer stays, block the interval
//       const intervalDates = eachDayOfInterval({
//         start: startDate,
//         end: endDate,
//       });
//       intervalDates.forEach((date) => disabledDates.add(date));
//     }
//   });

//   // If no villaId is provided, filter dates that are blocked across all villas
//   if (!villaId) {
//     const villaCount = new Map<Date, number>();
//     disabledDates.forEach((date) => {
//       const count = villaCount.get(date) || 0;
//       villaCount.set(date, count + 1);
//     });

//     const allVillasCount = Object.keys(villas).length; // Assuming `villas` is defined in the outer scope
//     disabledDates.forEach((date) => {
//       if (villaCount.get(date) !== allVillasCount) {
//         disabledDates.delete(date);
//       }
//     });
//   }

//   return [...disabledDates];

// };

// import { villas } from '~/utils/smoobu';

export const getDisabledDates = (
  reservations: Reservation[],
  villaId?: number
) => {
  const villas = villaId
    ? new Set([villaId])
    : new Set(reservations.map((r) => r.villaId));

  // Okay so I recieve the reservations. If there is a villa id then I filter the reservations

  const dateCounts = new Map<string, Reservation[]>();

  // okay so what if for each villa I consider blocked dates to be arrival to day before departure
  // that way if that villa has a departure and arrival on the same day it is still blocked.

  // I only want arrival dates if there is another reservation with a departure date

  for (const villaId of villas.values()) {
    const filteredReservations = reservations.filter(
      (res) => res.villaId === villaId
    );

    const arrivalDates = filteredReservations.map((res) => res.arrival);
    const departureDates = filteredReservations.map((res) => res.departure);

    filteredReservations.forEach((reservation) => {
      const blockedArrival = departureDates.includes(reservation.arrival);
      const blockedDeparture = arrivalDates.includes(reservation.departure);
      const arrival = parseISO(reservation.arrival);
      const departure = parseISO(reservation.departure);
      const dates = new Set(
        eachDayOfInterval({ start: arrival, end: departure }).map((date) =>
          format(date, 'yyyy-MM-dd')
        )
      );

      if (!blockedArrival) {
        dates.delete(reservation.arrival);
      }
      if (!blockedDeparture) {
        dates.delete(reservation.departure);
      }

      dates.forEach((date) => {
        const ids = dateCounts.get(date) || [];
        dateCounts.set(date, [...ids, reservation]);
      });
    });
  }

  // If no villaId is provided, filter the dates to only include those that are blocked for every villa

  const disabledDates = new Set<string>();

  dateCounts.forEach((reservations, date) => {
    const villaIds = new Set(reservations.map((r) => r.villaId));
    if (villaIds.size === villas.size) {
      disabledDates.add(date);
    }
  });

  return [...disabledDates];
};
