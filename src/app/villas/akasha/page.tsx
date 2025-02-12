import Template from '../_components/Template';
import { akashaId } from '~/lib/villas';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Akasha Villa at Masakali Retreat | Luxury Villa with Private Pool',
  description:
    'Discover the Akasha Villa at Masakali Retreat in Bali. Enjoy a private infinity pool, luxurious amenities, and stunning views in this exquisite villa. Book your stay today!',
  keywords: [
    'Akasha Villa',
    'Masakali Retreat',
    'luxury villa Bali',
    'private pool villa',
    'Kelusa villa',
    'Ubud accommodation',
    'Bali villa rental',
  ],
  openGraph: {
    title: 'Akasha Villa at Masakali Retreat | Luxury Villa with Private Pool',
    description:
      'Experience the ultimate in luxury at Akasha Villa, Masakali Retreat. Relax in your private infinity pool with breathtaking views of the Balinese landscape.',
    // images: [
    //   {
    //     url: 'https://www.masakaliretreat.com/villas/surya/surya-og-image.jpg', //ASSUMPTION - Adjust this URL!
    //     width: 1200,
    //     height: 630,
    //     alt: 'Surya Villa at Masakali Retreat with Infinity Pool',
    //   },
    // ],
    locale: 'en_US',
    type: 'article',
  },
};

function Page() {
  return <Template villaId={akashaId} />;
}
export default Page;
