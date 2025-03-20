// components/Layout.js
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Navbar */}
      <nav className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Hotel Booking
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/rooms">Rooms</Link>
                <Link href="/bookings">My Bookings</Link>
                {user?.is_admin && <Link href="/admin">Admin</Link>}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
