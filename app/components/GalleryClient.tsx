"use client";

import { useState, useCallback } from "react";
import { HiggsfieldImage, GalleryPage } from "@/lib/types";
import ImageCard from "./ImageCard";
import Lightbox from "./Lightbox";

interface GalleryClientProps {
  initialData: GalleryPage;
}

export default function GalleryClient({ initialData }: GalleryClientProps) {
  const [items, setItems] = useState<HiggsfieldImage[]>(initialData.items ?? []);
  const [nextCursor, setNextCursor] = useState<number | null>(initialData.next_cursor ?? null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<HiggsfieldImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMore = useCallback(async () => {
    if (!nextCursor || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/images?cursor=${nextCursor}&type=image`);
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const data: GalleryPage = await res.json();
      setItems((prev) => [...prev, ...(data.items ?? [])]);
      setNextCursor(data.next_cursor ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }, [nextCursor, loading]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg">No generated images yet</p>
        <p className="text-sm mt-1">Images you generate will appear here</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
        {items.map((img) => (
          <ImageCard key={img.id} image={img} onClick={setSelected} />
        ))}
      </div>

      {error && (
        <p className="text-center text-red-400 text-sm mt-4">{error}</p>
      )}

      {nextCursor && (
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchMore}
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        </div>
      )}

      {selected && (
        <Lightbox image={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
