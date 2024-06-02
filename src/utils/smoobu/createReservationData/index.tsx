import type { PaymentData } from '~/hooks/useFetchPaymentData';
import type { VillaIdsType } from '~/lib/villas';
import type { UserState } from '~/stores/userStore';

export type CreateReservationPropsType = {
  villaId: VillaIdsType;
  checkin: Date;
  checkout: Date;
  finalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  country: string;
  xenditExternalId: string | null;
};

export const createReservationData = ({
  paymentData,
  user,
  externalId,
}: {
  paymentData: PaymentData;
  user: UserState['user'];
  externalId: string | null;
}) => {
  return {
    villaId: paymentData.villaId,
    checkin: paymentData.checkin,
    checkout: paymentData.checkout,
    finalPrice: paymentData.totalIDR,
    firstName: user.fullName.split(' ')[0] ?? '',
    lastName: user.fullName.split(' ')[1] ?? '',
    email: user.email,
    phone: user.phone,
    adults: user.adults,
    children: user.children,
    country: user.address.country,
    xenditExternalId: externalId,
  };
};
