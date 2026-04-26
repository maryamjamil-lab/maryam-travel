import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './css/Review.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Zainab Ali", rating: 5, comment: "Amazing experience with TravelWorld! Highly recommended.", date: "March 10, 2026" },
    { id: 2, name: "Usman Khan", rating: 4, comment: "The tour was great, but the hotel could be better. Overall 8/10.", date: "Feb 25, 2026" },
  ]);

  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setReviews([reviewData, ...reviews]); 
    setNewReview({ name: '', comment: '', rating: 5 });
    alert("Thank you for your feedback!");
  };

  return (
    <div className="reviews-page">
      <Header />
      
      <div className="reviews-hero">
        <h1>Traveler <span>Stories</span></h1>
        <p>Read what our global community has to say about their adventures.</p>
      </div>

      <div className="reviews-container">
        <div className="add-review-box">
          <h3>Share Your Experience</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            />
            <select 
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
            >
              <option value="5">5 Stars (Excellent)</option>
              <option value="4">4 Stars (Very Good)</option>
              <option value="3">3 Stars (Average)</option>
            </select>
            <textarea 
              placeholder="Write your review here..." 
              required 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            ></textarea>
            <button type="submit" className="submit-rev-btn">Post Review</button>
          </form>
        </div>
        <div className="reviews-grid">
          {reviews.map((rev) => (
            <div className="review-card-modern" key={rev.id}>
              <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
              <div className="rev-header">
                <FontAwesomeIcon icon={faUserCircle} className="user-avatar" />
                <div>
                  <h4>{rev.name}</h4>
                  <span className="rev-date">{rev.date}</span>
                </div>
              </div>
              <div className="rev-stars">
                {[...Array(rev.rating)].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
              </div>
              <p className="rev-text">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}