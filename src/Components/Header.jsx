import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData]   = useState({ name: '', email: '', password: '' });
  const [errors, setErrors]       = useState({});

  // Firebase auth listener — UNCHANGED
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  // Lock body scroll when modal OR drawer is open
  useEffect(() => {
    if (showModal || menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal, menuOpen]);

  // ESC closes modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setShowModal(false); setMenuOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleModal = (type) => {
    setIsSignUp(type === 'signup');
    setErrors({});
    setFormData({ name: '', email: '', password: '' });
    setShowModal(true);
    setMenuOpen(false);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let newErrors = {};
    if (isSignUp && !formData.name.trim()) newErrors.name = "Name is required";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email)                          newErrors.email    = "Email is required";
    else if (!emailPattern.test(formData.email))  newErrors.email    = "Please enter a valid email address";
    if (!formData.password)                        newErrors.password = "Password is required";
    else if (formData.password.length < 6)         newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Firebase logic — UNCHANGED
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (isSignUp) {
        const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await setDoc(doc(db, "users", user.uid), {
          fullName: formData.name, email: formData.email,
          uid: user.uid, createdAt: new Date().toISOString()
        });
        alert("Account Created Successfully!");
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Logged In Successfully!");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Firebase Auth Error:", error.message);
      alert(error.message);
    }
  };

  const handleLogout = () => { signOut(auth); alert("Logged Out!"); };

  return (
    <>
      {/* ── Sticky nav bar ── */}
      <div className="box-shadow">
        <nav className="nav-bar">
          <div className="logo-div">
            <img src={logo} alt="TravelWorld logo" />
          </div>

          {/* Hamburger — 3 bars, no typo */}
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          {/* Desktop nav links */}
          <div className="center">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destination">Destination</Link></li>
              <li><Link to="/tour/1">Tour Packages</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/review">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Desktop auth buttons */}
          <div className="desktop-buttons">
            {currentUser ? (
              <button className="btnlog" onClick={handleLogout}>Log Out</button>
            ) : (
              <>
                <button className="btnsign" onClick={() => toggleModal('signup')}>Sign Up</button>
                <button className="btnlog"  onClick={() => toggleModal('login')}>Log In</button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* ── Mobile drawer — rendered as its own fixed layer ── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />

          {/* Drawer panel */}
          <nav className="mobile-drawer" aria-label="Mobile navigation">
            <ul>
              {[
                { to: '/',            label: 'Home' },
                { to: '/destination', label: 'Destination' },
                { to: '/tour/1',      label: 'Tour Packages' },
                { to: '/about',       label: 'About' },
                { to: '/review',      label: 'Reviews' },
                { to: '/contact',     label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
                </li>
              ))}
            </ul>

            <div className="drawer-buttons">
              {currentUser ? (
                <button className="btnlog" onClick={() => { handleLogout(); setMenuOpen(false); }}>Log Out</button>
              ) : (
                <>
                  <button className="btnsign" onClick={() => toggleModal('signup')}>Sign Up</button>
                  <button className="btnlog"  onClick={() => toggleModal('login')}>Log In</button>
                </>
              )}
            </div>
          </nav>
        </>
      )}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={isSignUp ? 'Sign up' : 'Log in'}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            <div className="form-container">
              <h2>{isSignUp ? 'Join Us' : 'Welcome Back'}</h2>
              <p>Experience the world with TravelWorld</p>
              <form onSubmit={handleSubmit} noValidate>
                {isSignUp && (
                  <div className="input-group">
                    <input
                      type="text" name="name" placeholder="Full Name"
                      className={errors.name ? 'input-error' : ''}
                      value={formData.name} onChange={handleInputChange}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                )}
                <div className="input-group">
                  <input
                    type="email" name="email" placeholder="Email Address"
                    className={errors.email ? 'input-error' : ''}
                    value={formData.email} onChange={handleInputChange}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="input-group">
                  <input
                    type="password" name="password" placeholder="Password"
                    className={errors.password ? 'input-error' : ''}
                    value={formData.password} onChange={handleInputChange}
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                <button type="submit" className="form-submit-btn">
                  {isSignUp ? 'Create Account' : 'Login'}
                </button>
              </form>
              <div className="form-footer">
                <p>
                  {isSignUp ? "Already a member?" : "New to TravelWorld?"}
                  <span onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}>
                    {isSignUp ? " Login" : " Sign Up"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}