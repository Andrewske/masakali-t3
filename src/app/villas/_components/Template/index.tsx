import NextVilla from '~/app/villas/_components/NextVilla';
import GridGallery from '~/app/villas/_components/GridGallery';
import DateContainer from '~/app/villas/_components/DateContainer';
import VillaDetails from '~/app/villas/_components/VillaDetails';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { getDisabledDatesForVilla } from '~/actions/smoobu';
import { prisma } from '~/db/prisma';
import { type VillaPricingType } from '~/utils/pricing';
import { Suspense } from 'react';
import { getCountries } from '~/actions/countries';

export type VillaDataType = {
  villaId: VillaIdsType;
};

async function Template({ villaId }: VillaDataType) {
  const villaName = getVillaName(villaId);

  const { disabledDates } = await getDisabledDatesForVilla(villaId);

  const villaPricing = (await prisma.villa_pricing.findMany({
    where: {
      villa_id: Number(villaId),
      price: {
        not: null,
      },
    },
    select: {
      date: true,
      price: true,
      available: true,
    },
  })) as VillaPricingType[];

  const countries = await getCountries();
  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-3">
      <section
        className="flex p-4 sm:p-8 lg:col-span-1 w-full bg-white flex-col gap-4 justify-center items-center relative"
        id="villa-info"
      >
        <NextVilla currentVillaName={villaName} />

        <DateContainer
          disabledDates={disabledDates}
          villaPricing={villaPricing}
          countries={countries}
          villaId={villaId}
        />
        {/* <Link
          href={`/cart?&villaId=${villaId}`}
          className="button purple"
        >{`Book ${villaName.toString()}`}</Link> */}

        <VillaDetails villaId={villaId} />
      </section>
      <section className="col-span-2">
        <GridGallery villaName={villaName} />
      </section>
    </main>
  );
}

export default Template;
