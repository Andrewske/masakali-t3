import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { confirmXenditPayment } from '~/actions/xendit';
import { useXenditStore } from '~/stores/xenditStore';
import { useUserStore } from '~/providers/UserStoreProvider';
import type { UserStore } from '~/stores/userStore';
import type { VillaIdsType } from '~/lib/villas';

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

type useFetchPaymentProps = {
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  paymentData: PaymentData;
};

const useFetchPaymentData = ({
  paymentData,
  setIsProcessing,
}: useFetchPaymentProps) => {
  const { token, setToken, paymentSuccess, setPaymentSuccess } =
    useXenditStore();
  const { user } = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    const fetchPayment = async () => {
      console.log('Fetching Payment');
      if (token && user) {
        try {
          setIsProcessing(true);
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
          console.log('Failed to fetch payment data:', error);
          // Optionally, handle the error state here
        } finally {
          setIsProcessing(false);
          router.push('/success');
        }
      }
    };

    void fetchPayment();
  }, [token]);

  useEffect(() => {
    if (paymentSuccess) {
      console.log('Payment success');
    }
  }, [paymentSuccess, user]);
};

export default useFetchPaymentData;
