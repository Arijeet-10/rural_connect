import React from 'react';
// Import the necessary icons from lucide-react
import { ShoppingCart, Pill, Tractor, Receipt, Library, Stethoscope } from 'lucide-react';

// This component displays the list of services offered, now using lucide-react icons.

const Services = () => {
  // An array of service objects, updated to use Lucide components directly.
  const servicesList = [
    {
      name: 'Grocery Delivery',
      Icon: ShoppingCart, // Pass the component itself
      description: 'Fresh groceries and daily essentials delivered right to your doorstep.'
    },
    {
      name: 'Medicine Supply',
      Icon: Pill,
      description: 'Reliable and timely delivery of essential medicines and health products.'
    },
    {
      name: 'Agri-Tools Rental',
      Icon: Tractor,
      description: 'Rent modern agricultural tools and equipment to improve farm productivity.'
    },
    {
      name: 'Bill Payments',
      Icon: Receipt,
      description: 'Pay electricity, water, and other utility bills easily through our platform.'
    },
    {
      name: 'Govt. Scheme Info',
      Icon: Library,
      description: 'Access information on the latest government schemes and benefits for rural areas.'
    },
    {
      name: 'Tele-Health Consultation',
      Icon: Stethoscope,
      description: 'Connect with qualified doctors for online consultations from your home.'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 relative inline-block">
          Our Services
          {/* Underline accent */}
          <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></span>
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {servicesList.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 mb-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                {/* Render the Lucide icon component */}
                <service.Icon size={40} strokeWidth={1.5} />
              </div>
              
              {/* Service Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
              
              {/* Service Description */}
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
