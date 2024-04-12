'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import { getVillaName, villaDetails, type VillaIdsType } from '~/lib/villas';
import Description from '../Description';
import Amenities from '../Amenities';
import Reviews from '../Reviews';

export type VillaDataType = {
  villaId: VillaIdsType;
};

const VillaDetails = ({ villaId }: VillaDataType) => {
  const headings = ['description', 'amenities', 'reviews'];
  const [activeHeading, setActiveHeading] = useState(headings[0]);
  const villaName = getVillaName(villaId);

  const villa = Object.values(villaDetails).find(
    (villa) => villa.id === villaId
  );

  if (!villa) return <></>;

  const renderHeadings = () => {
    return headings.map((heading, index) => (
      <div
        key={`${heading}-${index}`}
        className="relative cursor-pointer"
        onClick={() => setActiveHeading(heading)}
      >
        <h4 className="inline-block">{heading}</h4>
        <div
          className={`absolute left-0 bottom-0 w-full h-px bg-purple transform transition-transform duration-250 ease-in-out ${
            activeHeading === heading ? 'scale-x-100' : 'scale-x-0'
          }`}
        ></div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-evenly flex-wrap gap-1 w-full">
        {renderHeadings()}
      </div>
      <div className="flex flex-col">
        {activeHeading === 'reviews' && <Reviews villaName={villaName} />}
        {activeHeading === 'description' && (
          <Description villaName={villaName} />
        )}
        {activeHeading === 'amenities' && <Amenities villaName={villaName} />}
      </div>
    </div>
  );
};

export default VillaDetails;
