// // pages/register.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Layout from '../components/Layout';
// import { useAuth } from '../contexts/AuthContext';

// export default function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const { register, login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       await register(email, password);
//       await login(email, password);
//       router.push('/rooms');
//     } catch (err) {
//       setError('Registration failed. Email might already be registered.');
//     }
//   };

//   return (
//     <Layout>
//       <div className="flex justify-center mt-10">
//         <div className="w-full max-w-md">
//           <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

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
//             <div className="mb-4">
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
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
//                 Confirm Password
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//               >
//                 Register
//               </button>
//               <Link href="/login">
//                 <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
//                   Already have an account?
//                 </span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }



import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [err, setErr] = useState("");
  const { register, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (pwd !== confirmPwd) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await register(email, pwd);
      await login(email, pwd);
      router.push("/rooms");
    } catch {
      setErr("Registration failed. Email might already be registered.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
        <div className="w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-6">
            Register
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

            <div>
              <label className="block text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link href="/login">
              <span className="text-sm font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))] cursor-pointer">
                Already have an account? Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
