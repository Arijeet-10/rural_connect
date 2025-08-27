import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

// --- (Step 1: Import all the product icons) ---
import milkIcon from '../assets/icons/milk.jpeg';
import breadIcon from '../assets/icons/bread.jpeg';
import medicineIcon from '../assets/icons/medicine.jpeg';
import riceIcon from '../assets/icons/rice.jpeg';
import lentilsIcon from '../assets/icons/lentils.jpeg';
import oilIcon from '../assets/icons/oil.jpeg';
import freshVegetables from '../assets/icons/vegetables.jpeg';
import spices from '../assets/icons/spices.jpeg';
import defaultProductIcon from '../assets/icons/default.png';
import Navbar from '../components/Navbar';

// --- (Step 2: Create the same icon mapping as the Products page) ---
const productIcons = {
  'Fresh Milk': milkIcon,
  'Brown Bread': breadIcon,
  'Paracetamol': medicineIcon,
  'Rice (1kg)': riceIcon,
  'Lentils (1kg)': lentilsIcon,
  'Cooking Oil': oilIcon,
  'Seasonal Vegetables': freshVegetables,
  'Local Spices': spices,
};


const CartPage = () => {
  // Get cart state and functions from the CartContext
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate the total price of all items in the cart
  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  // Handle the checkout process
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      // Redirect to login if the user is not authenticated
      navigate('/login?redirect=/cart');
      return;
    }

    const bookingData = {
      products: cart.map(item => `${item.name} (Qty: ${item.quantity})`),
    };

    try {
      // Make an API call to the backend to create a new booking
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/${userId}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // On success, clear the cart and navigate to the dashboard
      alert('Booking successful!');
      clearCart();
      navigate('/dashboard');

    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('There was an error placing your booking. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen py-12 pt-28"> {/* Added pt-28 for navbar offset */}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Link to="/" className="inline-block bg-green-500 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-green-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4">
                    <div className="flex items-center mb-4 sm:mb-0">
                      {/* --- (Step 3: Use the mapping to get the correct image source) --- */}
                      <img src={productIcons[item.name] || defaultProductIcon} alt={item.name} className="w-16 h-16 object-contain mr-4 rounded-md"/>
                      <div>
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <p className="text-gray-600">₹{parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md">
                        <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 text-lg hover:bg-gray-200">-</button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 text-lg hover:bg-gray-200">+</button>
                      </div>
                      {/* Remove Button with Lucide Icon */}
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default CartPage;
