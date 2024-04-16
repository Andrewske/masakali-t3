import { useEffect } from 'react';
import { confirmXenditPayment } from '~/actions/xendit';
import { useXenditStore } from '~/stores/xenditStore';
import { useUserStore } from '~/providers/UserStoreProvider';
import type { UserState, UserStore } from '~/stores/userStore';
import type { VillaIdsType } from '~/lib/villas';
import { logError } from '~/utils/logError';

// Assuming the necessary types are defined elsewhere
type PaymentData = {
  user: UserStore['user']; // Replace UserType with the actual type of your user object
  totalIDR: number;
  villaId: VillaIdsType;
  villaName: string;
  checkin: Date;
  checkout: Date;
  numNights: number;
  finalPrice: number;
  pricePerNight: number;
  discount: number;
  taxes: number;
  currency: string;
};

const useFetchPaymentData = (paymentData: PaymentData) => {
  const { token, setToken, paymentSuccess, setPaymentSuccess } =
    useXenditStore();
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    const fetchPayment = async () => {
      if (token && user) {
        try {
          const payment = await confirmXenditPayment({
            token,
            user,
            reservation: {
              villaId: paymentData.villaId,
              villaName: paymentData.villaName,
              checkin: paymentData.checkin,
              checkout: paymentData.checkout,
              numNights: paymentData.numNights,
              finalPrice: paymentData.finalPrice,
              pricePerNight: paymentData.pricePerNight,
              discount: paymentData.discount,
              taxes: paymentData.taxes,
              totalIDR: paymentData.totalIDR,
              currency: paymentData.currency,
            },
          });
          setPaymentSuccess(payment);
          setToken(null); // Reset the token after successful payment
        } catch (error) {
          console.error('Failed to fetch payment data:', error);
          // Optionally, handle the error state here
        }
      }
    };

    void fetchPayment();
  }, [token, user, setToken, setPaymentSuccess, paymentData]);

  useEffect(() => {
    if (paymentSuccess) {
      console.log('Payment success');
    } else {
      logError({ message: 'Payment Failed', level: 'error', data: { user } });
    }
  }, [paymentSuccess, user]);
};

export default useFetchPaymentData;
