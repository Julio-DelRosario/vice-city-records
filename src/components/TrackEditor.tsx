import { useState } from 'react';
import type { Track } from '../types/album';

interface TrackEditorProps {
  initialTrack?: Track;
  onSave: (track: Omit<Track, 'id'>) => void;
  onCancel: () => void;
}

export default function TrackEditor({ initialTrack, onSave, onCancel }: TrackEditorProps) {
  const [title, setTitle] = useState(initialTrack?.title || '');
  const [duration, setDuration] = useState(initialTrack?.duration || '');

  return (
    <div className="track-editor">
      <div className="form-group track-editor-title">
        <label className="form-label">Track Title</label>
        <input className="form-input" autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Neon Nights" onKeyDown={e => e.key === 'Enter' && title.trim() && onSave({ title, duration })} />
      </div>
      <div className="form-group track-editor-duration">
        <label className="form-label">Duration</label>
        <input className="form-input" value={duration} onChange={e => setDuration(e.target.value)} placeholder="3:47" onKeyDown={e => e.key === 'Enter' && title.trim() && onSave({ title, duration })} />
      </div>
      <div className="track-editor-actions">
        <button className="btn btn-secondary btn-small" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary btn-small" disabled={!title.trim()} onClick={() => onSave({ title, duration })}>Save</button>
      </div>
    </div>
  );
}
