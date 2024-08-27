'use client';
import React from 'react';

const Page = () => {
  const handleClick = async () => {
    const response = await fetch('/api/googleApi');
    console.log(response);
  };
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Page;
