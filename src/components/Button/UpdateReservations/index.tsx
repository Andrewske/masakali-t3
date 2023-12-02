import type { UpdateReservationsResponse } from '~/types/smoobu';

import styles from '../styles.module.scss';

export const UpdateReservationsButton = ({
  isWhite,
}: {
  isWhite?: boolean;
}) => {
  const handleClick = async () => {
    const response = await fetch('/api/smoobu/updateReservations');
    if (response.ok) {
      const data =
        (await response?.json()) as typeof UpdateReservationsResponse;
      console.log(data);
    } else {
      console.log('Error fetching data:', response.statusText);
    }
  };

  return (
    <button
      className={`${styles.container ?? ''} ${
        isWhite ? `${styles.white ?? ''}` : ''
      }`}
      onClick={() => void handleClick()}
    >
      Update Reservations
    </button>
  );
};
