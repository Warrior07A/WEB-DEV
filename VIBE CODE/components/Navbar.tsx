
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          DriveSelect
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Cars
          </Link>
          {auth.user ? (
            <>
              <Link to="/bookings" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                My Bookings
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <span className="text-sm font-medium text-slate-900">Hi, {auth.user.name.split(' ')[0]}</span>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/signin" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
