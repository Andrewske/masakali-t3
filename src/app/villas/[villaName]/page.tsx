import NextVilla from '~/app/villas/[villaName]/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '../[villaName]/GridGallery';
import DateContainer from './DateContainer';
import Link from 'next/link';
import VillaDetails from '../[villaName]/VillaDetails';
import { villas, type VillaName } from '~/utils/smoobu';
import { getDatesBetweenDates } from '~/utils';
import { prisma } from '~/server/api/db';

export type VillaDataType = {
  description: string;
  amenities: string;
};

async function Page({
  params: { villaName },
}: {
  params: { villaName: VillaName };
}) {
  const villaData = (await prisma.villa.findUnique({
    where: { name: villaName },
    select: { description: true, amenities: true },
  })) as VillaDataType;

  const disabledDates = await prisma.reservation
    .findMany({
      where: {
        villaId: villas[villaName],
        departure: {
          gte: new Date(),
        },
      },
      select: {
        arrival: true,
        departure: true,
      },
    })
    .then((reservations) => {
      return reservations
        .map(({ arrival, departure }) => {
          return getDatesBetweenDates(arrival, departure);
        })
        .flat();
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
        <VillaDetails villaData={villaData} />
      </section>
      <section className={styles.rightContainer}>
        <GridGallery />
      </section>
    </main>
  );
}

export default Page;
