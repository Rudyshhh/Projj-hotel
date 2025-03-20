// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Layout from "../components/Layout";
// import { useAuth } from "../contexts/AuthContext";
// import api from "../utils/api";

// export default function Bookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//       return;
//     }

//     async function fetchBookings() {
//       try {
//         const data = await api.get("/bookings");
//         setBookings(data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBookings();
//   }, [isAuthenticated, router]);

//   const handleCancelBooking = async (bookingId) => {
//     if (!confirm("Are you sure you want to cancel this booking?")) {
//       return;
//     }

//     try {
//       await api.delete(`/bookings/${bookingId}`);
//       setBookings(bookings.filter((b) => b.id !== bookingId));
//     } catch (error) {
//       console.error("Error canceling booking:", error);
//       alert("Failed to cancel booking");
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-64 text-lg text-[hsl(var(--foreground))]">
//           Loading bookings...
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-semibold text-[hsl(var(--foreground))] mb-6">
//           My Bookings
//         </h1>

//         {bookings.length === 0 ? (
//           <div className="bg-yellow-200 border-l-4 border-yellow-600 text-yellow-900 p-4 rounded-lg shadow">
//             You have no bookings yet.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full bg-[hsl(var(--background))] rounded-lg shadow-md overflow-hidden border border-[hsl(var(--border))]">
//               <thead className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
//                 <tr>
//                   <th className="py-3 px-4 text-left">Room ID</th>
//                   <th className="py-3 px-4 text-left">Check-in</th>
//                   <th className="py-3 px-4 text-left">Check-out</th>
//                   <th className="py-3 px-4 text-left">Price</th>
//                   <th className="py-3 px-4 text-left">Booked On</th>
//                   <th className="py-3 px-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[hsl(var(--border))]">
//                 {bookings.map((b) => (
//                   <tr key={b.id} className="hover:bg-[hsl(var(--accent))] transition">
//                     <td className="py-3 px-4">{b.room_id}</td>
//                     <td className="py-3 px-4">{formatDate(b.check_in)}</td>
//                     <td className="py-3 px-4">{formatDate(b.check_out)}</td>
//                     <td className="py-3 px-4">${b.final_price.toFixed(2)}</td>
//                     <td className="py-3 px-4">{formatDate(b.created_at)}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         onClick={() => handleCancelBooking(b.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return; 

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    async function fetchBookings() {
      try {
        const data = await api.get("/bookings");
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [isAuthenticated, authLoading, router]);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64 text-lg text-[hsl(var(--foreground))]">
          Loading bookings...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-[hsl(var(--foreground))] mb-6">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-yellow-200 border-l-4 border-yellow-600 text-yellow-900 p-4 rounded-lg shadow">
            You have no bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-[hsl(var(--background))] rounded-lg shadow-md overflow-hidden border border-[hsl(var(--border))]">
              <thead className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                <tr>
                  <th className="py-3 px-4 text-left">Room ID</th>
                  <th className="py-3 px-4 text-left">Check-in</th>
                  <th className="py-3 px-4 text-left">Check-out</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Booked On</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[hsl(var(--accent))] transition">
                    <td className="py-3 px-4">{b.room_id}</td>
                    <td className="py-3 px-4">{formatDate(b.check_in)}</td>
                    <td className="py-3 px-4">{formatDate(b.check_out)}</td>
                    <td className="py-3 px-4">${b.final_price.toFixed(2)}</td>
                    <td className="py-3 px-4">{formatDate(b.created_at)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition text-sm"
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
    </Layout>
  );
}
