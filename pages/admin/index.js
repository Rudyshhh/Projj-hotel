// pages/admin/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';
import AdminAddRoom from "../../components/AdminAddRoom";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && user && !user.is_admin) {
      router.push('/rooms');
      return;
    }

    async function fetchData() {
      try {
        const bookingsData = await api.get('/bookings');
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, user, router]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              All Bookings
            </button>
            <button
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'addRoom'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('addRoom')}
            >
              Add New Room
            </button>
          </div>
        </div>
      </div>
      
      {activeTab === 'bookings' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No bookings yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Booking ID</th>
                    <th className="py-3 px-4 text-left">User ID</th>
                    <th className="py-3 px-4 text-left">Room ID</th>
                    <th className="py-3 px-4 text-left">Check-in</th>
                    <th className="py-3 px-4 text-left">Check-out</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="py-3 px-4">{booking.id}</td>
                      <td className="py-3 px-4">{booking.user_id}</td>
                      <td className="py-3 px-4">{booking.room_id}</td>
                      <td className="py-3 px-4">{formatDate(booking.check_in)}</td>
                      <td className="py-3 px-4">{formatDate(booking.check_out)}</td>
                      <td className="py-3 px-4">${booking.final_price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'addRoom' && (
        <AdminAddRoom />
      )}
    </Layout>
  );
}