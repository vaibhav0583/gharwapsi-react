import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-brand">
        <span className="logo">Ghar<span>Wapsi</span></span>
        <span className="logo-devanagari">घर वापसी</span>
      </Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/explore" onClick={() => setMenuOpen(false)}>Find Families</Link></li>
        <li><a href="/#how" onClick={() => setMenuOpen(false)}>How It Works</a></li>
        <li><a href="/#ai" onClick={() => setMenuOpen(false)}>AI Features</a></li>
        <li><a href="/#crowd" onClick={() => setMenuOpen(false)}>Crowd Map</a></li>
        <li><Link to="/host" className="nav-cta" onClick={() => setMenuOpen(false)}>Become a Host</Link></li>
      </ul>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
