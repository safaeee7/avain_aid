
import React, { useState, useRef, useEffect } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import type { DiagnosisResult, DiagnosticsFormData } from '../types';
import { calculateDiagnosis } from '../services/diagnosticsService';
import { UrgencyBadge, ZoonoticStatusBadge, NotifiableBadge } from '../components/Badges';
import { useLanguage } from '../contexts/LanguageContext';
// FIX: Imported `BirdIcon` to resolve errors where it was used without being imported.
import { 
    AlertTriangleIcon,
    LungsIcon,
    StomachIcon,
    EggIcon,
    BrainIcon,
    BoneIcon,
    HeartbeatIcon,
    FeatherIcon,
    BirdIcon
} from '../components/Icons';

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const { t } = useLanguage();
    const steps = [t('diagStep1'), t('diagStep2'), t('diagStep3')];
    return (
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-10 sticky top-[70px] bg-[#f5fbf8]/80 backdrop-blur-md py-4 z-10">
            {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                                currentStep === index + 1
                                    ? 'bg-[#2c7d6c] text-white ring-4 ring-green-200'
                                    : 'bg-gray-200 text-gray-500'
                            }`}
                        >
                            {index + 1}
                        </div>
                        <span
                            className={`font-semibold hidden sm:inline ${
                                currentStep === index + 1 ? 'text-[#2c7d6c]' : 'text-gray-500'
                            }`}
                        >
                            {step}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 rounded ${currentStep > index + 1 ? 'bg-[#2c7d6c]' : 'bg-gray-200'}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const CheckboxInput: React.FC<{ name: string; value: string; label: string }> = ({ name, value, label }) => (
    <label className="flex items-center space-x-3 p-2 rounded-md hover:bg-green-50/50 transition-colors duration-200 cursor-pointer">
        <input
            type="checkbox"
            name={name}
            value={value}
            className="h-4 w-4 rounded border-gray-300 text-[#2c7d6c] focus:ring-[#2c7d6c]"
        />
        <span className="text-sm text-gray-700">{label}</span>
    </label>
);

const Section: React.FC<{ step: number; title: string; subtitle: string; children: React.ReactNode }> = ({ step, title, subtitle, children }) => (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200/80">
        <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#2c7d6c] text-white font-bold rounded-full text-lg">{step}</div>
            <div>
                <h2 className="text-xl font-bold font-manrope">{title}</h2>
                <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
            {children}
        </div>
    </div>
);

const SubSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-[#2c7d6c] w-5 h-5">{icon}</span>
            {title}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1">
            {children}
        </div>
    </div>
);

const ResultCard: React.FC<{ result: DiagnosisResult }> = ({ result }) => {
    const urgencyStyles = {
        HIGH: { bg: 'bg-red-50/70', border: 'border-red-200', accent: 'text-red-700' },
        MEDIUM: { bg: 'bg-yellow-50/70', border: 'border-yellow-200', accent: 'text-yellow-700' },
        LOW: { bg: 'bg-green-50/70', border: 'border-green-200', accent: 'text-green-700' },
    };
    const styles = urgencyStyles[result.disease.urgency];

    return (
        <div className={`rounded-lg shadow-md border ${styles.bg} ${styles.border} p-5 flex flex-col`}>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{result.disease.name}</h3>
                <div className={`text-2xl font-bold ${styles.accent}`}>{result.likelihood}%</div>
            </div>
            <p className="text-sm text-gray-500 italic mb-3">{result.disease.scientificName}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                <UrgencyBadge level={result.disease.urgency} />
                <ZoonoticStatusBadge level={result.disease.zoonoticRisk} />
                {result.disease.isNotifiableInMorocco && <NotifiableBadge />}
            </div>
            <p className="text-sm text-gray-600 flex-grow mb-4">{result.disease.description}</p>
            <ReactRouterDOM.Link 
                to={`/disease-database/${result.disease.id}`} 
                className="mt-auto text-center w-full px-4 py-2 bg-[#2c7d6c] text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 transform hover:-translate-y-0.5"
            >
                View Details
            </ReactRouterDOM.Link>
        </div>
    );
};

const SymptomCheckerPage: React.FC = () => {
    const [results, setResults] = useState<DiagnosisResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const formRef = useRef<HTMLFormElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const sectionRefs = {
        1: useRef<HTMLDivElement>(null),
        2: useRef<HTMLDivElement>(null),
        3: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const step = Number(entry.target.getAttribute('data-step'));
                        setCurrentStep(step);
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
        );

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setResults(null);
        setError(null);

        const getCheckedValues = (name: string): string[] => 
            Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                 .map(input => (input as HTMLInputElement).value);

        const formData: DiagnosticsFormData = {
            environment: getCheckedValues('environment'),
            symptoms: [
                ...getCheckedValues('symptoms_systemic'),
                ...getCheckedValues('symptoms_respiratory'),
                ...getCheckedValues('symptoms_nervous'),
                ...getCheckedValues('symptoms_digestive'),
                ...getCheckedValues('symptoms_reproductive'),
                ...getCheckedValues('symptoms_musculoskeletal'),
                ...getCheckedValues('symptoms_integumentary'),
            ],
            lesions: [
                ...getCheckedValues('lesions_respiratory'),
                ...getCheckedValues('lesions_digestive'),
                ...getCheckedValues('lesions_immune'),
                ...getCheckedValues('lesions_nervous'),
                ...getCheckedValues('lesions_musculoskeletal'),
                ...getCheckedValues('lesions_systemic_other'),
            ],
        };

        setTimeout(() => {
            try {
                const diagnosisResults = calculateDiagnosis(formData);
                setResults(diagnosisResults);
                if (resultsRef.current) {
                    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (e) {
                console.error(e);
                setError(t('diagError'));
            } finally {
                setIsLoading(false);
            }
        }, 500);
    };

    const handleReset = () => {
        formRef.current?.reset();
        setResults(null);
        setError(null);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#f5fbf8] py-12 md:py-20 animate-fadeIn">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('diagPlaygroundTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600">{t('diagPlaygroundSubtitle')}</p>
                </div>
                
                <StepIndicator currentStep={currentStep} />
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-8 flex items-start gap-3">
                    <AlertTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-yellow-900">{t('diagWarningTitle')}</h4>
                        <p className="text-sm text-yellow-800 mt-1">{t('diagWarningText')}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} onReset={handleReset} ref={formRef} className="space-y-8">
                    <div ref={sectionRefs[1]} data-step="1">
                        <Section step={1} title={t('diagSection1Title')} subtitle={t('diagSection1Subtitle')}>
                             <SubSection title={t('diagEnvSpecies')} icon={<BirdIcon />}>
                                <CheckboxInput name="environment" value="species_chicken" label={t('diagOptionSpeciesChicken')} />
                                <CheckboxInput name="environment" value="species_turkey" label={t('diagOptionSpeciesTurkey')} />
                                <CheckboxInput name="environment" value="species_duck" label={t('diagOptionSpeciesDuck')} />
                                <CheckboxInput name="environment" value="species_goose" label={t('diagOptionSpeciesGoose')} />
                            </SubSection>
                            <SubSection title={t('diagEnvAge')} icon={<BirdIcon />}>
                                <CheckboxInput name="environment" value="age_chicks" label={t('diagOptionAgeChicks')} />
                                <CheckboxInput name="environment" value="age_growers" label={t('diagOptionAgeGrowers')} />
                                <CheckboxInput name="environment" value="age_adults" label={t('diagOptionAgeAdults')} />
                            </SubSection>
                             <SubSection title={t('diagEnvSystem')} icon={<BirdIcon />}>
                                <CheckboxInput name="environment" value="system_freerange" label={t('diagOptionSystemFreeRange')} />
                                <CheckboxInput name="environment" value="system_broiler" label={t('diagOptionSystemBroiler')} />
                                <CheckboxInput name="environment" value="system_layer" label={t('diagOptionSystemLayer')} />
                            </SubSection>
                             <SubSection title={t('diagEnvConditions')} icon={<BirdIcon />}>
                                <CheckboxInput name="environment" value="humidity_high" label={t('diagOptionConditionHumidity')} />
                                <CheckboxInput name="environment" value="temp_high" label={t('diagOptionConditionTemp')} />
                                <CheckboxInput name="environment" value="ammonia_smell" label={t('diagOptionConditionAmmonia')} />
                                <CheckboxInput name="environment" value="recent_additions" label={t('diagOptionConditionNewBirds')} />
                                <CheckboxInput name="environment" value="wild_bird_exposure" label={t('diagOptionConditionWildBirds')} />
                            </SubSection>
                        </Section>
                    </div>

                    <div ref={sectionRefs[2]} data-step="2">
                        <Section step={2} title={t('diagSection2Title')} subtitle={t('diagSection2Subtitle')}>
                            <SubSection title={t('diagSymptomSystemic')} icon={<HeartbeatIcon />}><CheckboxInput name="symptoms_systemic" value="sudden_death" label={t('diagOptionSuddenDeath')} /><CheckboxInput name="symptoms_systemic" value="weight_loss" label={t('diagOptionWeightLoss')} /><CheckboxInput name="symptoms_systemic" value="anemia_pale_comb" label={t('diagOptionAnemia')} /><CheckboxInput name="symptoms_systemic" value="depression_ruffled_feathers" label={t('diagOptionDepression')} /><CheckboxInput name="symptoms_systemic" value="dehydration" label={t('diagOptionDehydration')} /><CheckboxInput name="symptoms_systemic" value="reduced_growth" label={t('diagOptionReducedGrowth')} /><CheckboxInput name="symptoms_systemic" value="high_chick_mortality" label={t('diagOptionHighMortality')} /><CheckboxInput name="symptoms_systemic" value="sudden_fever" label={t('diagOptionFever')} /><CheckboxInput name="symptoms_systemic" value="obesity" label={t('diagOptionObesity')} /><CheckboxInput name="symptoms_systemic" value="immunosuppression" label={t('diagOptionImmunosuppression')} /></SubSection>
                            <SubSection title={t('diagSymptomRespiratory')} icon={<LungsIcon />}><CheckboxInput name="symptoms_respiratory" value="respiratory_distress" label={t('diagOptionRespDistress')} /><CheckboxInput name="symptoms_respiratory" value="severe_respiratory_distress" label={t('diagOptionSevereRespDistress')} /><CheckboxInput name="symptoms_respiratory" value="gasping" label={t('diagOptionGasping')} /><CheckboxInput name="symptoms_respiratory" value="coughing" label={t('diagOptionCoughing')} /><CheckboxInput name="symptoms_respiratory" value="sneezing" label={t('diagOptionSneezing')} /><CheckboxInput name="symptoms_respiratory" value="tracheal_rales" label={t('diagOptionRales')} /><CheckboxInput name="symptoms_respiratory" value="nasal_discharge" label={t('diagOptionNasalDischarge')} /><CheckboxInput name="symptoms_respiratory" value="panting_wing_spreading" label={t('diagOptionPanting')} /><CheckboxInput name="symptoms_respiratory" value="conjunctivitis" label={t('diagOptionConjunctivitis')} /><CheckboxInput name="symptoms_respiratory" value="coughing_up_blood" label={t('diagOptionCoughingBlood')} /></SubSection>
                            <SubSection title={t('diagSymptomNervous')} icon={<BrainIcon />}><CheckboxInput name="symptoms_nervous" value="paralysis" label={t('diagOptionParalysis')} /><CheckboxInput name="symptoms_nervous" value="twisted_neck" label={t('diagOptionTwistedNeck')} /><CheckboxInput name="symptoms_nervous" value="tremors_ataxia" label={t('diagOptionTremors')} /><CheckboxInput name="symptoms_nervous" value="neck_retraction" label={t('diagOptionNeckRetraction')} /><CheckboxInput name="symptoms_nervous" value="gray_iris_blindness" label={t('diagOptionGrayIris')} /></SubSection>
                            <SubSection title={t('diagSymptomDigestive')} icon={<StomachIcon />}><CheckboxInput name="symptoms_digestive" value="diarrhea" label={t('diagOptionDiarrhea')} /><CheckboxInput name="symptoms_digestive" value="bloody_diarrhea" label={t('diagOptionBloodyDiarrhea')} /><CheckboxInput name="symptoms_digestive" value="green_diarrhea" label={t('diagOptionGreenDiarrhea')} /><CheckboxInput name="symptoms_digestive" value="white_watery_diarrhea" label={t('diagOptionWhiteDiarrhea')} /><CheckboxInput name="symptoms_digestive" value="sulphur_yellow_diarrhea" label={t('diagOptionYellowDiarrhea')} /><CheckboxInput name="symptoms_digestive" value="reduced_feed_intake" label={t('diagOptionReducedFeed')} /><CheckboxInput name="symptoms_digestive" value="intestinal_blockage" label={t('diagOptionIntestinalBlockage')} /></SubSection>
                            <SubSection title={t('diagSymptomReproductive')} icon={<EggIcon />}><CheckboxInput name="symptoms_reproductive" value="reduced_egg_production" label={t('diagOptionReducedEggs')} /><CheckboxInput name="symptoms_reproductive" value="misshapen_soft_shelled_eggs" label={t('diagOptionMisshapenEggs')} /><CheckboxInput name="symptoms_reproductive" value="thin_shelled_shell_less_eggs" label={t('diagOptionThinShells')} /><CheckboxInput name="symptoms_reproductive" value="pale_eggs" label={t('diagOptionPaleEggs')} /><CheckboxInput name="symptoms_reproductive" value="egg_binding" label={t('diagOptionEggBinding')} /><CheckboxInput name="symptoms_reproductive" value="straining" label={t('diagOptionStraining')} /></SubSection>
                            <SubSection title={t('diagSymptomMusculoskeletal')} icon={<BoneIcon />}><CheckboxInput name="symptoms_musculoskeletal" value="lameness" label={t('diagOptionLameness')} /><CheckboxInput name="symptoms_musculoskeletal" value="swollen_joints" label={t('diagOptionSwollenJoints')} /><CheckboxInput name="symptoms_musculoskeletal" value="swollen_wattles_joints" label={t('diagOptionSwollenWattles')} /><CheckboxInput name="symptoms_musculoskeletal" value="breast_blisters" label={t('diagOptionBreastBlisters')} /><CheckboxInput name="symptoms_musculoskeletal" value="reluctance_to_walk" label={t('diagOptionReluctanceToWalk')} /><CheckboxInput name="symptoms_musculoskeletal" value="drooping_wings" label={t('diagOptionDroopingWings')} /><CheckboxInput name="symptoms_musculoskeletal" value="swollen_hock_joints" label={t('diagOptionSwollenHocks')} /><CheckboxInput name="symptoms_musculoskeletal" value="tendon_rupture" label={t('diagOptionTendonRupture')} /><CheckboxInput name="symptoms_musculoskeletal" value="leg_fractures" label={t('diagOptionLegFractures')} /><CheckboxInput name="symptoms_musculoskeletal" value="shortened_legs" label={t('diagOptionShortenedLegs')} /><CheckboxInput name="symptoms_musculoskeletal" value="rotated_tibia" label={t('diagOptionRotatedTibia')} /></SubSection>
                            <SubSection title={t('diagSymptomIntegumentary')} icon={<FeatherIcon />}><CheckboxInput name="symptoms_integumentary" value="cyanotic_comb" label={t('diagOptionCyanoticComb')} /><CheckboxInput name="symptoms_integumentary" value="swollen_head" label={t('diagOptionSwollenHead')} /><CheckboxInput name="symptoms_integumentary" value="swollen_sinuses" label={t('diagOptionSwollenSinuses')} /><CheckboxInput name="symptoms_integumentary" value="skin_hemorrhages" label={t('diagOptionSkinHemorrhages')} /><CheckboxInput name="symptoms_integumentary" value="blood_spots_on_eggs" label={t('diagOptionBloodSpotsOnEggs')} /><CheckboxInput name="symptoms_integumentary" value="restlessness_feather_loss" label={t('diagOptionFeatherLoss')} /><CheckboxInput name="symptoms_integumentary" value="swollen_inflamed_vent" label={t('diagOptionSwollenVent')} /><CheckboxInput name="symptoms_integumentary" value="cyanotic_head" label={t('diagOptionCyanoticHead')} /><CheckboxInput name="symptoms_integumentary" value="swollen_footpads_bumblefoot" label={t('diagOptionBumblefoot')} /></SubSection>
                        </Section>
                    </div>

                    <div ref={sectionRefs[3]} data-step="3">
                        <Section step={3} title={t('diagSection3Title')} subtitle={t('diagSection3Subtitle')}>
                            <SubSection title={t('diagLesionRespiratory')} icon={<LungsIcon />}><CheckboxInput name="lesions_respiratory" value="hemorrhagic_trachea" label={t('diagOptionLesionTracheaHemorrhagic')} /><CheckboxInput name="lesions_respiratory" value="blood_clots_trachea" label={t('diagOptionLesionTracheaClots')} /><CheckboxInput name="lesions_respiratory" value="diphtheritic_membranes_trachea" label={t('diagOptionLesionTracheaMembranes')} /><CheckboxInput name="lesions_respiratory" value="mucus_trachea" label={t('diagOptionLesionTracheaMucus')} /><CheckboxInput name="lesions_respiratory" value="tracheitis" label={t('diagOptionLesionTracheitis')} /><CheckboxInput name="lesions_respiratory" value="lung_congestion" label={t('diagOptionLesionLungCongestion')} /><CheckboxInput name="lesions_respiratory" value="yellow_nodules_lungs" label={t('diagOptionLesionLungNodules')} /><CheckboxInput name="lesions_respiratory" value="cloudy_air_sacs" label={t('diagOptionLesionAirsacCloudy')} /><CheckboxInput name="lesions_respiratory" value="thickened_air_sacs" label={t('diagOptionLesionAirsacThickened')} /><CheckboxInput name="lesions_respiratory" value="fibrinous_airsacculitis" label={t('diagOptionLesionAirsacFibrin')} /><CheckboxInput name="lesions_respiratory" value="yellow_nodules_air_sacs" label={t('diagOptionLesionAirsacNodules')} /><CheckboxInput name="lesions_respiratory" value="caseous_plugs_bronchi" label={t('diagOptionLesionBronchiPlugs')} /><CheckboxInput name="lesions_respiratory" value="sinusitis_caseous_exudate" label={t('diagOptionLesionSinusExudate')} /></SubSection>
                            <SubSection title={t('diagLesionDigestive')} icon={<StomachIcon />}><CheckboxInput name="lesions_digestive" value="hemorrhages_proventriculus" label={t('diagOptionLesionProventriculusHemorrhage')} /><CheckboxInput name="lesions_digestive" value="hemorrhages_intestines" label={t('diagOptionLesionIntestinesHemorrhage')} /><CheckboxInput name="lesions_digestive" value="whitish_spots_small_intestine" label={t('diagOptionLesionIntestinesSpots')} /><CheckboxInput name="lesions_digestive" value="thickened_gut_wall" label={t('diagOptionLesionThickenedGut')} /><CheckboxInput name="lesions_digestive" value="adult_worms_intestines" label={t('diagOptionLesionAdultWorms')} /><CheckboxInput name="lesions_digestive" value="enteritis" label={t('diagOptionLesionEnteritis')} /><CheckboxInput name="lesions_digestive" value="hemorrhagic_ceca_with_cores" label={t('diagOptionLesionCecaHemorrhageCores')} /><CheckboxInput name="lesions_digestive" value="caseous_material_ceca" label={t('diagOptionLesionCecaCaseous')} /><CheckboxInput name="lesions_digestive" value="liver_necrosis" label={t('diagOptionLesionLiverNecrosis')} /><CheckboxInput name="lesions_digestive" value="necrotic_liver" label={t('diagOptionLesionLiverNecroticFC')} /><CheckboxInput name="lesions_digestive" value="hemorrhages_on_liver" label={t('diagOptionLesionLiverHemorrhage')} /><CheckboxInput name="lesions_digestive" value="circular_necrotic_lesions_liver" label={t('diagOptionLesionLiverCircularLesions')} /><CheckboxInput name="lesions_digestive" value="enlarged_liver" label={t('diagOptionLesionLiverEnlarged')} /><CheckboxInput name="lesions_digestive" value="friable_yellow_liver" label={t('diagOptionLesionLiverFriableYellow')} /><CheckboxInput name="lesions_digestive" value="caseous_nodules_liver" label={t('diagOptionLesionLiverNodulesTB')} /><CheckboxInput name="lesions_digestive" value="swollen_liver" label={t('diagOptionLesionLiverSwollen')} /><CheckboxInput name="lesions_digestive" value="enlarged_spleen" label={t('diagOptionLesionSpleenEnlarged')} /><CheckboxInput name="lesions_digestive" value="caseous_nodules_spleen" label={t('diagOptionLesionSpleenNodulesTB')} /><CheckboxInput name="lesions_digestive" value="pancreatic_necrosis" label={t('diagOptionLesionPancreasNecrosis')} /><CheckboxInput name="lesions_digestive" value="esophageal_ulcers" label={t('diagOptionLesionEsophagusUlcers')} /></SubSection>
                            <SubSection title={t('diagLesionImmune')} icon={<HeartbeatIcon />}><CheckboxInput name="lesions_immune" value="hemorrhages_cecal_tonsils" label={t('diagOptionLesionCecalTonsilsHemorrhage')} /><CheckboxInput name="lesions_immune" value="swollen_bursa" label={t('diagOptionLesionBursaSwollen')} /><CheckboxInput name="lesions_immune" value="hemorrhagic_bursa" label={t('diagOptionLesionBursaHemorrhagic')} /><CheckboxInput name="lesions_immune" value="atrophied_bursa" label={t('diagOptionLesionBursaAtrophied')} /><CheckboxInput name="lesions_immune" value="tumors_bursa" label={t('diagOptionLesionBursaTumors')} /><CheckboxInput name="lesions_immune" value="tumors_liver" label={t('diagOptionLesionLiverTumors')} /><CheckboxInput name="lesions_immune" value="tumors_spleen" label={t('diagOptionLesionSpleenTumors')} /></SubSection>
                            <SubSection title={t('diagLesionNervous')} icon={<BrainIcon />}><CheckboxInput name="lesions_nervous" value="neuronal_degeneration" label={t('diagOptionLesionNeuronalDecline')} /><CheckboxInput name="lesions_nervous" value="enlarged_peripheral_nerves" label={t('diagOptionLesionNervesEnlarged')} /></SubSection>
                            <SubSection title={t('diagLesionMusculoskeletal')} icon={<BoneIcon />}><CheckboxInput name="lesions_musculoskeletal" value="muscular_hemorrhages" label={t('diagOptionLesionMuscleHemorrhages')} /><CheckboxInput name="lesions_musculoskeletal" value="caseous_exudate_joints" label={t('diagOptionLesionJointsExudate')} /><CheckboxInput name="lesions_musculoskeletal" value="cloudy_synovial_fluid" label={t('diagOptionLesionJointsCloudyFluid')} /><CheckboxInput name="lesions_musculoskeletal" value="arthritis_purulent_exudate" label={t('diagOptionLesionJointsArthritisPus')} /><CheckboxInput name="lesions_musculoskeletal" value="fluid_filled_tendon_sheaths" label={t('diagOptionLesionTendonFluid')} /><CheckboxInput name="lesions_musculoskeletal" value="caseous_exudate_tendons" label={t('diagOptionLesionTendonExudate')} /><CheckboxInput name="lesions_musculoskeletal" value="ruptured_gastrocnemius_tendon" label={t('diagOptionLesionTendonRupture')} /><CheckboxInput name="lesions_musculoskeletal" value="necrotic_femoral_head" label={t('diagOptionLesionBoneNecroticHead')} /><CheckboxInput name="lesions_musculoskeletal" value="non_vascularized_cartilage_plug" label={t('diagOptionLesionBoneCartilagePlug')} /><CheckboxInput name="lesions_musculoskeletal" value="bone_lesions" label={t('diagOptionLesionBoneLesionsTB')} /><CheckboxInput name="lesions_musculoskeletal" value="osteomyelitis" label={t('diagOptionLesionBoneOsteomyelitis')} /><CheckboxInput name="lesions_musculoskeletal" value="soft_tibial_growth_plate" label={t('diagOptionLesionBoneSoftPlate')} /><CheckboxInput name="lesions_musculoskeletal" value="displaced_tibiotarsal_joint" label={t('diagOptionLesionJointDisplaced')} /></SubSection>
                            <SubSection title={t('diagLesionSystemic')} icon={<HeartbeatIcon />}><CheckboxInput name="lesions_systemic_other" value="edema_head_neck" label={t('diagOptionLesionEdemaHead')} /><CheckboxInput name="lesions_systemic_other" value="hemorrhages_legs" label={t('diagOptionLesionHemorrhagesLegs')} /><CheckboxInput name="lesions_systemic_other" value="hemorrhages_internal_organs" label={t('diagOptionLesionHemorrhagesInternal')} /><CheckboxInput name="lesions_systemic_other" value="blood_in_body_cavities" label={t('diagOptionLesionBloodInCavities')} /><CheckboxInput name="lesions_systemic_other" value="pericarditis" label={t('diagOptionLesionPericarditis')} /><CheckboxInput name="lesions_systemic_other" value="perihepatitis" label={t('diagOptionLesionPerihepatitis')} /><CheckboxInput name="lesions_systemic_other" value="egg_peritonitis" label={t('diagOptionLesionEggPeritonitis')} /><CheckboxInput name="lesions_systemic_other" value="oviduct_damage" label={t('diagOptionLesionOviductDamage')} /><CheckboxInput name="lesions_systemic_other" value="oviduct_inflammation" label={t('diagOptionLesionOviductInflammation')} /><CheckboxInput name="lesions_systemic_other" value="egg_stuck_in_oviduct_cloaca" label={t('diagOptionLesionEggStuck')} /><CheckboxInput name="lesions_systemic_other" value="white_plaques_cloaca" label={t('diagOptionLesionCloacaPlaques')} /><CheckboxInput name="lesions_systemic_other" value="congested_organs" label={t('diagOptionLesionOrgansCongested')} /><CheckboxInput name="lesions_systemic_other" value="blood_clots_abdominal_cavity" label={t('diagOptionLesionAbdomenClots')} /><CheckboxInput name="lesions_systemic_other" value="skin_irritation" label={t('diagOptionLesionSkinIrritation')} /></SubSection>
                        </Section>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" disabled={isLoading} className="w-full sm:w-auto flex-grow px-8 py-3 bg-[#2c7d6c] text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0">
                            {isLoading ? t('diagLoadingAnalyzing') : t('diagButtonSubmit')}
                        </button>
                        <button type="reset" className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
                            {t('diagButtonReset')}
                        </button>
                    </div>
                </form>
                
                <div ref={resultsRef} className="mt-16">
                    {isLoading && (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2c7d6c] mx-auto"></div>
                            <p className="mt-4 text-gray-600">{t('diagLoadingCalculating')}</p>
                        </div>
                    )}
                    {error && <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>}
                    {results && (
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold font-manrope text-center mb-6">{t('diagResultsTitle')}</h2>
                            {results.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.map(r => <ResultCard key={r.disease.id} result={r} />)}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white rounded-lg shadow-md border border-gray-200/80">
                                    <p className="text-gray-500">{t('diagNoResults')}</p>
                                    <p className="text-sm text-gray-400 mt-2">{t('diagNoResultsSub')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SymptomCheckerPage;
