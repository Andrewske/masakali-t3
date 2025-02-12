import type { UpdateReservationsResponse } from '~/types/smoobu';
import Button from '..';

export const UpdateReservationsButton = ({
  isWhite,
}: {
  isWhite?: boolean;
}) => {
  const handleClick = async () => {
    const response = await fetch('/api/smoobu/updateReservations');
    if (response.ok) {
      const data = (await response?.json()) as UpdateReservationsResponse;
      console.log(data);
    } else {
      console.log('Error fetching data:', response.statusText);
    }
  };

  const handleRatesClick = async () => {
    const response = await fetch('/api/smoobu/updateRates');
    if (response.ok) {
      const data = (await response?.json()) as UpdateReservationsResponse;
      console.log(data);
    } else {
      console.log('Error fetching data:', response.statusText);
    }
  };

  return (
    <>
      <Button
        handleClick={() => void handleClick()}
        callToAction="Update Reservations"
        isWhite={isWhite}
      />
      <Button
        handleClick={() => void handleRatesClick()}
        callToAction="Update Rates"
        isWhite={isWhite}
      />
    </>
  );
};
