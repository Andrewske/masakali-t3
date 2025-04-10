'use client';
import React from 'react';

const Page = () => {
  const handleClick = async () => {
    const response = await fetch('/api/googleApi', {
      method: 'POST',
      body: JSON.stringify({
        referral_date: '8/27/24',
        name: 'Kevin Andrews',
        email: 'kevin@test.com',
        phone: '5098992771',
        notes: 'I would like to stay in the biggest villa please',
      }),
    });
    console.log(response);
  };
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Page;
