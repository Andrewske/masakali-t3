import Link from 'next/link';
import type { VillaNamesType } from '~/lib/villas';

const BookNowButton = ({ villaName }: { villaName: VillaNamesType }) => {
  return (
    <Link
      href={`/villas/${villaName}`}
      className="font- bg-purple text-white text-center text-2xl p-2"
    >
      Book Now
    </Link>
  );
};

export default BookNowButton;
