import { GoogleGenAI, Type } from "@google/genai";
import type { BreedDetails } from '../types';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

// NOTE: Gemini API is disabled as per user request to prevent errors.
// const ai = new GoogleGenAI({ apiKey: API_KEY! });

interface SymptomFormData {
  birdType: string | null;
  // Add other form data fields as they are implemented
  // e.g., age: string; symptoms: string[];
}

interface Diagnosis {
  diseaseName: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  justification: string;
  nextSteps: string[];
}

// Defines the expected JSON structure for the Gemini API response
const diagnosisSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      diseaseName: {
        type: Type.STRING,
        description: 'The common name of the poultry disease.',
      },
      urgency: {
        type: Type.STRING,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        description: 'The urgency level for seeking veterinary help.',
      },
      justification: {
        type: Type.STRING,
        description: 'A brief explanation of why this disease is a possible match based on the symptoms provided.',
      },
      nextSteps: {
        type: Type.ARRAY,
        description: 'A list of immediate recommended actions, like "Consult a veterinarian immediately" or "Isolate the affected bird".',
        items: {
          type: Type.STRING,
        },
      },
    },
    required: ["diseaseName", "urgency", "justification", "nextSteps"],
  },
};


/**
 * Gets a poultry disease diagnosis from the Gemini API.
 * @param formData The collected data from the symptom checker form.
 * @returns An array of likely diagnoses or throws an error.
 */
export const getDiagnosis = async (formData: SymptomFormData): Promise<Diagnosis[]> => {
  console.warn("Gemini API call for diagnosis has been disabled.");
  // Returning an empty array as the API is disabled.
  return Promise.resolve([]);
};

