import { AiOutlineRight } from 'react-icons/ai';
import capitalize from 'lodash/capitalize';
import Link from 'next/link';
import { activeVillaIds } from '~/utils/smoobu';

export default function NextVilla({
  currentVillaName,
}: {
  currentVillaName: string;
}) {
  return (
    <Link href={`/villas/${nextVilla(currentVillaName)}`}>
      <h1>
        {capitalize(currentVillaName)} Villa <AiOutlineRight />
      </h1>
    </Link>
  );
}

const nextVilla = (currentVillaName: string) => {
  const villaNames = Object.keys(activeVillaIds);

  const indexOfCurrentVilla = villaNames.findIndex(
    (villa) => villa === currentVillaName
  );

  return villaNames[indexOfCurrentVilla + (1 % villaNames.length)] ?? 'surya';
};
