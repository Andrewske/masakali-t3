'use client';
import { useState } from 'react';
import styles from './styles.module.scss';

type villaDataType = {
  villaData: {
    description: string;
    amenities: string;
  };
};

const VillaDetails = ({
  villaData: { description, amenities },
}: villaDataType) => {
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
          <div className={contentStyles}>
            <p className={styles.description}>{description}</p>
          </div>
        );
      case 'amenities':
        return (
          <div className={contentStyles}>
            <ul className={styles.amenities}>
              {amenities.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case 'reviews':
        return (
          <div className={contentStyles}>
            <p className={styles.reviews}>These are some reviews</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {headings.map((heading) => (
          <span
            className={styles.heading}
            key={heading}
            onClick={() => setActiveHeading(heading)}
          >
            {heading}
          </span>
        ))}
      </div>
      <div className={styles.container}>
        {headings.map((heading) => renderContent(heading))}
      </div>
    </div>
  );
};

export default VillaDetails;
