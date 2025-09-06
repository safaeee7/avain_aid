

export interface NavigationLink {
  name: string;
  path: string;
}

export interface ReferenceLink {
  text: string;
  url: string;
}

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ZoonoticRiskLevel = 'LOW' | 'MODERATE' | 'HIGH';
export type Etiology = 'Viral' | 'Bacterial' | 'Parasitic' | 'Fungal' | 'Other';

export interface Disease {
  id: number;
  name: string;
  name_fr: string;
  aliases: string[];
  aliases_fr: string[];
  scientificName: string;
  description: string;
  description_fr: string;
  etiology: Etiology;
  urgency: UrgencyLevel;
  zoonoticRisk?: ZoonoticRiskLevel;
  speciesAffected: string[];
  speciesAffected_fr: string[];
  transmission: string;
  transmission_fr: string;
  symptoms: string[];
  symptoms_fr: string[];
  lesionsAtNecropsy: string[];
  lesionsAtNecropsy_fr: string[];
  bodySystemAffected: string[];
  bodySystemAffected_fr: string[];
  treatment: string;
  treatment_fr: string;
  prevention: string;
  prevention_fr: string;
  differentialDiagnosis: string[];
  differentialDiagnosis_fr: string[];
  region: string;
  moroccoNote: string;
  moroccoNote_fr: string;
  references: ReferenceLink[];
  lastReviewed: string;
  isNotifiableInMorocco?: boolean;
}

export type Species = 'Chicken' | 'Duck' | 'Turkey' | 'Goose';
export type BreedPurpose = 'Egg' | 'Meat' | 'Dual-Purpose' | 'Ornamental' | 'Guard';
export type FaoStatus = 'Not at risk' | 'Vulnerable' | 'Endangered' | 'Critical' | 'Unknown';

export interface Breed {
  id: number;
  name: string;
  alternateNames?: string[];
  species: Species;
  imageUrl: string;
  
  // Basic Info
  origin: string;
  faoStatus: FaoStatus;
  
  // Physical Characteristics
  weight: { male: string; female: string };
  plumageColor: string;
  combType: string;
  legFeathering: boolean;
  skinColor: string;
  shankColor: string;
  specialFeatures: string[];
  
  // Production Traits
  purpose: BreedPurpose;
  eggProduction: string;
  eggColor: string;
  eggSize: string;
  ageAtFirstEgg: string;
  meatQuality: string;
  growthRate: 'Slow' | 'Moderate' | 'Fast' | 'N/A';
  broodiness: 'High' | 'Moderate' | 'Low' | 'Rare' | 'N/A';
  
  // Behavior & Temperament
  temperament: string[];
  noiseLevel: 'Quiet' | 'Moderate' | 'Loud' | 'N/A';
  flightAbility: string;
  foragingAbility: 'Excellent' | 'Good' | 'Poor' | 'N/A';
  coldHardiness: 'High' | 'Moderate' | 'Low' | 'N/A';
  heatTolerance: 'High' | 'Moderate' | 'Low' | 'N/A';
  spaceNeeds: string;
  
  // Health & Management
  commonHealthIssues: string[];
  lifespan: string;
  maturityAge: string;
  easeOfCare: 'Beginner' | 'Intermediate' | 'Expert';
  shelterNeeds: string;
  waterNeeds: string;
  
  // Breeding & Reproduction
  fertilityRate: 'High' | 'Moderate' | 'Low' | 'N/A';
  hatchability: 'Good' | 'Fair' | 'Poor' | 'N/A';
  clutchSize: string;
  autosexing: boolean;
  hybridOrPurebred: 'Hybrid' | 'Purebred' | 'Heritage';
  canBeBredNaturally: boolean;
  
  // Regional Suitability & Misc
  suitableForMorocco: 'Yes' | 'No' | 'Conditional';
  bestClimate: string[];
  adaptabilityToSmallFarms: 'High' | 'Medium' | 'Low';
  predatorAwareness: 'High' | 'Medium' | 'Low';
  feedEfficiency: 'High' | 'Moderate' | 'Low';
  useInMorocco: string[];
  dadIsLink?: string;
  references: { text: string; url?: string }[];
}

// FIX: Added BreedDetails interface for data fetched from Gemini API to fix import error.
// This may need transformation to fit the `Breed` type used in the UI.
export interface BreedDetails {
  basicIdentification: {
    origin: string;
  };
  physicalCharacteristics: {
    weight: {
      male: string;
      female: string;
    };
    plumageColor: string;
    combType: string;
    legFeathering: string; // "Yes" or "No"
    skinColor: string;
    shankColor: string;
    specialFeatures: string; // comma-separated string
  };
  productionTraits: {
    eggProduction: string;
    eggColor: string;
    eggSize: string;
    ageAtFirstEgg: string;
    meatQuality: string;
    growthRate: 'Slow' | 'Moderate' | 'Fast';
    broodiness: 'Low' | 'Moderate' | 'High';
  };
  behaviorAndTemperament: {
    temperament: string; // comma-separated string
    noiseLevel: 'Quiet' | 'Moderate' | 'Loud';
    flightAbility: string;
    foragingAbility: 'Poor' | 'Good' | 'Excellent';
    coldHardiness: 'Low' | 'Moderate' | 'High';
    heatTolerance: 'Low' | 'Moderate' | 'High';
    spaceNeeds: string;
  };
  healthAndManagement: {
    commonHealthIssues: string; // comma-separated string
    lifespan: string;
    maturityAge: string;
    easeOfCare: 'Beginner' | 'Intermediate' | 'Expert';
    shelterNeeds: string;
    waterNeeds: string;
  };
  breedingAndReproduction: {
    fertilityRate: 'Low' | 'Moderate' | 'High';
    hatchability: 'Poor' | 'Fair' | 'Good';
    clutchSize: string;
    autosexing: string; // "Yes" or "No"
    hybridOrPurebred: 'Hybrid' | 'Purebred' | 'Heritage';
    canBeBredNaturally: string; // "Yes" or "No"
  };
  regionalSuitability: {
    suitableForMorocco: 'Yes' | 'No' | 'Conditional';
    bestClimate: string;
    adaptabilityToSmallFarms: 'Low' | 'Medium' | 'High';
    predatorAwareness: 'Low' | 'High';
    feedEfficiency: 'Low' | 'Moderate' | 'High';
  };
  references: {
    text: string;
    url?: string;
  }[];
}


// New types for the Diagnostics Playground
export interface DiagnosticsFormData {
  environment: string[];
  symptoms: string[];
  lesions: string[];
}

export interface DiagnosisResult {
  disease: Disease;
  likelihood: number; // Percentage (0-100)
}
