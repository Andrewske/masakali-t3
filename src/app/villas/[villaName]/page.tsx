import NextVilla from '~/app/villas/[villaName]/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '../[villaName]/GridGallery';
import DateContainer from './DateContainer';
import Link from 'next/link';
import { prisma } from '~/server/db';
import VillaDetails from '../[villaName]/VillaDetails';

/**
 * Retrieves the data for a specific villa.
 *
 * @param {object} params - The parameters object.
 * @param {string} params.villaName - The name of the villa.
 * @return {Promise<void>} A promise that resolves when the data is retrieved.
 */
export default async function VillaPage({
  params: { villaName },
}: {
  params: { villaName: string };
}) {
  const villaData = (await prisma.villa.findUnique({
    where: { name: villaName },
    select: { description: true, amenities: true },
  })) ?? { description: '', amenities: '' };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <NextVilla currentVillaName={villaName} />
        <DateContainer villaName={villaName} />
        <Link
          href="/cart"
          className="button purple"
        />
        <VillaDetails villaData={villaData} />
      </div>
      <div className={styles.rightContainer}>
        <GridGallery />
      </div>
    </div>
  );
}
