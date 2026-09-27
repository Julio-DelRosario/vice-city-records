import { useState } from 'react';
import type { Page, Artist, Album } from './types/album';
import ProgressBar from './components/ProgressBar';
import Home from './pages/Home';
import CreateArtist from './pages/CreateArtist';
import CreateRecord from './pages/CreateRecord';
import TracklistBuilder from './pages/TracklistBuilder';
import CoverStudio from './pages/CoverStudio';
import AlbumPreview from './pages/AlbumPreview';
import Radio from './pages/Radio';
import './index.css';

function generateCatalogNumber(): string {
  return `VCR-${String(Math.floor(Math.random() * 900) + 100)}`;
}

const defaultArtist: Artist = { name: 'JULIO', genre: 'Electronic', bio: '' };
const defaultAlbum: Album = {
  title: 'NEON NIGHTS',
  genre: 'Electronic',
  releaseType: 'Album',
  description: '',
  catalogNumber: generateCatalogNumber(),
  origin: 'Vice City',
  tracks: [],
  artwork: null,
  released: false,
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [artist, setArtist] = useState<Artist>(defaultArtist);
  const [album, setAlbum] = useState<Album>(defaultAlbum);

  const updateArtist = (update: Partial<Artist>) => setArtist(prev => ({ ...prev, ...update }));
  const updateAlbum = (update: Partial<Album>) => setAlbum(prev => ({ ...prev, ...update }));
  
  // Removed handleRelease

  const handleCreateAnother = () => {
    setArtist({ ...defaultArtist });
    setAlbum({ ...defaultAlbum, catalogNumber: generateCatalogNumber() });
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onStart={() => setPage('artist')} />;
      case 'artist':
        return <CreateArtist artist={artist} onUpdate={updateArtist} onNext={() => { updateAlbum({ genre: artist.genre }); setPage('record'); }} onBack={() => setPage('home')} />;
      case 'record':
        return <CreateRecord album={album} onUpdate={updateAlbum} onNext={() => setPage('tracks')} onBack={() => setPage('artist')} />;
      case 'tracks':
        return <TracklistBuilder album={album} onUpdate={updateAlbum} onNext={() => setPage('studio')} onBack={() => setPage('record')} />;
      case 'studio':
        return <CoverStudio album={album} onSaveArtwork={url => updateAlbum({ artwork: url })} onNext={() => setPage('preview')} onBack={() => setPage('tracks')} />;
      case 'preview':
        return <AlbumPreview artist={artist} album={album} onEditCover={() => setPage('studio')} />;
      case 'radio':
        return <Radio artist={artist} album={album} onCreateAnother={handleCreateAnother} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ProgressBar current={page} />
      {renderPage()}
    </>
  );
}