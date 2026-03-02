
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur rounded-full text-blue-600 shadow-sm">
            {car.type}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{car.brand} {car.model}</h3>
            <p className="text-sm text-slate-500">{car.year} &bull; {car.transmission}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-blue-600">${car.pricePerDay}</span>
            <span className="text-xs text-slate-400 block">/day</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            {car.seats} Seats
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Full Tank
          </div>
        </div>
        
        <button 
          onClick={() => onBook(car)}
          className="w-full mt-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors active:scale-[0.98]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
