'use server';
import CartForm from './CartForm';
import CartDetails from './CartDetails';
import { type VillaIdsType } from '~/lib/villas';
import { getVillaDetails, getVillaPricing } from '~/actions/cart';
import CartImage from './CartImage';
import { getCountries } from '~/actions/countries';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    villaId: string;
  };
}) {
  const villaId = parseInt(searchParams.villaId) as VillaIdsType;

  const villa = getVillaDetails(villaId);

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
            />
          </span>
        </div>
      </span>
    </section>
  );
}
