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
  amenities: string[];
  reviews: {
    imgUrl: string;
    name: string;
    reviewText: string;
    date: string;
  }[];
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
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: '/surya/surya-main.webp',
    images: [
      {
        src: '/surya/surya-main.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/surya/surya-pool-view.webp',
        alt: 'Surya at Masakali view of the pool',
      },
      {
        src: '/surya/surya-kitchen.webp',
        alt: 'Surya at Masakali view of the kitchen',
      },
      {
        src: '/surya/surya-bed.webp',
        alt: 'Surya at Masakali view of the bed',
      },
      {
        src: '/surya/surya-bath.webp',
        alt: 'Surya at Masakali view of the bathroom',
      },
      {
        src: '/surya/surya-front.webp',
        alt: 'Surya at Masakali view of the front',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'Wifi 100 mb/s',
      'Private infinity pool',
      'Garden view',
      'Outdoor shower',
      'Mosquito net',
      'Bluetooth speaker system',
      'Suitable for events',
      'Portable fans',
      'Dedicated workspace',
      'Full kitchenette',
      'Breakfast included',
    ],
    reviews: [
      {
        imgUrl:
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/eb/43/default-avatar-2020-11.jpg?w=100&h=-1&s=1',
        name: 'Annie West',
        reviewText:
          'This was probably the most magical place I have ever stayed. The views and the pool/room are simply perfect. The staff was super accommodating and so kind. Ira greeted us and was available on WhatsApp for any questions. This is a bit of a secluded location so we hired Kantu and he took us to a bunch of great spots for the day; waterfall, rice terrace, market, etc.\n At night the surroundings are so peaceful. The frogs and living creatures in the forest are active and lull you to sleep. The pool was nice and cool so we used it in the afternoon and evening and the backdrops and views are just incredible. \n This really is a hidden gem and I can’t wait to go back with a friend or two and rent the larger villa and stay longer. It was just magical. Thank you. ❤️',
        date: 'Feb 24',
      },
      {
        imgUrl:
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ec/3d/default-avatar-2020-1.jpg?w=100&h=-1&s=1',
        name: 'Marie Bonniere',
        reviewText:
          'Wonderful place, wonderful staff ❤️ in the middle of the rice fields - felt like we were alone there. There was a ceremony in the village nearby and the staff lend us all necessary to assist + offered guidance to the event just to make us happy :) we really had a wonderful time at the place',
        date: 'Mar 24',
      },
    ],
  },
  chandra: {
    id: chandraId,
    name: 'chandra',
    description:
      'One of our more popular villas for romantic getaways and honeymooners offers an enchanting sentiment. In addition to the luxury outdoor shower, this villa features a spacious and comfortable bath. A favorite place to relax is the outdoor hammock that hangs over the rice fields, with a perfect view of the stars at night. This villa also offers a work area with a beautiful antique desk for those who need it.',
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/chandra/chandra-pool.webp',
        alt: 'Chandra at Masakali view of the pool',
      },
      {
        src: '/chandra/chandra-bed.webp',
        alt: 'Chandra at Masakali view of the bed',
      },
      {
        src: '/chandra/chandra-bath.webp',
        alt: 'Chandra at Masakali view of the bathroom',
      },
      {
        src: '/chandra/chandra-front.webp',
        alt: 'Chandra at Masakali view of the front',
      },
      {
        src: '/chandra/chandra-hammock.webp',
        alt: 'Chandra at Masakali view of the hammock',
      },
      {
        src: '/chandra/chandra-kitchen.webp',
        alt: 'Chandra at Masakali view of the kitchen',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'Hammock',
      'Wifi 100 mb/s',
      'Private infinity pool',
      'Garden view',
      'Outdoor shower',
      'Spacious bathtub',
      'Mosquito net',
      'Bluetooth speaker',
      'Suitable for events',
      'Ceiling & portable fans',
      'Dedicated workspace',
      'Full kitchenette',
      'Breakfast included',
    ],
    reviews: [
      {
        imgUrl: 'https://avatar.iran.liara.run/public',
        name: 'Jiri Mudroch',
        reviewText:
          'We really liked this accommodation. The staff was extremely nice and always happy to help and advise us with everything. We especially have to thank our driver Kantu who spent 2 days with us and it was amazing, we learned a lot of information about Bali and he was a great guide. And the lovely Ira who arranged everything for us. The environment was absolutely great, quiet and beautiful place. We had a great time.',
        date: 'Mar 24',
      },
      {
        imgUrl: 'https://avatar.iran.liara.run/public',
        name: 'Shahbaaz Khan',
        reviewText:
          'I stayed 4 nights here and had a truly magical experience. From arrival, the villas are a relatively short walk from the road but the stafff were there ready to take my bags for me. On arrival we were given a quick brief on how it all works and ordered room service. Mornings are spectacular from Chandra villa with sunrise and the mountains announcing themselves from the clouds. The local farmers ducks make their way across the rice fields and it’s truly everything you’d expect. The room is clean beds super comfortable. But don’t forget you’re literally in the middle of the jungle. Bugs, mosquitos, lizards and geckos and the occasional dog may be seen. The net around the bed helped a lot and surprising only the 1 mosquito bite between us. Most of all tho, the staff were incredible. Ira was hosting us and went above and beyond anything I asked from her. 10/10 from all aspects of this place.',
        date: 'Mar 24',
      },
    ],
  },
  jala: {
    id: jalaId,
    name: 'jala',
    description:
      'This traditional Joglo villa is the perfect fit for a cozy stay. With personal charm and attention to detail, this alluring villa has an irresistible appeal. Jala offers a workstation with a large desk, comfy outdoor lounging areas, and a full private ensuite bathroom. The luxury bedding and linens offer a comfortable and restful sleep while the beautiful, handcrafted furniture and amenities will leave you in awe of the craftsmanship and detail.',
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/jala/jala-pool.webp',
        alt: 'Jala at Masakali view of the pool',
      },
      {
        src: '/jala/jala-kitchen.webp',
        alt: 'Jala at Masakali view of the kitchen',
      },
      {
        src: '/jala/jala-bed.webp',
        alt: 'Jala at Masakali view of the bed',
      },
      {
        src: '/jala/jala-bath.webp',
        alt: 'Jala at Masakali view of the bathroom',
      },
      {
        src: '/jala/jala-front.webp',
        alt: 'Jala at Masakali view of the bathroom',
      },
      {
        src: '/jala/jala-views.webp',
        alt: 'Jala at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 2,
      children: 2,
    },
    amenities: [
      'Wifi 100 mb/s',
      'Private infinity pool',
      'Garden view',
      'Outdoor shower',
      'Mosquito net',
      'Bluetooth speaker system',
      'Suitable for events',
      'Portable fans',
      'Dedicated workspace',
      'Full kitchenette',
      'Breakfast included',
    ],
    reviews: [
      {
        imgUrl:
          'https://lh3.googleusercontent.com/a-/ALV-UjU2wPRF4w1YdRlISqOTQ6-i8mv2MLrdEfHqAFU0jbb-FEqz8oow=s40-c-rp-mo-br100',
        name: 'Adriano Augusto',
        reviewText:
          "A beautiful place nested in rice terraces; incredible view, peace, and quiet. Totally recommend for any kind of break and retreat. I will go back for sure :) The staff is incredibly helpful and friendly, if you are looking to book a Villa around Ubud, you can't go wrong with this one!",
        date: 'Jan 24',
      },
      {
        imgUrl:
          'https://lh3.googleusercontent.com/a-/ALV-UjU2wPRF4w1YdRlISqOTQ6-i8mv2MLrdEfHqAFU0jbb-FEqz8oow=s40-c-rp-mo-br100',
        name: 'Jacob Shaw',
        reviewText:
          'Masakali Retreat was an amazing experience, we stayed in Jala and the scenery was breathtaking, the amenities were great but most importantly the people were outstanding. Ira and her team were incredibly accommodating and constantly on standby for any questions or concerns. They organised activities for us around Ubud and transport for anywhere we needed to go, thanks to the best driver around, Kantu. The food at Masakali was great including the daily complementary breakfasts which was exactly what we needed after our travels. What I enjoyed the most from our experience here was talking to the local Kelusa people, they were more than happy to share their culture and language. It was nice to be far away from touristic areas and really surround ourselves in the environment. We also had the pleasure of getting to know the resident cat Freya, they kept us company when we were relaxing at the villa. Endless appreciation and thank yous to the team at Masakali Retreat.',
        date: 'Jun 23',
      },
    ],
  },
  akasha: {
    id: akashaId,
    name: 'akasha',
    description:
      'Luxury meets comfort in our newest villa, Akasha. With 3 bedrooms and 3.5 baths, this spacious home is great for families or couples traveling. This villa features a beautiful waterfall pool, large deck, full kitchen and bar, entertainment room, outdoor living room, large dining area, and breathtaking views. This space is also great for hosting celebrations such as weddings and birthday parties.',
    shortDescription: '3-bedroom villa up to 6 adults and 2 children',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/akasha/akasha-front.webp',
        alt: 'Akasha at Masakali view of the bathroom',
      },
      {
        src: '/akasha/akasha-pool.webp',
        alt: 'Akasha at Masakali view of the pool',
      },
      {
        src: '/akasha/akasha-kitchen.webp',
        alt: 'Akasha at Masakali view of the kitchen',
      },
      {
        src: '/akasha/akasha-bed.webp',
        alt: 'Akasha at Masakali view of the bed',
      },
      {
        src: '/akasha/akasha-bathroom.webp',
        alt: 'Akasha at Masakali view of the bathroom',
      },
      {
        src: '/akasha/akasha-views.webp',
        alt: 'Akasha at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 6,
      children: 2,
    },
    amenities: [
      'Wifi 100 mb/s',
      'Private infinity pool',
      'Garden view',
      'Outdoor shower',
      'Mosquito net',
      'Bluetooth speaker system',
      'Suitable for events',
      'Portable fans',
      'Dedicated workspace',
      'Full kitchenette',
      'Breakfast included',
    ],
    reviews: [
      {
        imgUrl:
          'https://lh3.googleusercontent.com/a-/ALV-UjXcXl0Zi9DqF5U-QRYp4r8LJ6YwztHosZNQ13Evr8F8AMVCYIxp=s40-c-rp-mo-br100',
        name: 'Dan Courtney',
        reviewText:
          'Masakali was an excellent retreat villa for the honeymoon of my wife and I. The staff was incredibly attentive, helpful, and friendly, helping us plan day excursions, rent a scooter, book an in-house massage, and hosting a romantic dinner in the villa (which was delicious). The Akasha house is new and incredibly-designed and well done. There are 3 bedrooms, so a couple could definitely move to a smaller villa if desired. Guests should know before booking that this villa is open air, so you will see and hear the sounds of the jungle right outside the living room and dining room. The villa had incredibly views over a rice paddy and jungle valley. The attentive staff is really what made this stay unforgettable. Would highly recommend!',
        date: 'Dec 24',
      },
      {
        imgUrl: 'https://avatar.iran.liara.run/public',
        name: 'Jennifer Herndon',
        reviewText:
          'Masakali Retreat was by far my favorite accommodation in Bali. We stayed in Bali for 2 weeks and stayed at 5 different places. Ira and her team were amazing. Every request was quickly met. They went above and beyond in every detail. I requested a romantic dinner one night. Ira and her team set up candles and a table by the pool, so we could watch the sunset while we ate. No detail was missed. Kantu drove us around and was a great tour guide. We really enjoyed getting to know him. Our villa was very clean. The staff was very attentive. We loved being immersed in nature right in a working rice field. We truly enjoyed ourselves and we will recommend Masakali Retreat to anyone traveling to Ubud.',
        date: 'Apr 23',
      },
    ],
  },
  lakshmi: {
    id: lakshmiId,
    name: 'lakshmi',
    description:
      'Luxury meets comfort in our newest villa, Akasha. With 3 bedrooms and 3.5 baths, this spacious home is great for families or couples traveling. This villa features a beautiful waterfall pool, large deck, full kitchen and bar, entertainment room, outdoor living room, large dining area, and breathtaking views. This space is also great for hosting celebrations such as weddings and birthday parties.',
    shortDescription: '2-bedroom villa 2 queen size beds',
    defaultImage: '/hero-images/akasha-pool.webp',
    images: [
      {
        src: '/lakshmi/lakshmi-bedroom-1.webp',
        alt: 'Lakshmi at Masakali view of the pool',
      },
      {
        src: '/lakshmi/lakshmi-kitchen.webp',
        alt: 'Lakshmi at Masakali view of the kitchen',
      },
      {
        src: '/lakshmi/lakshmi-bedroom-2.webp',
        alt: 'Lakshmi at Masakali view of the bed',
      },
      {
        src: '/lakshmi/lakshmi-bathroom.webp',
        alt: 'Lakshmi at Masakali view of the bathroom',
      },
      {
        src: '/lakshmi/lakshmi-pool.webp',
        alt: 'Lakshmi at Masakali view of the bathroom',
      },
      {
        src: '/lakshmi/lakshmi-bedroom-2a.webp',
        alt: 'Lakshmi at Masakali view of the bathroom',
      },
    ],
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'Wifi 100 mb/s',
      'Private infinity pool',
      'Garden view',
      'Outdoor shower',
      'Mosquito net',
      'Bluetooth speaker system',
      'Suitable for events',
      'Portable fans',
      'Dedicated workspace',
      'Full kitchenette',
      'Breakfast included',
    ],
    reviews: [
      {
        imgUrl:
          'https://lh3.googleusercontent.com/a-/ALV-UjXcXl0Zi9DqF5U-QRYp4r8LJ6YwztHosZNQ13Evr8F8AMVCYIxp=s40-c-rp-mo-br100',
        name: 'safouane ben mansour',
        reviewText:
          "Our stay in this woody villa, set against the backdrop of the stunning rice fields, was nothing short of magical. Special thanks to IRA and her exceptional staff for their kindness and impeccable service that made our stay unforgettable. The private pool was an absolute delight, and enjoying breakfast on the net was a unique pleasure. Words can hardly capture the beauty of this place. On a scale of 1 to 10, we'd rate it a thousand! Thank you for a remarkable experience! Safouane and Chayma",
        date: 'Oct 24',
      },
      {
        imgUrl: 'https://avatar.iran.liara.run/public',
        name: 'Leandra Do livramento',
        reviewText:
          'Thank you Ira for this fabulous stay. Masakali Retreat was a wonderful experience for us: The hotel is located in a quiet location, surrounded by rice fields and nature close to Ubud. The service was impeccable, the room and pool was cleaned every day and we were able to wash our laundry. We were able to enjoy our holiday thanks to the kindness of Ira and his team, thank you again.',
        date: 'Nov 24',
      },
    ],
  },
};