const breedDetailsSchema = {
    type: Type.OBJECT,
    properties: {
        basicIdentification: {
            type: Type.OBJECT,
            properties: {
                origin: { type: Type.STRING, description: "Country or region of origin." },
            },
            required: ["origin"],
        },
        physicalCharacteristics: {
            type: Type.OBJECT,
            properties: {
                weight: {
                    type: Type.OBJECT,
                    properties: {
                        male: { type: Type.STRING, description: "Average weight of a male in kg or lbs." },
                        female: { type: Type.STRING, description: "Average weight of a female in kg or lbs." },
                    },
                    required: ["male", "female"],
                },
                plumageColor: { type: Type.STRING, description: "Primary colors and patterns." },
                combType: { type: Type.STRING, description: "For chickens: Single, Rose, Pea, etc. N/A for other species." },
                legFeathering: { type: Type.STRING, description: "Answer with 'Yes' or 'No'." },
                skinColor: { type: Type.STRING, description: "e.g., White, Yellow, Black." },
                shankColor: { type: Type.STRING, description: "e.g., Yellow, Slate, Greenish." },
                specialFeatures: { type: Type.STRING, description: "List any notable features like crests, beards, muffs, tufts, etc. or 'None'." },
            },
            required: ["weight", "plumageColor", "combType", "legFeathering", "skinColor", "shankColor", "specialFeatures"],
        },
        productionTraits: {
            type: Type.OBJECT,
            properties: {
                eggProduction: { type: Type.STRING, description: "Approximate number of eggs per year." },
                eggColor: { type: Type.STRING, description: "e.g., White, Brown, Blue, Green." },
                eggSize: { type: Type.STRING, description: "e.g., Small, Medium, Large." },
                ageAtFirstEgg: { type: Type.STRING, description: "Average age in weeks." },
                meatQuality: { type: Type.STRING, description: "Description of meat quality (e.g., Flavorful, Tender, Lean)." },
                growthRate: { type: Type.STRING, enum: ['Slow', 'Moderate', 'Fast'] },
                broodiness: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
            },
            required: ["eggProduction", "eggColor", "eggSize", "ageAtFirstEgg", "meatQuality", "growthRate", "broodiness"],
        },
        behaviorAndTemperament: {
            type: Type.OBJECT,
            properties: {
                temperament: { type: Type.STRING, description: "Comma-separated list of traits (e.g., Docile, Friendly, Flighty)." },
                noiseLevel: { type: Type.STRING, enum: ['Quiet', 'Moderate', 'Loud'] },
                flightAbility: { type: Type.STRING, description: "e.g., Can fly, Poor flyer, Ground-dwelling." },
                foragingAbility: { type: Type.STRING, enum: ['Poor', 'Good', 'Excellent'] },
                coldHardiness: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                heatTolerance: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                spaceNeeds: { type: Type.STRING, description: "Description of space requirements (e.g., Confined, Free-range)." },
            },
            required: ["temperament", "noiseLevel", "flightAbility", "foragingAbility", "coldHardiness", "heatTolerance", "spaceNeeds"],
        },
        healthAndManagement: {
            type: Type.OBJECT,
            properties: {
                commonHealthIssues: { type: Type.STRING, description: "List any breed-specific health predispositions or 'Generally hardy'." },
                lifespan: { type: Type.STRING, description: "Average lifespan in years (e.g., 5-8 years)." },
                maturityAge: { type: Type.STRING, description: "Age in weeks for meat birds or full production." },
                easeOfCare: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Expert'] },
                shelterNeeds: { type: Type.STRING, description: "Specific shelter requirements." },
                waterNeeds: { type: Type.STRING, description: "For waterfowl: Ponds, wading pools, or minimal. N/A for others." },
            },
            required: ["commonHealthIssues", "lifespan", "maturityAge", "easeOfCare", "shelterNeeds", "waterNeeds"],
        },
        breedingAndReproduction: {
            type: Type.OBJECT,
            properties: {
                fertilityRate: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                hatchability: { type: Type.STRING, enum: ['Poor', 'Fair', 'Good'] },
                clutchSize: { type: Type.STRING, description: "Average number of eggs per clutch or 'N/A'." },
                autosexing: { type: Type.STRING, description: "Answer with 'Yes' or 'No'." },
                hybridOrPurebred: { type: Type.STRING, enum: ['Hybrid', 'Purebred', 'Heritage'] },
                canBeBredNaturally: { type: Type.STRING, description: "Answer with 'Yes' or 'No'." },
            },
            required: ["fertilityRate", "hatchability", "clutchSize", "autosexing", "hybridOrPurebred", "canBeBredNaturally"],
        },
        regionalSuitability: {
            type: Type.OBJECT,
            properties: {
                suitableForMorocco: { type: Type.STRING, enum: ['Yes', 'No', 'Conditional'], description: "Based on heat, dust, and water access." },
                bestClimate: { type: Type.STRING, description: "e.g., Mediterranean, Arid, Temperate." },
                adaptabilityToSmallFarms: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                predatorAwareness: { type: Type.STRING, enum: ['Low', 'High'] },
                feedEfficiency: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
            },
            required: ["suitableForMorocco", "bestClimate", "adaptabilityToSmallFarms", "predatorAwareness", "feedEfficiency"],
        },
        references: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    text: { type: Type.STRING, description: "Name of the source (e.g., The Livestock Conservancy, FAO)." },
                    url: { type: Type.STRING, description: "A valid URL to the source, if available." },
                },
                required: ["text"],
            },
        },
    },
    required: [
        "basicIdentification", "physicalCharacteristics", "productionTraits", "behaviorAndTemperament",
        "healthAndManagement", "breedingAndReproduction", "regionalSuitability", "references"
    ],
};


export const getBreedDetails = async (breedId: number, breedName: string, species: string): Promise<BreedDetails> => {
    // NOTE: Gemini API call for breed details is disabled as per user request.
    console.warn(`Gemini API call for breed details (${breedName}) is disabled.`);
    
    // Check local storage first, as it might have cached data from a previous successful run.
    const cacheKey = `avianaid_breed_details_v2_${breedId}`;
    try {
        const cachedDetails = localStorage.getItem(cacheKey);
        if (cachedDetails) {
            return JSON.parse(cachedDetails) as BreedDetails;
        }
    } catch (e) {
        console.warn('Failed to read breed details from localStorage', e);
    }
    
    // Reject the promise to indicate the API is offline. The UI will handle this error.
    return Promise.reject(new Error("Gemini API for breed details is currently disabled."));
};
