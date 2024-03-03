import NextVilla from '~/app/villas/_components/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '~/app/villas/_components/GridGallery';
import DateContainer from '~/app/villas/_components/DateContainer';
import Link from 'next/link';
import VillaDetails from '~/app/villas/_components/VillaDetails';
import { getVillaName, type VillaIdsType } from '~/lib/villas';
import { getDisabledDatesForVilla } from '~/actions/smoobu';

export type VillaDataType = {
  villaId: VillaIdsType;
  description: string;
  amenities: string;
  checkIn: string;
  checkOut: string;
};

async function Template({
  description,
  amenities,
  checkIn,
  checkOut,
  villaId,
}: VillaDataType) {
  const villaName = getVillaName(villaId);

  const disabledDates = await getDisabledDatesForVilla(villaId);

  // fix styling with tailwind
  return (
    <main className="w-full flex-grow flex flex-wrap">
      <section
        className="flex w-1/3 p-8 flex-col gap-4 justify-center items-center relative"
        id="villa-info"
      >
        <NextVilla currentVillaName={villaName} />
        <DateContainer
          disabledDates={disabledDates}
          checkIn={checkIn}
          checkOut={checkOut}
        />
        <Link
          href={`/cart?checkIn=${checkIn}&checkOut=${checkOut}&villaId=${villaId}`}
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
