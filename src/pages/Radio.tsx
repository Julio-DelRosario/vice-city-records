import type { Artist, Album } from '../types/album';
import AlbumCover from '../components/AlbumCover';

export default function Radio({ artist, album, onCreateAnother }: { artist: Artist; album: Album; onCreateAnother: () => void; }) {
  return (
    <div className="radio-grid-layout">
      <div className="radio-left">
        <div style={{ maxWidth: '600px', width: '100%', position: 'relative' }}>
          <AlbumCover src={album.artwork} alt={album.title} size="large" />
          <div className="radio-record-glow" style={{ backgroundImage: `url(${album.artwork || ''})` }} />
        </div>
      </div>
      
      <div className="radio-right">
        <div className="radio-meta-panel">
          <div className="radio-station-badge">
            <div className="radio-frequency">101.5</div>
            <div className="radio-station-name">VICE CITY RADIO</div>
          </div>
          
          <div className="radio-on-air">
            <span className="on-air-dot">●</span> NOW IN ROTATION
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem' }}>{album.title.toUpperCase()}</h1>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>{artist.name.toUpperCase()}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <span className="section-label" style={{ marginBottom: '0.25rem' }}>GENRE</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{album.genre.toUpperCase()}</span>
            </div>
            <div>
              <span className="section-label" style={{ marginBottom: '0.25rem' }}>ORIGIN</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent)' }}>{album.origin.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="section-label" style={{ marginBottom: '1rem' }}>TRACKLIST</span>
            <div className="radio-tracklist-scroll">
              {album.tracks.map((track, i) => (
                <div key={track.id} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ flex: 1, fontWeight: 500 }}>{track.title}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{track.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="meta-value--mono" style={{ color: 'var(--text-muted)' }}>{album.catalogNumber}</span>
            <button className="btn btn-secondary" onClick={onCreateAnother}>CREATE ANOTHER RECORD</button>
          </div>
        </div>
      </div>
    </div>
  );
}
