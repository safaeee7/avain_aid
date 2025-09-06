
import React, { useState, useMemo } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { BREEDS_DATA } from '../breedsData';
import type { Breed, Species, BreedPurpose, FaoStatus } from '../types';
import { SearchIcon, XIcon, FilterIcon, MapPinIcon } from '../components/Icons';
import FilterDropdown from '../components/FilterDropdown';

// Define colors for species tags
const speciesConfig: { [key in Species]: { color: string; textColor: string } } = {
    Chicken: { color: 'bg-orange-100', textColor: 'text-orange-800' },
    Duck: { color: 'bg-blue-100', textColor: 'text-blue-800' },
    Turkey: { color: 'bg-red-100', textColor: 'text-red-800' },
    Goose: { color: 'bg-gray-200', textColor: 'text-gray-800' },
};

const purposeConfig: { [key in BreedPurpose]: string } = {
    'Egg': 'bg-sky-100 text-sky-800',
    'Meat': 'bg-red-100 text-red-800',
    'Dual-Purpose': 'bg-purple-100 text-purple-800',
    'Ornamental': 'bg-pink-100 text-pink-800',
    'Guard': 'bg-gray-200 text-gray-800',
};

const faoStatusConfig: { [key in FaoStatus]: string } = {
    'Not at risk': 'bg-green-100 text-green-800',
    'Vulnerable': 'bg-yellow-100 text-yellow-800',
    'Endangered': 'bg-orange-100 text-orange-800',
    'Critical': 'bg-red-100 text-red-800',
    'Unknown': 'bg-gray-100 text-gray-800',
};

