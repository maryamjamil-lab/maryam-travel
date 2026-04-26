import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Card({ image, title, location, price, rating, id }) {
  return (
    <div className="dest-card">
      <div className="dest-img-container">
        <img src={image} alt={title} />
        <span className="dest-price">${price}</span>
      </div>
      <div className="dest-info">
        <div className="dest-header">
          <h3>{title}</h3>
          <div className="dest-rating">
            <FontAwesomeIcon icon={faStar} /> <span>{rating}</span>
          </div>
        </div>
        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {location}</p>
       <Link to={`/tour/${id}`}>
       <button className="dest-btn">Explore destinations</button>
    </Link>
      </div>
    </div>
  );
}