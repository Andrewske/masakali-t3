export const suryaId = 1115674;
export const chandraId = 1115668;
export const jalaId = 1115671;
export const akashaId = 1574678;
export const lakshmiId = 1587920;

export type VillaIdsType =
  | typeof suryaId
  | typeof chandraId
  | typeof jalaId
  | typeof akashaId
  | typeof lakshmiId;

export type VillaNamesType =
  | 'surya'
  | 'chandra'
  | 'jala'
  | 'akasha'
  | 'lakshmi';

export const villas = new Map<string, VillaIdsType>([
  ['surya', suryaId],
  ['chandra', chandraId],
  ['jala', jalaId],
  ['akasha', akashaId],
  ['lakshmi', lakshmiId],
]);

// Create a reverse map for id to name mapping
export const villaIdsMap = new Map<VillaIdsType, string>();
for (const [name, id] of villas) {
  villaIdsMap.set(id, name);
}

export const villaIdsArray: VillaIdsType[] = Array.from(villaIdsMap.keys());

export function getVillaName(villaId: VillaIdsType): VillaNamesType {
  return (villaIdsMap?.get(villaId) as VillaNamesType) ?? 'surya';
}

export function getVillaId(villaName: VillaNamesType): VillaIdsType {
  return villas?.get(villaName) ?? suryaId;
}

export const villaGuestLimits = {
  akasha: { maxGuests: 8, maxAdults: 6, maxChildren: 2 },
  surya: { maxGuests: 6, maxAdults: 4, maxChildren: 2 },
  chandra: { maxGuests: 6, maxAdults: 4, maxChildren: 2 },
  lakshmi: { maxGuests: 6, maxAdults: 4, maxChildren: 2 },
  jala: { maxGuests: 4, maxAdults: 2, maxChildren: 2 },
  // add more villas as needed
};

export type VillaDetail = {
  id: VillaIdsType;
  name: VillaNamesType;
  description: string;
  shortDescription: string;
  defaultImage: string;
  images: {
    src: string;
    alt: string;
  }[];
  maxGuests: {
    adults: number;
    children: number;
  };
};

export type VillaDetailsType = {
  [K in VillaNamesType]: VillaDetail;
};

// TODO: Description for Lakshmi
// TODO: Get Guest limits
// TODO: Write short descriptions with sizes

export const villaDetails: VillaDetailsType = {
  surya: {
    id: suryaId,
    name: 'surya',
    description:
      'Our largest 1 bedroom villa is a warm and elegant choice with ample space to rest and recharge. It has an ensuite breakfast table and features a hand-carved outdoor dining table that can seat larger groups on the private patio. Inside you’ll find a luxury king-sized mattress with high-quality bedding as well as a couch that can serve as an additional bed for an additional guest.',
    shortDescription:
      'Our largest 1-bedroom villa offers a spacious retreat with a luxury king-sized bed, additional sleeping couch, private patio with hand-carved dining table for large groups, and an ensuite breakfast table.',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/hero-images/akasha-pool.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/hero-images/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/hero-images/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/hero-images/surya-bathroom.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
  },
  chandra: {
    id: chandraId,
    name: 'chandra',
    description:
      'One of our more popular villas for romantic getaways and honeymooners offers an enchanting sentiment. In addition to the luxury outdoor shower, this villa features a spacious and comfortable bath. A favorite place to relax is the outdoor hammock that hangs over the rice fields, with a perfect view of the stars at night. This villa also offers a work area with a beautiful antique desk for those who need it.',
    shortDescription:
      'Our romantic villa, ideal for honeymooners, features a luxury outdoor shower, spacious bath, an outdoor hammock with rice field views for star-gazing, and a work area with an antique desk.',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/hero-images/surya-pool.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/hero-images/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/hero-images/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/hero-images/surya-bathroom.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
  },
  jala: {
    id: jalaId,
    name: 'jala',
    description:
      'This traditional Joglo villa is the perfect fit for a cozy stay. With personal charm and attention to detail, this alluring villa has an irresistible appeal. Jala offers a workstation with a large desk, comfy outdoor lounging areas, and a full private ensuite bathroom. The luxury bedding and linens offer a comfortable and restful sleep while the beautiful, handcrafted furniture and amenities will leave you in awe of the craftsmanship and detail.',
    shortDescription:
      'The traditional Joglo villa, Jala, combines personal charm with detailed craftsmanship, featuring a workstation, comfy outdoor lounges, private ensuite bathroom, luxury bedding, and handcrafted furniture.',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/hero-images/surya-pool.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/hero-images/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/hero-images/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/hero-images/surya-bathroom.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 2,
      children: 2,
    },
  },
  akasha: {
    id: akashaId,
    name: 'akasha',
    description:
      'Luxury meets comfort in our newest villa, Akasha. With 3 bedrooms and 3.5 baths, this spacious home is great for families or couples traveling. This villa features a beautiful waterfall pool, large deck, full kitchen and bar, entertainment room, outdoor living room, large dining area, and breathtaking views. This space is also great for hosting celebrations such as weddings and birthday parties.',
    shortDescription:
      'Akasha, our newest villa, offers luxury and comfort for up to 6 adults and 2 children, featuring 3 bedrooms, 3.5 baths, a waterfall pool, and ample space for celebrations.',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/hero-images/surya-pool.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/hero-images/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/hero-images/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/hero-images/surya-bathroom.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 6,
      children: 2,
    },
  },
  lakshmi: {
    id: lakshmiId,
    name: 'lakshmi',
    description:
      'Luxury meets comfort in our newest villa, Akasha. With 3 bedrooms and 3.5 baths, this spacious home is great for families or couples traveling. This villa features a beautiful waterfall pool, large deck, full kitchen and bar, entertainment room, outdoor living room, large dining area, and breathtaking views. This space is also great for hosting celebrations such as weddings and birthday parties.',
    shortDescription:
      'Akasha, our newest villa, offers luxury and comfort for up to 6 adults and 2 children, featuring 3 bedrooms, 3.5 baths, a waterfall pool, and ample space for celebrations.',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/hero-images/surya-pool.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/hero-images/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/hero-images/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/hero-images/surya-bathroom.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
  },
};
