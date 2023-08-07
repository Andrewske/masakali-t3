import { prisma } from '~/server/db';
import NextVilla from '~/components/VillasPage/NextVilla';
import Button from '~/components/Button';
import styles from './styles.module.scss';
import { format } from 'date-fns';
import GridGallery from '../GridGallery';
import DateContainer from '../DateContainer';
/**
 * Retrieves the data for a specific villa.
 *
 * @param {object} params - The parameters object.
 * @param {string} params.villaName - The name of the villa.
 * @return {Promise<void>} A promise that resolves when the data is retrieved.
 */
export default function VillaPage({
  params: { villaName },
}: {
  params: { villaName: string };
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <NextVilla currentVillaName={villaName} />
        <DateContainer villaName={villaName} />
      </div>
      <div className={styles.rightContainer}>
        <GridGallery />
      </div>
    </div>
  );
}
