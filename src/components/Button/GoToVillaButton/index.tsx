'use client';
import type { VillaNamesType } from '~/lib/villas';
import { useRouter } from 'next/navigation';

const GoToVillaButton = ({ villaName }: { villaName: VillaNamesType }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/villas/${villaName}`)}>
      <a className="bg-white text-purple hover:bg-purple hover:text-white hover:border-white border border-solid px-8 py-4 uppercase font-montserrat">
        Book {villaName}
      </a>
    </button>
  );
};

export default GoToVillaButton;
