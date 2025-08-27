import React from 'react';

// A background image would be ideal here.
// For this example, we'll use a placeholder URL.
// In a real project, you would place your image in the `src/assets` folder.
const heroBackgroundImage = '/home.jpg';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-[60vh] sm:min-h-[80vh]">
        <div className="text-center max-w-3xl">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-shadow-lg">
            Connecting Villages, Delivering Essentials
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 text-shadow">
            Easy access to groceries, medicines, and vital services for the communities of West Bengal.
          </p>
          
          {/* Call-to-Action Button */}
          <a 
            href="#products" 
            className="inline-block bg-green-500 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
