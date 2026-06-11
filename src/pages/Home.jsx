import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../components/useReveal';
import FamilyCard from '../components/FamilyCard';
import ChatBot from '../components/ChatBot';
import CrowdMap from '../components/CrowdMap';
import { FAMILIES, TESTIMONIALS } from '../services/data';
import './Home.css';

export default function Home() {
  useReveal();
  const [earnings, setEarnings] = useState({ nights: 12, monthly: 9600, yearly: 115200 });
  const statRefs = useRef([]);

  // Counter animation
  useEffect(() => {
    const targets = [2400, 180];
    const suffixes = ['+', '+'];
    statRefs.current.forEach((el, i) => {
      if (!el || i >= targets.length) return;
      let current = 0;
      const target = targets[i];
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString('en-IN') + suffixes[i];
      }, 20);
    });
  }, []);

  const handleSlider = (e) => {
    const nights = parseInt(e.target.value);
    const monthly = nights * 800;
    setEarnings({ nights, monthly, yearly: monthly * 12 });
  };

  const featuredFamilies = FAMILIES.slice(0, 3);

  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-left">
          <div className="mandala-bg"></div>
          <div className="hero-tag">
            <span className="tag-dot"></span>
            🇮🇳 India's Cultural Homestay Platform
          </div>
          <h1 className="hero-title">
            Don't visit India.<br />
            <em>Live</em> inside it.
          </h1>
          <p className="hero-sub">
            Stay with real Indian families, share their meals, celebrate their festivals,
            and experience the India no hotel can show you.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn-primary">Find a Family Stay →</Link>
            <a href="#how" className="btn-secondary">How it works <span>→</span></a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num" ref={el => statRefs.current[0] = el}>2,400+</span>
              <span className="stat-label">Host Families</span>
            </div>
            <div className="stat-item">
              <span className="stat-num" ref={el => statRefs.current[1] = el}>180+</span>
              <span className="stat-label">Districts</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">4.96★</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-grid">
            <div><img src="https://images.unsplash.com/photo-1585016495481-91613b13f3f0?w=400&h=300&fit=crop" alt="Indian family" loading="lazy" /></div>
            <div><img src="https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=400&h=300&fit=crop" alt="Indian meal" loading="lazy" /></div>
            <div><img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop" alt="India culture" loading="lazy" /></div>
            <div><img src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&h=300&fit=crop" alt="Village India" loading="lazy" /></div>
          </div>
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div className="search-section">
        <div className="search-card reveal">
          <div className="search-field">
            <label>Where</label>
            <input type="text" placeholder="Rishikesh, Varanasi, Coorg..." />
          </div>
          <div className="search-field">
            <label>Experience</label>
            <select>
              <option>Any lifestyle</option>
              <option>Farming family</option>
              <option>Artisan family</option>
              <option>Musician family</option>
              <option>Festival experience</option>
            </select>
          </div>
          <div className="search-field">
            <label>When</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>Guests</label>
            <input type="number" defaultValue={1} min={1} max={6} />
          </div>
          <Link to="/explore" className="search-btn">🔍 Find Families</Link>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="section" id="how">
        <div className="section-tag">Simple Process</div>
        <h2 className="section-title">How <em>GharWapsi</em> works</h2>
        <div className="how-grid">
          {[
            { num: '01', icon: '🧠', title: 'Take the Vibe Quiz', desc: 'Answer 8 quick questions about your travel style, food preferences, sleep habits, and interests. Our AI builds your traveler profile.' },
            { num: '02', icon: '🤖', title: 'AI Matches You', desc: 'Our algorithm finds the most compatible families — not just by location, but by personality, lifestyle, and shared interests.' },
            { num: '03', icon: '🏠', title: 'Live Like Family', desc: "Join them for morning chai, farm work, local crafts, and home-cooked meals. You don't visit — you belong, even if just for a few days." }
          ].map((step, i) => (
            <div key={i} className="how-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAMILY CARDS ── */}
      <section className="families-section" id="families">
        <div className="families-header">
          <div>
            <div className="section-tag">Featured Hosts</div>
            <h2 className="section-title">Real families.<br /><em>Real lives.</em></h2>
          </div>
          <Link to="/explore" className="view-all">View all families →</Link>
        </div>
        <div className="families-grid">
          {featuredFamilies.map((family, i) => (
            <FamilyCard key={family.id} family={family} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section className="ai-section" id="ai">
        <div className="ai-grid">
          <div>
            <div className="section-tag">Powered by AI</div>
            <h2 className="section-title">Smart travel,<br /><em>human heart</em></h2>
            <div className="ai-features">
              {[
                { icon: '🧠', title: 'Personality-Based Matching', desc: 'Answer a vibe quiz and our AI finds families who match your energy, lifestyle, and interests — not just your location.' },
                { icon: '✍️', title: 'AI Profile Writer', desc: 'Host families speak in Hindi, Kannada, Tamil — our AI translates their stories into beautiful English profiles automatically.' },
                { icon: '🗺️', title: 'AI Trip Planner', desc: 'Tell us your budget and days. AI builds a complete day-by-day itinerary around your chosen family stay.' }
              ].map((f, i) => (
                <div key={i} className="ai-feature reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="ai-icon">{f.icon}</div>
                  <div>
                    <div className="ai-feature-title">{f.title}</div>
                    <div className="ai-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ChatBot />
        </div>
      </section>

      {/* ── CROWD MAP ── */}
      <CrowdMap />

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-tag">Stories</div>
        <h2 className="section-title">What travelers <em>say</em></h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stars">★★★★★</div>
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initial}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-loc">{t.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOST CTA ── */}
      <section className="host-section" id="host">
        <div>
          <h2 className="host-title">Your home.<br />Your culture.<br /><em>Your income.</em></h2>
          <p className="host-desc">You don't need to do anything extra. Just live your life — and let a curious traveler join you. Earn ₹800–₹2,000 per night simply by sharing your world.</p>
          <div className="host-perks">
            {['Aadhaar-verified guest profiles only', 'You control your availability completely', 'AI writes your profile for you', 'Women-only hosting option available', 'Payments via UPI, directly to you'].map((p, i) => (
              <div key={i} className="perk"><span className="perk-dot"></span>{p}</div>
            ))}
          </div>
          <Link to="/host" className="btn-light">Register your family →</Link>
        </div>

        <div className="host-visual reveal">
          <div className="earning-calc">
            <div>
              <div className="calc-label">Estimated Monthly Earnings</div>
              <div className="calc-value">₹{earnings.monthly.toLocaleString('en-IN')}</div>
              <div className="calc-sub">Based on {earnings.nights} guest-nights/month at ₹800/night</div>
            </div>
            <div>
              <div className="calc-slider-row">
                <span>Guests per month</span>
                <span>{earnings.nights} nights</span>
              </div>
              <input className="calc-slider" type="range" min="4" max="30" value={earnings.nights} onChange={handleSlider} />
              <div className="calc-row"><span>4 nights</span><span>30 nights</span></div>
            </div>
            <div className="yearly-box">
              <div className="yearly-label">YEARLY POTENTIAL</div>
              <div className="yearly-value">₹{earnings.yearly.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="logo">Ghar<span>Wapsi</span></span>
          <p className="footer-desc">Connecting curious travelers with real Indian families since 2024. Atithi Devo Bhava — Guest is God.</p>
        </div>
        {[
          { title: 'Explore', links: ['Find Families', 'Browse Experiences', 'Crowd Map', 'Festival Calendar'] },
          { title: 'Hosts', links: ['Become a Host', 'Host Resources', 'Safety Guide', 'Earn Calculator'] },
          { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact'] }
        ].map((col, i) => (
          <div key={i} className="footer-col">
            <h4>{col.title}</h4>
            <ul>{col.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}</ul>
          </div>
        ))}
      </footer>
      <div className="footer-bottom">
        <span>© 2024 GharWapsi. Built with ❤️ in India.</span>
        <span>Privacy · Terms · Safety</span>
      </div>

    </main>
  );
}
