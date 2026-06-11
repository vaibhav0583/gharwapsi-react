import { useState, useEffect } from 'react';
import { useReveal } from '../components/useReveal';
import FamilyCard from '../components/FamilyCard';
import { FAMILIES } from '../services/data';
import './Explore.css';

const STATES = ['All States', 'Uttarakhand', 'Rajasthan', 'Kerala', 'Uttar Pradesh', 'Gujarat', 'Odisha'];
const LIFESTYLES = ['All', 'farming', 'artisan', 'musician'];
const CROWD = ['All', 'low', 'medium'];

export default function Explore() {
  useReveal();
  const [search, setSearch] = useState('');
  const [state, setState] = useState('All States');
  const [lifestyle, setLifestyle] = useState('All');
  const [crowd, setCrowd] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [filtered, setFiltered] = useState(FAMILIES);

  useEffect(() => {
    let result = FAMILIES;
    if (search) result = result.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase())
    );
    if (state !== 'All States') result = result.filter(f => f.state === state);
    if (lifestyle !== 'All') result = result.filter(f => f.lifestyle === lifestyle);
    if (crowd !== 'All') result = result.filter(f => f.crowdLevel === crowd);
    result = result.filter(f => f.price <= maxPrice);
    setFiltered(result);
  }, [search, state, lifestyle, crowd, maxPrice]);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Find Your <em>Perfect Family</em></h1>
        <p className="explore-sub">Browse {FAMILIES.length} verified host families across India</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="filter-search"
          type="text"
          placeholder="🔍 Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="filter-select" value={state} onChange={e => setState(e.target.value)}>
          {STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={lifestyle} onChange={e => setLifestyle(e.target.value)}>
          {LIFESTYLES.map(l => <option key={l} value={l}>{l === 'All' ? 'All Lifestyles' : l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
        </select>
        <select className="filter-select" value={crowd} onChange={e => setCrowd(e.target.value)}>
          <option value="All">All Crowd Levels</option>
          <option value="low">🟢 Low Crowd</option>
          <option value="medium">🟡 Moderate</option>
        </select>
        <div className="price-filter">
          <span>Max ₹{maxPrice}/night</span>
          <input type="range" min="400" max="2000" step="50" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
        </div>
      </div>

      {/* Results */}
      <div className="explore-results">
        <div className="results-count">{filtered.length} families found</div>
        {filtered.length > 0 ? (
          <div className="explore-grid">
            {filtered.map((family, i) => (
              <FamilyCard key={family.id} family={family} delay={i * 0.05} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🏡</div>
            <h3>No families found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
