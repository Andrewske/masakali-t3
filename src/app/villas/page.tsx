import { villaDetails } from '~/lib/villas';
import { GoToPageButton } from '~/components/Button/GoToPageButton';
import VillaImage from '~/components/VillaImage';

// make sure villa image fills
function Page() {
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

          <div className="flex flex-col gap-8  justify-center w-full md:min-w-[400px] max-w-[500px] lg:max-w-[600px] p-8 bg-purple text-white">
            <h2 className="text-3xl text-center">{villa.name}</h2>
            <p>{villa.description}</p>
            <span className="flex justify-center">
              <GoToPageButton
                path={`/villas/${villa.name}`}
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
export default Page;
