import capitalize from 'lodash/capitalize';
import Link from 'next/link';
import { villas, type VillaNamesType } from '~/lib/villas';
import styles from './styles.module.scss';

export default function NextVilla({
  currentVillaName,
}: {
  currentVillaName: VillaNamesType;
}) {
  return (
    <Link href={`/villas/${nextVilla(currentVillaName)}`}>
      <h1 className={styles.title}>{capitalize(currentVillaName)} Villa</h1>
    </Link>
  );
}

const nextVilla = (currentVillaName: VillaNamesType) => {
  const villaNames = Array.from(villas.keys()) as VillaNamesType[];

  const indexOfCurrentVilla = villaNames.findIndex(
    (villa) => villa === currentVillaName
  );

  return villaNames[indexOfCurrentVilla + (1 % villaNames.length)] ?? 'surya';
};
