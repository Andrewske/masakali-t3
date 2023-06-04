import Button from '../../Button';

import { api } from '~/utils/api';

const UpdateReservations = () => {
  const data = api.smoobu.getFutureReservations.useQuery({ villaId: 1115674 });

  const handleClick = () => {
    return;
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
