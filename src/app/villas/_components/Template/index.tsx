import NextVilla from '~/app/villas/_components/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '~/app/villas/_components/GridGallery';
import DateContainer from '~/app/villas/_components/DateContainer';
import Link from 'next/link';
import VillaDetails from '~/app/villas/_components/VillaDetails';
import { villas } from '~/utils/smoobu';
import { prisma } from '~/app/api/db';
import { getDisabledDates } from '~/utils/reservations';

export type VillaDataType = {
  villaName: string;
  description: string;
  amenities: string;
};

const today = new Date();

async function Template({ villaName, description, amenities }: VillaDataType) {
  const villaId = villas.get(villaName)?.id;

  const disabledDates = await prisma.reservation
    .findMany({
      where: {
        villaId,
        departure: {
          gte: today.toISOString(),
        },
      },
    })
    .then((reservations) => {
      return getDisabledDates(reservations, villaId);
    });

  return (
    <main className={styles.wrapper}>
      <section
        className={styles.leftContainer}
        id="villa-info"
      >
        <NextVilla currentVillaName={villaName} />
        <DateContainer disabledDates={disabledDates} />
        <Link
          href="/cart"
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
