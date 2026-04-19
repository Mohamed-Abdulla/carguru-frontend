"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface CarImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function CarImage({ 
  src, 
  fallbackSrc = "/fallback-car.avif", 
  alt, 
  ...props 
}: CarImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
