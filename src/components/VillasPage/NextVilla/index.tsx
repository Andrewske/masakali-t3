import { AiOutlineRight } from 'react-icons/ai';
import { prisma } from '~/server/db';
import capitalize from 'lodash/capitalize';
import Link from 'next/link';
export default async function NextVilla({
  currentVillaName,
}: {
  currentVillaName: string;
}) {
  const defaultVilla = 'surya';
  const villaData = await prisma.villa.findMany();

  const nextVilla = () => {
    if (villaData) {
      const indexOfCurrentVilla = villaData.findIndex(
        (villa) => villa.name === currentVillaName
      );

      return (
        villaData[indexOfCurrentVilla + (1 % villaData.length)]?.name ??
        defaultVilla
      );
    }

    return defaultVilla;
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
