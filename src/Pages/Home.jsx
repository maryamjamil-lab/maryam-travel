import React, { useState } from 'react';
import Header from '../Components/Header';
import homeImg from '../assets/hero.jpg';
import './css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPaperPlane, faSearch, faExchangeAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import des1 from '../assets/bali.jpg';
import des5 from '../assets/switzeland.jpg';
import des6 from '../assets/turkey.jpg';
import Card from '../Components/Card';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    tripType: 'Round Trip',
    passengers: '1 Passenger',
    class: 'Business'
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSwap = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchData.from || !searchData.to || !searchData.departure) {
      alert("Please fill in all search fields!");
      return;
    }
    setLoading(true);
    try {
      const bookingInfo = {
        from: searchData.from,
        to: searchData.to,
        departureDate: searchData.departure,
        tripType: searchData.tripType,
        passengers: searchData.passengers,
        travelClass: searchData.class,
        timestamp: new Date().toISOString()
      };
      await addDoc(collection(db, "bookings"), bookingInfo);
      alert("Success! Your travel preferences have been saved.");
      setLoading(false);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Failed to save data. Please check your Firestore rules.");
      setLoading(false);
    }
  };

  const [newsEmail, setNewsEmail] = useState("");
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email: newsEmail,
        subscribedAt: new Date().toISOString()
      });
      alert("Thanks for subscribing! Check your inbox for the 20% off code.");
      setNewsEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="home-main">
      <Header />

      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${homeImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            YOUR NEXT ADVENTURE <br />
            <span>AWAITS!</span>
          </h1>
          <p className="hero-subtitle">
            Explore the world's most beautiful destinations with TravelWorld.
          </p>
          <Link to="/destination">
            <button className="hero-btn">Explore Destinations</button>
          </Link>

          <div className="booking-container">
            {/* Top Filters */}
            <div className="booking-top-filters">
              <select name="tripType" onChange={handleChange} value={searchData.tripType}>
                <option value="Round Trip">Round Trip</option>
                <option value="One Way">One Way</option>
              </select>
              <select name="passengers" onChange={handleChange} value={searchData.passengers}>
                <option value="1 Passenger">1 Passenger</option>
                <option value="2 Passengers">2 Passengers</option>
                <option value="Family">Family</option>
              </select>
              <select name="class" onChange={handleChange} value={searchData.class}>
                <option value="Business">Business</option>
                <option value="Economy">Economy</option>
                <option value="First Class">First Class</option>
              </select>
            </div>

            <div className="booking-search-bar">
              <div className="input-box">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-blue" />
                <input
                  type="text"
                  name="from"
                  placeholder="Where from?"
                  value={searchData.from}
                  onChange={handleChange}
                />
              </div>

              <div className="swap-icon" onClick={handleSwap} title="Swap Locations">
                <FontAwesomeIcon icon={faExchangeAlt} />
              </div>

              <div className="input-box">
                <FontAwesomeIcon icon={faPaperPlane} className="icon-blue" />
                <input
                  type="text"
                  name="to"
                  placeholder="Where to?"
                  value={searchData.to}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon-blue" />
                <input
                  type="date"
                  name="departure"
                  value={searchData.departure}
                  onChange={handleChange}
                />
              </div>

              <button className="search-icon-btn" onClick={handleSearch} disabled={loading}>
                {loading ? "..." : <FontAwesomeIcon icon={faSearch} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title">
          <h2>Trending <span>Destinations</span></h2>
          <p>Handpicked places for your next perfect getaway</p>
        </div>
        <div className="dest-grid">
          <Card image={des1} id='1' title="Bali" location="Indonesia, Asia" price="600" rating="4.9" />
          <Card image={des5} id='5' title="Switzerland" location="Europe" price="2000" rating="4.8" />
          <Card image={des6} id='6' title="Turkey" location="Western Asia" price="1200" rating="5.0" />
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat-item"><h3>12k+</h3><p>Happy Travellers</p></div>
        <div className="stat-item"><h3>500+</h3><p>Destinations</p></div>
        <div className="stat-item"><h3>4.9</h3><p>Avg. Rating</p></div>
      </section>

      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Get <span>20% Off</span> Your First Adventure!</h2>
          <p>Subscribe to our newsletter and get the latest travel deals and updates straight to your inbox.</p>
          <form className="news-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
            />
            <button type="submit">Subscribe Now</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}