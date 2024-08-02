import Image from 'next/image';
import { villaDetails } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';
import VillaImage from '~/components/VillaImage';

// make sure villa image fills
function Page() {
  return (
    <section className="flex flex-col md:gap-16 md:py-16">
      {Object.values(villaDetails).map((villa) => (
        <div
          key={villa.id}
          className="flex flex-col flex-wrap md:flex-row md:items-stretch min-h-[400px] justify-center"
        >
          <VillaImage
            key={`${villa.name}-image`}
            villaName={villa.name}
          />

          <div className="flex flex-col gap-8 w-full md:min-w-[400px] md:max-w-[600px] p-8 bg-purple text-white  justify-around">
            <h2 className="text-3xl text-center">{villa.name}</h2>
            <p>{villa.description}</p>
            <span className="flex justify-center">
              <GoToPageButton
                path={`/villas/${villa.name}`}
                callToAction={`Book ${villa.name}`}
                isWhite={true}
              />
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
export default Page;
