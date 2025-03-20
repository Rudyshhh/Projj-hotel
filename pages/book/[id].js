// // pages/book/[id].js
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../../components/Layout';
// import { useAuth } from '../../contexts/AuthContext';
// import api from '../../utils/api';

// export default function BookRoom() {
//   const router = useRouter();
//   const { id } = router.query;
//   const { isAuthenticated } = useAuth();

//   const [room, setRoom] = useState(null);
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [currentPrice, setCurrentPrice] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(null);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/login');
//       return;
//     }

//     if (!id) return;

//     async function fetchRoom() {
//       try {
//         const data = await api.get(`/rooms/${id}`);
//         setRoom(data);
//       } catch (error) {
//         setError('Error loading room data');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRoom();
//   }, [id, isAuthenticated, router]);

//   const calculateCurrentPrice = async () => {
//     if (!checkIn || !checkOut) return;

//     try {
//       const checkInDate = new Date(checkIn);
//       const checkOutDate = new Date(checkOut);

//       if (checkInDate >= checkOutDate) {
//         setError('Check-out date must be after check-in date');
//         return;
//       }

//       const data = await api.get(`/rooms/${id}?check_in=${checkIn}T12:00:00Z&check_out=${checkOut}T12:00:00Z`);
//       setCurrentPrice(data.current_price);

//       const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
//       setTotalPrice(data.current_price * nights);
//     } catch (error) {
//       setError('Error calculating price');
//     }
//   };

//   useEffect(() => {
//     if (checkIn && checkOut) {
//       calculateCurrentPrice();
//     }
//   }, [checkIn, checkOut]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!checkIn || !checkOut) {
//       setError('Please select check-in and check-out dates');
//       return;
//     }

//     const checkInDate = new Date(checkIn);
//     const checkOutDate = new Date(checkOut);

//     if (checkInDate >= checkOutDate) {
//       setError('Check-out date must be after check-in date');
//       return;
//     }

//     try {
//       await api.post('/bookings', {
//         room_id: id,
//         check_in: `${checkIn}T12:00:00Z`,
//         check_out: `${checkOut}T12:00:00Z`
//       });

//       router.push('/bookings');
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setError(error.response.data.detail || 'Booking failed');
//       } else {
//         setError('Booking failed');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-64">
//           <div className="text-xl">Loading...</div>
//         </div>
//       </Layout>
//     );
//   }

//   if (!room) {
//     return (
//       <Layout>
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           Room not found
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Book a Room</h1>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//           <div className="p-6">
//             <h2 className="text-xl font-semibold">{room.name}</h2>
//             <p className="text-gray-600 mt-2">{room.description}</p>
//             <p className="text-gray-700 mt-2">Base Price: ${room.base_price.toFixed(2)} / night</p>
//             <p className="text-gray-700">Capacity: {room.capacity} guests</p>

//             {currentPrice && (
//               <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
//                 <p className="font-semibold text-blue-800">
//                   Current dynamic price: ${currentPrice.toFixed(2)} / night
//                 </p>
//                 {totalPrice && (
//                   <p className="text-blue-800 mt-1">
//                     Total for your stay: ${totalPrice.toFixed(2)}
//                   </p>
//                 )}
//                 <p className="text-xs text-blue-600 mt-1">
//                   *Price varies based on demand and season
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkIn">
//               Check-in Date
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="checkIn"
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               min={new Date().toISOString().split('T')[0]}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkOut">
//               Check-out Date
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="checkOut"
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               min={checkIn || new Date().toISOString().split('T')[0]}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Book Now
//             </button>
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// }

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/api';

export default function BookRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, loading } = useAuth(); // Added loading to handle auth check

  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [error, setError] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (loading) return; // Wait until auth state is loaded

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!id) return;

    async function fetchRoom() {
      try {
        const response = await api.get(`/rooms/${id}`);
        setRoom(response.data || response); // Handle possible structure difference
      } catch (error) {
        setError('Error loading room data');
      }
    }

    fetchRoom();
  }, [id, isAuthenticated, loading]);

  const calculateCurrentPrice = async () => {
    if (!checkIn || !checkOut) return;

    try {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkInDate >= checkOutDate) {
        setError('Check-out date must be after check-in date');
        return;
      }

      const response = await api.get(`/rooms/${id}`, {
        params: { check_in: `${checkIn}T12:00:00Z`, check_out: `${checkOut}T12:00:00Z` }
      });

      const data = response.data || response;
      setCurrentPrice(data.current_price);

      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      setTotalPrice(data.current_price * nights);
    } catch (error) {
      setError('Error calculating price');
    }
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      calculateCurrentPrice();
    }
  }, [checkIn, checkOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      setError('Check-out date must be after check-in date');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage or state

      await api.post(
        '/bookings',
        {
          room_id: id,
          check_in: `${checkIn}T12:00:00Z`,
          check_out: `${checkOut}T12:00:00Z`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }


        });

      router.push('/bookings');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.detail || 'Booking failed');
      } else {
        setError('Booking failed');
      }
    }
  };

  if (loading || !room) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">{loading ? 'Authenticating...' : 'Loading...'}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book a Room</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-teal-700 font-semibold">{room.name}</h2>
            <p className="text-gray-600 mt-2">{room.description}</p>
            <p className="text-gray-700 mt-2">Base Price: ${room.base_price.toFixed(2)} / night</p>
            <p className="text-gray-700">Capacity: {room.capacity} guests</p>

            {currentPrice && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="font-semibold text-blue-800">
                  Current dynamic price: ${currentPrice.toFixed(2)} / night
                </p>
                {totalPrice && (
                  <p className="text-blue-800 mt-1">
                    Total for your stay: ${totalPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-xs text-blue-600 mt-1">
                  *Price varies based on demand and season
                </p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkIn">
              Check-in Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkOut">
              Check-out Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
