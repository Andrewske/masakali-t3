import { AiOutlineRight } from 'react-icons/ai';
import { prisma } from '~/server/db';
import capitalize from 'lodash/capitalize';
import Link from 'next/link';
export default async function NextVilla({
  currentVillaName,
}: {
  currentVillaName: string;
}) {
  const villaData = await prisma.villa.findMany();

  const nextVilla = () => {
    const indexOfCurrentVilla = villaData.findIndex(
      (villa) => villa.name === currentVillaName
    );

    return (
      villaData[indexOfCurrentVilla + (1 % villaData.length)]?.name ?? 'surya'
    );
  };

  if (!villaData) return <></>;

  return (
    <Link href={`/villas/${nextVilla()}`}>
      <h1>
        {capitalize(currentVillaName)} Villa <AiOutlineRight />
      </h1>
    </Link>
  );
}
