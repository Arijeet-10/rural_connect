import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import App from './App.jsx'
import CartProvider from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Wrap your App component */}
      <App />
    </CartProvider>
  </React.StrictMode>,
)
