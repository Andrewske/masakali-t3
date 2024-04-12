'use client';
import Image from 'next/image';
import { useState } from 'react';
import { villaDetails, type VillaNamesType } from '~/lib/villas';

const Reviews = ({ villaName }: { villaName: VillaNamesType }) => {
  const [step, setStep] = useState(0);
  const reviews = villaDetails[villaName].reviews;

  const handleLeftClick = () => {
    if (step === 0) {
      setStep(reviews.length - 1);
    } else {
      setStep((step) => step - 1);
    }
  };

  const handleRightClick = () => {
    if (step === reviews.length - 1) {
      setStep(0);
    } else {
      setStep((step) => step + 1);
    }
  };
  return (
    <div className="py-4 flex">
      <span
        className="h-full grid px-1 place-items-center transition-all duration-75 ease-in-out hover:scale-150 cursor-pointer"
        onClick={handleLeftClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <span className="flex-grow">
        <span className="flex py-4 gap-4">
          <Image
            src={reviews[step]?.imgUrl ?? ''}
            alt="reviewer profile image"
            width={50}
            height={50}
          />
          <span className="">
            <p>{reviews[step]?.name}</p>
            <p>{reviews[step]?.date}</p>
          </span>
        </span>

        <p>{reviews[step]?.reviewText}</p>
      </span>
      <span
        className="h-full grid place-items-center px-1 transition-all duration-75 ease-in-out hover:scale-150 cursor-pointer"
        onClick={handleRightClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </div>
  );
};

export default Reviews;
