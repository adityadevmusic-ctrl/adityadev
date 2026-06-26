"use client";

import Image from "next/image";
import { HiggsfieldImage } from "@/lib/types";

interface ImageCardProps {
  image: HiggsfieldImage;
  onClick: (image: HiggsfieldImage) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div
      className="group relative mb-3 break-inside-avoid cursor-pointer rounded-xl overflow-hidden bg-gray-900 border border-white/5 hover:border-violet-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10"
      onClick={() => onClick(image)}
    >
      <div className="relative w-full">
        <Image
          src={image.results.minUrl}
          alt={image.params.prompt}
          width={600}
          height={400}
          className="w-full h-auto block"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
        <p className="text-white text-xs leading-snug line-clamp-3">
          {image.params.prompt}
        </p>
        <span className="mt-1.5 text-violet-300 text-[10px] font-medium">
          {image.model}
        </span>
      </div>
    </div>
  );
}
