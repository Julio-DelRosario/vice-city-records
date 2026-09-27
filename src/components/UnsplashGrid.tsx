import { useState, useEffect } from 'react';
import { searchPhotos, SUGGESTED_CATEGORIES, triggerDownload, type UnsplashPhoto } from '../services/unsplash';

export default function UnsplashGrid({ onSelect, onSearchActive }: { onSelect: (url: string) => void, onSearchActive?: (active: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (onSearchActive) {
      onSearchActive(query.trim().length > 0);
    }
  }, [query, onSearchActive]);

  const search = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true); setError(null);
    try {
      const res = await searchPhotos(q);
      setPhotos(res.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (photo: UnsplashPhoto) => {
    await triggerDownload(photo.links.download_location);
    onSelect(photo.urls.regular);
  };

  return (
    <div className="unsplash-search">
      <div className="unsplash-search-row" style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input className="form-input" style={{ width: '100%', paddingRight: '2rem' }} placeholder="Search photos (e.g., neon, city, sunset)" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search(query)} />
          {query && (
            <button 
              onClick={() => { setQuery(''); setPhotos([]); }} 
              style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.25rem' }}
            >×</button>
          )}
        </div>
        <button className="btn btn-secondary" onClick={() => search(query)} disabled={loading}>{loading ? '...' : 'SEARCH'}</button>
      </div>
      <div className="pill-group" style={{ marginTop: '0.75rem' }}>
        {SUGGESTED_CATEGORIES.map(cat => (
          <button key={cat} className="pill" onClick={() => { setQuery(cat); search(cat); }}>{cat}</button>
        ))}
      </div>
      {query.trim().length > 0 && (
        <div className="unsplash-scroll-area" style={{ marginTop: '1rem' }}>
          <div className="unsplash-grid">
            {error && <div className="unsplash-empty">{error}</div>}
            {loading && <div className="unsplash-loading">Searching...</div>}
            {!loading && !error && photos.map(photo => (
              <div key={photo.id} className="unsplash-card" onClick={() => handleSelect(photo)}>
                <img src={photo.urls.small} alt={photo.alt_description || 'Unsplash'} />
                <div className="unsplash-attribution">
                  Photo by <a href={`${photo.user.links.html}?utm_source=vcr&utm_medium=referral`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{photo.user.name}</a>
                </div>
              </div>
            ))}
            {!loading && !error && photos.length === 0 && <div className="unsplash-empty">No results found for "{query}".</div>}
          </div>
        </div>
      )}
    </div>
  );
}
