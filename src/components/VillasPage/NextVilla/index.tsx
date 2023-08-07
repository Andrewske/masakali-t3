'use client';
import { AiOutlineRight } from 'react-icons/ai';
import { prisma } from '~/server/db';
import capitalize from 'lodash/capitalize';
import Link from 'next/link';
export default function NextVilla({
  currentVillaName,
}: {
  currentVillaName: string;
}) {
  const villaData = prisma.villa.findMany();

  const nextVilla = () => {
    if (villaData) {
      const indexOfCurrentVilla = villaData.findIndex(
        (villa) => villa.name === currentVillaName
      );

      return (
        villaData[indexOfCurrentVilla + (1 % villaData.length)]?.name ?? 'surya'
      );
    }
  };

  if (!villaData) return (<></>) as JSX.Element;

  return (
    <Link href={`/villas/${nextVilla()}`}>
      <h1>
        {capitalize(currentVillaName)} Villa <AiOutlineRight />
      </h1>
    </Link>
  );
}
