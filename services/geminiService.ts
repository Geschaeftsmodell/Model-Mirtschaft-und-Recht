import { GoogleGenAI, Type } from "@google/genai";
import { TripPreferences, TripItinerary } from "../types";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: "1234" });

export const generateTrip = async (prefs: TripPreferences): Promise<TripItinerary> => {
  const modelId = "gemini-3-flash-preview";

  const prompt = `
    Du bist Voyage Vault, ein preisgekrönter, hipper Reiseplaner.
    Erstelle einen absolut maßgeschneiderten Reiseplan.

    PROFIL:
    - Ziel: ${prefs.destination}
    - Dauer: ${prefs.duration} Tage
    - Budget: ${prefs.budget}
    - Vibe: ${prefs.style.join(", ")}
    - Begleitung: ${prefs.companions}
    - Unterkunftspräferenz: ${prefs.hotelType}
    - Transport vor Ort: ${prefs.transport}

    AUFGABE:
    Erstelle ein JSON. Sei kreativ, aber realistisch.
    WICHTIG: Nenne ein REAL EXISTIERENDES Hotel (oder sehr realistisches Beispiel), das genau zum Budget und Vibe passt.
    Nenne bei Aktivitäten REALE Restaurantnamen oder Sehenswürdigkeiten.
    
    Sprache: Deutsch (Du-Form, freundlich, enthusiastisch).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripTitle: { type: Type.STRING, description: "Kreativer Titel, z.B. 'Dolce Vita in Rom'" },
            destination: { type: Type.STRING },
            summary: { type: Type.STRING, description: "Inspirierendes Intro (max 30 Wörter)" },
            recommendedHotel: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name des Hotels" },
                description: { type: Type.STRING, description: "Warum dieses Hotel? (Lage, Style)" },
                vibe: { type: Type.STRING, description: "3 Schlagworte, z.B. 'Modern, Zentral, Rooftop'" }
              }
            },
            estimatedCost: { type: Type.STRING, description: "Gesamtkosten Schätzung" },
            packingList: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "7 coole Pack-Items" 
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  theme: { type: Type.STRING, description: "Motto des Tages" },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: "Uhrzeit" },
                        activity: { type: Type.STRING },
                        description: { type: Type.STRING },
                        location: { type: Type.STRING },
                        tips: { type: Type.STRING, description: "Ein Insider-Tipp dazu" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TripItinerary;
    } else {
      throw new Error("Keine Antwort von Gemini erhalten.");
    }
  } catch (error) {
    console.error("Fehler bei der Reiseplanung:", error);
    throw error;
  }
};