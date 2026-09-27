import { TEMPLATES } from '../data/templates';

export default function Home({ onStart }: { onStart: () => void }) {
  const heroImage = TEMPLATES[0].photoUrl;

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ overflowY: 'auto', height: '100dvh', overflowX: 'hidden' }}>
      <div className="home-layout">
        <div className="home-hero">
          <div className="brand" style={{ marginBottom: '4rem' }}>
            <div className="brand-name" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '3rem', letterSpacing: '0.15em', color: 'var(--text)' }}>
              <img src="/favicon.ico?v=2" alt="VCR Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              VCR
            </div>
            <div className="brand-tagline" style={{ color: 'var(--text-secondary)', letterSpacing: '0.3em', marginTop: '0.5rem' }}>VICE CITY RECORDS</div>
          </div>
          
          <h1 className="headline" style={{ fontSize: '4rem', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            YOUR RECORD. <br/>YOUR VICE CITY.
          </h1>
          
          <div className="subtext" style={{ fontSize: '1.2rem', maxWidth: '450px', lineHeight: 1.6, color: 'var(--text-muted)', marginTop: '2rem', marginBottom: '2.5rem' }}>
            Create your artist, build your tracklist, design the cover, and release your record into Vice City.
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }} onClick={onStart}>
              ENTER THE STUDIO
            </button>
            <button className="btn btn-ghost" style={{ padding: '1.25rem 2rem', fontSize: '1.125rem', opacity: 0.8 }} onClick={scrollToHowItWorks}>
              HOW IT WORKS
            </button>
          </div>
        </div>

        <div className="home-visual">
          <div className="hero-record-showcase">
            <div className="hero-cd-container">
              <div className="hero-cd-disc">
                <div className="hero-cd-disc-art" style={{ backgroundImage: `url(${heroImage})` }}>
                  <div className="hero-cd-disc-hole" />
                </div>
              </div>
              <div className="hero-cd-cover">
                <img src={heroImage} alt="VCR Record" />
              </div>
            </div>
            <div className="hero-atmosphere-text">101.5 / VICE CITY RADIO</div>
          </div>
        </div>
      </div>

      <div id="how-it-works" className="how-it-works-section">
        <h2 className="hiw-title">HOW IT WORKS</h2>
        <div className="hiw-grid">
          <div className="hiw-step">
            <div className="hiw-step-num">01</div>
            <div className="hiw-step-title">CREATE ARTIST</div>
            <div className="hiw-step-desc">Establish your identity, pick a genre, and define your sound before hitting the studio.</div>
          </div>
          <div className="hiw-step">
            <div className="hiw-step-num">02</div>
            <div className="hiw-step-title">BUILD RECORD</div>
            <div className="hiw-step-desc">Compile your tracklist, set song durations, and assign a VCR catalog number.</div>
          </div>
          <div className="hiw-step">
            <div className="hiw-step-num">03</div>
            <div className="hiw-step-title">DESIGN COVER</div>
            <div className="hiw-step-desc">Upload a photo, explore Unsplash, or select a classic Vice City aesthetic template.</div>
          </div>
          <div className="hiw-step">
            <div className="hiw-step-num">04</div>
            <div className="hiw-step-title">RADIO ROTATION</div>
            <div className="hiw-step-desc">Preview your final physical release as it hits the airwaves of 101.5 Vice City Radio.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
