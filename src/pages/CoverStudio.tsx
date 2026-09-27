import { useState, useRef, useEffect, type DragEvent } from 'react';
import type { Album } from '../types/album';
import ImageEditor from '@unlayer/react-image-editor';
import UnsplashGrid from '../components/UnsplashGrid';
import TemplateGrid from '../components/TemplateGrid';

export default function CoverStudio({ album, onSaveArtwork, onNext, onBack }: { album: Album; onSaveArtwork: (url: string) => void; onNext: () => void; onBack: () => void; }) {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (album.artwork) {
      setSourceDataUrl(album.artwork);
    }
  }, [album.artwork]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return setError('Please upload an image file.');
    setError(null);
    const reader = new FileReader();
    reader.onload = e => setSourceDataUrl(e.target?.result as string);
    reader.onerror = () => setError('Failed to read the file.');
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const onDragLeave = (e: DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const onDrop = (e: DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  if (sourceDataUrl) {
    return (
      <div className="cover-studio">
        <div className="cover-studio-header" style={{ display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <button className="btn btn-ghost" onClick={() => setSourceDataUrl(null)} style={{ padding: '0.25rem 0.5rem' }}>← BACK TO SOURCES</button>
          <span className="studio-header-title">COVER STUDIO</span>
        </div>
        
        {error && <div className="form-error" style={{ textAlign: 'center', margin: '1rem 0' }}>{error} <button className="dismiss-btn" onClick={() => setError(null)}>Dismiss</button></div>}

        <div className="editor-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '1200px', width: '100%', margin: '0 auto 2rem auto', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <ImageEditor
            image={sourceDataUrl}
            options={{ theme: 'dark' }}
            minHeight="100%"
            style={{ width: '100%', height: '100%' }}
            onSave={({ dataUrl }) => { onSaveArtwork(dataUrl); onNext(); }}
            onCancel={() => setSourceDataUrl(null)}
            onLoadError={() => setError('Failed to load image into editor.')}
            onError={err => setError(err.message)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cover-studio">
      <div className="cover-studio-header">
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: '0.25rem 0.5rem', marginBottom: '1rem' }}>← BACK TO TRACKLIST</button>
        <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>CREATE YOUR COVER</h1>
        <p className="subtext" style={{ margin: 0, textAlign: 'left', maxWidth: 'none' }}>Start with a photo, choose a VCR location, or browse images</p>
        {error && <div className="form-error" style={{ marginTop: '0.5rem' }}>{error}</div>}
      </div>

      <div className="cover-studio-layout">
        {/* LEFT COLUMN: Upload */}
        <div className="cover-studio-left">
          <div className="section-label" style={{ marginBottom: '1rem' }}>UPLOAD YOUR IMAGE</div>
          <div className={`upload-zone ${dragActive ? 'upload-zone--active' : ''}`} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={() => fileInputRef.current?.click()} style={{ minHeight: '150px', height: '150px', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="upload-zone-text" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>DROP IMAGE OR CLICK TO BROWSE</div>
            <div className="upload-zone-icon" style={{ fontSize: '1.5rem', marginBottom: 0 }}>+</div>
            <input type="file" accept="image/png, image/jpeg, image/webp" ref={fileInputRef} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
          </div>
        </div>

        {/* RIGHT COLUMN: Images + Templates */}
        <div className="cover-studio-right" style={{ paddingBottom: '2rem' }}>
          <section>
            <div className="section-label" style={{ marginBottom: '0.5rem' }}>SEARCH IMAGES</div>
            <UnsplashGrid onSelect={url => setSourceDataUrl(url)} onSearchActive={setIsSearching} />
          </section>

          {!isSearching && (
            <section style={{ marginTop: '0.5rem' }}>
              <div className="section-label" style={{ marginBottom: '0.5rem' }}>VCR LOCATIONS</div>
              <TemplateGrid onSelect={url => setSourceDataUrl(url)} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
