import React, { useState, useMemo, useRef, useEffect } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowLeftIcon, XIcon, FilterIcon } from '../components/Icons';
import FilterDropdown from '../components/FilterDropdown';
// Import the new lesion data and its type
import { LESIONS, type LesionItem } from '../data/vislibcont';
import { useLanguage } from '../contexts/LanguageContext';

// Modal component for displaying a larger view of the lesion
const LesionModal: React.FC<{ lesion: LesionItem; onClose: () => void }> = ({ lesion, onClose }) => {
    const { t } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside the modal content
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fadeIn" role="dialog" aria-modal="true">
            <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-slideInUp">
                {/* CHANGE: Replaced the fixed aspect-ratio div with a more flexible image container to prevent distortion. */}
                <div className="p-4 bg-gray-100 rounded-t-lg flex-shrink-0 flex justify-center">
                    <img src={lesion.image} alt={lesion.lesion} className="max-w-full max-h-[60vh] object-contain" />
                </div>
                <div className="p-6 overflow-y-auto">
                    <h3 className="text-lg font-bold font-manrope text-gray-800 mb-4">{lesion.lesion}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-semibold text-gray-500">{t('lesion_placeholder_organ')}</p>
                            <p className="text-gray-800">{lesion.organ}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-500">{t('lesion_placeholder_species')}</p>
                            <p className="text-gray-800">{lesion.species}</p>
                        </div>
                         <div className="col-span-2">
                            <p className="font-semibold text-gray-500">{t('lesion_placeholder_suspicion')}</p>
                            <p className="text-gray-800">{lesion.suspicion}</p>
                        </div>
                    </div>
                </div>
                 <button onClick={onClose} aria-label="Close modal" className="absolute top-3 right-3 p-2 rounded-full text-gray-500 bg-white/50 hover:bg-gray-200 hover:text-gray-800 transition-colors z-10">
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};


const LesionCard: React.FC<{ lesion: LesionItem; onClick: () => void }> = ({ lesion, onClick }) => {
    const { t } = useLanguage();
    return (
        <div onClick={onClick} className="bg-white rounded-lg shadow-sm border border-gray-200/80 overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md">
            <div className="w-full aspect-square bg-gray-200">
                <img src={lesion.image} alt={lesion.lesion} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-4 space-y-2 text-sm">
                <p title={lesion.organ}>⚕️ <span className="font-semibold">{t('lesion_placeholder_organ')}:</span> <span className="text-gray-600 truncate">{lesion.organ}</span></p>
                <p title={lesion.lesion}>🔴 <span className="font-semibold">{t('lesion_placeholder_lesion')}:</span> <span className="text-gray-600 truncate">{lesion.lesion}</span></p>
                <p title={lesion.species}>🐔 <span className="font-semibold">{t('lesion_placeholder_species')}:</span> <span className="text-gray-600 truncate">{lesion.species}</span></p>
                <p title={lesion.suspicion}>🧪 <span className="font-semibold">{t('lesion_placeholder_suspicion')}:</span> <span className="text-gray-600 truncate">{lesion.suspicion}</span></p>
            </div>
        </div>
    );
};

