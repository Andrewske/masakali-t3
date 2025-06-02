'use client';
import { useRouter } from 'next/navigation';

const ExploreVillasButton = () => {
  const router = useRouter();

  return (
    <button
      className="z-10 uppercase font-montserrat text-xl px-8 py-2 mx-auto bg-purple text-white"
      onClick={() => router.push('/villas')}
      type="button"
    >
      Explore Our Villas
    </button>
  );
};

export default ExploreVillasButton;
