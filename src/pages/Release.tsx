import { useEffect } from 'react';
import type { Artist, Album } from '../types/album';
import AlbumCover from '../components/AlbumCover';

export default function Release({ artist, album, onComplete }: { artist: Artist; album: Album; onComplete: () => void; }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="release-transition" onClick={onComplete}>
      <div className="release-label">RECORDING COMPLETE</div>
      <AlbumCover src={album.artwork} alt={album.title} size="medium" />
      <div>
        <div className="release-title">{album.title}</div>
        <div className="release-artist">{artist.name}</div>
        <div className="release-catalog">{album.catalogNumber}</div>
      </div>
      <div className="release-status">RELEASED</div>
    </div>
  );
}
