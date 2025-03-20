// // pages/login.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Layout from '../components/Layout';
// import { useAuth } from '../contexts/AuthContext';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const user = await login(email, password);
//       if (user.is_admin) {
//         router.push('/admin');
//       } else {
//         router.push('/rooms');
//       }
//     } catch (err) {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex justify-center mt-10">
//         <div className="w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//               >
//                 Sign In
//               </button>
//               <Link href="/register">
//                 <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
//                   Don't have an account?
//                 </span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }


// import { useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import Layout from "../components/Layout";
// import { useAuth } from "../contexts/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [err, setErr] = useState("");
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");

//     try {
//       const user = await login(email, pwd);
//       if (user?.is_admin) {
//         router.push("/admin");
//       } else {
//         router.push("/rooms");
//       }
//     } catch {
//       setErr("Invalid email or password");
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
//         <div className="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-2xl shadow-lg">
//           <h1 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-6">
//             Login
//           </h1>

//           {err && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {err}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">
//                 Email
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">
//                 Password
//               </label>
//               <input
//                 className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
//                 type="password"
//                 value={pwd}
//                 onChange={(e) => setPwd(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <button
//                 className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold py-2 rounded-lg transition"
//                 type="submit"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>

//           <div className="text-center mt-4">
//             <Link href="/register">
//               <span className="text-sm font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))] cursor-pointer">
//                 Don't have an account? Sign Up
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }


import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState("");
    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push(user.is_admin ? "/admin" : "/rooms");
        }
    }, [user, router]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        try {
            await login(email, pwd); 
        } catch {
            setErr("Invalid email or password");
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
                <div className="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-2xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-6">
                        Login
                    </h1>

                    {err && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {err}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">
                                Password
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                                type="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold py-2 rounded-lg transition"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <Link href="/register">
                            <span className="text-sm font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))] cursor-pointer">
                                Don't have an account? Sign Up
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

