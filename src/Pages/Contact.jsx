import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import './css/Contact.css';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData]   = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name:      formData.name,
        email:     formData.email,
        message:   formData.message,
        timestamp: new Date().toISOString(),
        status:    "Unread",
      });
      alert(`Thank you ${formData.name}! Your message has been sent successfully.`);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Sorry, something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Header />

      <div className="contact-hero">
        <h1>Get In <span>Touch</span></h1>
        <p>Have questions? We're here to help you plan your next big adventure.</p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">

          <div className="contact-info-sidebar">
            <div className="info-item">
              <div className="icon-circle"><FontAwesomeIcon icon={faPhoneAlt} /></div>
              <div>
                <h4>Call Us</h4>
                <p><a href="tel:+923001234567">+92 300 1234567</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-circle"><FontAwesomeIcon icon={faEnvelope} /></div>
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:support@travelworld.com">support@travelworld.com</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-circle"><FontAwesomeIcon icon={faMapMarkerAlt} /></div>
              <div>
                <h4>Visit Us</h4>
                <p>Model Town, Jhang, Punjab</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-circle"><FontAwesomeIcon icon={faClock} /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <h3>Send a Message</h3>

              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="contact-btn" disabled={submitting}>
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Map */}
      <div className="map-section">
        <iframe
          title="TravelWorld Office — Jhang, Punjab"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109158.4636906669!2d72.25701833758117!3d31.272183204990977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39237277b068c2f1%3A0x6b8a8b1a3d922f3!2sJhang%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711294500000!5m2!1sen!2s"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      <Footer />
    </div>
  );
}