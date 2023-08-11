import NextVilla from '~/app/villas/[villaName]/NextVilla';
import styles from './styles.module.scss';
import GridGallery from '../[villaName]/GridGallery';
import DateContainer from './DateContainer';
import Link from 'next/link';
import VillaDetails from '../[villaName]/VillaDetails';
import { type VillaName } from '~/utils/smoobu';

function Page({ params: { villaName } }: { params: { villaName: VillaName } }) {
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
        >{`Book ${villaName.toString()}`}</Link>
        <VillaDetails villaName={villaName} />
      </section>
      <section className={styles.rightContainer}>
        <GridGallery />
      </section>
    </main>
  );
}

export default Page;
