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

import {
  sendAdminBookingConfirmation,
  sendBookingConfirmation,
} from '~/actions/sendgrid';

import { createReservation } from '~/actions/smoobu/createReservation';
import { createBookingConfirmationData } from '~/utils/sendgrid';

import { updateReservation } from '~/actions/reservations/updateReservation';
import { createReservationData } from '~/utils/smoobu/createReservationData';
import { useToast } from '~/components/ui/use-toast';
import { useCurrencyStore } from '~/providers/CurrencyStoreProvider';

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
  const { token, setToken, setPaymentSuccess } = useXenditStore();
  const { conversionRate } = useCurrencyStore((state) => state);
  const { user } = useUserStore((state) => state);
  const router = useRouter();
  const { toast } = useToast();

  const fetchPayment = useCallback(
    async ({ token, user }: { token: string; user: UserStore['user'] }) => {
      if (token && user) {
        console.log('Fetching Payment');
        try {
          setIsProcessing(true);
          const payment = await confirmXenditPayment({
            token,
            user,
            totalIDR: paymentData.totalIDR,
          });
          setPaymentSuccess(payment.success);
          setToken(null); // Reset the token after successful payment
          console.log('Payment success:', payment.success);

          if (payment.success && payment.paymentId) {
            // Create the reservation
            const reservationData = createReservationData({
              user,
              paymentData,
              externalId: payment.paymentId,
            });

            const smoobuId = await createReservation({
              data: reservationData,
              reservationId,
            });

            await sendBookingConfirmation({
              data: createBookingConfirmationData({
                user,
                paymentData,
                conversionRate,
              }),
            });

            await sendAdminBookingConfirmation({
              data: createBookingConfirmationData({
                user,
                paymentData,
                isAdmin: true,
              }),
            });

            await updateReservation({
              reservationId,
              data: {
                smoobu_id: Number(smoobuId),
                guest_name: user.fullName,
                email: user.email,
                phone: user.phone,
                adults: user.adults,
                children: user.children,
                note: payment.paymentId,
                amount: paymentData.totalIDR,
                currency: paymentData.currency,
              },
            });

            router.push(`/success?reservationId=${reservationId}`);
          } else {
            throw new Error('Payment Failed');
          }
        } catch (error) {
          toast({
            title: 'Payment Failed',
            description:
              'Please try again or contact admin@masakaliretreat.com',
          });
          console.log('Failed to fetch payment data:', error);
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
      reservationId,
      router,
      toast,
      conversionRate,
    ]
  );

  useEffect(() => {
    if (token && user) {
      void fetchPayment({ token, user });
    }
  }, [token, user, fetchPayment]);
};

export default useFetchPaymentData;
