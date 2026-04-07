import { useEffect, useState, useRef } from 'react';
import './HomePage.css';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfveBsZNmRUuyXXnTrqKB2Y2PwjWVEhvPg6sF9MFZhp2rlw2Q/viewform?usp=header';

const EVENT_DATE = new Date('2026-04-09T11:30:00+05:30');

const guests = [
  { name: 'Vishal Suryakant Sharma', role: 'Editor, Punjab Kesari TV', photo: '/guests/vishal-sharma.png' },
  { name: 'Arun Joshi', role: 'Former Additional Director, Information & PR Dept, Rajasthan', photo: '/guests/arun-joshi.png' },
  { name: 'Ashish Dave', role: 'Founder, Politix News | Former Editor, Zee Rajasthan', photo: '/guests/ashish-dave.jpeg' },
  { name: 'Yogendra Kumar Sharma', role: 'News Coordinator, Jan TV Rajasthan', photo: '/guests/yogendra-sharma.jpeg' },
  { name: 'Mukesh Meena', role: 'President, Pink City Press Club, Jaipur', photo: '/guests/mukesh-meena.jpeg' },
  { name: 'Arun Kumar Tomar', role: 'Director, CSWRI Avikanagar', photo: '/guests/arun-tomar.webp' },
];

const organizers = [
  { name: 'Mukesh Dadhich', role: 'President' },
  { name: 'Rajkumar Parashar', role: 'Program Coordinator' },
  { name: 'Gopal Nayak', role: 'Co-Coordinator' },
  { name: 'Mahesh Sharma', role: 'Patron' },
  { name: 'Munna Namdakar', role: 'Patron' },
  { name: 'Ramaprasad Sharma', role: 'Vice President' },
  { name: 'Chandra Prakash Nayak', role: 'Vice President' },
  { name: 'Dipanshu Parashar', role: 'Media In-charge' },
  { name: 'Kiran Poswal', role: 'Co Media In-charge' },
  { name: 'Vishnu Roop Gurjar', role: 'Co Media In-charge' },
];

const committee = [
  'Rajesh Pareek', 'Imamuddin Ali Khan', 'Asif Nagori',
  'Shashi Goper', 'Dr. Amar Singh Meena', 'Sunil Jain',
];

