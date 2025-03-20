// contexts/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = localStorage.getItem('token');
      if (token) {
        api.setToken(token);
        try {
          const userData = await api.get('/users/me');
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    loadUserFromLocalStorage();
  }, []);

//   const login = async (email, password) => {
//     try {
//       const data = await api.login(email, password);
//       localStorage.setItem('token', data.access_token);
//       api.setToken(data.access_token);
//       const userData = await api.get('/users/me');
//       setUser(userData);
//       return userData;
//     } catch (error) {
//       throw error;
//     }
//   };


  
  

//   const register = async (email, password) => {
//     try {
//       const userData = await api.register(email, password);
//       return userData;
//     } catch (error) {
//       throw error;
//     }
//   };

const register = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const text = await response.text(); // Read response as text
      console.log("Raw Response:", text);
  
      const data = JSON.parse(text); // Convert to JSON
      console.log("Parsed JSON:", data);
  
      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  
  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
  
      const text = await response.text();
      console.log("Raw Response:", text);
  
      const data = JSON.parse(text);
      console.log("Parsed JSON:", data);
  
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }
  
      localStorage.setItem("token", data.access_token);
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem('token');
    api.setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);