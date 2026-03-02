
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthState, User, Booking } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BookingsPage from './pages/BookingsPage';
import GeminiAssistant from './components/GeminiAssistant';

// Auth Context
interface AuthContextType {
  auth: AuthState;
  login: (email: string, name: string, token: string) => void;
  logout: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { user: null, token: null };
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = (email: string, name: string, token: string) => {
    setAuth({ user: { id: Math.random().toString(36).substr(2, 9), email, name }, token });
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    setBookings([]);
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const removeBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, bookings, addBooking, removeBooking }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={!auth.user ? <AuthPage type="signin" /> : <Navigate to="/" />} />
              <Route path="/signup" element={!auth.user ? <AuthPage type="signup" /> : <Navigate to="/" />} />
              <Route path="/bookings" element={auth.user ? <BookingsPage /> : <Navigate to="/signin" />} />
            </Routes>
          </main>
          
          {/* Global AI Assistant Button */}
          <GeminiAssistant />
          
          <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="text-white text-2xl font-bold mb-4">DriveSelect</div>
                <p className="max-w-sm">Premium car rental services for your next adventure. Experience luxury and performance with our curated fleet.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
              &copy; {new Date().getFullYear()} DriveSelect. All rights reserved. Built with React and Bun.
            </div>
          </footer>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
