import { useState } from 'react';
import type { Artist, Genre } from '../types/album';
import { GENRES } from '../data/genres';

export default function CreateArtist({ artist, onUpdate, onNext, onBack }: { artist: Artist; onUpdate: (a: Partial<Artist>) => void; onNext: () => void; onBack: () => void; }) {
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artist.name.trim()) return setError('Artist name is required');
    setError('');
    onNext();
  };

  return (
    <div className="page page-center" style={{ position: 'relative' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ position: 'absolute', top: '1.5rem', left: '2rem', padding: '0.25rem 0.5rem' }}>← BACK TO HOME</button>
      <div className="page-content" style={{ marginTop: '2rem' }}>
        <h1 className="page-title">Artist Identity</h1>
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Artist Name</label>
            <input className="form-input" value={artist.name} onChange={e => onUpdate({ name: e.target.value })} />
            {error && <div className="form-error">{error}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Primary Genre</label>
            <select className="form-select" value={artist.genre} onChange={e => onUpdate({ genre: e.target.value as Genre })}>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Artist Bio (Optional)</label>
            <textarea className="form-textarea" placeholder="Short description of the artist..." value={artist.bio} onChange={e => onUpdate({ bio: e.target.value })} />
          </div>
          <div className="btn-group" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">Create Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
