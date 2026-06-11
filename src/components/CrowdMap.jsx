import { useEffect, useRef } from 'react';
import './CrowdMap.css';

const CROWD_DATA = [
  { place: 'Rishikesh', level: 'high', pct: 92, sub: 'Very crowded · Try Devprayag', icon: '🔴', cls: 'ind-red', fillCls: 'fill-red' },
  { place: 'Jaipur', level: 'medium', pct: 58, sub: 'Moderate crowds · Weekdays better', icon: '🟡', cls: 'ind-yellow', fillCls: 'fill-yellow' },
  { place: 'Wayanad', level: 'low', pct: 24, sub: 'Perfect time to visit · Low season', icon: '🟢', cls: 'ind-green', fillCls: 'fill-green' },
  { place: 'Varanasi Ghats', level: 'low', pct: 30, sub: 'Great time for Ganga Aarti', icon: '🟢', cls: 'ind-green', fillCls: 'fill-green-alt' },
];

export default function CrowdMap() {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const pct = e.target.dataset.pct;
          e.target.style.width = pct + '%';
        }
      });
    }, { threshold: 0.5 });

    barsRef.current.forEach(b => { if (b) { b.style.width = '0%'; observer.observe(b); } });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="crowd-section" id="crowd">
      <div className="section-tag">Live Intelligence</div>
      <h2 className="section-title">Skip the crowds.<br /><em>Find your peace.</em></h2>

      <div className="crowd-grid">
        {/* Map Visual */}
        <div className="map-visual reveal">
          <div className="map-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 400 400" className="map-svg">
              <circle cx="200" cy="120" r="60" fill="none" stroke="rgba(245,166,35,0.4)" strokeWidth="1"/>
              <circle cx="200" cy="120" r="40" fill="none" stroke="rgba(245,166,35,0.2)" strokeWidth="1"/>
              <circle cx="120" cy="220" r="40" fill="none" stroke="rgba(232,101,26,0.4)" strokeWidth="1"/>
              <circle cx="280" cy="200" r="50" fill="none" stroke="rgba(232,101,26,0.3)" strokeWidth="1"/>
              <circle cx="160" cy="300" r="45" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/>
            </svg>
            <div className="map-dot dot-red" style={{top:'28%',left:'48%'}}></div>
            <div className="map-dot dot-yellow" style={{top:'55%',left:'30%'}}></div>
            <div className="map-dot dot-green" style={{top:'70%',left:'42%'}}></div>
            <div className="map-dot dot-green" style={{top:'45%',left:'65%'}}></div>
            <div className="map-dot dot-green-sm" style={{top:'32%',left:'22%'}}></div>
            <div className="map-label" style={{top:'24%',left:'40%'}}>Rishikesh 🔴</div>
            <div className="map-label" style={{top:'50%',left:'20%'}}>Jaipur 🟡</div>
            <div className="map-label" style={{top:'65%',left:'38%'}}>Wayanad 🟢</div>
            <div className="map-label" style={{top:'42%',left:'58%'}}>Varanasi 🟢</div>
          </div>
        </div>

        {/* Stats */}
        <div className="crowd-stats-col">
          <p className="crowd-intro">Real-time crowd levels updated every hour. We'll always suggest a quieter alternative nearby.</p>
          <div className="crowd-stats">
            {CROWD_DATA.map((item, i) => (
              <div key={i} className="crowd-stat-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`crowd-indicator ${item.cls}`}>{item.icon}</div>
                <div className="crowd-stat-info">
                  <div className="crowd-stat-place">{item.place}</div>
                  <div className="crowd-stat-sub">{item.sub}</div>
                </div>
                <div className="crowd-bar-wrap">
                  <div className="crowd-bar">
                    <div
                      className={`crowd-bar-fill ${item.fillCls}`}
                      data-pct={item.pct}
                      ref={el => barsRef.current[i] = el}
                    ></div>
                  </div>
                  <div className="crowd-pct">{item.pct}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