const BreedCard: React.FC<{ breed: Breed }> = ({ breed }) => {
    const { color, textColor } = speciesConfig[breed.species];

    return (
        <ReactRouterDOM.Link to={`/breeds/${breed.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200/80 flex flex-col overflow-hidden">
            <div className="aspect-square w-full bg-gray-100">
                <img
                    src={breed.imageUrl}
                    alt={`${breed.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{breed.name}</h3>
                        {breed.alternateNames && (
                            <p className="text-sm text-gray-500 italic">{breed.alternateNames.join(', ')}</p>
                        )}
                    </div>
                    <span className={`px-2.5 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${color} ${textColor}`}>
                        {breed.species}
                    </span>
                </div>

                <div className="flex-grow space-y-3 mt-auto pt-3 border-t border-gray-100">
                    <div>
                        <h4 className="font-semibold text-xs text-gray-500 mb-1">Purpose</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${purposeConfig[breed.purpose]}`}>
                            {breed.purpose}
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-500 mb-1">FAO/WOAH Status</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${faoStatusConfig[breed.faoStatus]}`}>
                            {breed.faoStatus}
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-500 mb-1">Origin</h4>
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap bg-gray-100 text-gray-700">
                            <MapPinIcon className="w-3 h-3" />
                            {breed.origin}
                        </span>
                    </div>
                </div>
            </div>
        </ReactRouterDOM.Link>
    );
};

const BreedsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);
    const [selectedPurposes, setSelectedPurposes] = useState<BreedPurpose[]>([]);
    const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
    const [selectedFaoStatuses, setSelectedFaoStatuses] = useState<FaoStatus[]>([]);
    const [selectedEggColors, setSelectedEggColors] = useState<string[]>([]);
    const [selectedMoroccoSuitability, setSelectedMoroccoSuitability] = useState<string[]>([]);

    const filterOptions = useMemo(() => {
        const allPurposes: readonly BreedPurpose[] = ['Egg', 'Meat', 'Dual-Purpose', 'Ornamental', 'Guard'];
        const allOrigins = [...new Set(BREEDS_DATA.map(b => b.origin))].sort();
        const allFaoStatuses: readonly FaoStatus[] = ['Not at risk', 'Vulnerable', 'Endangered', 'Critical', 'Unknown'];
        const allEggColors = [...new Set(BREEDS_DATA.map(b => b.eggColor))].filter(c => c && c !== 'N/A').sort();
        const allMoroccoSuitability: readonly string[] = ['Yes', 'No', 'Conditional'];
        return { allPurposes, allOrigins, allFaoStatuses, allEggColors, allMoroccoSuitability };
    }, []);

    const filteredBreeds = useMemo(() => {
        return BREEDS_DATA.filter(breed => {
            const searchTermMatch =
                breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (breed.alternateNames && breed.alternateNames.some(alt => alt.toLowerCase().includes(searchTerm.toLowerCase())));

            const speciesMatch = selectedSpecies.length === 0 || selectedSpecies.includes(breed.species);
            const purposeMatch = selectedPurposes.length === 0 || selectedPurposes.includes(breed.purpose);
            const originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(breed.origin);
            const faoStatusMatch = selectedFaoStatuses.length === 0 || selectedFaoStatuses.includes(breed.faoStatus);
            const eggColorMatch = selectedEggColors.length === 0 || selectedEggColors.includes(breed.eggColor);
            const moroccoSuitabilityMatch = selectedMoroccoSuitability.length === 0 || selectedMoroccoSuitability.includes(breed.suitableForMorocco);

            return searchTermMatch && speciesMatch && purposeMatch && originMatch && faoStatusMatch && eggColorMatch && moroccoSuitabilityMatch;
        });
    }, [searchTerm, selectedSpecies, selectedPurposes, selectedOrigins, selectedFaoStatuses, selectedEggColors, selectedMoroccoSuitability]);

    const handleSpeciesToggle = (species: Species) => {
        setSelectedSpecies(prev =>
            prev.includes(species) ? prev.filter(s => s !== species) : [...prev, species]
        );
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSpecies([]);
        setSelectedPurposes([]);
        setSelectedOrigins([]);
        setSelectedFaoStatuses([]);
        setSelectedEggColors([]);
        setSelectedMoroccoSuitability([]);
    };

    const isAnyFilterActive = searchTerm || 
                                selectedSpecies.length > 0 || 
                                selectedPurposes.length > 0 ||
                                selectedOrigins.length > 0 ||
                                selectedFaoStatuses.length > 0 ||
                                selectedEggColors.length > 0 ||
                                selectedMoroccoSuitability.length > 0;

    return (
        <div className="py-12 md:py-16 animate-fadeIn">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">Poultry Breed Catalog</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore a diverse range of poultry breeds. Filter by species and purpose to find the perfect breed for your needs.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
                    <div className="relative w-full mb-4">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search breeds by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-green-50 border border-green-200 text-gray-800 placeholder-gray-500 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#8A9B6C]/50 focus:border-[#8A9B6C]"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <FilterDropdown title="Purpose" options={filterOptions.allPurposes} selectedOptions={selectedPurposes} onChange={setSelectedPurposes} />
                        <FilterDropdown title="Origin" options={filterOptions.allOrigins} selectedOptions={selectedOrigins} onChange={setSelectedOrigins} searchable />
                        <FilterDropdown title="FAO Status" options={filterOptions.allFaoStatuses} selectedOptions={selectedFaoStatuses} onChange={setSelectedFaoStatuses} />
                        <FilterDropdown title="Egg Color" options={filterOptions.allEggColors} selectedOptions={selectedEggColors} onChange={setSelectedEggColors} />
                        <FilterDropdown title="Morocco Suitability" options={filterOptions.allMoroccoSuitability} selectedOptions={selectedMoroccoSuitability} onChange={setSelectedMoroccoSuitability} />
                    </div>

                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Filter by Species</h3>
                        <div className="flex flex-wrap gap-3">
                            {(Object.keys(speciesConfig) as Species[]).map(species => {
                                const { color, textColor } = speciesConfig[species];
                                const isSelected = selectedSpecies.includes(species);
                                return (
                                    <button
                                        key={species}
                                        onClick={() => handleSpeciesToggle(species)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                                            isSelected ? `${color} ${textColor}` : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {species}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 flex items-center">
                            <FilterIcon className="w-4 h-4 mr-2"/>
                            Showing {filteredBreeds.length} of {BREEDS_DATA.length} breeds
                        </div>
                        {isAnyFilterActive && (
                           <button onClick={clearFilters} className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-semibold">
                               <XIcon className="w-4 h-4 mr-1" />
                               Clear All Filters
                           </button>
                        )}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBreeds.length > 0 ? (
                        filteredBreeds.map((breed) => (
                            <BreedCard key={breed.id} breed={breed} />
                        ))
                    ) : (
                        <div className="sm:col-span-2 lg:col-span-3 xl:grid-cols-4 text-center py-12">
                            <p className="text-gray-500">No breeds found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BreedsPage;
