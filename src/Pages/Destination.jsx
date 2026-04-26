import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './css/Destination.css';
import Card from '../Components/Card';
import des1 from '../assets/bali1.jpg';
import des2 from '../assets/dubai.jpg';
import des3 from '../assets/eygpt.jpg';
import des4 from '../assets/spain.jpg';
import des5 from '../assets/switzeland.jpg';
import des6 from '../assets/turkey.jpg';
import des7 from '../assets/maldive.jpg';
import des8 from '../assets/newzealand.jpg';
import des9 from '../assets/paris.jpg';
import Footer from '../Components/Footer';

const allData = [
  { id: 1, image: des1, title: "Bali",        location: "Indonesia",  price: "600",  rating: "4.9", category: "Asia"        },
  { id: 2, image: des2, title: "Dubai",       location: "UAE",        price: "1000", rating: "4.8", category: "Middle East" },
  { id: 3, image: des3, title: "Egypt",       location: "Africa",     price: "1500", rating: "4.9", category: "Africa"      },
  { id: 4, image: des4, title: "Spain",       location: "Europe",     price: "1700", rating: "4.6", category: "Europe"      },
  { id: 5, image: des5, title: "Switzerland", location: "Europe",     price: "2000", rating: "4.8", category: "Europe"      },
  { id: 6, image: des6, title: "Turkey",      location: "Asia",       price: "1200", rating: "5.0", category: "Asia"        },
  { id: 7, image: des7, title: "Maldives",    location: "South Asia", price: "800",  rating: "4.9", category: "Asia"        },
  { id: 8, image: des8, title: "New Zealand", location: "Oceania",    price: "1200", rating: "4.7", category: "Asia"        },
  { id: 9, image: des9, title: "Paris",       location: "France",     price: "1500", rating: "4.6", category: "Europe"      },
];

const CATEGORIES = ['All', 'Europe', 'Asia', 'Africa', 'Middle East'];

export default function Destination() {
  const [items, setItems] = useState(allData);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filterItem = (cat) => {
    setActiveFilter(cat);
    setItems(cat === 'All' ? allData : allData.filter((d) => d.category === cat));
  };

  return (
    <div className="destination-page">
      <Header />

      <div className="dest-hero">
        <div className="dest-hero-overlay">
          <h1>Explore Your <span>Dream</span> Destination</h1>
          <p>Find the best spots for your next adventure with TravelWorld</p>
        </div>
      </div>

      <div className="dest-content-container">
        <div className="filter-wrapper">
          <h3><FontAwesomeIcon icon={faFilter} /> Filter By:</h3>
          <div className="filter-btns">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={activeFilter === cat ? 'active-f' : ''}
                onClick={() => filterItem(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {items.length === 0 ? (
          <p className="no-results">No destinations found for this filter.</p>
        ) : (
          <div className="dest-grid">
            {items.map((val) => (
              <Card key={val.id} id={val.id} image={val.image}
                title={val.title} location={val.location}
                price={val.price} rating={val.rating} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}