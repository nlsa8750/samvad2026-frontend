import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="event-poster">
        <img
          src="/samvad-poster.jpeg"
          alt="Samvad 2026 Event Poster"
          className="poster-img"
        />
      </div>

      <div className="event-details">
        <h1 className="event-title">Samvad 2026</h1>
        <p className="event-tagline">From Ideas to Change</p>

        <div className="info-card">
          <div className="info-row">
            <span className="info-icon">📅</span>
            <span>9 April 2026</span>
          </div>
          <div className="info-row">
            <span className="info-icon">🕐</span>
            <span>Starting at 11:30 AM</span>
          </div>
          <div className="info-row">
            <span className="info-icon">📍</span>
            <span>CSWRI, Avikanagar, Malpura (District Tonk)</span>
          </div>
        </div>

        <div className="highlights">
          <h2>Event Highlights</h2>
          <ul>
            <li>Participation of 150+ journalists from across the district</li>
            <li>Guidance from senior media experts</li>
            <li>Special session on modern and digital journalism</li>
            <li>Felicitation and recognition of journalists</li>
            <li>Oath ceremony for responsible journalism</li>
            <li>Live dialogue and networking opportunities</li>
          </ul>
        </div>

        <button className="register-btn" onClick={() => navigate('/register')}>
          Register Now
        </button>

        <p className="helpline">Helpline: 9024209393</p>
      </div>
    </div>
  );
}

export default HomePage;
