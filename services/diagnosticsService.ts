
import { DISEASES_DATA } from '../constants';
import type { Disease, DiagnosticsFormData, DiagnosisResult } from '../types';

interface Trigger {
  key: string; // The value from the form input (e.g., 'gasping', 'temp_high')
  weight: number; // The percentage point value to add to the score
}

interface DiseaseRule {
  diseaseId: number;
  environmentTriggers: Trigger[];
  symptomTriggers: Trigger[];
  lesionTriggers: Trigger[];
}

// A comprehensive, scientifically-weighted rule engine for all 34 diseases.
// Weights are assigned based on the clinical significance of each sign for the specific disease.
const DIAGNOSTIC_RULES: DiseaseRule[] = [
  // ID 1: Newcastle Disease (ND)
  {
    diseaseId: 1,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }, { key: 'wild_bird_exposure', weight: 4 }, { key: 'ammonia_smell', weight: 4 }, { key: 'temp_high', weight: 3 }],
    symptomTriggers: [{ key: 'gasping', weight: 8 }, { key: 'paralysis', weight: 8 }, { key: 'twisted_neck', weight: 7 }, { key: 'sudden_death', weight: 10 }, { key: 'reduced_egg_production', weight: 6 }, { key: 'green_diarrhea', weight: 5 }, { key: 'coughing', weight: 6 }],
    lesionTriggers: [{ key: 'hemorrhages_proventriculus', weight: 12 }, { key: 'hemorrhagic_trachea', weight: 10 }, { key: 'hemorrhages_intestines', weight: 6 }, { key: 'hemorrhages_cecal_tonsils', weight: 5 }],
  },
  // ID 2: Avian Influenza (HPAI)
  {
    diseaseId: 2,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }, { key: 'species_duck', weight: 1 }, { key: 'wild_bird_exposure', weight: 4 }, { key: 'recent_additions', weight: 4 }],
    symptomTriggers: [{ key: 'sudden_death', weight: 10 }, { key: 'cyanotic_comb', weight: 8 }, { key: 'swollen_head', weight: 7 }, { key: 'respiratory_distress', weight: 6 }, { key: 'skin_hemorrhages', weight: 6 }, { key: 'diarrhea', weight: 4 }],
    lesionTriggers: [{ key: 'pancreatic_necrosis', weight: 10 }, { key: 'hemorrhages_legs', weight: 7 }, { key: 'edema_head_neck', weight: 8 }, { key: 'hemorrhages_internal_organs', weight: 8 }],
  },
  // ID 3: Infectious Bronchitis (IB)
  {
    diseaseId: 3,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }, { key: 'age_chicks', weight: 2 }, { key: 'system_layer', weight: 2 }],
    symptomTriggers: [{ key: 'sneezing', weight: 8 }, { key: 'tracheal_rales', weight: 7 }, { key: 'reduced_egg_production', weight: 8 }, { key: 'misshapen_soft_shelled_eggs', weight: 9 }],
    lesionTriggers: [{ key: 'mucus_trachea', weight: 7 }, { key: 'caseous_plugs_bronchi', weight: 8 }, { key: 'oviduct_damage', weight: 10 }],
  },
  // ID 4: Infectious Bursal Disease (IBD)
  {
    diseaseId: 4,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }, { key: 'age_growers', weight: 3 }],
    symptomTriggers: [{ key: 'depression_ruffled_feathers', weight: 6 }, { key: 'white_watery_diarrhea', weight: 7 }, { key: 'dehydration', weight: 5 }, { key: 'immunosuppression', weight: 8 }],
    lesionTriggers: [{ key: 'swollen_bursa', weight: 12 }, { key: 'hemorrhagic_bursa', weight: 10 }, { key: 'atrophied_bursa', weight: 8 }, { key: 'muscular_hemorrhages', weight: 6 }],
  },
   // ID 5: Mycoplasmosis (MG)
  {
    diseaseId: 5,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }, { key: 'ammonia_smell', weight: 3 }],
    symptomTriggers: [{ key: 'nasal_discharge', weight: 7 }, { key: 'coughing', weight: 6 }, { key: 'sneezing', weight: 6 }, { key: 'swollen_sinuses', weight: 8 }, { key: 'reduced_growth', weight: 4 }, { key: 'reduced_egg_production', weight: 5 }],
    lesionTriggers: [{ key: 'sinusitis_caseous_exudate', weight: 9 }, { key: 'thickened_air_sacs', weight: 10 }, { key: 'cloudy_air_sacs', weight: 8 }, { key: 'tracheitis', weight: 5 }],
  },
  // ID 6: Coccidiosis
  {
    diseaseId: 6,
    environmentTriggers: [{ key: 'humidity_high', weight: 4 }, { key: 'temp_high', weight: 3 }, { key: 'system_freerange', weight: 3 }, { key: 'age_chicks', weight: 2 }],
    symptomTriggers: [{ key: 'bloody_diarrhea', weight: 10 }, { key: 'weight_loss', weight: 6 }, { key: 'anemia_pale_comb', weight: 5 }, { key: 'depression_ruffled_feathers', weight: 4 }, { key: 'high_chick_mortality', weight: 6 }],
    lesionTriggers: [{ key: 'hemorrhagic_ceca_with_cores', weight: 12 }, { key: 'whitish_spots_small_intestine', weight: 8 }],
  },
  // ID 7: Infectious Laryngotracheitis (ILT)
  {
    diseaseId: 7,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }],
    symptomTriggers: [{ key: 'severe_respiratory_distress', weight: 9 }, { key: 'gasping', weight: 8 }, { key: 'coughing_up_blood', weight: 12 }],
    lesionTriggers: [{ key: 'hemorrhagic_trachea', weight: 10 }, { key: 'blood_clots_trachea', weight: 12 }, { key: 'diphtheritic_membranes_trachea', weight: 9 }],
  },
  // ID 8: Duck Virus Enteritis (DVE)
  {
    diseaseId: 8,
    environmentTriggers: [{ key: 'species_duck', weight: 4 }, { key: 'species_goose', weight: 3 }],
    symptomTriggers: [{ key: 'sudden_death', weight: 9 }, { key: 'bloody_diarrhea', weight: 7 }, { key: 'neck_retraction', weight: 8 }, { key: 'hemorrhages_on_skin', weight: 6 }],
    lesionTriggers: [{ key: 'liver_necrosis', weight: 9 }, { key: 'hemorrhages_on_liver', weight: 8 }, { key: 'esophageal_ulcers', weight: 10 }, { key: 'blood_in_body_cavities', weight: 8 }],
  },
  // ID 9: Fowl Cholera
  {
    diseaseId: 9,
    environmentTriggers: [{ key: 'species_chicken', weight: 1 }, { key: 'species_turkey', weight: 2 }, { key: 'species_duck', weight: 2 }, { key: 'wild_bird_exposure', weight: 3 }],
    symptomTriggers: [{ key: 'sudden_death', weight: 8 }, { key: 'swollen_wattles_joints', weight: 7 }, { key: 'green_diarrhea', weight: 5 }],
    lesionTriggers: [{ key: 'hemorrhages_internal_organs', weight: 7 }, { key: 'caseous_exudate_joints', weight: 8 }, { key: 'enlarged_liver', weight: 6 }, { key: 'necrotic_liver', weight: 9 }],
  },
  // ID 10: Egg Drop Syndrome '76
  {
    diseaseId: 10,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }],
    symptomTriggers: [{ key: 'reduced_egg_production', weight: 10 }, { key: 'thin_shelled_shell_less_eggs', weight: 12 }, { key: 'pale_eggs', weight: 8 }],
    lesionTriggers: [{ key: 'oviduct_inflammation', weight: 9 }],
  },
  // ID 11: Avian Encephalomyelitis (AE)
  {
    diseaseId: 11,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }, { key: 'age_chicks', weight: 4 }],
    symptomTriggers: [{ key: 'tremors_ataxia', weight: 10 }, { key: 'paralysis', weight: 8 }, { key: 'high_chick_mortality', weight: 7 }],
    lesionTriggers: [{ key: 'neuronal_degeneration', weight: 10 }],
  },
  // ID 12: Marek’s Disease
  {
    diseaseId: 12,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }, { key: 'age_growers', weight: 2 }],
    symptomTriggers: [{ key: 'paralysis', weight: 10 }, { key: 'weight_loss', weight: 6 }, { key: 'gray_iris_blindness', weight: 9 }],
    lesionTriggers: [{ key: 'tumors_liver', weight: 8 }, { key: 'tumors_spleen', weight: 8 }, { key: 'enlarged_peripheral_nerves', weight: 12 }],
  },
  // ID 13: Salmonellosis
  {
    diseaseId: 13,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }, { key: 'age_chicks', weight: 3 }],
    symptomTriggers: [{ key: 'white_watery_diarrhea', weight: 8 }, { key: 'high_chick_mortality', weight: 7 }, { key: 'reduced_egg_production', weight: 5 }],
    lesionTriggers: [{ key: 'enlarged_liver', weight: 6 }, { key: 'enlarged_spleen', weight: 6 }, { key: 'caseous_material_ceca', weight: 9 }],
  },
  // ID 14: Aspergillosis
  {
    diseaseId: 14,
    environmentTriggers: [{ key: 'age_chicks', weight: 3 }, { key: 'humidity_high', weight: 3 }],
    symptomTriggers: [{ key: 'respiratory_distress', weight: 8 }, { key: 'gasping', weight: 9 }],
    lesionTriggers: [{ key: 'yellow_nodules_lungs', weight: 12 }, { key: 'yellow_nodules_air_sacs', weight: 10 }],
  },
  // ID 15: Infectious Coryza
  {
    diseaseId: 15,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }],
    symptomTriggers: [{ key: 'swollen_face', weight: 10 }, { key: 'nasal_discharge', weight: 8 }, { key: 'sneezing', weight: 6 }, { key: 'reduced_feed_intake', weight: 5 }],
    lesionTriggers: [{ key: 'sinusitis_caseous_exudate', weight: 9 }, { key: 'tracheitis', weight: 5 }],
  },
   // ID 16: Avian Tuberculosis
  {
    diseaseId: 16,
    environmentTriggers: [{ key: 'age_adults', weight: 3 }, { key: 'system_freerange', weight: 2 }],
    symptomTriggers: [{ key: 'weight_loss', weight: 10 }, { key: 'lethargy', weight: 6 }, { key: 'lameness', weight: 7 }],
    lesionTriggers: [{ key: 'caseous_nodules_liver', weight: 12 }, { key: 'caseous_nodules_spleen', weight: 10 }, { key: 'bone_lesions', weight: 8 }],
  },
  // ID 17: Infectious Synovitis (MS)
  {
    diseaseId: 17,
    environmentTriggers: [{ key: 'species_chicken', weight: 2 }, { key: 'species_turkey', weight: 2 }],
    symptomTriggers: [{ key: 'lameness', weight: 7 }, { key: 'swollen_joints', weight: 8 }, { key: 'breast_blisters', weight: 5 }, { key: 'reluctance_to_walk', weight: 6 }],
    lesionTriggers: [{ key: 'cloudy_synovial_fluid', weight: 10 }, { key: 'caseous_exudate_tendons', weight: 9 }, { key: 'cloudy_air_sacs', weight: 6 }],
  },
  // ID 18: Blackhead Disease (Histomoniasis)
  {
    diseaseId: 18,
    environmentTriggers: [{ key: 'species_turkey', weight: 4 }, { key: 'species_chicken', weight: 1 }, { key: 'system_freerange', weight: 3 }],
    symptomTriggers: [{ key: 'sulphur_yellow_diarrhea', weight: 10 }, { key: 'drooping_wings', weight: 6 }, { key: 'cyanotic_head', weight: 8 }],
    lesionTriggers: [{ key: 'caseous_cecal_cores', weight: 10 }, { key: 'circular_necrotic_lesions_liver', weight: 12 }],
  },
  // ID 19: Viral Tenosynovitis
  {
    diseaseId: 19,
    environmentTriggers: [{ key: 'system_broiler', weight: 3 }],
    symptomTriggers: [{ key: 'swollen_hock_joints', weight: 9 }, { key: 'lameness', weight: 7 }, { key: 'reluctance_to_walk', weight: 6 }, { key: 'tendon_rupture', weight: 10 }],
    lesionTriggers: [{ key: 'fluid_filled_tendon_sheaths', weight: 9 }, { key: 'ruptured_gastrocnemius_tendon', weight: 12 }],
  },
  // ID 20: Lymphoid Leukosis
  {
    diseaseId: 20,
    environmentTriggers: [{ key: 'species_chicken', weight: 3 }, { key: 'age_adults', weight: 2 }],
    symptomTriggers: [{ key: 'weight_loss', weight: 7 }, { key: 'enlarged_abdomen', weight: 8 }, { key: 'anemia_pale_comb', weight: 6 }],
    lesionTriggers: [{ key: 'tumors_liver', weight: 10 }, { key: 'tumors_bursa', weight: 12 }, { key: 'tumors_spleen', weight: 9 }],
  },
  // ID 21: BCO
  {
    diseaseId: 21,
    environmentTriggers: [{ key: 'system_broiler', weight: 4 }],
    symptomTriggers: [{ key: 'lameness', weight: 8 }, { key: 'reluctance_to_walk', weight: 7 }, { key: 'leg_fractures', weight: 9 }],
    lesionTriggers: [{ key: 'necrotic_femoral_head', weight: 12 }, { key: 'bacterial_colonies_bone', weight: 10 }],
  },
  // ID 22: FLHS
  {
    diseaseId: 22,
    environmentTriggers: [{ key: 'system_layer', weight: 4 }],
    symptomTriggers: [{ key: 'sudden_death', weight: 8 }, { key: 'obesity', weight: 7 }, { key: 'reduced_egg_production', weight: 6 }],
    lesionTriggers: [{ key: 'enlarged_liver', weight: 8 }, { key: 'friable_yellow_liver', weight: 10 }, { key: 'blood_clots_abdominal_cavity', weight: 12 }],
  },
  // ID 23: Tibial Dyschondroplasia
  {
    diseaseId: 23,
    environmentTriggers: [{ key: 'system_broiler', weight: 3 }],
    symptomTriggers: [{ key: 'lameness', weight: 8 }, { key: 'shortened_legs', weight: 9 }, { key: 'reluctance_to_walk', weight: 6 }],
    lesionTriggers: [{ key: 'non_vascularized_cartilage_plug', weight: 12 }, { key: 'soft_tibial_growth_plate', weight: 10 }],
  },
  // ID 24: External Parasites
  {
    diseaseId: 24,
    environmentTriggers: [{ key: 'system_freerange', weight: 2 }],
    symptomTriggers: [{ key: 'restlessness_feather_loss', weight: 8 }, { key: 'anemia_pale_comb', weight: 6 }, { key: 'reduced_egg_production', weight: 5 }, { key: 'blood_spots_on_eggs', weight: 9 }],
    lesionTriggers: [{ key: 'skin_irritation', weight: 7 }],
  },
  // ID 25: Internal Parasites
  {
    diseaseId: 25,
    environmentTriggers: [{ key: 'system_freerange', weight: 3 }],
    symptomTriggers: [{ key: 'weight_loss', weight: 7 }, { key: 'diarrhea', weight: 5 }, { key: 'intestinal_blockage', weight: 9 }],
    lesionTriggers: [{ key: 'adult_worms_intestines', weight: 12 }, { key: 'thickened_gut_wall', weight: 7 }],
  },
  // ID 26: Vent Gleet
  {
    diseaseId: 26,
    environmentTriggers: [{ key: 'system_layer', weight: 2 }],
    symptomTriggers: [{ key: 'swollen_inflamed_vent', weight: 10 }, { key: 'egg_binding', weight: 6 }],
    lesionTriggers: [{ key: 'white_plaques_cloaca', weight: 12 }],
  },
  // ID 27: Avian Spirochetosis
  {
    diseaseId: 27,
    environmentTriggers: [{ key: 'system_freerange', weight: 3 }],
    symptomTriggers: [{ key: 'sudden_fever', weight: 8 }, { key: 'green_diarrhea', weight: 7 }, { key: 'paralysis', weight: 9 }],
    lesionTriggers: [{ key: 'enlarged_liver', weight: 7 }, { key: 'enlarged_spleen', weight: 8 }, { key: 'hemorrhages_internal_organs', weight: 6 }],
  },
  // ID 28: Perosis
  {
    diseaseId: 28,
    environmentTriggers: [{ key: 'age_chicks', weight: 3 }],
    symptomTriggers: [{ key: 'swollen_hock_joints', weight: 8 }, { key: 'rotated_tibia', weight: 10 }, { key: 'lameness', weight: 7 }],
    lesionTriggers: [{ key: 'displaced_tibiotarsal_joint', weight: 12 }],
  },
  // ID 29: Heat Stress
  {
    diseaseId: 29,
    environmentTriggers: [{ key: 'temp_high', weight: 5 }, { key: 'humidity_high', weight: 3 }],
    symptomTriggers: [{ key: 'panting_wing_spreading', weight: 10 }, { key: 'reduced_feed_intake', weight: 6 }, { key: 'sudden_death', weight: 7 }],
    lesionTriggers: [{ key: 'congested_organs', weight: 8 }],
  },
  // ID 30: Egg Binding
  {
    diseaseId: 30,
    environmentTriggers: [{ key: 'system_layer', weight: 3 }],
    symptomTriggers: [{ key: 'straining', weight: 10 }, { key: 'lethargy', weight: 6 }, { key: 'swollen_inflamed_vent', weight: 8 }],
    lesionTriggers: [{ key: 'egg_stuck_in_oviduct_cloaca', weight: 12 }],
  },
  // ID 31: Campylobacteriosis
  {
    diseaseId: 31,
    environmentTriggers: [{ key: 'humidity_high', weight: 2 }],
    symptomTriggers: [{ key: 'diarrhea', weight: 6 }, { key: 'reduced_growth', weight: 5 }],
    lesionTriggers: [{ key: 'enteritis', weight: 8 }, { key: 'swollen_liver', weight: 7 }],
  },
  // ID 32: Ornithosis
  {
    diseaseId: 32,
    environmentTriggers: [{ key: 'species_turkey', weight: 3 }, { key: 'species_duck', weight: 2 }],
    symptomTriggers: [{ key: 'lethargy', weight: 6 }, { key: 'green_diarrhea', weight: 7 }, { key: 'nasal_discharge', weight: 8 }, { key: 'conjunctivitis', weight: 9 }],
    lesionTriggers: [{ key: 'enlarged_spleen', weight: 10 }, { key: 'enlarged_liver', weight: 8 }, { key: 'fibrinous_airsacculitis', weight: 9 }],
  },
  // ID 33: Avian Staphylococcosis
  {
    diseaseId: 33,
    environmentTriggers: [{ key: 'humidity_high', weight: 2 }],
    symptomTriggers: [{ key: 'lameness', weight: 8 }, { key: 'swollen_joints', weight: 9 }, { key: 'swollen_footpads_bumblefoot', weight: 10 }],
    lesionTriggers: [{ key: 'arthritis_purulent_exudate', weight: 10 }, { key: 'osteomyelitis', weight: 9 }],
  },
  // ID 34: APEC
  {
    diseaseId: 34,
    environmentTriggers: [{ key: 'ammonia_smell', weight: 3 }],
    symptomTriggers: [{ key: 'respiratory_distress', weight: 7 }, { key: 'lethargy', weight: 5 }, { key: 'high_chick_mortality', weight: 6 }],
    lesionTriggers: [{ key: 'fibrinous_airsacculitis', weight: 9 }, { key: 'pericarditis', weight: 10 }, { key: 'perihepatitis', weight: 10 }],
  },
  // ID 35: Low Pathogenic Avian Influenza (LPAI)
  {
    diseaseId: 35,
    environmentTriggers: [
      { key: 'species_chicken', weight: 2 },
      { key: 'species_turkey', weight: 2 },
      { key: 'species_duck', weight: 2 },
      { key: 'species_goose', weight: 2 },
      { key: 'wild_bird_exposure', weight: 4 },
      { key: 'recent_additions', weight: 3 }
    ],
    symptomTriggers: [
      { key: 'sneezing', weight: 8 },
      { key: 'coughing', weight: 8 },
      { key: 'reduced_egg_production', weight: 9 },
      { key: 'depression_ruffled_feathers', weight: 7 },
      { key: 'swollen_sinuses', weight: 9 }
    ],
    lesionTriggers: [
      { key: 'sinusitis_caseous_exudate', weight: 8 },
      { key: 'tracheitis', weight: 6 },
      { key: 'lung_congestion', weight: 5 },
      { key: 'egg_peritonitis', weight: 7 }
    ]
  },
];

