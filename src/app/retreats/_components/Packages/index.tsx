import { villaDetails } from '~/lib/villas';
import Image from 'next/image';

const packageDetails = [
  {
    title: 'Surya',
    price: 3000,
    listItems: [
      'Private Room (Max 2 people)',
      '1 king bed',
      'Private Infinity Pool',
      'Private Kitchenette',
    ],
    image: villaDetails['akasha'].defaultImage,
  },
  {
    title: 'Jala',
    price: 3000,
    listItems: [
      'Private Room (Max 2 people)',
      '1 queen bed',
      'Private Infinity Pool',
      'Private Kitchenette',
    ],
    image: villaDetails['akasha'].defaultImage,
  },
  {
    title: 'Priya',
    price: 2000,
    listItems: ['Shared Villa with Twin Beds', 'Private Tub'],
    image: villaDetails['akasha'].defaultImage,
  },
  {
    title: 'Isvara',
    price: 2000,
    listItems: ['Shared Villa with Twin Beds'],
    image: villaDetails['akasha'].defaultImage,
  },
];

const Packages = () => {
  return (
    <div
      id="packages"
      className="w-full flex flex-col justify-center bg-gray items-center gap-8 px-4 py-16 bg-gray-100 text-gray-800 text-center font-montserrat"
    >
      <h2>PACKAGES</h2>
      <span className="flex flex-col gap-8 max-w-[800px]">
        <p>
          Each room is a comfortable and luxurious choice for relaxation and
          rejuvenation during the retreat.
        </p>
        <p>
          We recommend booking a private room (Surya or Jala) if you are
          traveling with a partner or friend whom you do not mind sharing a bed
          with. These two villas are also great for singles who prefer privacy
          and extra luxuries during their stay. Surya and Jala both have their
          own private infinity pools and kitchenettes in addition to the shared
          spaces you may use to mingle with other retreat guests.
        </p>
        <p>
          If you are traveling solo and would like to make new friends or if you
          are traveling with a friend and don’t want to share a bed, we
          recommend choosing one of our shared rooms (Priya or Isvara) which has
          twin configurations. These rooms have their own gardens and easy
          access to communal spaces with a kitchen, living room, dining, and a
          beautiful luxury pool.
        </p>
      </span>

      <h3>Included with all rooms</h3>
      <ul>
        <li>5 days + 4 nights accommodation</li>
        <li>All Activities (Tours + Healings + Cultural Activites)</li>
        <li>3 meals per day</li>
        <li>2 spa services</li>
      </ul>
      <div className="flex flex-wrap w-full justify-evenly">
        {packageDetails.map((packageDetail) => (
          <div
            key={packageDetail.title}
            className="flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
          >
            <span className="w-[300px] h-[300px]">
              <Image
                src={packageDetail.image}
                alt={packageDetail.title}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </span>
            <span className="flex flex-col gap-8 p-4">
              <h3 className="text-3xl">{packageDetail.title}</h3>
              <p>${packageDetail.price}</p>
              <ul>
                {packageDetail.listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
