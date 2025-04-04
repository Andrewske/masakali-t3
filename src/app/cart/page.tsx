import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { type VillaIdsType } from '~/lib/villas';
import { getVillaDetails, getVillaPricing } from '~/actions/cart';
import CartImage from './CartImage';
import { getCountries } from '~/actions/countries';
import { db } from '~/server/db';

export default async function Page(props: {
  searchParams: Promise<{
    villaId: string;
    reservationId: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const reservation = await db.reservation.findUnique({
    where: {
      id: searchParams.reservationId,
    },
  });

  if (!reservation) {
    return (
      <section className=" w-full grid place-items-center p-16">
        <h1>Could not find reservation</h1>
        <p>Please contact admin@masakaliretreat.com</p>
      </section>
    );
  }

  const villaId = reservation.villa_id as VillaIdsType;

  const villa = await getVillaDetails(villaId);

  const villaPricing = await getVillaPricing(villaId);

  const countries = await getCountries();

  return (
    <section className="flex flex-grow flex-col items-center h-full relative">
      {villa && <CartImage villa={villa} />}
      <span className="bg-white bg-opacity-15 p-4 flex-grow flex flex-col z-10 w-full">
        <div className="flex z-20 justify-center">
          <h1 className="bg-purple text-white text-center py-4 px-8">Cart</h1>
        </div>
        <div className="flex flex-wrap justify-center  z-20">
          <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center">
            <CartDetails
              villaId={villaId}
              villaPricing={villaPricing}
              countries={countries}
            />
          </span>
          <span className="w-full md:w-[600px] h-[600px] p-4 grid place-items-center  z-20">
            <CartForm
              villaId={villaId}
              villaPricing={villaPricing}
              reservationId={searchParams.reservationId}
            />
          </span>
        </div>
      </span>
    </section>
  );
}
