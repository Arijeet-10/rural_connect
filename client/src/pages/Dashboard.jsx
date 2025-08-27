import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircle, Package, Phone, Calendar, Pencil, X } from 'lucide-react'; // Import Lucide icons
import Navbar from './../components/Navbar';

const Dashboard = () => {
  // State for user data, bookings, loading, and errors
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the edit profile modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableUser, setEditableUser] = useState({ phone: '' });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('You are not logged in. Please log in to view your dashboard.');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const [userResponse, bookingsResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/api/user/${userId}/bookings`, config)
        ]);
        
        setUser(userResponse.data);
        setBookings(bookingsResponse.data);
        setEditableUser({ phone: userResponse.data.phone || '' });

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Could not load your data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler for the profile edit form
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, editableUser, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setIsEditModalOpen(false);
    } catch (err) {
        console.error('Failed to update profile:', err);
        alert('Failed to update profile. Please try again.');
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading and Error states
  if (loading) {
    return <div className="text-center py-20 pt-28">Loading Dashboard...</div>;
  }
  if (error) {
    return <div className="text-center py-20 pt-28 text-red-500">{error}</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen pt-24 sm:pt-28">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Welcome back, <span className="text-green-600">{user?.username}</span>!
          </h1>
          <p className="text-gray-600 mt-2">Here's a summary of your recent activity and profile details.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Bookings List */}
          <main className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Package className="text-green-500 mr-3" size={28} />
                <h2 className="text-2xl font-semibold text-gray-800">My Bookings</h2>
              </div>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg text-gray-800">Booking #{booking.id}</p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar size={14} className="mr-2" /> {formatDate(booking.created_at)}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </div>
                      <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded-md">
                        <span className="font-semibold">Items:</span> {booking.products}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">You have no past bookings.</p>
              )}
            </div>
          </main>

          {/* Sidebar: Profile Information */}
          <aside>
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28">
              <div className="flex items-center mb-6">
                <UserCircle className="text-green-500 mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-gray-800">My Profile</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserCircle size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-800">{user?.username}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">{formatDate(user?.created_at)}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsEditModalOpen(true)} className="mt-6 w-full flex items-center justify-center bg-green-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                <Pencil size={18} className="mr-2" />
                Edit Profile
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={editableUser.phone}
                  onChange={(e) => setEditableUser({ ...editableUser, phone: e.target.value })}
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Dashboard;
