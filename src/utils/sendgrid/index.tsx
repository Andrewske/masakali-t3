import { format } from 'date-fns';
import type { PaymentData } from '~/hooks/useFetchPaymentData';
import type { UserState } from '~/stores/userStore';
import { formatCurrency } from '../helpers';

export const createBookingConfirmationData = ({
  user,
  paymentData,
}: {
  user: UserState['user'];
  paymentData: PaymentData;
}) => {
  //   console.log({ user, paymentData });
  const currency = paymentData.currency;
  return {
    name: user.fullName,
    email: user.email,
    country: user.address.country,
    villaName: paymentData.villaName,
    startDate: format(paymentData.checkin, 'MMMM d yyyy'),
    endDate: format(paymentData.checkout, 'MMMM d yyyy'),
    numDays: paymentData.numNights,
    pricePerNight: formatCurrency(paymentData.pricePerNight, currency),
    discount: formatCurrency(paymentData.discount, currency),
    taxes: formatCurrency(paymentData.taxes, currency),
    total: formatCurrency(paymentData.finalPrice, currency),
  };
};
