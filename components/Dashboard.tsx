import React from 'react';
import { Send, Sparkles, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { TripItinerary } from '../types';

interface DashboardProps {
  onNewTrip: () => void;
  savedTrips: TripItinerary[];
  onViewTrip: (trip: TripItinerary) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNewTrip, savedTrips, onViewTrip }) => {
  return (
    <div className="space-y-10 animate-slide-up">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
          Good morning, Lara <span className="inline-block animate-bounce">🌏</span>
        </h1>
        <p className="text-slate-500 text-lg mb-8">
          Wohin soll die nächste Reise gehen?
        </p>

        {/* Search / Action Bar */}
        <div className="bg-white p-2 pl-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-2 border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
           <Sparkles className="text-indigo-400" size={20} />
           <input 
             type="text" 
             placeholder="Plan my trip to..." 
             className="flex-grow bg-transparent outline-none text-slate-700 placeholder-slate-400 py-3"
             disabled // Disabled here as we use the wizard button below for the main interaction
           />
           <button 
             onClick={onNewTrip}
             className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition-transform hover:scale-105 active:scale-95"
           >
             <Send size={18} className="ml-0.5" />
           </button>
        </div>

        {/* Quick Chips */}
        <div className="flex justify-center flex-wrap gap-3 mt-6">
           {["Paris for 3 days", "Japan 2 weeks low budget", "Rome food trip"].map((tag, i) => (
             <button 
                key={i} 
                className="px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition-colors shadow-sm"
                onClick={onNewTrip}
             >
               {tag}
             </button>
           ))}
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex justify-center">
         <button 
            onClick={onNewTrip}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 text-white rounded-3xl font-bold shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
         >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/0 transition-colors" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12" />
            <span className="flex items-center gap-3 relative z-10 text-lg">
               <Sparkles size={24} className="fill-white" />
               Generate Trip with AI
            </span>
         </button>
      </div>

      {/* Inspiration / Saved Trips */}
      <div>
        <div className="flex justify-between items-end mb-6 px-2">
           <h2 className="text-2xl font-bold text-slate-800">Get inspired</h2>
           <button className="text-indigo-600 font-semibold text-sm hover:underline flex items-center">
             See all <ArrowUpRight size={16} className="ml-1" />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {savedTrips.length > 0 ? (
             savedTrips.map((trip, idx) => (
               <div 
                 key={idx}
                 onClick={() => onViewTrip(trip)}
                 className="bg-white p-3 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer group"
               >
                 <div className="h-48 rounded-[1.5rem] overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/seed/${trip.destination}/600/400`} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                       <Clock size={12} className="text-indigo-500" /> {trip.days.length} Days
                    </div>
                 </div>
                 <div className="px-3 py-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{trip.destination}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{trip.summary}</p>
                 </div>
               </div>
             ))
           ) : (
             <div className="col-span-3 text-center py-10 text-slate-400">
                Start your first adventure to see it here!
             </div>
           )}
           
           {/* Hardcoded Inspiration Card Example if empty */}
           {savedTrips.length === 0 && (
              <div className="bg-white p-3 rounded-[2rem] shadow-sm border border-slate-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                 <div className="h-48 rounded-[1.5rem] bg-slate-200 relative overflow-hidden">
                    <img src="https://picsum.photos/seed/bali/600/400" className="object-cover w-full h-full" />
                 </div>
                 <div className="px-3 py-4">
                    <h3 className="text-xl font-bold text-slate-800">Bali Adventure</h3>
                    <p className="text-slate-500 text-sm">Example Trip</p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};