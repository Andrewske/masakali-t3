import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { villaDetails, type VillaNamesType } from '~/lib/villas';

const VillaImage = ({ villaName }: { villaName: VillaNamesType }) => {
  return (
    <Link
      key={`${villaName}-link`}
      href={`/villas/${villaName}`}
      className="relative cursor-pointe hover:scale-[1.025] transition-all duration-100 ease-in-out"
    >
      <Image
        src={villaDetails[villaName].defaultImage}
        alt={villaDetails[villaName].name}
        width={400}
        height={400}
        className="w-[500px] h-[500px] object-cover z-0"
      />
      <span className="absolute bottom-4 left-4 z-20 text-white bg-light-purple-7 py-2 px-4">
        <p className="font-montserrat uppercase text-xl font-medium">
          {villaDetails[villaName].name}
        </p>
        <p className="font-montserrat uppercase">
          {villaDetails[villaName].beds} <span className="text-xs">bed</span>{' '}
          {villaDetails[villaName].baths} <span className="text-xs">baths</span>
        </p>
      </span>
    </Link>
  );
};

export default VillaImage;
