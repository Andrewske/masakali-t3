import Image from 'next/image';

import styles from './styles.module.scss';

import Button from '../Button';
import AkashaImage from '../../../public/hero-images/akasha-pool.webp';

const villas = [
  {
    name: 'surya',
    description:
      'Our largest villa is a warm and elegant choice with ample space to rest and recharge. It has an ensuite breakfast table and features a hand-carved outdoor dining table that can seat larger groups on the private patio. Inside you’ll find a luxury king-sized mattress with high-quality bedding as well as a couch that can serve as an additional bed for an additional guest.',
    imgPath: AkashaImage,
  },
  {
    name: 'chandra',
    description:
      'One of our more popular villas for romantic getaways and honeymooners offers an enchanting sentiment. In addition to the luxury outdoor shower, this villa features a spacious and comfortable bath. A favorite place to relax is the outdoor hammock that hangs over the rice fields, with a perfect view of the stars at night. This villa also offers a work area with a beautiful antique desk for those who need it.',
    imgPath: AkashaImage,
  },
  {
    name: 'jala',
    description:
      'This traditional Joglo villa is the perfect fit for a cozy stay. With personal charm and attention to detail, this alluring villa has an irresistible appeal. Jala offers a workstation with a large desk, comfy outdoor lounging areas, and a full private ensuite bathroom. The luxury bedding and linens offer a comfortable and restful sleep while the beautiful, handcrafted furniture and amenities will leave you in awe of the craftsmanship and detail.',
    imgPath: AkashaImage,
  },
  {
    name: 'akasha',
    description:
      'Luxury meets comfort in our newest villa, Akasha. With 3 bedrooms and 3.5 baths, this spacious home is great for families or couples traveling. This villa features a beautiful waterfall pool, large deck, full kitchen and bar, entertainment room, outdoor living room, large dining area, and breathtaking views. This space is also great for hosting celebrations such as weddings and birthday parties.',
    imgPath: AkashaImage,
  },
];

const Villas = () => {
  const handleClick = (villaName: string) => {
    console.log(villaName);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Villas</h2>
      <div className={styles.description}>
        <p>
          All the villas have their own private infinity pools overlooking the
          Balinese rice fields, fully equipped kitchenettes, luxurious outdoor
          showers, high-quality mattresses and bedding to make sure you have a
          restful sleep. On the patios you will find lounge chairs inviting you
          to sit back and relax outside as well as tables and chairs for eating
          a delicious meal on your deck or inside your villa. And some of the
          villas have bathtubs.
        </p>
      </div>
      <div className={styles.container}>
        {villas.map((villa) => (
          <div
            key={villa.name}
            className={styles.villa}
          >
            <Image
              src={villa.imgPath}
              alt={villa.name}
              className={styles.image}
              width={400}
              height={400}
            />
            <span className={styles.hoverContainer}>
              <h3 className={styles.title}>{villa.name}</h3>
              <p className={styles.text}>{villa.description}</p>
              <Button
                callToAction="View Details"
                handleClick={() => handleClick(villa.name)}
                isWhite={false}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Villas;
