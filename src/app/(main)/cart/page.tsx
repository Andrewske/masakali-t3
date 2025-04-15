'force-dynamic';
import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { type VillaIdsType } from '~/lib/villas';
import { getVillaDetails, getVillaPricing } from '~/actions/cart';
import CartImage from './CartImage';
import { getCountries } from '~/actions/countries';
import { lookupReservation } from '~/actions/reservations/lookupReservation';
import { Suspense } from 'react';

// Separate error component for better organization
const CartError = ({
  title = "Uh oh! We've encountered an error.",
  message = 'Something went wrong while loading the pricing information.',
}) => {
  return (
    <div className="w-full h-full grid place-items-center min-h-header mt-header">
      <span className="w-full md:w-[600px]  px-4 py-8 grid place-items-center bg-white/10  shadow-dark-purple  rounded-lg">
        <div className="text-center gap-4 flex flex-col">
          <h2 className="text-2xl font-semibold text-red-500 ">{title}</h2>
          <p>{message}</p>
          <p className="!text-sm">
            Need help? Contact{' '}
            <a
              href="mailto:admin@masakaliretreat.com"
              className="text-purple hover:text-purple/80 underline"
            >
              admin@masakaliretreat.com
            </a>
          </p>
        </div>
      </span>
    </div>
  );
};

// Loading component for better UX
const CartLoading = () => (
  <div className="w-full h-full grid place-items-center">
    <div className="animate-pulse space-y-4 text-center">
      <div className="h-8 w-48 bg-white/20 rounded mx-auto" />
      <div className="h-4 w-64 bg-white/20 rounded mx-auto" />
    </div>
  </div>
);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    villaId: string;
    reservationId: string;
  }>;
}) {
  const params = await searchParams;

  const { data: reservation, error } = await lookupReservation(
    params.reservationId
  );

  if (!reservation || error) {
    return (
      <CartError
        title="Reservation Not Found"
        message="We couldn't find your reservation. Please try again."
      />
    );
  }

  const villaId = reservation?.villa_id as VillaIdsType;
  const villaPromise = getVillaDetails(villaId);
  const villaPricingPromise = getVillaPricing(villaId);
  const countriesPromise = getCountries();

  const [villa, villaPricing, countries] = await Promise.all([
    villaPromise,
    villaPricingPromise,
    countriesPromise,
  ]);

  if (!villa || !villaPricing || !countries) {
    return <CartError />;
  }

  return (
    <section className="flex flex-grow flex-col items-center h-full relative">
      <Suspense fallback={<CartLoading />}>
        {villa && <CartImage villa={villa} />}
        <span className="bg-white/15 p-4 flex-grow flex flex-col z-10 w-full backdrop-blur-sm">
          <div className="flex z-20 justify-center">
            <h1 className="bg-purple text-white text-center py-4 px-8 rounded-t">
              Cart
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4 z-20">
            <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center">
              <CartDetails
                reservation={reservation}
                countries={countries}
              />
            </span>
            <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center z-20">
              <CartForm reservation={reservation} />
            </span>
          </div>
        </span>
      </Suspense>
    </section>
  );
}
