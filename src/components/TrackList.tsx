import type { Track } from '../types/album';

interface TrackListProps {
  tracks: Track[];
  nowPlaying?: number;
}

export default function TrackList({ tracks, nowPlaying }: TrackListProps) {
  if (tracks.length === 0) return null;
  return (
    <ol className="tracklist">
      {tracks.map((track, index) => (
        <li key={track.id} className={`tracklist-item ${nowPlaying === index ? 'tracklist-item--playing' : ''}`}>
          <span className="tracklist-number">{(index + 1).toString().padStart(2, '0')}</span>
          <span className="tracklist-title">{track.title}</span>
          {track.duration && <span className="tracklist-duration">{track.duration}</span>}
        </li>
      ))}
    </ol>
  );
}
