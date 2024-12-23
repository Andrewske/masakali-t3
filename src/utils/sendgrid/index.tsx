import { format } from 'date-fns';
import type { PaymentData } from '~/hooks/useFetchPaymentData';
import type { UserState } from '~/stores/userStore';
import { formatCurrency } from '../helpers';

export const createBookingConfirmationData = ({
  user,
  paymentData,
  conversionRate = 1,
  isAdmin = false,
}: {
  user: UserState['user'];
  paymentData: PaymentData;
  conversionRate?: number;
  isAdmin?: boolean;
}) => {
  const currency = isAdmin ? 'IDR' : paymentData.currency;

  const calculatePrice = (price: number, factor: number) =>
    isAdmin ? price : price * factor;

  return {
    name: user.fullName,
    email: user.email,
    country: user.address.country,
    villaName: paymentData.villaName,
    startDate: format(paymentData.checkin, 'MMMM d yyyy'),
    endDate: format(paymentData.checkout, 'MMMM d yyyy'),
    numDays: paymentData.numNights,
    pricePerNight: formatCurrency(
      calculatePrice(paymentData.pricePerNight, conversionRate),
      currency
    ),
    discount: formatCurrency(
      calculatePrice(paymentData.discount, conversionRate),
      currency
    ),
    taxes: formatCurrency(
      calculatePrice(paymentData.taxes, conversionRate),
      currency
    ),
    total: formatCurrency(
      calculatePrice(paymentData.finalPrice, conversionRate),
      currency
    ),
  };
};
