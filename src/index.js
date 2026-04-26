import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import DestinationCard from './Pages/Destination';
import Tour from './Pages/Tour';
import Reviews from './Pages/Reviews';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Admin from './Pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allroutes = createHashRouter(
  [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/destination',
      element: <DestinationCard/>
    },
    {
      path: "/tour/:id",
      element: <Tour/>
    },
    {
      path: '/about',
      element: <About/>
    },
    {
      path: '/review',
      element: <Reviews/>
    },
    {
      path: '/contact',
      element: <Contact/>
    },
    {
      path: '/Admin',
      element: <Admin/>
    }
  ]
)
root.render(
  <React.StrictMode>
    <RouterProvider router={allroutes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
