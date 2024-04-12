import { villaDetails, type VillaNamesType } from '~/lib/villas';

// TODO: Add the description of the villas
const Description = ({ villaName }: { villaName: VillaNamesType }) => {
  const description = villaDetails[villaName].description;
  return <div className="p-4">{description}</div>;
};

export default Description;
