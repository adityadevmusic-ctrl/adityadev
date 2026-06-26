export interface HiggsfieldImage {
  id: string;
  type: string;
  status: string;
  model: string;
  params: { prompt: string };
  results: { rawUrl: string; minUrl: string };
  createdAt: number;
}

export interface GalleryPage {
  items: HiggsfieldImage[];
  next_cursor: number | null;
}
