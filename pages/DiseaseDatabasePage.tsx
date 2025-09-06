
import React, { useState, useMemo, useEffect, useRef } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { DISEASES_DATA } from '../constants';
import type { Disease, UrgencyLevel, ZoonoticRiskLevel, Etiology } from '../types';
import { SearchIcon, ChevronDownIcon, FilterIcon, XIcon } from '../components/Icons';
import { UrgencyBadge, EtiologyBadge, ZoonoticStatusBadge, NotifiableBadge } from '../components/Badges';
import FilterDropdown from '../components/FilterDropdown';
import { useLanguage } from '../contexts/LanguageContext';

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <h4 className="font-semibold text-sm mb-1 text-gray-600">{label}:</h4>
        <div className="text-sm text-gray-800">{children}</div>
    </div>
);

const DiseaseCard: React.FC<{ disease: Disease }> = ({ disease }) => {
  const { t, language } = useLanguage();
  return (
    <ReactRouterDOM.Link to={`/disease-database/${disease.id}`} className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200/80 flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{language === 'fr' ? disease.name_fr : disease.name}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <UrgencyBadge level={disease.urgency} />
          <EtiologyBadge etiology={disease.etiology} />
          <ZoonoticStatusBadge level={disease.zoonoticRisk} />
          {disease.isNotifiableInMorocco && <NotifiableBadge />}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-3 italic">{disease.scientificName}</p>
      <p className="text-gray-600 mb-4 text-sm flex-grow">{language === 'fr' ? disease.description_fr : disease.description}</p>

      <div className="space-y-4">
        <DetailItem label={t('db_cardSpecies')}>
          <div className="flex flex-wrap gap-1">
            {(language === 'fr' ? disease.speciesAffected_fr : disease.speciesAffected).map(species => (
              <span key={species} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{species}</span>
            ))}
          </div>
        </DetailItem>
        <DetailItem label={t('db_cardSymptoms')}>
          <p>{(language === 'fr' ? disease.symptoms_fr : disease.symptoms).slice(0, 3).join(', ')}{(language === 'fr' ? disease.symptoms_fr : disease.symptoms).length > 3 ? '...' : ''}</p>
        </DetailItem>
         <DetailItem label={t('db_cardSystems')}>
           <div className="flex flex-wrap gap-1">
            {(language === 'fr' ? disease.bodySystemAffected_fr : disease.bodySystemAffected).map(system => (
              <span key={system} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{system}</span>
            ))}
          </div>
         </DetailItem>
        {disease.moroccoNote && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <p className="text-xs text-yellow-800"><span className="font-bold">{t('db_cardMoroccoNote')}:</span> {language === 'fr' ? disease.moroccoNote_fr : disease.moroccoNote}</p>
          </div>
        )}
      </div>
       <div className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100 text-right">
          {t('dd_lastReviewed')}: {disease.lastReviewed}
      </div>
    </ReactRouterDOM.Link>
  );
};

