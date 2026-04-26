import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUsers, faMapMarkerAlt, faShieldAlt, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import './css/Tour.css';
import Footer from '../Components/Footer';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const tourData = {
  "1": { title: "Bali Bliss",     location: "Indonesia",  price: 600,  days: "5 Days",  people: "12+", image: "bali.jpg"        },
  "2": { title: "Dubai Luxury",   location: "UAE",        price: 1000, days: "4 Days",  people: "10+", image: "dubai.jpg"       },
  "3": { title: "Egypt",          location: "Africa",     price: 1500, days: "7 Days",  people: "10+", image: "eygpt.jpg"       },
  "4": { title: "Spain",          location: "Europe",     price: 1700, days: "9 Days",  people: "12+", image: "spain.jpg"       },
  "5": { title: "Switzerland",    location: "Europe",     price: 2000, days: "6 Days",  people: "8+",  image: "switzerland.jpg" },
  "6": { title: "Turkey",         location: "Asia",       price: 1200, days: "10 Days", people: "15+", image: "turkey.jpg"      },
  "7": { title: "Maldives",       location: "South Asia", price: 800,  days: "9 Days",  people: "8+",  image: "maldives.jpg"    },
  "8": { title: "New Zealand",    location: "Oceania",    price: 1200, days: "12 Days", people: "6+",  image: "newzealand.jpg"  },
  "9": { title: "Paris",          location: "France",     price: 1500, days: "7 Days",  people: "10+", image: "paris.jpg"       },
};

const FALLBACK = { title: "Dream Destination", location: "Global", price: 1200, days: "7 Days", people: "15+", image: "" };

export default function Tour() {
  const { id } = useParams();
  const tour = tourData[id] || FALLBACK;

  const [formData, setFormData] = useState({ name: '', email: '', date: '', guests: 1 });
  const [isBooked, setIsBooked]   = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooked(true);
    try {
      await addDoc(collection(db, "tour_bookings"), {
        tourTitle:     tour.title,
        tourLocation:  tour.location,
        customerName:  formData.name,
        customerEmail: formData.email,
        bookingDate:   formData.date,
        totalGuests:   formData.guests,
        totalPrice:    tour.price * (Number(formData.guests) || 1),
        status:        "Pending",
        timestamp:     new Date().toISOString(),
      });
      alert(`Congratulations ${formData.name}! Your tour to ${tour.title} has been booked successfully.`);
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsBooked(false);
    }
  };

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/assets/${tour.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="tour-wrapper">
      <Header />

      <div className="tour-hero-modern" style={heroStyle}>
        <div className="hero-overlay-glass">
          <span className="tour-tag">✨ Most Popular Tour</span>
          <h1>{tour.title}</h1>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {tour.location}</p>
        </div>
      </div>

      <div className="tour-content-grid">

        <div className="tour-details-left">
          <div className="info-card">
            <h3>Experience The Adventure</h3>
            <p className="description-text">
              Embark on a journey of a lifetime. From breathtaking views to cultural immersion,
              this {tour.days} tour covers the finest spots in {tour.location}.
            </p>

            <div className="feature-badges">
              <div className="f-badge"><FontAwesomeIcon icon={faClock}     /> <span>{tour.days}</span></div>
              <div className="f-badge"><FontAwesomeIcon icon={faUsers}     /> <span>{tour.people}</span></div>
              <div className="f-badge"><FontAwesomeIcon icon={faShieldAlt} /> <span>Safe &amp; Secure</span></div>
            </div>

            <div className="itinerary-section">
              <h3>Tour Itinerary</h3>
              <div className="timeline-item">
                <div className="time-dot" />
                <p><strong>Day 01: Arrival &amp; Sunset Dinner</strong> – Check-in and enjoy a luxury dinner.</p>
              </div>
              <div className="timeline-item">
                <div className="time-dot" />
                <p><strong>Day 02: City Exploration</strong> – Guided tour through historical landmarks.</p>
              </div>
              <div className="timeline-item">
                <div className="time-dot" />
                <p><strong>Day 03: Nature &amp; Photography</strong> – Early morning hike and scenic photo sessions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tour-booking-right">
          <div className="booking-card">
            <div className="price-header">
              <h4>Total Price</h4>
              <h2>${tour.price} <span>/per person</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="aesthetic-form">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text"   name="name"   placeholder="John Doe"          required onChange={handleInput} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email"  name="email"  placeholder="example@mail.com"  required onChange={handleInput} />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Date</label>
                  <input type="date"   name="date"   required onChange={handleInput} />
                </div>
                <div className="input-group">
                  <label>Guests</label>
                  <input type="number" name="guests" min="1" defaultValue="1" onChange={handleInput} />
                </div>
              </div>

              <button type="submit" className="confirm-btn" disabled={isBooked}>
                {isBooked ? "Processing…" : "Confirm Booking"} <FontAwesomeIcon icon={faPlaneDeparture} />
              </button>
            </form>

            <p className="card-footer-text">No payment required now. Pay later at the spot!</p>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}