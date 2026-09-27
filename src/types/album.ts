export type Genre = 'Hip-Hop' | 'R&B' | 'Pop' | 'Electronic' | 'Rock' | 'Latin';

export type ReleaseType = 'Album' | 'EP' | 'Mixtape';

export type Page = 'home' | 'artist' | 'record' | 'tracks' | 'studio' | 'preview' | 'release' | 'radio';

export interface Artist {
  name: string;
  genre: Genre;
  bio: string;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
}

export type Origin = 'Vice City' | 'Leonida Keys' | 'Port Gellhorn' | 'Grassrivers' | 'Ambrosia' | 'Mount Kalaga';

export interface Album {
  title: string;
  genre: Genre;
  releaseType: ReleaseType;
  description: string;
  catalogNumber: string;
  origin: Origin;
  tracks: Track[];
  artwork: string | null;
  released: boolean;
}
