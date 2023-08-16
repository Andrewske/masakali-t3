import capitalize from 'lodash/capitalize';
import Link from 'next/link';
import { villas, type VillaName } from '~/utils/smoobu';
import styles from './styles.module.scss';

export default function NextVilla({
  currentVillaName,
}: {
  currentVillaName: string;
}) {
  return (
    <Link href={`/villas/${nextVilla(currentVillaName)}`}>
      <h1 className={styles.title}>{capitalize(currentVillaName)} Villa</h1>
    </Link>
  );
}

const nextVilla = (currentVillaName: string) => {
  const villaNames = Object.keys(villas);

  const indexOfCurrentVilla = villaNames.findIndex(
    (villa) => villa === currentVillaName
  );

  return villaNames[indexOfCurrentVilla + (1 % villaNames.length)] ?? 'surya';
};
