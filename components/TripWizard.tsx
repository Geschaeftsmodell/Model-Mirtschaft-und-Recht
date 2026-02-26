import React, { useState } from 'react';
import { TripPreferences, TravelStyle, BudgetLevel, CompanionType, HotelType, TripItinerary } from '../types';
import { generateTrip } from '../services/geminiService';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Wallet, Users, Heart, Home, Sparkles, Search, CheckCircle, Car, Bus, Plane } from 'lucide-react';

interface TripWizardProps {
  onTripGenerated: (trip: TripItinerary) => void;
  onCancel: () => void;
}

const TOTAL_STEPS = 5;

export const TripWizard: React.FC<TripWizardProps> = ({ onTripGenerated, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [prefs, setPrefs] = useState<TripPreferences>({
    destination: '',
    duration: 5,
    budget: BudgetLevel.Moderate,
    style: [],
    companions: CompanionType.Couple,
    hotelType: HotelType.Hotel,
    transport: 'Mietwagen'
  });

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleStyle = (style: TravelStyle) => {
    setPrefs(prev => ({
      ...prev,
      style: prev.style.includes(style) 
        ? prev.style.filter(s => s !== style)
        : [...prev.style, style]
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateTrip(prefs);
      onTripGenerated(result);
    } catch (err) {
      setError("Ups! Die KI braucht eine kurze Pause. Bitte versuche es erneut.");
      setLoading(false);
    }
  };

  // --- Step Components ---

  const StepLocation = () => (
    <div className="h-full flex flex-col animate-pop-in">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Wohin geht die Reise?</h2>
      <p className="text-slate-500 mb-6">Suche dein Traumziel, um es auf der Karte zu sehen.</p>
      
      {/* Embedded Map Interface */}
      <div className="relative w-full h-[450px] bg-slate-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl group">
        
        {/* Google Maps Iframe */}
        <div className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(prefs.destination || "Europe")}&t=&z=${prefs.destination ? 11 : 3}&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
            ></iframe>
            {/* Overlay to prevent map hijacking scrolling, removed on interaction if needed, but keeps layout stable */}
            <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-20">
            <div className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/60 transform transition-transform focus-within:scale-105 focus-within:ring-4 ring-indigo-500/10">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                    <Search size={24} />
                </div>
                <div className="flex-grow">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Destination</label>
                    <input 
                      type="text"
                      placeholder="Ort eingeben (z.B. Tokio)"
                      value={prefs.destination}
                      onChange={(e) => setPrefs({...prefs, destination: e.target.value})}
                      className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-300 font-bold text-lg"
                      autoFocus
                    />
                </div>
                {prefs.destination && (
                    <CheckCircle className="text-green-500 animate-pop-in" size={24} />
                )}
            </div>
        </div>

        {/* Stylized "Live" Badge */}
        <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-600">Google Maps View</span>
        </div>
      </div>
    </div>
  );

  const StepDuration = () => (
    <div className="animate-pop-in">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Wie lange bleibst du?</h2>
        <p className="text-slate-500 mb-10">Ein Wochenende oder eine Weltreise?</p>

        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col items-center justify-center py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20" />
            
            <div className="text-6xl font-black text-indigo-600 mb-4 flex items-baseline">
                {prefs.duration}
                <span className="text-2xl text-slate-400 font-bold ml-2">Tage</span>
            </div>
            
            <input 
              type="range" 
              min="1" max="30"
              value={prefs.duration}
              onChange={(e) => setPrefs({...prefs, duration: parseInt(e.target.value)})}
              className="w-full max-w-lg h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
            />
            
            <div className="flex gap-3 mt-8 flex-wrap justify-center">
                {[3, 5, 7, 10, 14, 21].map(d => (
                    <button 
                        key={d}
                        onClick={() => setPrefs({...prefs, duration: d})}
                        className={`px-4 py-2 rounded-full border text-sm font-bold transition-colors ${prefs.duration === d ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'}`}
                    >
                        {d} Tage
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  const StepBudgetCompanions = () => (
    <div className="space-y-8 animate-pop-in">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Dein Budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.values(BudgetLevel).map((b) => (
                    <button
                        key={b}
                        onClick={() => setPrefs({...prefs, budget: b})}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${prefs.budget === b ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${prefs.budget === b ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                            <Wallet size={24} />
                        </div>
                        <span className={`block font-bold text-lg mb-1 ${prefs.budget === b ? 'text-indigo-900' : 'text-slate-700'}`}>{b.split('(')[0]}</span>
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{b.match(/\((.*?)\)/)?.[1]}</span>
                        {prefs.budget === b && <CheckCircle className="absolute top-4 right-4 text-indigo-500" size={24} />}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Wer kommt mit?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.values(CompanionType).map((c) => (
                    <button
                        key={c}
                        onClick={() => setPrefs({...prefs, companions: c})}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-md ${prefs.companions === c ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-md' : 'border-slate-100 bg-white text-slate-500 hover:border-indigo-200'}`}
                    >
                        <Users size={28} className={prefs.companions === c ? 'text-indigo-500' : 'text-slate-300'} />
                        {c}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  const StepAccommodation = () => (
    <div className="animate-pop-in">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Wo willst du schlafen?</h2>
        <p className="text-slate-500 mb-6">Wähle deinen Stil für süße Träume.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(HotelType).map((h) => (
                <button
                    key={h}
                    onClick={() => setPrefs({...prefs, hotelType: h})}
                    className={`relative h-44 rounded-[2rem] border-4 overflow-hidden transition-all duration-300 group ${prefs.hotelType === h ? 'border-indigo-500 ring-4 ring-indigo-100' : 'border-transparent hover:scale-[1.02]'}`}
                >
                    <img 
                        src={`https://picsum.photos/seed/${h}stay/400/300`} 
                        alt={h}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className={`absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t ${prefs.hotelType === h ? 'from-indigo-900/90 via-indigo-900/40 to-transparent' : 'from-black/80 via-black/20 to-transparent'}`}>
                        <div className="flex items-center gap-2 text-white">
                            <Home size={20} className="shrink-0" />
                            <span className="font-bold text-lg text-left leading-tight">{h}</span>
                        </div>
                    </div>
                    {prefs.hotelType === h && (
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white p-1.5 rounded-full shadow-lg animate-bounce">
                            <CheckCircle size={20} />
                        </div>
                    )}
                </button>
            ))}
        </div>
    </div>
  );

  const StepVibeTransport = () => (
    <div className="space-y-10 animate-pop-in">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Was ist der Vibe?</h2>
            <div className="flex flex-wrap gap-3">
                {Object.values(TravelStyle).map((s) => {
                    const active = prefs.style.includes(s);
                    return (
                        <button
                            key={s}
                            onClick={() => toggleStyle(s)}
                            className={`px-6 py-3 rounded-full border-2 text-sm font-bold flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-1 ${active ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600'}`}
                        >
                            {active ? <Heart size={16} className="fill-white" /> : <Heart size={16} />}
                            {s}
                        </button>
                    );
                })}
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Wie bewegst du dich fort?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Mietwagen', icon: Car },
                    { label: 'Öffis', icon: Bus },
                    { label: 'Flugzeug', icon: Plane }, 
                    { label: 'Taxi/Uber', icon: Car }
                ].map((t) => (
                    <button
                        key={t.label}
                        onClick={() => setPrefs({...prefs, transport: t.label})}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${prefs.transport === t.label ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                        <t.icon size={28} />
                        <span className="font-semibold text-sm">{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  if (loading) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-pop-in px-4">
            <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 bg-indigo-200 rounded-full opacity-30 animate-ping"></div>
                <div className="relative bg-white p-8 rounded-full shadow-2xl animate-float flex items-center justify-center border-4 border-indigo-50">
                    <Sparkles size={64} className="text-indigo-500" />
                </div>
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Zaubere Reiseplan...</h2>
            <div className="max-w-md w-full space-y-4">
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 animate-[shimmer_1.5s_infinite] w-full origin-left"></div>
                </div>
                <p className="text-slate-500 font-medium animate-pulse">
                    Analysiere {prefs.destination || 'die Welt'} nach den besten Hotels & Spots...
                </p>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 pt-4 px-4 md:px-0">
       {/* Progress Bar */}
       <div className="mb-10 px-2">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>Start</span>
            <span>Step {step} von {TOTAL_STEPS}</span>
            <span>Finish</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
       </div>

       {/* Main Card */}
       <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-6 md:p-12 relative min-h-[550px] flex flex-col border border-white">
          
          <div className="flex-grow">
            {step === 1 && <StepLocation />}
            {step === 2 && <StepDuration />}
            {step === 3 && <StepBudgetCompanions />}
            {step === 4 && <StepAccommodation />}
            {step === 5 && <StepVibeTransport />}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-bold text-center flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/> {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
             {step > 1 ? (
               <button 
                 onClick={prevStep}
                 className="flex items-center text-slate-400 font-bold hover:text-slate-700 transition-colors px-6 py-3 rounded-xl hover:bg-slate-50"
               >
                 <ArrowLeft size={20} className="mr-2" /> Zurück
               </button>
             ) : (
               <button onClick={onCancel} className="text-slate-400 hover:text-red-500 font-bold px-6 py-3 transition-colors">Abbrechen</button>
             )}

             {step < TOTAL_STEPS ? (
               <button 
                 onClick={nextStep}
                 disabled={step === 1 && !prefs.destination}
                 className={`group flex items-center bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-slate-300/50 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
               >
                 Weiter <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </button>
             ) : (
               <button 
                 onClick={handleGenerate}
                 className="group flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 transition-all"
               >
                 <Sparkles size={20} className="mr-2 animate-spin-slow" /> 
                 Reise jetzt planen
               </button>
             )}
          </div>
       </div>
    </div>
  );
};