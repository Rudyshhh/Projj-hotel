// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Layout from '../components/Layout';
// import { useAuth } from '../contexts/AuthContext';
// import api from '../utils/api';

// export default function Rooms() {
//     const [rooms, setRooms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { isAuthenticated } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             router.push('/login');
//             return;
//         }

//         async function fetchRooms() {
//             try {
//                 const data = await api.get('/rooms');
//                 setRooms(data.map(room => ({ ...room, id: Number(room.id) }))); // Ensure ID is an integer
//             } catch (error) {
//                 console.error('Error fetching rooms:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchRooms();
//     }, [isAuthenticated, router]);

//     if (loading) {
//         return (
//             <Layout>
//                 <div className="flex justify-center items-center h-64">
//                     <div className="text-xl">Loading rooms...</div>
//                 </div>
//             </Layout>
//         );
//     }

//     return (
//         <Layout>
//             <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>

//             {rooms.length === 0 ? (
//                 <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                     No rooms available.
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {rooms.map((room) => (
//                         <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                             <div className="p-4">
//                                 <h2 className="text-xl font-semibold">{room.name}</h2>
//                                 <p className="text-gray-600 mt-2">{room.description}</p>
//                                 <p className="text-green-600 font-bold mt-2">${room.base_price.toFixed(2)} / night</p>
//                                 <p className="text-gray-700 mt-1">Capacity: {room.capacity} guests</p>

//                                 <button
//                                     onClick={() => router.push(`/book/${room.id}`)} // id is an integer
//                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
//                                 >
//                                     Book Now
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </Layout>
//     );
// }


import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/api";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        async function fetchRooms() {
            try {
                const data = await api.get("/rooms");
                setRooms(data.map(room => ({ ...room, id: Number(room.id) })));
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRooms();
    }, [user, router]); 

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="text-xl">Loading rooms...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Available Rooms</h1>

            {rooms.length === 0 ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    No rooms available.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{room.name}</h2>
                                <p className="text-gray-600 mt-2">{room.description}</p>
                                <p className="text-green-600 font-bold mt-2">${room.base_price.toFixed(2)} / night</p>
                                <p className="text-gray-700 mt-1">Capacity: {room.capacity} guests</p>

                                <button
                                    onClick={() => router.push(`/book/${room.id}`)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}
