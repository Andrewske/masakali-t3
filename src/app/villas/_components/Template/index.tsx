import dynamic from 'next/dynamic';

import NextVilla from '~/app/villas/_components/NextVilla';
import GridGallery from '~/app/villas/_components/GridGallery';

import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import { getDisabledDatesForVilla } from '~/actions/smoobu';
import { prisma } from '~/db/prisma';
import { type VillaPricingType } from '~/utils/pricing';
import { getCountries } from '~/actions/countries';

import VillaDetails from '../VillaDetails';
import ContentContainer from '~/components/ContentContainer';

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
        </div>
        <div className="col-span-2">
          <GridGallery villaName={villaName} />
        </div>
      </div>
      <ContentContainer
        heading=""
        content={
          <div className="flex flex-col gap-4 ">
            <span className="relative h-[2.5rem] flex items-center">
              <p className="absolute top-0 left-0 text-4xl z-0 text-light-purple-5 opacity-60">
                {villaDetails[villaName].sanskrit}
              </p>
              <p className="text-xl z-10 uppercase font-montserrat">
                {villaDetails[villaName].name}
              </p>
            </span>
            <span className="max-w-[200px] border border-light-purple-5 max-h-[1px]"></span>
            <div>{villaDetails[villaName].nameDescription}</div>
          </div>
        }
        imgSrc={villaDetails[villaName].nameImage}
        imgPosition="left"
        imgAlt={`${villaDetails[villaName].name} at Masakali view of the pool`}
      />
      <VillaDetails villaName={villaName} />
    </section>
  );
}

export default Template;
