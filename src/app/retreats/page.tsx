import Image from 'next/image';

import { villaDetails } from '~/lib/villas';
import About from './_components/About';
import Packages from './_components/Packages';

<div
  id="why-choose"
  className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
>
  <h2>WHY CHOOSE SHANTI BREATHWORK AND YOGA RETREAT</h2>
  <p className="max-w-[600px]">
    Breathe, connect, move, and meditate overlooking a spectacular view of
    Balinese mountains, lush tropical forests, and traditional Balinese rice
    fields with this transformational five-day breathwork retreat. Absorb the
    nature around you while finding balance and inner peace in one of the most
    spectacular places in the world.
  </p>
</div>;

export default function Page() {
  return (
    <section className="h-full w-full">
      <div
        id="main-image"
        className="h-screen flex justify-center items-center relative overflow-hidden"
      >
        <Image
          src={villaDetails['akasha'].defaultImage}
          alt="Akasha Pool"
          fill={true}
          className="object-cover object-bottom"
        />
        <div className="relative bg-purple z-10 px-8 py-16 text-white grid place-items-center gap-8">
          <h2>Masakali Presents</h2>
          <h1>Shanti Breathwork and yoga retreat</h1>
        </div>
      </div>
      <div
        id="details"
        className="flex flex-wrap justify-center"
      >
        <div
          id="when"
          className="flex flex-col gap-4 sm:items-end w-[50%] min-w-[312px]    px-8 py-16 bg-gray-100 text-gray-800"
        >
          <h2 className="">When</h2>
          <span className="flex gap-2">
            <p className="text-5xl whitespace-nowrap">23-27</p>
            <span>
              <p>April</p>
              <p>2023</p>
            </span>
          </span>
        </div>
        <div
          id="where"
          className="flex flex-col gap-4  items-start w-[50%] min-w-[312px] px-8 py-16 bg-gray-100 text-gray-800"
        >
          <h2>Where</h2>
          <span className="flex flex-col gap-2">
            <h3 className="">Resort address</h3>
            <span className="text-xs">
              <p>Masakali Retreat</p>
              <p>Br. Ayah Kelusa Payangan</p>
              <p>Gianyar Bali 80572</p>
            </span>
            <h3>Description</h3>
            <p className="text-xs">
              Masakali Retreat is located about 8km outside of Ubud. The land
              was specifically selected for its beauty, oneness with nature, and
              peacefulness. Relax and enjoy your stay while overlooking the
              Balinese rice fields, lush tropical jungle, and a beautiful
              mountain backdrop.
            </p>
          </span>
        </div>
      </div>
      <div
        id="why-choose"
        className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
      >
        <h2>WHY CHOOSE SHANTI BREATHWORK AND YOGA RETREAT</h2>
        <p className="max-w-[600px]">
          Breathe, connect, move, and meditate overlooking a spectacular view of
          Balinese mountains, lush tropical forests, and traditional Balinese
          rice fields with this transformational five-day breathwork retreat.
          Absorb the nature around you while finding balance and inner peace in
          one of the most spectacular places in the world.
        </p>
      </div>
      <About />
      <div
        id="the-space"
        className="w-full flex flex-col justify-center items-center gap-8 px-4 py-16 bg-purple text-white text-center font-montserrat"
      >
        <h2>THE SPACE</h2>
        <p className="max-w-[600px]">
          In the traditional Balinese village of Kelusa you will find Masakali
          Retreat - the perfect romance between an extraordinary destination,
          nourishment of your whole being and premium accommodations with
          exemplary service.
        </p>
      </div>

      <Packages />
    </section>
  );
}
