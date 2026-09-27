export interface UnsplashPhoto {
  id: string;
  urls: { regular: string; small: string; thumb: string };
  user: { name: string; links: { html: string } };
  links: { download_location: string };
  alt_description: string | null;
}

export interface UnsplashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export async function searchPhotos(
  query: string,
  page = 1,
  perPage = 12,
): Promise<UnsplashSearchResult> {
  const url = `/api/unsplash/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || `Unsplash search failed: ${res.status}`);
  }
  return res.json();
}

export async function triggerDownload(downloadLocation: string): Promise<void> {
  try {
    const url = `/api/unsplash/download?url=${encodeURIComponent(downloadLocation)}`;
    await fetch(url);
  } catch (err) {
    console.error('Failed to trigger Unsplash download', err);
  }
}

export const SUGGESTED_CATEGORIES = [
  'vice city',
  'neon streets',
  'florida sunset',
  'vintage cars',
  'nightlife',
  'swamp',
  'motel neon',
];
