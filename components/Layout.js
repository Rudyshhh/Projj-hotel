// components/Layout.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">Hotel Booking</span>
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/rooms">
                  <span className="cursor-pointer">Rooms</span>
                </Link>
                <Link href="/bookings">
                  <span className="cursor-pointer">My Bookings</span>
                </Link>
                {user?.is_admin && (
                  <Link href="/admin">
                    <span className="cursor-pointer">Admin</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <span className="cursor-pointer">Login</span>
                </Link>
                <Link href="/register">
                  <span className="cursor-pointer">Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}