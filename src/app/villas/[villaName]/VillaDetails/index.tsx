'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import { prisma } from '~/app/api/db';

export type VillaDataType = {
  description: string;
  amenities: string;
};

import { type VillaName } from '~/utils/smoobu';

const VillaDetails = async ({ villaName }: { villaName: VillaName }) => {
  const headings = ['description', 'amenities', 'reviews'];
  const [activeHeading, setActiveHeading] = useState(headings[0]);

  const { description, amenities } = (await prisma.villa.findUnique({
    where: { name: villaName },
    select: { description: true, amenities: true },
  })) as VillaDataType;

  const renderContent = (heading: string) => {
    const isActive = activeHeading === heading;
    const contentStyles = `${styles.content ?? ''} ${
      isActive ? styles.active ?? '' : ''
    }`;

    switch (heading) {
      case 'description':
        return (
          <div
            key={heading}
            className={contentStyles}
          >
            <p className={styles.description}>{description}</p>
          </div>
        );
      case 'amenities':
        return (
          <div
            key={heading}
            className={contentStyles}
          >
            <ul className={styles.amenities}>
              {amenities.split(',').map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'reviews':
        return (
          <div
            key={heading}
            className={contentStyles}
          >
            <p className={styles.reviews}>These are some reviews</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderHeadings = () => {
    return headings.map((heading, index) => (
      <h4
        className={`${styles.heading ?? ''} ${
          activeHeading === heading ? styles.active ?? '' : ''
        }`}
        key={`${heading}-${index}`}
        onClick={() => setActiveHeading(heading)}
      >
        {heading}
      </h4>
    ));
  };

  const renderContentSections = () => {
    return headings.map((heading) => renderContent(heading));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{renderHeadings()}</div>
      <div className={styles.container}>{renderContentSections()}</div>
    </div>
  );
};

export default VillaDetails;
