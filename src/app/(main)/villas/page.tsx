import { villaDetails } from '~/lib/villas';
import Button from '~/components/Button';
import VillaImage from '~/components/VillaImage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Villas at Masakali Retreat | Private Infinity Pools in Bali',
  description:
    'Explore the luxury villas at Masakali Retreat in Kelusa, Bali. Each villa features a private infinity pool, outdoor showers, fully equipped kitchenettes, and stunning views of rice fields and lush jungles.',
  keywords: [
    'Masakali Retreat villas',
    'private infinity pools',
    'luxury accommodations Bali',
    'outdoor showers',
    'rice field views',
    'Kelusa village villas',
    'Ubud villa rentals',
  ],
  openGraph: {
    title: 'Luxury Villas at Masakali Retreat | Private Infinity Pools in Bali',
    description:
      'Discover the serene elegance of Masakali Retreat’s villas. Enjoy private pools, luxurious amenities, and breathtaking views in the heart of Kelusa, Bali.',
    // images: [
    //   {
    //     url: 'https://www.masakaliretreat.com/villas-og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Luxury Villa at Masakali Retreat with Infinity Pool and Rice Field Views',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function VillasPage() {
  return (
    <section className="flex flex-col gap-8 my-8 md:gap-16 md:py-16">
      {Object.values(villaDetails).map((villa) => (
        <div
          key={villa.id}
          className="flex flex-col lg:flex-row w-full min-h-[400px] justify-center items-center lg:items-stretch"
        >
          <VillaImage
            key={`${villa.name}-image`}
            villaName={villa.name}
          />

          <div className="flex flex-col gap-8 justify-center w-full md:min-w-[400px] max-w-[500px] lg:max-w-[600px] p-8 bg-purple text-white">
            <h2 className="text-3xl text-center">{villa.name}</h2>
            <p>{villa.description}</p>
            <span className="flex justify-center">
              <Button
                href={`/villas/${villa.name}`}
                callToAction={`View ${villa.name}`}
                isWhite={true}
              />
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
