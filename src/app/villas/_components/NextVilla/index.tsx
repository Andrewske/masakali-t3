import capitalize from 'lodash/capitalize';
import Link from 'next/link';
import { villas, type VillaNamesType } from '~/lib/villas';

export default function NextVilla({
  currentVillaName,
}: {
  currentVillaName: VillaNamesType;
}) {
  return (
    <Link
      href={`/villas/${nextVilla(currentVillaName)}`}
      className="flex align-middle py-4"
    >
      <h1 className="">{capitalize(currentVillaName)} Villa</h1>
      <span className="h-full grid place-items-center px-1 transition-all duration-75 ease-in-out hover:scale-150 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
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
