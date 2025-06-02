import Image from 'next/image';
import type { VillaDetail } from '~/lib/villas';

const CartImage = ({ villa }: { villa: VillaDetail }) => {
  return (
    <div className="absolute top-0 left-0  h-full w-full z-0">
      <Image
        src={villa?.defaultImage ?? '/villa-placeholder.webp'}
        alt={`Photo of ${villa?.name ?? ''} villa`}
        className="object-cover "
        fill={true}
        priority={true}
      />
    </div>
  );
};

export default CartImage;
