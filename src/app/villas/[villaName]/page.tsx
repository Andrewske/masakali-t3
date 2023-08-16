import NextVilla from '~/app/villas/[villaName]/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '../[villaName]/GridGallery';
import DateContainer from './DateContainer';
import Link from 'next/link';
import VillaDetails from '../[villaName]/VillaDetails';
import { villas } from '~/utils/smoobu';
import { prisma } from '~/app/api/db';
import { getDisabledDates } from '~/utils/reservations';

export type VillaDataType = {
  name: string;
  description: string;
  amenities: string;
};

const today = new Date();

async function Page({
  params: { villaName },
}: {
  params: { villaName: string };
}) {
  const villaData = (await prisma.villa.findUnique({
    where: { name: villaName },
    select: { description: true, amenities: true },
  })) as VillaDataType;

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
        <VillaDetails villaData={villaData} />
      </section>
      <section className={styles.rightContainer}>
        <GridGallery />
      </section>
    </main>
  );
}

export default Page;
