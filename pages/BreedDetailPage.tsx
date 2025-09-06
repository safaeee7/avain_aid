
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { BREEDS_DATA } from '../breedsData';
import { 
    ArrowLeftIcon, 
    FeatherIcon, 
    ScaleIcon, 
    EggIcon, 
    SmileIcon, 
    ThermometerIcon, 
    FirstAidIcon, 
    DnaIcon, 
    MapIcon, 
    BookOpenIcon,
    GlobeIcon,
    CheckCircleIcon
} from '../components/Icons';

const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className = '' }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
        value = 'N/A';
    }
    return (
        <div className={`py-2 ${className}`}>
            <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</dt>
            <dd className="mt-1 text-sm text-gray-800">{value}</dd>
        </div>
    );
};

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
        <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-[#8A9B6C] flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-lg font-bold font-manrope text-gray-800">{title}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4">{children}</div>
    </div>
);


const BreedDetailPage: React.FC = () => {
    const { breedId } = ReactRouterDOM.useParams<{ breedId: string }>();
    const breed = BREEDS_DATA.find(b => b.id.toString() === breedId);

    if (!breed) {
        return (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Breed Not Found</h1>
            <p className="text-gray-600 mt-2">The requested breed could not be found in our database.</p>
            <ReactRouterDOM.Link to="/breeds" className="mt-6 inline-block px-6 py-2 bg-[#8A9B6C] text-white font-semibold rounded-lg hover:bg-green-700">
              Back to Breed Catalog
            </ReactRouterDOM.Link>
          </div>
        );
    }

    const imageSource = breed.references.find(ref => ref.text.toLowerCase().includes('image source'));

    const renderBoolean = (value: boolean) => value ? 'Yes' : 'No';
    const renderArray = (arr: string[]) => arr.length > 0 ? arr.join(', ') : 'N/A';

    return (
        <div className="py-12 md:py-16 animate-fadeIn">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-8">
                    <ReactRouterDOM.Link to="/breeds" className="flex items-center text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back to Breed Catalog
                    </ReactRouterDOM.Link>
                </div>
                
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{breed.name}</h1>
                    {breed.alternateNames && breed.alternateNames.length > 0 && <p className="text-md text-gray-500 mt-1 italic">Also known as: {breed.alternateNames.join(', ')}</p>}
                </header>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start mt-4">
                    <div className="lg:col-span-1 sticky top-24">
                        <img src={breed.imageUrl} alt={`${breed.name}`} className="w-full rounded-lg shadow-lg border-4 border-white" />
                        {imageSource && (
                            <div className="text-right text-xs text-gray-500 mt-2 pr-2">
                                Source: <a href={imageSource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{imageSource.text.replace('Image Source: ', '')}</a>
                            </div>
                        )}
                         <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
                             <h3 className="text-lg font-bold font-manrope text-gray-800 mb-3">Key Info</h3>
                            <div className="grid grid-cols-2 gap-x-4">
                               <DetailItem label="Species" value={breed.species} />
                               <DetailItem label="Primary Purpose" value={breed.purpose} />
                               <DetailItem label="Origin" value={breed.origin} />
                               <DetailItem label="FAO/WOAH Status" value={breed.faoStatus} />
                               <DetailItem label="Type" value={breed.hybridOrPurebred} className="col-span-2" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <SectionCard title="Physical Characteristics" icon={<FeatherIcon className="w-5 h-5" />}>
                            <DetailItem label="Weight (Male)" value={breed.weight.male} />
                            <DetailItem label="Weight (Female)" value={breed.weight.female} />
                            <DetailItem label="Comb Type" value={breed.combType} />
                            <DetailItem label="Skin Color" value={breed.skinColor} />
                            <DetailItem label="Shank Color" value={breed.shankColor} />
                            <DetailItem label="Leg Feathering" value={renderBoolean(breed.legFeathering)} />
                            <DetailItem label="Plumage" value={breed.plumageColor} className="col-span-full"/>
                            <DetailItem label="Special Features" value={renderArray(breed.specialFeatures)} className="col-span-full"/>
                        </SectionCard>
                        
                        <SectionCard title="Production Traits" icon={<EggIcon className="w-5 h-5" />}>
                            <DetailItem label="Egg Production" value={`${breed.eggProduction} / year`} />
                            <DetailItem label="Age at First Egg" value={breed.ageAtFirstEgg} />
                            <DetailItem label="Egg Color" value={breed.eggColor} />
                            <DetailItem label="Egg Size" value={breed.eggSize} />
                            <DetailItem label="Growth Rate" value={breed.growthRate} />
                            <DetailItem label="Broodiness" value={breed.broodiness} />
                            <DetailItem label="Meat Quality" value={breed.meatQuality} className="col-span-full"/>
                        </SectionCard>

                        <SectionCard title="Behavior & Temperament" icon={<SmileIcon className="w-5 h-5" />}>
                            <DetailItem label="Temperament" value={renderArray(breed.temperament)} className="col-span-full"/>
                            <DetailItem label="Noise Level" value={breed.noiseLevel} />
                            <DetailItem label="Flight Ability" value={breed.flightAbility} />
                            <DetailItem label="Foraging Ability" value={breed.foragingAbility} />
                            <DetailItem label="Cold Hardiness" value={breed.coldHardiness} />
                            <DetailItem label="Heat Tolerance" value={breed.heatTolerance} />
                            <DetailItem label="Space Needs" value={breed.spaceNeeds} />
                        </SectionCard>

                         <SectionCard title="Health & Management" icon={<FirstAidIcon className="w-5 h-5" />}>
                            <DetailItem label="Ease of Care" value={breed.easeOfCare} />
                            <DetailItem label="Lifespan" value={breed.lifespan} />
                            <DetailItem label="Maturity Age" value={breed.maturityAge} />
                            <DetailItem label="Water Needs" value={breed.waterNeeds} />
                            <DetailItem label="Common Health Issues" value={renderArray(breed.commonHealthIssues)} className="col-span-full"/>
                            <DetailItem label="Shelter Needs" value={breed.shelterNeeds} className="col-span-full"/>
                        </SectionCard>

                        <SectionCard title="Breeding & Reproduction" icon={<DnaIcon className="w-5 h-5" />}>
                            <DetailItem label="Bred Naturally" value={renderBoolean(breed.canBeBredNaturally)} />
                            <DetailItem label="Autosexing" value={renderBoolean(breed.autosexing)} />
                            <DetailItem label="Fertility Rate" value={breed.fertilityRate} />
                            <DetailItem label="Hatchability" value={breed.hatchability} />
                            <DetailItem label="Clutch Size" value={breed.clutchSize} />
                        </SectionCard>
                        
                        <SectionCard title="Regional Suitability" icon={<MapIcon className="w-5 h-5" />}>
                            <DetailItem label="Suitable for Morocco" value={breed.suitableForMorocco} />
                            <DetailItem label="Best Climate" value={renderArray(breed.bestClimate)} className="col-span-2"/>
                            <DetailItem label="Use in Morocco" value={renderArray(breed.useInMorocco)} className="col-span-full"/>
                            <DetailItem label="Adaptability to Small Farms" value={breed.adaptabilityToSmallFarms} />
                            <DetailItem label="Predator Awareness" value={breed.predatorAwareness} />
                            <DetailItem label="Feed Efficiency" value={breed.feedEfficiency} />
                        </SectionCard>

                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 text-[#8A9B6C] flex items-center justify-center">
                                    <BookOpenIcon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold font-manrope text-gray-800">References & Links</h3>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                {breed.references.map((ref, index) => (
                                  <li key={index}>
                                    {ref.url ? (
                                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                          {ref.text}
                                        </a>
                                    ) : (
                                        <span>{ref.text}</span>
                                    )}
                                  </li>
                                ))}
                                {breed.dadIsLink && (
                                     <li>
                                        <a href={breed.dadIsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                          View on FAO DAD-IS Database
                                        </a>
                                     </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreedDetailPage;
