'use client';
import type { VillaNamesType } from '~/lib/villas';
import { useRouter } from 'next/navigation';

const GoToVillaButton = ({ villaName }: { villaName: VillaNamesType }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/villas/${villaName}`)}>
      <a className="bg-purple text-white px-8 py-4 uppercase">Book Now</a>
    </button>
  );
};

export default GoToVillaButton;
