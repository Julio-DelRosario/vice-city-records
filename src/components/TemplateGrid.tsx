import { TEMPLATES, type Template } from '../data/templates';
import { generateTemplate } from '../services/templateGenerator';
import { useState } from 'react';

export default function TemplateGrid({ onSelect }: { onSelect: (dataUrl: string) => void }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSelect = async (template: Template) => {
    setLoadingId(template.id);
    try {
      const dataUrl = await generateTemplate(template);
      onSelect(dataUrl);
    } catch (err) {
      console.error('Failed to generate template', err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="template-grid">
      {TEMPLATES.map(template => (
        <div key={template.id} className="template-card" onClick={() => !loadingId && handleSelect(template)} style={{ position: 'relative' }}>
          <div className="template-card-preview" style={{ position: 'relative' }}>
            <img src={template.photoUrl} alt={template.name} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.5rem', fontWeight: 'bold', letterSpacing: '0.15em', opacity: 0.8 }}>{template.location}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.05em' }}>{template.name}</div>
            </div>
            {loadingId === template.id && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                LOADING...
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
