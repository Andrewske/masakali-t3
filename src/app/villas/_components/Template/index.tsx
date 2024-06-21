import dynamic from 'next/dynamic';

import NextVilla from '~/app/villas/_components/NextVilla';
import GridGallery from '~/app/villas/_components/GridGallery';

import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { getDisabledDatesForVilla } from '~/actions/smoobu';
import { prisma } from '~/db/prisma';
import { type VillaPricingType } from '~/utils/pricing';
import { getCountries } from '~/actions/countries';
import Description from '../Description';
import VillaDetails from '../VillaDetails';
import ContentContainer from '~/components/ContentContainer';

import DiningImage from '~/../public/home/dining.jpg';

const DateContainer = dynamic(
  () => import('~/app/villas/_components/DateContainer'),
  { ssr: false }
);

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
    <section className="flex flex-col gap-16">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3">
        <div
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

          <Description villaName={villaName} />
        </div>
        <div className="col-span-2">
          <GridGallery villaName={villaName} />
        </div>
      </div>
      <ContentContainer
        heading=""
        content="Spend your days in the infinity pool, and your evenings watching the sun sink into the mountainous landscape from your private deck. Villa Surya is the total luxury experience."
        imgSrc={DiningImage}
        imgPosition="left"
        imgAlt="Masakali Pool"
      />
      <VillaDetails />
    </section>
  );
}

export default Template;
