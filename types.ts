export enum TravelStyle {
  Relaxing = "Entspannung & Wellness",
  Adventure = "Abenteuer & Natur",
  Culture = "Kunst & Kultur",
  Foodie = "Essen & Trinken",
  Party = "Nachtleben & Events",
  Shopping = "Shopping & Mode"
}

export enum BudgetLevel {
  Budget = "Budget (Sparsam)",
  Moderate = "Mittelklasse (Komfort)",
  Luxury = "Luxus (Kein Limit)"
}

export enum CompanionType {
  Solo = "Alleine",
  Couple = "Als Paar",
  Family = "Mit Familie",
  Friends = "Mit Freunden"
}

export enum HotelType {
  Hotel = "Klassisches Hotel",
  Resort = "All-Inclusive Resort",
  Boutique = "Design / Boutique",
  Airbnb = "Apartment / Ferienwohnung",
  Hostel = "Hostel / Social"
}

export interface TripPreferences {
  destination: string;
  duration: number; // in days
  budget: BudgetLevel;
  style: TravelStyle[];
  companions: CompanionType;
  hotelType: HotelType;
  transport: string;
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  location: string;
  tips?: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface TripItinerary {
  tripTitle: string;
  destination: string;
  summary: string;
  recommendedHotel: {
    name: string;
    description: string;
    vibe: string;
  };
  days: DayPlan[];
  estimatedCost: string;
  packingList: string[];
}

export type ViewState = 'dashboard' | 'wizard' | 'itinerary';