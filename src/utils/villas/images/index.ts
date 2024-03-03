import { getVillaName, type VillaIdsType } from '~/lib/villas';
import AkashaFront from '~/../public/hero-images/akasha-front.webp';
import AkashaPool from '~/../public/hero-images/akasha-pool.webp';
import AkashaKitchen from '~/../public/hero-images/akasha-kitchen.webp';
import AkashaBed from '~/../public/hero-images/akasha-bed.webp';
import AkashaBathroom from '~/../public/hero-images/akasha-bathroom.webp';

const villaImages = {
  akasha: {
    images: [
      {
        src: AkashaFront,
        alt: 'Akasha at Masakali view from the front',
      },
      {
        src: AkashaPool,
        alt: 'Akasha at Masakali view of the pool',
      },
      {
        src: AkashaKitchen,
        alt: 'Akasha at Masakali view of the kitchen',
      },
      {
        src: AkashaBed,
        alt: 'Akasha at Masakali view of the bed',
      },
      {
        src: AkashaBathroom,
        alt: 'Akasha at Masakali view of the bathroom',
      },
      {
        src: AkashaBed,
        alt: 'Akasha at Masakali view of the bathroom 2',
      },
    ],
    mainImgage: {
      src: AkashaFront,
      alt: 'Akasha at Masakali view from the front',
    },
  },
};

export const getMainImage = (villaId: VillaIdsType) => {
  const villaName = getVillaName(villaId) as keyof typeof villaImages;

  return villaImages[villaName].mainImgage;
};
