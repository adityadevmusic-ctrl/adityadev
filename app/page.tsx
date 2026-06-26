import GalleryClient from "./components/GalleryClient";
import { GalleryPage } from "@/lib/types";

async function getInitialImages(): Promise<GalleryPage> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/images?type=image`, {
      cache: "no-store",
    });
    if (!res.ok) return { items: [], next_cursor: null };
    return res.json();
  } catch {
    return { items: [], next_cursor: null };
  }
}

export default async function Home() {
  const initialData = await getInitialImages();

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Generated Images</h1>
          </div>
          <span className="text-xs text-gray-500">
            {initialData.items?.length ?? 0} images loaded
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <GalleryClient initialData={initialData} />
      </div>
    </main>
  );
}
