import React, { useEffect, useState } from 'react';
import { TripItinerary } from '../types';
import { Clock, MapPin, Calendar, CheckCircle2, Download, Share2, Star, Hotel, Wallet, ArrowLeft, ArrowUp } from 'lucide-react';

interface ItineraryViewProps {
  itinerary: TripItinerary;
  onBack: () => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ itinerary, onBack }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 font-sans pb-20">
      
      {/* Floating Navigation */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
             <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all font-bold text-sm">
                 <ArrowLeft size={16} /> Back
             </button>
             {scrolled && <span className="font-bold text-lg opacity-0 animate-fade-in text-white">{itinerary.destination}</span>}
             <div className="flex gap-2">
                 <button className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"><Share2 size={18} /></button>
                 <button className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition-colors"><Download size={18} /></button>
             </div>
         </div>
      </div>

      {/* Massive Immersive Hero */}
      <div className="relative w-full h-[85vh] overflow-hidden">
         <img 
            src={`https://picsum.photos/seed/${itinerary.destination}/1920/1080`} 
            alt={itinerary.destination}
            className="absolute inset-0 w-full h-full object-cover animate-pop-in" // Simple scale animation class reusing existing
            style={{ animationDuration: '3s' }}
         />
         {/* Artistic Gradient Overlay - The "Shadow Overlay" */}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-8 pb-20 md:p-16 max-w-7xl mx-auto">
             <div className="space-y-4 animate-slide-up">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> 
                    Voyage Vault Selection
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 leading-[0.9]">
                     {itinerary.tripTitle}
                 </h1>
                 <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed border-l-4 border-indigo-500 pl-6">
                     {itinerary.summary}
                 </p>
                 
                 <div className="flex items-center gap-6 pt-6 text-sm font-bold tracking-wide text-slate-400">
                     <span className="flex items-center gap-2"><Clock size={16} className="text-indigo-400" /> {itinerary.days.length} DAYS</span>
                     <span className="flex items-center gap-2"><Wallet size={16} className="text-indigo-400" /> {itinerary.estimatedCost}</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 -mt-12 space-y-16">
         
         {/* Hotel Highlight - Glassmorphism Feature */}
         <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                 <div>
                     <h3 className="text-indigo-400 font-bold tracking-widest uppercase mb-2 text-sm">Where you'll stay</h3>
                     <h2 className="text-4xl md:text-5xl font-bold mb-6">{itinerary.recommendedHotel.name}</h2>
                     <p className="text-slate-300 text-lg leading-relaxed mb-8">
                         {itinerary.recommendedHotel.description}
                     </p>
                     <div className="flex flex-wrap gap-3">
                         {itinerary.recommendedHotel.vibe.split(',').map((v, i) => (
                             <span key={i} className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/5 text-sm font-semibold">
                                 {v.trim()}
                             </span>
                         ))}
                     </div>
                 </div>
                 <div className="h-[400px] rounded-[2rem] overflow-hidden relative shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
                     <img 
                        src={`https://picsum.photos/seed/${itinerary.recommendedHotel.name}/800/800`} 
                        alt="Hotel" 
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur text-slate-900 p-4 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-1 font-black text-xl">
                            4.9 <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="text-xs font-bold text-slate-500 uppercase">Average Rating</div>
                     </div>
                 </div>
             </div>
         </div>

         {/* The Itinerary Timeline */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             
             {/* Left Column: Days */}
             <div className="lg:col-span-2 space-y-20">
                 <h3 className="text-3xl font-bold mb-8 flex items-end gap-4 border-b border-white/10 pb-4">
                     Your Journey <span className="text-slate-500 text-lg font-normal">Day by Day</span>
                 </h3>

                 {itinerary.days.map((day, idx) => (
                     <div key={idx} className="relative pl-10 md:pl-0">
                         {/* Sticky Date/Day Indicator for Desktop */}
                         <div className="md:absolute md:-left-24 md:top-0 md:text-right md:w-16">
                             <div className="text-4xl font-black text-indigo-500 opacity-50">{String(day.day).padStart(2, '0')}</div>
                             <div className="text-xs font-bold uppercase text-slate-500 mt-1">Day</div>
                         </div>

                         <div className="mb-6">
                             <h4 className="text-2xl font-bold text-white mb-2">{day.theme}</h4>
                             <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                         </div>

                         <div className="space-y-4">
                             {day.activities.map((act, actIdx) => (
                                 <div key={actIdx} className="bg-slate-800/50 hover:bg-slate-800/80 transition-colors border border-white/5 p-6 rounded-3xl group">
                                     <div className="flex flex-col sm:flex-row gap-4">
                                         <div className="text-indigo-400 font-mono font-bold text-sm pt-1 shrink-0 w-16">
                                             {act.time}
                                         </div>
                                         <div>
                                             <h5 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{act.activity}</h5>
                                             <p className="text-slate-400 leading-relaxed mb-4">{act.description}</p>
                                             <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                                 <span className="text-slate-500 flex items-center gap-1"><MapPin size={14} /> {act.location}</span>
                                                 {act.tips && <span className="text-amber-500 flex items-center gap-1"><Star size={14} /> {act.tips}</span>}
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 ))}
             </div>

             {/* Right Column: Sticky Essentials */}
             <div className="lg:col-span-1">
                 <div className="sticky top-24 space-y-6">
                     <div className="bg-indigo-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-900/50 text-white relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors"></div>
                         <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Wallet /> Total Estimate</h3>
                         <div className="text-5xl font-black mb-2">{itinerary.estimatedCost}</div>
                         <p className="text-indigo-200 text-sm">Includes accommodation, activities, and daily expenses.</p>
                     </div>

                     <div className="bg-slate-800 rounded-[2rem] p-8 border border-white/5">
                         <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><CheckCircle2 className="text-green-400" /> Essentials</h3>
                         <div className="space-y-3">
                             {itinerary.packingList.map((item, i) => (
                                 <div key={i} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl cursor-default">
                                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                     {item}
                                 </div>
                             ))}
                         </div>
                     </div>
                     
                     <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-[2rem] p-8 text-white text-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                        <h3 className="font-bold text-lg mb-1">Book this Trip</h3>
                        <p className="text-white/80 text-sm">Check availability now</p>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};