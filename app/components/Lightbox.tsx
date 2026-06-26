"use client";

import { useEffect } from "react";
import Image from "next/image";
import { HiggsfieldImage } from "@/lib/types";

interface LightboxProps {
  image: HiggsfieldImage;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-w-5xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white bg-black/50 rounded-full p-1.5 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative w-full flex-1 min-h-0 bg-black" style={{ maxHeight: "70vh" }}>
          <Image
            src={image.results.rawUrl}
            alt={image.params.prompt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {image.model}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(image.createdAt * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
            {image.params.prompt}
          </p>
          <a
            href={image.results.rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            Open full resolution
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
