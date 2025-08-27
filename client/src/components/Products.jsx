import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import the useCart hook

// --- (Icon imports remain the same) ---
import milkIcon from '../assets/icons/milk.jpeg';
import breadIcon from '../assets/icons/bread.jpeg';
import medicineIcon from '../assets/icons/medicine.jpeg';
import riceIcon from '../assets/icons/rice.jpeg';
import lentilsIcon from '../assets/icons/lentils.jpeg';
import oilIcon from '../assets/icons/oil.jpeg';
import freshVegetables from '../assets/icons/vegetables.jpeg';
import spices from '../assets/icons/spices.jpeg';
import defaultProductIcon from '../assets/icons/default.png';

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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the addToCart function and cart state from the context
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const backendProducts = response.data;
        const additionalProducts = [
          { id: 7, name: 'Seasonal Vegetables', price: 80.00, image_url: '/assets/icons/fresh-vegetables.png' },
          { id: 8, name: 'Local Spices', price: 100.00, image_url: '/assets/icons/spices.png' },
        ];
        setProducts([...backendProducts, ...additionalProducts]);
      } catch (err) {
        setError('Failed to load products. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- (Loading and error JSX remain the same) ---
  if (loading) return <section className="py-20 text-center"><p>Loading products...</p></section>;
  if (error) return <section className="py-20 text-center text-red-500"><p>{error}</p></section>;

  return (
    <section id="products" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 relative inline-block">
          Available Products <span role="img" aria-label="shopping cart">🛒</span>
          <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-green-500 rounded"></span>
        </h2>

        {/* --- (Search bar JSX remains the same) --- */}
        <div className="relative w-full max-w-xl mx-auto mb-12">
          <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-lg text-gray-600 mt-8">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              // Check if the current product is already in the cart
              const isInCart = cart.some(item => item.id === product.id);
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl p-4 sm:p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:-translate-y-2">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 bg-green-50 rounded-full flex items-center justify-center">
                    <img
                      src={productIcons[product.name] || defaultProductIcon}
                      alt={`Icon for ${product.name}`}
                      className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
                    />
                  </div>
                  <div className="flex-grow flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 flex-grow">{product.name}</h3>
                    <p className="text-md text-gray-600 mb-4">₹{parseFloat(product.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className={`mt-auto w-full font-semibold py-2 px-4 rounded-full transition-colors duration-300 ${
                      isInCart
                        ? 'bg-yellow-400 text-yellow-900 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={isInCart}
                  >
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
