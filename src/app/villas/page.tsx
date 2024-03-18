import Image from 'next/image';
import { villaDetails } from '~/lib/villas';
import GoToVillaButton from '~/components/Button/GoToVillaButton';
function Page() {
  return (
    <>
      {Object.values(villaDetails).map((villa) => (
        <div
          key={villa.id}
          className="flex flex-col md:flex-row md:items-stretch min-h-[400px] p-8 justify-center"
        >
          <Image
            src={villa.defaultImage}
            alt={villa.name}
            width={600}
            height={400}
            className="md:w-6/10 flex-grow max-w-[600px]"
          />

          <div className="flex flex-col md:max-w-[500px] p-4 bg-gray  justify-between">
            <span>
              <h2 className="text-3xl pb-8 text-center">{villa.name}</h2>
              <p>{villa.description}</p>
            </span>
            <span className="mb-8 flex justify-center">
              <GoToVillaButton villaName={villa.name} />
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
export default Page;
