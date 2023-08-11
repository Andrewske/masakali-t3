import NextVilla from '~/app/villas/[villaName]/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '../[villaName]/GridGallery';
import DateContainer from './DateContainer';
import Link from 'next/link';
import { prisma } from '~/app/api/db';
import VillaDetails from '../[villaName]/VillaDetails';

/**
 * Retrieves the data for a specific villa.
 *
 * @param {object} params - The parameters object.
 * @param {string} params.villaName - The name of the villa.
 * @return {Promise<void>} A promise that resolves when the data is retrieved.
 */

type VillaDataType = {
  description: string;
  amenities: string;
};
export default async function VillaPage({
  params: { villaName },
}: {
  params: { villaName: string };
}) {
  const villaData = (await prisma.villa.findUnique({
    where: { name: villaName },
    select: { description: true, amenities: true },
  })) as VillaDataType;

  return (
    <main className={styles.wrapper}>
      <section
        className={styles.leftContainer}
        id="villa-info"
      >
        <NextVilla currentVillaName={villaName} />
        <DateContainer villaName={villaName} />
        <Link
          href="/cart"
          className="button purple"
        >{`Book ${villaName}`}</Link>
        <VillaDetails villaData={villaData} />
      </section>
      <section className={styles.rightContainer}>
        <GridGallery />
      </section>
    </main>
  );
}
