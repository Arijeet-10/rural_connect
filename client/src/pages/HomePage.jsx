// client/src/pages/HomePage.jsx
import React from 'react';
// import Navbar from '../components/Navbar';
// import Services from '../components/Services';
import Products from '../components/Products';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import News from '../components/News';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
// import News from '../components/News';
// import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
        <News />
        <Contact />
      </main>
    </div>
  );
};

export default HomePage;