'use client';

import Image, { type ImageProps } from 'next/image';

export default function ImageRenderer({ src, alt }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className="object-cover"
      fill={true}
    />
  );
}
