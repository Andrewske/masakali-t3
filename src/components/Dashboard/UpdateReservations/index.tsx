import Button from '../../Button';

import { api } from '~/utils/api';

const UpdateReservations = () => {
  // const data = api.smoobu.getFutureBlockedDates.useQuery({ villaId: 1115674 });

  const handleClick = async () => {
    const response = await fetch('/api/smoobu/manuallyUpdateReservations');

    console.log(response);
  };
  return (
    <Button
      handleClick={handleClick}
      callToAction={'Manually Update Reservations'}
    />
  );
  return;
};

export default UpdateReservations;
