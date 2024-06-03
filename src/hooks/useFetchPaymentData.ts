import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { confirmXenditPayment } from '~/actions/xendit';
import { useXenditStore } from '~/stores/xenditStore';
import { useUserStore } from '~/providers/UserStoreProvider';
import type { UserStore } from '~/stores/userStore';
import type { VillaIdsType } from '~/lib/villas';

import { sendBookingConfirmation } from '~/actions/sendgrid';

import { createReservation } from '~/actions/smoobu/createReservation';
import { createBookingConfirmationData } from '~/utils/sendgrid';

import { updateReservation } from '~/actions/reservations/updateReservation';
import { createReservationData } from '~/utils/smoobu/createReservationData';
import usePrevious from './usePrevious';
// Assuming the necessary types are defined elsewhere

export type PaymentData = {
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
  reservationId: string;
};

const useFetchPaymentData = ({
  paymentData,
  setIsProcessing,
  reservationId,
}: useFetchPaymentProps) => {
  const { token, setToken, paymentSuccess, setPaymentSuccess } =
    useXenditStore();
  const { user } = useUserStore((state) => state);
  const router = useRouter();

  // const previousPaymentData = usePrevious(paymentData);

  const fetchPayment = useCallback(
    async ({ token, user }: { token: string; user: UserStore['user'] }) => {
      // if (previousPaymentData !== paymentData) {
      //   console.log(`Payment Data has changes:`);
      //   console.log({ paymentData });
      //   console.log({ previousPaymentData });
      //   console.log(
      //     JSON.stringify(paymentData) === JSON.stringify(previousPaymentData)
      //   );
      // }

      if (token && user) {
        console.log('Fetching Payment');
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
          setPaymentSuccess(payment.success);
          setToken(null); // Reset the token after successful payment
          console.log('Payment success:', payment.success);

          // if (payment.success && payment.paymentId) {
          //   // Create the reservation
          //   const reservationData = createReservationData({
          //     user,
          //     paymentData,
          //     externalId: payment.paymentId,
          //   });

          //   const smoobuId = await createReservation({
          //     data: reservationData,
          //     reservationId,
          //   });

          //   // Send the booking confirmation
          //   const bookingConfirmationData = createBookingConfirmationData({
          //     user,
          //     paymentData,
          //   });

          //   await sendBookingConfirmation({ data: bookingConfirmationData });

          //   await updateReservation({
          //     reservationId,
          //     data: {
          //       smoobu_id: Number(smoobuId),
          //       guest_name: user.fullName,
          //       email: user.email,
          //       phone: user.phone,
          //       adults: user.adults,
          //       children: user.children,
          //       note: payment.paymentId,
          //       amount: paymentData.totalIDR,
          //       currency: paymentData.currency,
          //     },
          //   });

          //   router.push(`/success?reservationId=${reservationId}`);

          // } else {
          //   console.log('Payment failed', payment);
          //   throw new Error('Payment Failed');
          // }
        } catch (error) {
          console.log('Failed to fetch payment data:', error);
          // Optionally, handle the error state here
        } finally {
          setIsProcessing(false);
        }
      }
    },
    [
      setIsProcessing,
      paymentData,
      setPaymentSuccess,
      setToken,
      // reservationId,
      // router,
    ]
  );

  // const previousToken = usePrevious(token);
  // const previousUser = usePrevious(user);
  // const previousFetchPayment = usePrevious(fetchPayment);

  useEffect(() => {
    if (token && user) {
      void fetchPayment({ token, user });
    }
  }, [token, user, fetchPayment]);
};

export default useFetchPaymentData;
