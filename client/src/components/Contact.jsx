import React, { useState } from 'react';
import axios from 'axios';

// This component provides contact information and a form for users to send messages.

const Contact = () => {
  // State to manage the form input fields
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  // State to manage the submission status (e.g., 'idle', 'submitting', 'success', 'error')
  const [status, setStatus] = useState('idle');

  // Handles changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!formData.name || !formData.message) {
      // Using a simple browser alert for this prototype, but a custom modal would be better.
      alert('Please fill in both fields.');
      return;
    }
    setStatus('submitting');
    try {
      // POST request to the backend contact endpoint
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setStatus('success');
      // Reset form after a successful submission
      setFormData({ name: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center relative inline-block left-1/2 -translate-x-1/2">
          Contact Us
          {/* Underline accent */}
          <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information Section */}
          <div className="text-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <p className="mb-6 leading-relaxed">
              Have questions or need assistance? We're here to help. Reach out to us via our helpline or visit our local office.
            </p>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-green-500 text-xl mt-1 w-6"></i>
                <div className="ml-4">
                  <h4 className="font-semibold">Our Office</h4>
                  <p>Community Service Center,<br /> Near Old Factory Quarters,<br /> Hindusthan Cables Town, West Bengal, 713335</p>
                </div>
              </div>

              {/* Helpline Number */}
              <div className="flex items-start">
                <i className="fas fa-phone-alt text-green-500 text-xl mt-1 w-6"></i>
                <div className="ml-4">
                  <h4 className="font-semibold">Helpline</h4>
                  <p>+91 98765 43210 (10 AM - 6 PM, Mon - Sat)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="What can we help you with?"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-300 disabled:bg-gray-400"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Submission Status Messages */}
              {status === 'success' && (
                <p className="text-green-600 mt-4 text-center">Thank you! Your message has been sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-4 text-center">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