const highlights = [
  'Participation of 150+ journalists from across the district',
  'Guidance from senior media experts',
  'Special session on modern and digital journalism',
  'Felicitation and recognition of journalists',
  'Oath ceremony for responsible journalism',
  'Live dialogue and networking opportunities',
  'Special discussion on new technologies at CSWRI',
];

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function useFadeIn() {
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-section ${className || ''}`}>{children}</div>;
}

function Divider() {
  return <div className="gold-divider"><span>✦</span><span>✦</span><span>✦</span></div>;
}

export default function HomePage() {
  const countdown = useCountdown(EVENT_DATE);


  return (
    <div className="page-wrapper">

      {/* Sticky Header */}
      <header className="sticky-header">
        <span className="header-title">Samvad 2026</span>
        <span className="header-date">📅 9 April 2026 | CSWRI, Malpura</span>
        <button className="header-btn" onClick={() => window.open(FORM_URL, '_blank')}>Register Now</button>
      </header>

      {/* Hero Section - no poster */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="event-org">Malpura News Portal Association</p>
          <h1 className="event-title">Samvad 2026</h1>
          <p className="event-tagline">From Ideas to Change</p>

          <div className="info-card">
            <div className="info-row"><span className="info-icon">📅</span><span>9 April 2026</span></div>
            <div className="info-row"><span className="info-icon">🕐</span><span>Starting at 11:30 AM</span></div>
            <div className="info-row"><span className="info-icon">📍</span><span>CSWRI, Avikanagar, Malpura (District Tonk)</span></div>
          </div>

          {/* Countdown */}
          <div className="countdown">
            {['days', 'hours', 'minutes', 'seconds'].map(unit => (
              <div className="countdown-box" key={unit}>
                <span className="countdown-num">{String(countdown[unit] ?? 0).padStart(2, '0')}</span>
                <span className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
              </div>
            ))}
          </div>

          <button className="register-btn" onClick={() => window.open(FORM_URL, '_blank')}>Register Now</button>
          <p className="helpline">Helpline: 9024209393</p>
        </div>
      </section>

      {/* Programs */}
      <FadeSection className="programs-section">
        <Divider />
        <h2 className="section-title">Programs</h2>
        <div className="programs-grid">
          {['Journalist Felicitation Ceremony', 'Journalist Workshop', 'Oath Taking Ceremony'].map(p => (
            <div className="program-card" key={p}>
              <span className="program-icon">🎙</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <Divider />
      </FadeSection>

      {/* Distinguished Guests */}
      <FadeSection className="guests-section">
        <h2 className="section-title">Distinguished Guests</h2>
        <div className="guests-grid">
          {guests.map(g => (
            <div className="guest-card" key={g.name}>
              <div className="guest-avatar">
                {g.photo
                  ? <img src={g.photo} alt={g.name} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                  : null}
                <span style={{display: g.photo ? 'none' : 'flex'}}>{g.name.charAt(0)}</span>
              </div>
              <h3 className="guest-name">{g.name}</h3>
              <p className="guest-role">{g.role}</p>
            </div>
          ))}
        </div>
        <Divider />
      </FadeSection>

      {/* Highlights */}
      <FadeSection className="highlights-section">
        <h2 className="section-title">Event Highlights</h2>
        <ul className="highlights-list">
          {highlights.map(h => (
            <li key={h}><span className="highlight-icon">✦</span>{h}</li>
          ))}
        </ul>
        <Divider />
      </FadeSection>

      {/* Organizers */}
      <FadeSection className="organizers-section">
        <h2 className="section-title">Organizers</h2>
        <p className="org-name">Malpura News Portal Association</p>
        <div className="organizers-grid">
          {organizers.map(o => (
            <div className="organizer-card" key={o.name}>
              <p className="org-member-name">{o.name}</p>
              <p className="org-member-role">{o.role}</p>
            </div>
          ))}
        </div>
        <Divider />
      </FadeSection>

      {/* Committee */}
      <FadeSection className="committee-section">
        <h2 className="section-title">Event Committee</h2>
        <div className="committee-list">
          {committee.map(m => (
            <span className="committee-member" key={m}>{m}</span>
          ))}
        </div>
        <Divider />
      </FadeSection>

      {/* Venue Map */}
      <FadeSection className="map-section">
        <Divider />
        <h2 className="section-title">Venue Location</h2>
        <p className="org-name">CSWRI, Avikanagar, Malpura (District Tonk)</p>
        <div
          className="map-wrapper"
          onClick={() => window.open('https://maps.app.goo.gl/T1yuJzQYskahprk5A', '_blank')}
          title="Click to open in Google Maps"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d894.1356440912687!2d75.4187532!3d26.3089249!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396e98f3339a0325%3A0xfdfe0a5dcb68ddb4!2sCentral%20Sheep%20and%20Wool%20Research%20Institute%20Avikanagar!5e0!3m2!1sen!2sin!4v1775563235143!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block', borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CSWRI Avikanagar Malpura"
          />
          <div className="map-overlay">
            <span>📍 Open in Google Maps</span>
          </div>
        </div>
      </FadeSection>

      {/* Footer */}
      <footer className="footer">
        <p>Organized by <strong>Malpura News Portal Association</strong></p>
        <p>Helpline: 9024209393</p>
        <p className="footer-quote">"Malpura se uthegi patrakarita ki nayi soch, nayi disha aur nayi awaaz"</p>
      </footer>

      {/* Mobile fixed CTA */}
      <div className="mobile-cta">
        <button onClick={() => window.open(FORM_URL, '_blank')}>Register Now</button>
      </div>

    </div>
  );
}
