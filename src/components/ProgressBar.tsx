import type { Page } from '../types/album';

const PAGES: Page[] = ['artist', 'record', 'tracks', 'studio', 'preview', 'release'];

export default function ProgressBar({ current }: { current: Page }) {
  if (current === 'home' || current === 'radio' || current === 'release') return null;
  
  const currentIndex = PAGES.indexOf(current);
  const displayPages = PAGES.filter(p => p !== 'release');
  
  return (
    <div className="progress-bar">
      {displayPages.map((page, i) => {
        const isActive = page === current;
        const isDone = i < currentIndex;
        return (
          <div key={page} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <div className="progress-divider" />}
            <div className={`progress-step ${isActive ? 'progress-step--active' : ''} ${isDone ? 'progress-step--done' : ''}`}>
              <span className="progress-step-number">{(i + 1).toString().padStart(2, '0')}</span>
              <span>{page === 'preview' ? 'radio' : page}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
