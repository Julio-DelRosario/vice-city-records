import type { Artist, Album } from '../types/album';

export default function AlbumPreview({ artist, album, onEditCover }: { artist: Artist; album: Album; onEditCover: () => void; }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="preview-grid-layout">
        <div className="preview-card-modern">
          {/* Left Column: Cover + CD */}
          <div className="preview-left-col">
            <button className="btn btn-ghost btn-back-top" onClick={onEditCover} style={{ marginBottom: '2rem', alignSelf: 'flex-start' }}>← BACK TO STUDIO</button>
            <div className="preview-cd-showcase">
              <div className="cd-container" key={album.artwork}>
                <div className="cd-disc">
                  <div className="cd-disc-art" style={{ backgroundImage: `url(${album.artwork || ''})` }}>
                    <div className="cd-disc-hole" />
                  </div>
                </div>
                <div className="cd-cover">
                  {album.artwork ? (
                    <img src={album.artwork} alt={album.title} />
                  ) : (
                    <div className="cd-cover-placeholder">NO ARTWORK</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Header + Tracklist */}
          <div className="preview-right-col">
            <div className="preview-header-top" style={{ borderBottom: 'none', marginBottom: '1rem', paddingBottom: 0 }}>
              <div className="catalog-badge">{album.catalogNumber}</div>
              <h1 className="album-title">{album.title}</h1>
              <h2 className="artist-name">{artist.name}</h2>
              <div className="info-metadata-inline" style={{ borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '2rem' }}>
                <span className="meta-val">{album.genre}</span>
                <span className="meta-dot">•</span>
                <span className="meta-val">{album.releaseType}</span>
                <span className="meta-dot">•</span>
                <span className="meta-label">ORIGIN:</span>
                <span className="meta-val highlight">{album.origin}</span>
              </div>
            </div>

            <div className="preview-tracklist-panel">
              <div className="tracklist-container">
                <div className="tracklist-header">TRACKLIST</div>
                <div className="tracklist-scroll">
                  {album.tracks.map((track, i) => (
                    <div key={track.id} className="track-item">
                      <span className="track-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="track-name">{track.title}</span>
                      <span className="track-time">{track.duration}</span>
                    </div>
                  ))}
                  {album.tracks.length === 0 && <div className="track-item">No tracks added.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
