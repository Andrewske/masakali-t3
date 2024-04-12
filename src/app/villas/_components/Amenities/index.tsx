import { villaDetails, type VillaNamesType } from '~/lib/villas';

// TODO: Add the description of the villas
const Amenities = ({ villaName }: { villaName: VillaNamesType }) => {
  const amenities = villaDetails[villaName].amenities;
  return (
    <ul className="list-disc grid grid-cols-2 py-4 m-auto gap-2 list-inside">
      {amenities.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className=""
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Amenities;
