import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Header from '../Components/Header';
import './css/Admin.css';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const bookingSnap = await getDocs(query(collection(db, "tour_bookings"), orderBy("timestamp", "desc")));
      setBookings(bookingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const messageSnap = await getDocs(query(collection(db, "contact_messages"), orderBy("timestamp", "desc")));
      setMessages(messageSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (collectionName, id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        alert("Deleted Successfully!");
        fetchData(); 
      } catch (error) {
        alert("Error deleting: " + error.message);
      }
    }
  };

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="admin-panel">
      <Header />
      <div className="admin-container">
        <h1>Admin <span>Dashboard</span></h1>

        <section className="admin-section">
          <h2>Tour Bookings</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Tour</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(book => (
                  <tr key={book.id}>
                    <td>{book.customerName}</td>
                    <td>{book.tourTitle}</td>
                    <td>${book.totalPrice}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete("tour_bookings", book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>Messages</h2>
          <div className="message-grid">
            {messages.map(msg => (
              <div className="msg-card" key={msg.id}>
                <div className="msg-header">
                  <h4>{msg.name}</h4>
                  <button 
                    className="delete-icon-btn" 
                    onClick={() => handleDelete("contact_messages", msg.id)}
                  >
                    &times;
                  </button>
                </div>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}