const DiseaseDatabasePage: React.FC = () => {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
    const [selectedUrgencies, setSelectedUrgencies] = useState<string[]>([]);
    const [selectedZoonoticRisks, setSelectedZoonoticRisks] = useState<string[]>([]);
    const [selectedEtiologies, setSelectedEtiologies] = useState<Etiology[]>([]);
    const [selectedNotifiableStatus, setSelectedNotifiableStatus] = useState<string[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [selectedLesions, setSelectedLesions] = useState<string[]>([]);

    const [filteredDiseases, setFilteredDiseases] = useState<Disease[]>(DISEASES_DATA);

    const filterOptions = useMemo(() => {
        const uniqueValues = (key_en: keyof Disease, key_fr: keyof Disease) => {
            const values = DISEASES_DATA.flatMap(d => (language === 'fr' ? d[key_fr] : d[key_en]) as string[]);
            return [...new Set(values)].sort();
        };

        const species = uniqueValues('speciesAffected', 'speciesAffected_fr');
        const systems = uniqueValues('bodySystemAffected', 'bodySystemAffected_fr');
        const urgencies = [t('db_urgencyHigh'), t('db_urgencyMedium'), t('db_urgencyLow')];
        const zoonoticRisks = [t('db_zoonoticHigh'), t('db_zoonoticModerate'), t('db_zoonoticLow')];
        const etiologies: readonly Etiology[] = ['Viral', 'Bacterial', 'Parasitic', 'Fungal', 'Other'];
        const notifiableStatus = [t('db_notifiableOnly')];
        
        const negationPattern = /^(no |absence of|pas de |absence d')/i;

        const processAndSplit = (items: string[]): string[] => {
            const allParts = items.flatMap(item => 
                item.split(/,\s*(?![^()]*\))/)
            ).map(part => part.trim());
    
            return [...new Set(allParts)]
                .filter(part => part && !negationPattern.test(part));
        };
        
        const symptoms_en = processAndSplit(DISEASES_DATA.flatMap(d => d.symptoms));
        const symptoms_fr = processAndSplit(DISEASES_DATA.flatMap(d => d.symptoms_fr));
        const symptoms = [...new Set([...symptoms_en, ...symptoms_fr])].sort();

        const lesions_en = processAndSplit(DISEASES_DATA.flatMap(d => d.lesionsAtNecropsy));
        const lesions_fr = processAndSplit(DISEASES_DATA.flatMap(d => d.lesionsAtNecropsy_fr));
        const lesions = [...new Set([...lesions_en, ...lesions_fr])].sort();


        return { species, systems, urgencies, zoonoticRisks, etiologies, notifiableStatus, symptoms, lesions };
    }, [t, language]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSpecies([]);
        setSelectedSystems([]);
        setSelectedUrgencies([]);
        setSelectedZoonoticRisks([]);
        setSelectedEtiologies([]);
        setSelectedNotifiableStatus([]);
        setSelectedSymptoms([]);
        setSelectedLesions([]);
    };
    
    const isAnyFilterActive = [
      searchTerm, 
      ...selectedSpecies, 
      ...selectedSystems, 
      ...selectedUrgencies, 
      ...selectedZoonoticRisks,
      ...selectedEtiologies,
      ...selectedNotifiableStatus, 
      ...selectedSymptoms, 
      ...selectedLesions
    ].some(f => f);

    useEffect(() => {
        let results = DISEASES_DATA;
        const lowercasedTerm = searchTerm.toLowerCase();

        if (lowercasedTerm) {
            results = results.filter(d =>
                d.name.toLowerCase().includes(lowercasedTerm) ||
                d.name_fr.toLowerCase().includes(lowercasedTerm) ||
                d.scientificName.toLowerCase().includes(lowercasedTerm) ||
                d.aliases.some(a => a.toLowerCase().includes(lowercasedTerm)) ||
                d.aliases_fr.some(a => a.toLowerCase().includes(lowercasedTerm)) ||
                d.description.toLowerCase().includes(lowercasedTerm) ||
                d.description_fr.toLowerCase().includes(lowercasedTerm)
            );
        }

        if (selectedSpecies.length > 0) {
            results = results.filter(d => 
                d.speciesAffected.some(s => selectedSpecies.includes(s)) ||
                d.speciesAffected_fr.some(s => selectedSpecies.includes(s))
            );
        }
        
        if (selectedSystems.length > 0) {
            results = results.filter(d => 
                d.bodySystemAffected.some(s => selectedSystems.includes(s)) ||
                d.bodySystemAffected_fr.some(s => selectedSystems.includes(s))
            );
        }

        if (selectedUrgencies.length > 0) {
            const urgencyMap: { [key: string]: UrgencyLevel } = {
                [t('db_urgencyHigh')]: 'HIGH',
                [t('db_urgencyMedium')]: 'MEDIUM',
                [t('db_urgencyLow')]: 'LOW'
            };
            const selectedUrgencyValues = selectedUrgencies.map(label => urgencyMap[label]);
            results = results.filter(d => selectedUrgencyValues.includes(d.urgency));
        }

        if (selectedZoonoticRisks.length > 0) {
            const riskMap = {
                [t('db_zoonoticHigh')]: (d: Disease) => d.zoonoticRisk === 'HIGH',
                [t('db_zoonoticModerate')]: (d: Disease) => d.zoonoticRisk === 'MODERATE',
                [t('db_zoonoticLow')]: (d: Disease) => !d.zoonoticRisk || d.zoonoticRisk === 'LOW',
            };
            results = results.filter(d => selectedZoonoticRisks.some(risk => riskMap[risk] ? riskMap[risk](d) : false));
        }
        
        if (selectedEtiologies.length > 0) {
            results = results.filter(d => selectedEtiologies.includes(d.etiology));
        }

        if (selectedNotifiableStatus.includes(t('db_notifiableOnly'))) {
            results = results.filter(d => d.isNotifiableInMorocco);
        }

        const splitAndTrim = (item: string) => item.split(/,\s*(?![^()]*\))/).map(p => p.trim());

        if (selectedSymptoms.length > 0) {
            results = results.filter(d => {
                const allSymptoms = [...d.symptoms.flatMap(splitAndTrim), ...d.symptoms_fr.flatMap(splitAndTrim)];
                return allSymptoms.some(symptomPart => selectedSymptoms.includes(symptomPart));
            });
        }

        if (selectedLesions.length > 0) {
            results = results.filter(d => {
                const allLesions = [...d.lesionsAtNecropsy.flatMap(splitAndTrim), ...d.lesionsAtNecropsy_fr.flatMap(splitAndTrim)];
                return allLesions.some(lesionPart => selectedLesions.includes(lesionPart));
            });
        }
        
        setFilteredDiseases(results);
    }, [searchTerm, selectedSpecies, selectedSystems, selectedUrgencies, selectedZoonoticRisks, selectedEtiologies, selectedNotifiableStatus, selectedSymptoms, selectedLesions, t, language]);

    return (
        <div className="py-12 md:py-16 animate-fadeIn">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('db_pageTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('db_pageSubtitle')}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
                    <div className="relative col-span-1 sm:col-span-2 lg:col-span-4 mb-4">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('db_searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-green-50 border border-green-200 text-gray-800 placeholder-gray-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8A9B6C]/50 focus:border-[#8A9B6C]"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FilterDropdown title={t('db_filterSpecies')} options={filterOptions.species} selectedOptions={selectedSpecies} onChange={setSelectedSpecies} />
                        <FilterDropdown title={t('db_filterSystem')} options={filterOptions.systems} selectedOptions={selectedSystems} onChange={setSelectedSystems} />
                        <FilterDropdown title={t('db_filterUrgency')} options={filterOptions.urgencies} selectedOptions={selectedUrgencies} onChange={setSelectedUrgencies} />
                        <FilterDropdown title={t('db_filterEtiology')} options={filterOptions.etiologies} selectedOptions={selectedEtiologies} onChange={setSelectedEtiologies} />
                        <FilterDropdown title={t('db_filterZoonotic')} options={filterOptions.zoonoticRisks} selectedOptions={selectedZoonoticRisks} onChange={setSelectedZoonoticRisks} />
                        <FilterDropdown title={t('db_filterNotifiable')} options={filterOptions.notifiableStatus} selectedOptions={selectedNotifiableStatus} onChange={setSelectedNotifiableStatus} />
                        <FilterDropdown title={t('db_filterSymptoms')} options={filterOptions.symptoms} selectedOptions={selectedSymptoms} onChange={setSelectedSymptoms} searchable />
                        <FilterDropdown title={t('db_filterLesions')} options={filterOptions.lesions} selectedOptions={selectedLesions} onChange={setSelectedLesions} searchable />
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 flex items-center">
                            <FilterIcon className="w-4 h-4 mr-2"/>
                            {t('db_resultsShowing')} {filteredDiseases.length} {t('db_resultsOf')} {DISEASES_DATA.length} {t('db_resultsDiseases')}
                        </div>
                        {isAnyFilterActive && (
                           <button onClick={clearFilters} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold">
                               <XIcon className="w-4 h-4 mr-1" />
                               {t('db_clearFilters')}
                           </button>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease) => (
                            <DiseaseCard key={disease.id} disease={disease} />
                        ))
                    ) : (
                        <div className="md:col-span-2 text-center py-12">
                            <p className="text-gray-500">{t('db_noResults')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiseaseDatabasePage;