const LesionSystemPage: React.FC = () => {
    const { systemId } = ReactRouterDOM.useParams<{ systemId: string }>();
    const { t } = useLanguage();
    const [selectedLesion, setSelectedLesion] = useState<LesionItem | null>(null);

    const systemCategories = useMemo(() => [
        { name: t('vl_respiratory'), slug: 'respiratory' },
        { name: t('vl_digestive'), slug: 'digestive' },
        { name: t('vl_reproductive'), slug: 'reproductive' },
        { name: t('vl_immune'), slug: 'immune-lymphoid' },
        { name: t('vl_musculoskeletal'), slug: 'musculoskeletal' },
        { name: t('vl_systemic'), slug: 'systemic-nervous' },
        { name: t('vl_integumentary'), slug: 'integumentary-skin' },
    ], [t]);

    const system = systemCategories.find(s => s.slug === systemId);
    const title = system ? `${system.name} ${t('lesion_page_lesionsTitleSuffix')}` : t('lesion_page_lesionsTitleSuffix');

    const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);
    const [selectedLesionTypes, setSelectedLesionTypes] = useState<string[]>([]);
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [selectedSuspicions, setSelectedSuspicions] = useState<string[]>([]);

    // Filter lesions based on the current system from the URL
    const systemLesions = useMemo(() => 
        LESIONS.filter(lesion => lesion.system === systemId),
    [systemId]);

    // Dynamically generate filter options from the available lesion data
    const filterOptions = useMemo(() => {
        const getUniqueValues = (key: keyof LesionItem) => [...new Set(systemLesions.map(l => l[key]))].sort();
        
        const organs = getUniqueValues('organ');
        const species = getUniqueValues('species');
        const suspicions = getUniqueValues('suspicion').filter(s => s.toLowerCase() !== 'n/a');

        // Extract keywords from lesion descriptions for a more user-friendly filter
        const lesionKeywords = ['necrosis', 'hemorrhage', 'congestion', 'edema', 'inflammation', 'nodules', 'petechiae', 'arthritis', 'bursitis', 'cyanotic', 'edema', 'pale', 'fibrinous', 'osteodystrophy', 'tracheitis', 'pneumonia', 'hepatitis', 'splenomegaly'];
        const lesionTypes = [...new Set(
            systemLesions.flatMap(l => {
                const found = lesionKeywords.filter(keyword => l.lesion.toLowerCase().includes(keyword));
                return found.map(k => k.charAt(0).toUpperCase() + k.slice(1)); // Capitalize
            })
        )].sort();

        return { organs, lesionTypes, species, suspicions };
    }, [systemLesions]);

    // Filter lesions based on user selections
    const filteredLesions = useMemo(() => {
        return systemLesions.filter(lesion => {
            const organMatch = selectedOrgans.length === 0 || selectedOrgans.includes(lesion.organ);
            const speciesMatch = selectedSpecies.length === 0 || selectedSpecies.includes(lesion.species);
            const suspicionMatch = selectedSuspicions.length === 0 || selectedSuspicions.includes(lesion.suspicion);
            const lesionTypeMatch = selectedLesionTypes.length === 0 || selectedLesionTypes.some(type => lesion.lesion.toLowerCase().includes(type.toLowerCase()));
            
            return organMatch && speciesMatch && suspicionMatch && lesionTypeMatch;
        });
    }, [systemLesions, selectedOrgans, selectedLesionTypes, selectedSpecies, selectedSuspicions]);

    const clearFilters = () => {
        setSelectedOrgans([]);
        setSelectedLesionTypes([]);
        setSelectedSpecies([]);
        setSelectedSuspicions([]);
    };

    const isAnyFilterActive = selectedOrgans.length > 0 ||
                              selectedLesionTypes.length > 0 ||
                              selectedSpecies.length > 0 ||
                              selectedSuspicions.length > 0;

    return (
        <div className="py-12 md:py-16 bg-[#f5fbf8] animate-fadeIn">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <ReactRouterDOM.Link to="/visual-library" className="flex items-center text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        {t('lesion_page_backLink')}
                    </ReactRouterDOM.Link>
                </div>

                <header className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold font-manrope text-gray-800">{title}</h1>
                    <p className="text-base text-gray-500 mt-1">
                        <ReactRouterDOM.Link to="/visual-library" className="text-blue-600 hover:underline">{t('lesion_page_breadcrumb_vl')}</ReactRouterDOM.Link> &gt; {system?.name || 'System'}
                    </p>
                </header>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FilterDropdown title={t('lesion_page_filter_organ')} options={filterOptions.organs} selectedOptions={selectedOrgans} onChange={setSelectedOrgans} searchable />
                        <FilterDropdown title={t('lesion_page_filter_lesion')} options={filterOptions.lesionTypes} selectedOptions={selectedLesionTypes} onChange={setSelectedLesionTypes} searchable />
                        <FilterDropdown title={t('lesion_page_filter_species')} options={filterOptions.species} selectedOptions={selectedSpecies} onChange={setSelectedSpecies} />
                        <FilterDropdown title={t('lesion_page_filter_suspicion')} options={filterOptions.suspicions} selectedOptions={selectedSuspicions} onChange={setSelectedSuspicions} searchable />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 flex items-center">
                            <FilterIcon className="w-4 h-4 mr-2"/>
                            {t('Showing')} {filteredLesions.length} {t(' lesions of')} {systemLesions.length}
                        </div>
                        {isAnyFilterActive && (
                           <button onClick={clearFilters} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold">
                               <XIcon className="w-4 h-4 mr-1" />
                               {t('lesion_page_clearFilters')}
                           </button>
                        )}
                    </div>
                </div>

                {/* CHANGE: Removed `lg:grid-cols-4` to ensure a maximum of 3 columns, fixing the layout bug. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredLesions.length > 0 ? (
                        filteredLesions.map((lesion) => (
                            <LesionCard key={lesion.id} lesion={lesion} onClick={() => setSelectedLesion(lesion)} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">{t('db_noResults')}</p>
                        </div>
                    )}
                </div>

                {selectedLesion && (
                    <LesionModal lesion={selectedLesion} onClose={() => setSelectedLesion(null)} />
                )}
            </div>
        </div>
    );
};

export default LesionSystemPage;