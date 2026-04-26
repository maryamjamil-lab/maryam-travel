import React, { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faUsers, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import './css/About.css';
import team2 from '../assets/image1.jpeg';
import team1 from '../assets/image2.jpeg';

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="about-page">
      <Header />

      <div className="about-hero">
        <div className="about-hero-text">
          <h1>Beyond <span>Boundaries</span></h1>
          <p>We don't just plan trips, we create memories that last a lifetime.</p>
        </div>
      </div>

      <div className="mv-lift">
        <div className="about-container">
          <section className="mission-vision">
            <div className="mv-card">
              <FontAwesomeIcon icon={faBullseye} className="mv-icon" />
              <h3>Our Mission</h3>
              <p>To provide accessible, affordable, and authentic travel experiences to every explorer in Pakistan and beyond.</p>
            </div>
            <div className="mv-card">
              <FontAwesomeIcon icon={faEye} className="mv-icon" />
              <h3>Our Vision</h3>
              <p>To become the world's most trusted travel companion by blending technology with human touch.</p>
            </div>
          </section>
        </div>
      </div>

      <div className="about-container">
        <section className="about-info">
          <div className="info-content">
            <h2>Who We Are?</h2>
            <p>
              TravelWorld is not just a travel agency; it's a community of dreamers and explorers.
              Founded in 2026 as a Final Year Project with a passion for seamless digital experiences,
              we bridge the gap between complex travel planning and effortless adventures. Our platform
              is built on the foundation of innovation, trust, and transparency, ensuring that every
              traveler finds their perfect escape without the hassle. Whether it's the serene beaches
              of Bali or the rugged mountains of Pakistan, we are dedicated to providing expert-curated
              tours, real-time assistance, and memories that last a lifetime. Our mission is to make
              the world accessible to everyone, one click at a time.
            </p>
            <div className="info-stats">
              <div className="s-box"><FontAwesomeIcon icon={faGlobeAmericas} /> <span>50+ Countries</span></div>
              <div className="s-box"><FontAwesomeIcon icon={faUsers} />        <span>10k+ Community</span></div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="section-title">
            <h2>Meet Our <span>Creative Team</span></h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="member-img">
                <img src={team1} alt="Maryam Jamil — Lead Frontend Developer" />
              </div>
              <h4>Maryam Jamil</h4>
              <p>Lead Frontend Developer</p>
            </div>
            <div className="team-card">
              <div className="member-img">
                <img src={team2} alt="Syeda Gillani — UI/UX Designer" />
              </div>
              <h4>Syeda Gillani</h4>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}