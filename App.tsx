import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TripWizard } from './components/TripWizard';
import { ItineraryView } from './components/ItineraryView';
import { TripItinerary, ViewState } from './types';

// Mock Data for initial view with updated interface
const MOCK_TRIPS: TripItinerary[] = [
  {
    tripTitle: "Entspannung pur auf Bali",
    destination: "Bali, Indonesien",
    summary: "Eine Woche voller Yoga, Strände und kultureller Tempelbesuche im Herzen von Ubud und Canggu.",
    recommendedHotel: {
        name: "Como Uma Ubud",
        description: "Ein luxuriöses Wellness-Resort mitten im Dschungel, perfekt für Yoga und Entspannung.",
        vibe: "Nature, Wellness, Quiet"
    },
    estimatedCost: "ca. 1200€",
    packingList: ["Sonnencreme", "Yoga-Matte", "Insektenschutz", "Leichte Kleidung"],
    days: [1,2,3,4,5,6,7].map(d => ({ 
        day: d, 
        theme: "Relax & Discover", 
        activities: [{
            time: "10:00",
            activity: "Yoga Session",
            description: "Morgenflow mit Blick auf den Dschungel.",
            location: "Hotel Gym",
            tips: "Früh aufstehen für den Sonnenaufgang!"
        }] 
    })) 
  },
  {
    tripTitle: "Städtetrip New York",
    destination: "New York City, USA",
    summary: "4 Tage Action im Big Apple. Times Square, Central Park und die besten Pizza-Spots.",
    recommendedHotel: {
        name: "Arlo NoMad",
        description: "Modernes Micro-Hotel mit atemberaubendem Blick auf das Empire State Building.",
        vibe: "Urban, Hip, Views"
    },
    estimatedCost: "ca. 2000€",
    packingList: ["Bequeme Schuhe", "Kamera", "Adapter", "Powerbank"],
    days: [1,2,3,4].map(d => ({ 
        day: d, 
        theme: "City Vibes", 
        activities: [{
            time: "09:00",
            activity: "Central Park Walk",
            description: "Spaziergang durch die grüne Lunge der Stadt.",
            location: "Manhattan",
            tips: "Hole dir einen Bagel bei Russ & Daughters."
        }] 
    }))
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [savedTrips, setSavedTrips] = useState<TripItinerary[]>(MOCK_TRIPS);
  const [currentTrip, setCurrentTrip] = useState<TripItinerary | null>(null);

  const handleNewTrip = () => {
    setView('wizard');
  };

  const handleTripGenerated = (trip: TripItinerary) => {
    setCurrentTrip(trip);
    setSavedTrips(prev => [trip, ...prev]);
    setView('itinerary');
  };

  const handleViewTrip = (trip: TripItinerary) => {
    setCurrentTrip(trip);
    setView('itinerary');
  };

  const handleHome = () => {
    setView('dashboard');
    setCurrentTrip(null);
  };

  return (
    <Layout onNavigateHome={handleHome}>
      {view === 'dashboard' && (
        <Dashboard 
          onNewTrip={handleNewTrip} 
          savedTrips={savedTrips} 
          onViewTrip={handleViewTrip} 
        />
      )}
      
      {view === 'wizard' && (
        <TripWizard 
          onTripGenerated={handleTripGenerated} 
          onCancel={handleHome} 
        />
      )}

      {view === 'itinerary' && currentTrip && (
        <ItineraryView 
          itinerary={currentTrip} 
          onBack={handleHome} 
        />
      )}
    </Layout>
  );
};

export default App;