export const calculateDiagnosis = (formData: DiagnosticsFormData): DiagnosisResult[] => {
  const scores: { [diseaseId: number]: number } = {};

  DIAGNOSTIC_RULES.forEach(rule => {
    let envScore = 0;
    let sympScore = 0;
    let lesionScore = 0;

    rule.environmentTriggers.forEach(trigger => {
      if (formData.environment.includes(trigger.key)) {
        envScore += trigger.weight;
      }
    });

    rule.symptomTriggers.forEach(trigger => {
      if (formData.symptoms.includes(trigger.key)) {
        sympScore += trigger.weight;
      }
    });

    rule.lesionTriggers.forEach(trigger => {
      if (formData.lesions.includes(trigger.key)) {
        lesionScore += trigger.weight;
      }
    });

    // Apply weighting
    const finalScore = (envScore * 0.2) + (sympScore * 0.4) + (lesionScore * 0.4);
    if (finalScore > 0) {
        scores[rule.diseaseId] = finalScore;
    }
  });

  const sortedResults = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (sortedResults.length === 0) {
    return [];
  }

  const totalScore = sortedResults.reduce((sum, [, score]) => sum + score, 0);
  
  if (totalScore === 0) {
    return [];
  }

  return sortedResults.map(([diseaseId, score]) => {
    const disease = DISEASES_DATA.find(d => d.id === parseInt(diseaseId));
    if (!disease) return null; // Should not happen

    return {
      disease,
      likelihood: Math.round((score / totalScore) * 100),
    };
  }).filter((result): result is DiagnosisResult => result !== null);
};
