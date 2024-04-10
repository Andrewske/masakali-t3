'use client';
import { useState } from 'react';
import styles from './styles.module.scss';

export type VillaDataType = {
  description: string;
  amenities: string;
};

const VillaDetails = ({ description, amenities }: VillaDataType) => {
  const headings = ['description', 'amenities', 'reviews'];
  const [activeHeading, setActiveHeading] = useState(headings[0]);

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

  const renderContentSections = () => {
    return headings.map((heading) => renderContent(heading));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-evenly flex-wrap gap-1 w-full">
        {renderHeadings()}
      </div>
      <div className={styles.container}>{renderContentSections()}</div>
    </div>
  );
};

export default VillaDetails;
