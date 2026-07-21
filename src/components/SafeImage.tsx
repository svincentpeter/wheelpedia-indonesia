"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

const FALLBACK = "/placeholders/fallback-vehicle.jpg";

export function SafeImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  sizes,
  priority,
}: Props) {
  const [current, setCurrent] = useState(src || FALLBACK);

  if (fill) {
    return (
      <Image
        src={current}
        alt={alt}
        fill
        className={className}
        sizes={sizes ?? "100vw"}
        priority={priority}
        onError={() => setCurrent(FALLBACK)}
      />
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={className}
      priority={priority}
      onError={() => setCurrent(FALLBACK)}
    />
  );
}
