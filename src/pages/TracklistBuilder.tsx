import { useState } from 'react';
import type { Track, Album } from '../types/album';
import TrackEditor from '../components/TrackEditor';

export default function TracklistBuilder({ album, onUpdate, onNext, onBack }: { album: Album; onUpdate: (a: Partial<Album>) => void; onNext: () => void; onBack: () => void; }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const tracks = album.tracks;
  const updateTracks = (t: Track[]) => onUpdate({ tracks: t });

  const add = (t: Omit<Track, 'id'>) => {
    updateTracks([...tracks, { ...t, id: Date.now().toString() }]);
    setIsAdding(false);
  };
  
  const update = (id: string, t: Omit<Track, 'id'>) => {
    updateTracks(tracks.map(track => track.id === id ? { ...track, ...t } : track));
    setEditingId(null);
  };
  
  const remove = (id: string) => updateTracks(tracks.filter(t => t.id !== id));
  
  const move = (index: number, dir: 1 | -1) => {
    if (index + dir < 0 || index + dir >= tracks.length) return;
    const next = [...tracks];
    [next[index], next[index + dir]] = [next[index + dir], next[index]];
    updateTracks(next);
  };

  return (
    <div className="page page-center" style={{ position: 'relative' }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ position: 'absolute', top: '1.5rem', left: '2rem', padding: '0.25rem 0.5rem' }}>← BACK TO RECORD</button>
      <div className="page-wide" style={{ marginTop: '2rem' }}>
        <h1 className="page-title">Build Tracklist</h1>
        
        <div className="track-builder">
          {tracks.length === 0 && !isAdding && (
            <div className="track-builder-empty">
              <div className="track-builder-empty-text">Your record has no tracks yet.</div>
              <button className="btn btn-secondary" onClick={() => setIsAdding(true)}>ADD YOUR FIRST TRACK</button>
            </div>
          )}

          {tracks.length > 0 && (
            <div className="track-builder-list">
              {tracks.map((track, i) => editingId === track.id ? (
                <TrackEditor key={track.id} initialTrack={track} onSave={(t) => update(track.id, t)} onCancel={() => setEditingId(null)} />
              ) : (
                <div key={track.id} className="track-builder-item">
                  <div className="track-builder-number">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="track-builder-title">{track.title}</div>
                  <div className="track-builder-duration">{track.duration}</div>
                  <div className="track-builder-actions">
                    <button className="track-builder-action" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                    <button className="track-builder-action" onClick={() => move(i, 1)} disabled={i === tracks.length - 1}>↓</button>
                    <button className="track-builder-action" onClick={() => setEditingId(track.id)}>✎</button>
                    <button className="track-builder-action track-builder-action--delete" onClick={() => remove(track.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAdding && (
            <TrackEditor onSave={add} onCancel={() => setIsAdding(false)} />
          )}

          {tracks.length > 0 && !isAdding && (
            <div style={{ marginTop: '1rem', textAlign: 'left' }}>
              <button className="btn btn-secondary btn-small" onClick={() => setIsAdding(true)}>+ Add Track</button>
            </div>
          )}
        </div>

        <div className="btn-group" style={{ marginTop: '3rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" disabled={tracks.length === 0} onClick={onNext}>Design Cover</button>
        </div>
      </div>
    </div>
  );
}
