import { useState } from 'react';
import type { Album, ReleaseType, Genre, Origin } from '../types/album';
import { GENRES, RELEASE_TYPES } from '../data/genres';
import { ORIGINS } from '../data/origins';

export default function CreateRecord({ album, onUpdate, onNext, onBack }: { album: Album; onUpdate: (a: Partial<Album>) => void; onNext: () => void; onBack: () => void; }) {
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!album.title.trim()) return setError('Record title is required');
    setError('');
    onNext();
  };

  return (
    <div className="page page-center" style={{ position: 'relative' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ position: 'absolute', top: '1.5rem', left: '2rem', padding: '0.25rem 0.5rem' }}>← BACK TO ARTIST</button>
      <div className="page-content" style={{ marginTop: '2rem' }}>
        <h1 className="page-title">Record Details</h1>
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Record Title</label>
            <input className="form-input" value={album.title} onChange={e => onUpdate({ title: e.target.value })} />
            {error && <div className="form-error">{error}</div>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Genre</label>
              <select className="form-select" value={album.genre} onChange={e => onUpdate({ genre: e.target.value as Genre })}>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Release Type</label>
              <select className="form-select" value={album.releaseType} onChange={e => onUpdate({ releaseType: e.target.value as ReleaseType })}>
                {RELEASE_TYPES.map(rt => <option key={rt} value={rt}>{rt}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location / Origin</label>
            <select className="form-select" value={album.origin} onChange={e => onUpdate({ origin: e.target.value as Origin })}>
              {ORIGINS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea className="form-textarea" placeholder="Record description..." value={album.description} onChange={e => onUpdate({ description: e.target.value })} />
          </div>
          <div className="btn-group" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">Build Tracklist</button>
          </div>
        </form>
      </div>
    </div>
  );
}
