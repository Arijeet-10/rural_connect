import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import { ShoppingCart, Trash2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart(); // Get the cart state from the context

  // Calculate the total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // This effect runs when the component mounts and whenever the URL changes
  // to check the authentication status.
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [navigate]); // Rerun when navigation occurs

  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    // It's also good practice to clear the cart on logout
    localStorage.removeItem('cart'); 
    
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
    window.location.reload(); // Force reload to clear all state
  };

  // Style for active NavLink
  const activeLinkStyle = {
    color: '#16a34a', // A nice green color to match the theme
    fontWeight: '600',
  };

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-green-600">
              RuralConnect
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </NavLink>
              </>
            )}
            {/* Cart Icon Link */}
            <NavLink to="/cart" className="relative text-gray-700 hover:text-green-600 px-3 py-2">
                            <ShoppingCart color='red' size={20} />

              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Hamburger Menu Button */}
          <div className="-mr-2 flex md:hidden">
             {/* Mobile Cart Icon */}
            <NavLink to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 mr-2">
              <ShoppingCart color='red' size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Dashboard</NavLink>
                  <button onClick={handleLogout} className="text-gray-700 hover:text-green-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Login</NavLink>
                  <NavLink to="/signup" className="bg-green-500 text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Sign Up</NavLink>
                </>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
