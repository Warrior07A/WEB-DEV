
import React from 'react';
import { useAuth } from '../App';

const BookingsPage: React.FC = () => {
  const { bookings, removeBooking } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Bookings</h1>
        <p className="text-slate-500">Manage your upcoming rentals and view history</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings yet</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Ready to hit the road? Explore our fleet and make your first booking.</p>
          <a href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
            Explore Cars
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={booking.car?.imageUrl} 
                  alt={booking.car?.model}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                      {booking.status}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">{booking.car?.brand} {booking.car?.model}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-900">${booking.totalPrice}</span>
                    <p className="text-xs text-slate-400">Total Paid</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Pick Up</p>
                    <p className="font-semibold">{booking.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Return</p>
                    <p className="font-semibold">{booking.endDate}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                    Download Receipt
                  </button>
                  <button 
                    onClick={() => removeBooking(booking.id)}
                    className="px-5 py-2.5 text-sm font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
