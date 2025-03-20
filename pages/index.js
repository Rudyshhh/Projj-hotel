
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push(isAuthenticated ? "/rooms" : "/login");
    }
  }, [isAuthenticated, loading, router]);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-[hsl(var(--background))]">
        <div className="text-center p-6">
          <h1 className="text-5xl font-bold text-[hsl(var(--foreground))] mb-4">
            Welcome to Hotel Booking System
          </h1>
          <p className="text-lg text-[hsl(var(--muted-foreground))]">
            Find and book your perfect stay
          </p>
        </div>
      </div>
    </Layout>
  );
}
