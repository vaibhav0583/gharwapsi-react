import { Link } from 'react-router-dom';
import './FamilyCard.css';

export default function FamilyCard({ family, delay = 0 }) {
  const { id, name, location, description, tags, rating, reviews, price, image, crowdLevel } = family;

  const crowdClass = { low: 'crowd-low', medium: 'crowd-med', high: 'crowd-high' }[crowdLevel];
  const crowdLabel = { low: '🟢 Low Crowd', medium: '🟡 Moderate', high: '🔴 Busy' }[crowdLevel];

  return (
    <div className="family-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="card-img-wrap">
        <img className="card-img" src={image} alt={name} loading="lazy" />
        <span className={`crowd-badge ${crowdClass}`}>{crowdLabel}</span>
      </div>
      <div className="card-body">
        <div className="card-location">📍 {location}</div>
        <div className="card-name">{name}</div>
        <p className="card-desc">{description}</p>
        <div className="card-tags">
          {tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
        </div>
        <div className="card-footer">
          <div className="card-rating">
            ⭐ {rating} <span className="review-count">({reviews} stays)</span>
          </div>
          <div className="card-price"><strong>₹{price}</strong>/night incl. meals</div>
        </div>
        <Link to={`/family/${id}`} className="card-cta">View Family →</Link>
      </div>
    </div>
  );
}
