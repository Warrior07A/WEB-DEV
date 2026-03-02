
import React, { useState } from 'react';
import { AVAILABLE_CARS } from '../constants';
import CarCard from '../components/CarCard';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { Booking, Car } from '../types';

const HomePage: React.FC = () => {
  const { auth, addBooking } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState<{show: boolean, car: Car | null}>({ show: false, car: null });

  const types = ['All', 'EV', 'SUV', 'Luxury', 'Sports', 'Sedan'];

  const filteredCars = filter === 'All' 
    ? AVAILABLE_CARS 
    : AVAILABLE_CARS.filter(c => c.type === filter);

  const handleBook = (car: Car) => {
    if (!auth.user) {
      navigate('/signin');
      return;
    }
    setShowBookingModal({ show: true, car });
  };

  const confirmBooking = () => {
    if (!showBookingModal.car || !auth.user) return;
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user.id,
      carId: showBookingModal.car.id,
      car: showBookingModal.car,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      totalPrice: showBookingModal.car.pricePerDay * 3,
      status: 'confirmed'
    };
    
    addBooking(newBooking);
    setShowBookingModal({ show: false, car: null });
    navigate('/bookings');
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 blur-[2px]"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Drive Your <span className="text-blue-500">Ambition</span> with Premium Selection
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Experience the thrill of the road with our exclusive fleet of luxury and high-performance vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/40">
              Browse Collection
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Car Selection */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Fleet</h2>
              <p className="text-slate-500">Choose from {AVAILABLE_CARS.length} premium models available today</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    filter === t 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      {showBookingModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowBookingModal({show: false, car: null})}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">Confirm Booking</h3>
              <p className="text-slate-500 mb-6">You're about to book the <span className="text-slate-900 font-semibold">{showBookingModal.car?.brand} {showBookingModal.car?.model}</span>.</p>
              
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rental Duration</span>
                  <span className="font-semibold text-slate-900">3 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Daily Rate</span>
                  <span className="font-semibold text-slate-900">${showBookingModal.car?.pricePerDay}</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-lg font-bold">Total Price</span>
                  <span className="text-2xl font-bold text-blue-600">${(showBookingModal.car?.pricePerDay || 0) * 3}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowBookingModal({show: false, car: null})}
                  className="flex-1 py-4 font-bold text-slate-600 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmBooking}
                  className="flex-1 py-4 font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
