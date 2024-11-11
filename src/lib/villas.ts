import {
  akashaFront,
  akashaPool,
  akashaKitchen,
  akashaBed,
  akashaBathroom,
  akashaNameImage,
  chandraFront,
  chandraPool,
  chandraKitchen,
  chandraBed,
  chandraBathroom,
  chandraHammock,
  chandraNameImage,
  jalaFront,
  jalaPool,
  jalaKitchen,
  jalaBed,
  jalaBathroom,
  jalaNameImage,
  suryaFront,
  suryaPool,
  suryaKitchen,
  suryaBed,
  suryaBathroom,
  suryaNameImage,
  lakshmiPool,
  lakshmiKitchen,
  lakshmiBedroom1,
  lakshmiBedroom2,
  lakshmiBathroom,
  lakshmiNameImage,
  suryaMainImage,
} from '~/lib/images';

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
  nameDescription: string;
  sanskrit: string;
  details: string;
  shortDescription: string;
  defaultImage: string;
  beds: string;
  baths: string;
  adults: string;
  images: {
    src: string;
    alt: string;
  }[];
  nameImage: string;
  maxGuests: {
    adults: number;
    children: number;
  };
  amenities: string[];
  keyDetails: string[];
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
    nameDescription: `Representing the radiant and powerful energy of the sun, Surya Villa is a space designed to infuse your stay with warmth and vitality. The name honors the sun as a symbol of life and light, encouraging you to embrace your own inner radiance and vitality as you enjoy the vibrant atmosphere of Surya Villa.`,
    sanskrit: 'सूर्य',
    details: `Spend your days in the infinity pool and your evenings watching the sun sink into the mountainous landscape from your private deck. Villa Surya offers a luxurious experience with a spacious bedroom, an en-suite bathroom, and a comfortable couch that can be used as an additional bed. The villa also features a kitchenette for your convenience, a private infinity pool with breathtaking views, and an outdoor deck perfect for soaking in the serene surroundings.`,
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: suryaMainImage.src,
    beds: '1-2',
    baths: '1',
    adults: '3',
    images: [
      {
        src: suryaMainImage.src,
        alt: suryaMainImage.alt,
      },
      {
        src: suryaFront.src,
        alt: suryaFront.alt,
      },
      {
        src: suryaPool.src,
        alt: suryaPool.alt,
      },
      {
        src: suryaKitchen.src,
        alt: suryaKitchen.alt,
      },
      {
        src: suryaBed.src,
        alt: suryaBed.alt,
      },
      {
        src: suryaBathroom.src,
        alt: suryaBathroom.alt,
      },
    ],
    nameImage: suryaNameImage.src,
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'kitchen',
      'pool',
      'bath',
      'shower',
      'safetydeposit',
      'security',
      'tv',
      'toiletries',
      'bathrobes',
      'wifi',
      'parking',
      'service',
      'garden',
      'mosquito',
      'bluetooth',
      'fans',
      'workspace',
      'breakfast',
    ],
    keyDetails: [
      '1 bedroom',
      'Ensuite bathroom',
      'Private Infinity Pool',
      'Dedicated workspace',
      'Full kitchenette',
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
    nameDescription: `Chandra, meaning “moon” in Sanskrit, symbolizes tranquility, reflection, and the soothing energy of the night. Chandra Villa is named to capture the serene ambiance of moonlit nights, offering a space for introspection and deep relaxation. Embrace the calming influence of Chandra Villa as you embark on your journey to inner peace.`,
    sanskrit: 'चन्द्र',
    details: `Designed for romantic getaways, Villa Chandra offers an intimate retreat surrounded by nature. This one-bedroom villa features an outdoor hammock hanging over the forest and a luxurious bathtub that can be filled with flowers. The villa includes a spacious bedroom, en-suite bathroom, kitchenette, private infinity pool with stunning views, and an outdoor lounging area perfect for relaxation.`,
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: chandraFront.src,
    beds: '1',
    baths: '1',
    adults: '2',
    images: [
      {
        src: chandraFront.src,
        alt: chandraFront.alt,
      },
      {
        src: chandraPool.src,
        alt: chandraPool.alt,
      },
      {
        src: chandraKitchen.src,
        alt: chandraKitchen.alt,
      },
      {
        src: chandraBed.src,
        alt: chandraBed.alt,
      },
      {
        src: chandraBathroom.src,
        alt: chandraBathroom.alt,
      },
      {
        src: chandraHammock.src,
        alt: chandraHammock.alt,
      },
    ],
    nameImage: chandraNameImage.src,
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'kitchen',
      'pool',
      'bath',
      'shower',
      'safetydeposit',
      'security',
      'tv',
      'toiletries',
      'bathrobes',
      'wifi',
      'parking',
      'service',
      'garden',
      'mosquito',
      'bluetooth',
      'fans',
      'workspace',
      'breakfast',
      'hammock',
    ],
    keyDetails: [
      '1 bedroom',
      'Ensuite bathroom',
      'Private Infinity Pool',
      'Dedicated workspace',
      'Full kitchenette',
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
    nameDescription: `Derived from the Sanskrit word for “water,” Jala Villa evokes a sense of fluidity and adaptability. Water represents the flow of life and the power of transformation.`,
    sanskrit: 'जल',
    details: `Villa Jala is a quaint and cozy retreat, ideal for those seeking a homely and intimate experience. This one-bedroom villa includes a comfortable bedroom, en-suite bathroom with modern amenities, kitchenette for preparing light meals, private infinity pool offering serene views, and an outdoor seating area for enjoying the tranquil surroundings.`,
    shortDescription: '1-bedroom villa with a luxury king-sized bed',
    defaultImage: jalaFront.src,
    beds: '1',
    baths: '1',
    adults: '2',
    images: [
      {
        src: jalaFront.src,
        alt: jalaFront.alt,
      },
      { src: jalaPool.src, alt: jalaPool.alt },
      { src: jalaKitchen.src, alt: jalaKitchen.alt },
      { src: jalaBed.src, alt: jalaBed.alt },
      { src: jalaBathroom.src, alt: jalaBathroom.alt },
    ],
    nameImage: jalaNameImage.src,
    maxGuests: {
      adults: 2,
      children: 2,
    },
    amenities: [
      'kitchen',
      'pool',
      'bath',
      'shower',
      'safetydeposit',
      'security',
      'tv',
      'toiletries',
      'bathrobes',
      'wifi',
      'parking',
      'service',
      'garden',
      'mosquito',
      'bluetooth',
      'fans',
      'workspace',
      'breakfast',
    ],
    keyDetails: [
      '1 bedroom',
      'Ensuite bathroom',
      'Private Infinity Pool',
      'Dedicated workspace',
      'Full kitchenette',
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
    nameDescription: `Akasha, in Sanskrit, translates to “ether” or “spirit.” This villa is named to embody the essence of space and boundless energy. Just as the vastness of the sky knows no limits, Akasha Villa invites you to expand your horizons, connect with your inner self, and find serenity in the limitless possibilities of your journey.`,
    sanskrit: 'आकाश',
    details: `Akasha, in Sanskrit, translates to “ether” or “spirit.” This villa is named to embody the essence of space and boundless energy. Just as the vastness of the sky knows no limits, Akasha Villa invites you to expand your horizons, connect with your inner self, and find serenity in the limitless possibilities of your journey.`,
    shortDescription: '3-bedroom villa up to 6 adults and 2 children',
    defaultImage: akashaFront.src,
    beds: '3-5',
    baths: '3.5',
    adults: '8',
    images: [
      { src: akashaFront.src, alt: akashaFront.alt },
      { src: akashaPool.src, alt: akashaPool.alt },
      { src: akashaKitchen.src, alt: akashaKitchen.alt },
      { src: akashaBed.src, alt: akashaBed.alt },
      { src: akashaBathroom.src, alt: akashaBathroom.alt },
    ],
    nameImage: akashaNameImage.src,
    maxGuests: {
      adults: 6,
      children: 2,
    },
    amenities: [
      'kitchen',
      'pool',
      'bath',
      'shower',
      'safetydeposit',
      'security',
      'tv',
      'toiletries',
      'bathrobes',
      'wifi',
      'parking',
      'service',
      'garden',
      'mosquito',
      'bluetooth',
      'events',
      'fans',
      'workspace',
      'breakfast',
    ],
    keyDetails: [
      '3 bedroom',
      'Ensuite bathrooms',
      'Full kitchenette',
      'Entertainment areas',
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
    nameDescription: `Named after the Hindu goddess of wealth, prosperity, and fortune, Lakshmi Villa embodies the essence of abundance and grace. The name Lakshmi signifies not only material wealth but also spiritual prosperity and beauty. Staying at Lakshmi Villa invites you to bask in the luxurious surroundings and find harmony and balance in your life. Embrace the serene ambiance and rejuvenating energy of Lakshmi Villa as you immerse yourself in a truly opulent and enriching experience.`,
    sanskrit: 'लक्ष्मी',
    details: `Villa Lakshmi, the downstairs portion of Akasha Villa, provides a luxurious and private experience with all the necessary amenities for a comfortable stay. This villa features two bedrooms, each with a private bathroom and garden, an additional half bath off the kitchen, a fully equipped kitchen, a huge private infinity pool, a large dining area, a bar area, and two lounge areas, one with a television and the other offering incredible views over the rice fields.`,
    shortDescription: '2-bedroom villa 2 queen size beds',
    defaultImage: lakshmiKitchen.src,
    beds: '2-4',
    baths: '2.5',
    adults: '4',
    images: [
      { src: lakshmiPool.src, alt: lakshmiPool.alt },
      { src: lakshmiKitchen.src, alt: lakshmiKitchen.alt },
      { src: lakshmiBedroom1.src, alt: lakshmiBedroom1.alt },
      { src: lakshmiBedroom2.src, alt: lakshmiBedroom2.alt },
      { src: lakshmiBathroom.src, alt: lakshmiBathroom.alt },
    ],
    nameImage: lakshmiNameImage.src,
    maxGuests: {
      adults: 4,
      children: 2,
    },
    amenities: [
      'kitchen',
      'pool',
      'bath',
      'shower',
      'safetydeposit',
      'security',
      'tv',
      'toiletries',
      'bathrobes',
      'wifi',
      'parking',
      'service',
      'garden',
      'mosquito',
      'bluetooth',
      'events',
      'fans',
      'workspace',
      'breakfast',
    ],
    keyDetails: [
      '2 bedroom',
      'Ensuite bathrooms',
      'Full kitchenette',
      'Entertainment areas',
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
