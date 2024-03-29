import NextVilla from '~/app/villas/_components/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '~/app/villas/_components/GridGallery';
import DateContainer from '~/app/villas/_components/DateContainer';
import Link from 'next/link';
import VillaDetails from '~/app/villas/_components/VillaDetails';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { getDisabledDatesForVilla } from '~/actions/smoobu';
import { prisma } from '~/db/prisma';
import { type VillaPricingType } from '~/utils/pricing';

export type VillaDataType = {
  villaId: VillaIdsType;
  description: string;
  amenities: string;
  checkin: string;
  checkout: string;
};

async function Template({ description, amenities, villaId }: VillaDataType) {
  const villaName = getVillaName(villaId);

  const { disabledDates, checkoutDates } = await getDisabledDatesForVilla(
    villaId
  );

  const villaPricing = (await prisma.villaPricing.findMany({
    where: {
      villaId: Number(villaId),
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

  // fix styling with tailwind
  return (
    <main className="w-full h-screen flex flex-wrap">
      <section
        className="flex w-1/3 p-8 flex-col gap-4 justify-center items-center relative"
        id="villa-info"
      >
        <NextVilla currentVillaName={villaName} />
        <DateContainer
          disabledDates={disabledDates}
          villaPricing={villaPricing}
          checkoutDates={checkoutDates}
        />
        <Link
          href={`/cart?&villaId=${villaId}`}
          className="button purple"
        >{`Book ${villaName.toString()}`}</Link>
        <VillaDetails
          description={description}
          amenities={amenities}
        />
      </section>
      <section className={styles.rightContainer}>
        <GridGallery />
      </section>
    </main>
  );
}

export default Template;
