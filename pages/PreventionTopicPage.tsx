import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
// FIX: Import getPreventionTopics from PreventionPage.tsx to resolve the error and remove duplicated data.
import { getPreventionTopics } from './PreventionPage';
import { ArrowLeftIcon, DownloadIcon, AlertTriangleIcon, XIcon, CheckIcon, RodentIcon, BugIcon, FlyIcon, BirdIcon, MoroccoIcon } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

const GoldenRuleCard = ({ rule, title, why, practices, insight, quote, quoteAuthor }: { rule: number, title: string, why: string, practices: React.ReactNode, insight: string, quote: string, quoteAuthor: string }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
            <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">
                <span className="text-[#8A9B6C]">{t('gr_rule')} {rule}:</span> {title}
            </h2>
            
            <div className="space-y-4 prose prose-sm max-w-none text-gray-700">
                <h3 className="font-semibold text-gray-600">{t('gr_whyTitle')}</h3>
                <p>{why}</p>
                
                <h3 className="font-semibold text-gray-600">{t('gr_practicesTitle')}</h3>
                {practices}
                
                <h3 className="font-semibold text-gray-600">{t('gr_insightTitle')}</h3>
                <p>{insight}</p>

                <blockquote className="border-l-4 border-[#8A9B6C] pl-4 italic text-gray-600">
                    <p>"{quote}"</p>
                    <footer className="text-right not-italic text-sm text-gray-500 mt-2">— {quoteAuthor}</footer>
                </blockquote>
            </div>
        </div>
    );
}

const GoldenRulesReferencesSection = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
            <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">{t('prevention_referencesTitle')}</h2>
            <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
                <li>
                    <span className="font-semibold">FAO (Food and Agriculture Organization):</span> Biosecurity for Small-Scale Poultry Keepers (2023), Poultry Biosecurity Guidelines (2021), Integrated Pest Management in Poultry (2022). <a href="https://www.fao.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org</a>
                </li>
                <li>
                    <span className="font-semibold">WOAH (World Organisation for Animal Health):</span> Terrestrial Animal Health Code – Chapter 10.10, Manual of Diagnostic Tests and Vaccines. <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a>
                </li>
                <li>
                    <span className="font-semibold">USDA (United States Department of Agriculture):</span> Biosecurity for Poultry: Backyard Flocks (2022), APHIS: Healthy Birds Initiative. <a href="https://www.aphis.usda.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aphis.usda.gov</a>
                </li>
                <li>
                    <span className="font-semibold">Peer-Reviewed Studies:</span> El Allali, K. et al. (2021) in <em className="italic">Veterinary Medicine and Science</em>; Benbouzid, B. et al. (2020) in <em className="italic">Transboundary and Emerging Diseases</em>.
                </li>
            </ul>
        </div>
    );
};

const GoldenRulesDownloadsSection = () => {
    const { t } = useLanguage();
    return (
     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
        <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">{t('prevention_downloadsTitle')}</h2>
        <div className="space-y-3">
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">{t('gr_download_poster')}</span>
            </a>
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">{t('gr_download_log')}</span>
            </a>
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">{t('gr_download_checklist')}</span>
            </a>
        </div>
    </div>
);
}


const GoldenRulesContent = () => {
    const { t } = useLanguage();
    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{t('gr_title')}</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">{t('gr_subtitle')}</p>
            </header>

            <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>{t('gr_intro1')}</p>
                <p>{t('gr_intro2')}</p>
                <p className="font-semibold">{t('gr_intro3')}</p>
            </div>
            
            <GoldenRuleCard 
                rule={1}
                title={t('gr_rule1_title')}
                why={t('gr_rule1_why')}
                practices={
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t('gr_rule1_practice1')}</li>
                        <li>{t('gr_rule1_practice2')}</li>
                        <li>{t('gr_rule1_practice3')}</li>
                        <li>{t('gr_rule1_practice4')}</li>
                    </ul>
                }
                insight={t('gr_rule1_insight')}
                quote={t('gr_rule1_quote')}
                quoteAuthor={t('gr_rule1_quoteAuthor')}
            />

            <GoldenRuleCard 
                rule={2}
                title={t('gr_rule2_title')}
                why={t('gr_rule2_why')}
                practices={
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t('gr_rule2_practice1')}</li>
                        <li>{t('gr_rule2_practice2')}</li>
                        <li>{t('gr_rule2_practice3')}</li>
                        <li>{t('gr_rule2_practice4')}</li>
                    </ul>
                }
                insight={t('gr_rule2_insight')}
                quote={t('gr_rule2_quote')}
                quoteAuthor={t('gr_rule2_quoteAuthor')}
            />

            <GoldenRuleCard 
                rule={3}
                title={t('gr_rule3_title')}
                why={t('gr_rule3_why')}
                practices={
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t('gr_rule3_practice1')}</li>
                        <li>{t('gr_rule3_practice2')}</li>
                        <li>{t('gr_rule3_practice3')}</li>
                        <li>{t('gr_rule3_practice4')}</li>
                    </ul>
                }
                insight={t('gr_rule3_insight')}
                quote={t('gr_rule3_quote')}
                quoteAuthor={t('gr_rule3_quoteAuthor')}
            />
            
            <GoldenRuleCard 
                rule={4}
                title={t('gr_rule4_title')}
                why={t('gr_rule4_why')}
                practices={
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t('gr_rule4_practice1')}</li>
                        <li>{t('gr_rule4_practice2')}</li>
                        <li>{t('gr_rule4_practice3')}</li>
                        <li>{t('gr_rule4_practice4')}</li>
                    </ul>
                }
                insight={t('gr_rule4_insight')}
                quote={t('gr_rule4_quote')}
                quoteAuthor={t('gr_rule4_quoteAuthor')}
            />

            <GoldenRuleCard 
                rule={5}
                title={t('gr_rule5_title')}
                why={t('gr_rule5_why')}
                practices={
                    <ul className="list-disc pl-5 space-y-1">
                        <li>{t('gr_rule5_practice1')}</li>
                        <li>{t('gr_rule5_practice2')}</li>
                        <li>{t('gr_rule5_practice3')}</li>
                        <li>{t('gr_rule5_practice4')}</li>
                    </ul>
                }
                insight={t('gr_rule5_insight')}
                quote={t('gr_rule5_quote')}
                quoteAuthor={t('gr_rule5_quoteAuthor')}
            />

            <GoldenRulesReferencesSection />
            <GoldenRulesDownloadsSection />

        </>
    );
};

const ContentTable = ({ caption, headers, data, quote, quoteAuthor, note }: { caption: React.ReactNode, headers: string[], data: (string|JSX.Element)[][], quote?: string, quoteAuthor?: string, note?: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
        <h3 className="text-xl font-bold font-manrope text-gray-800 mb-4">{caption}</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} scope="col" className="px-4 py-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {quote && quoteAuthor && (
            <blockquote className="mt-4 border-l-4 border-[#8A9B6C] pl-4 italic text-gray-600 text-sm">
                <p>"{quote}"</p>
                <footer className="text-right not-italic text-xs text-gray-500 mt-1">— {quoteAuthor}</footer>
            </blockquote>
        )}
        {note && (
            <div className="mt-4">{note}</div>
        )}
    </div>
);

const VaccineSchedulesReferencesSection = () => {
    const { t } = useLanguage();
    return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
        <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">{t('prevention_referencesTitle')}</h2>
        <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
            <li><span className="font-semibold">WOAH:</span> Manual of Diagnostic Tests and Vaccines for Terrestrial Animals (2023). <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a></li>
            <li><span className="font-semibold">FAO:</span> Vaccination Strategies for Poultry in Developing Countries (2022), EMPRES-i Database. <a href="https://www.fao.org/empres-i" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org/empres-i</a></li>
            <li><span className="font-semibold">USDA APHIS:</span> Biosecurity and Vaccination Guidelines for Poultry (2022). <a href="https://www.aphis.usda.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aphis.usda.gov</a></li>
            <li><span className="font-semibold">Peer-Reviewed Studies:</span> El Houadfi et al. (2021) in <em>Moroccan Journal of Veterinary Sciences</em>; Bouzoubaa et al. (2019) in <em>Avian Pathology</em>; Bi et al. (2020) in <em>Veterinary Microbiology</em>.</li>
            <li><span className="font-semibold">Moroccan Ministry of Agriculture:</span> National Avian Disease Control Program (2023).</li>
        </ul>
    </div>
)};

const VaccineSchedulesDownloadsSection = () => {
    const { t } = useLanguage();
    return (
     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
        <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">{t('prevention_downloadsTitle')}</h2>
        <div className="space-y-3">
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">[PDF] Vaccine Schedule Charts (by bird type, printable)</span>
            </a>
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">[PDF] Vaccination Calendar Template</span>
            </a>
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">[PDF] Vaccine Guide in Arabic & French</span>
            </a>
            <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                <span className="text-sm font-medium text-gray-700">[Infographic] How Vaccines Work in Birds</span>
            </a>
        </div>
    </div>
)};


const VaccineSchedulesContent = () => (
    <>
        <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Vaccine Schedules by Region & Bird Type</h1>
            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Evidence-Based Protection for Healthy Flocks</p>
        </header>

        <div className="prose prose-sm max-w-none text-gray-700 mb-8">
            <p>Vaccination is a cornerstone of poultry disease prevention, but its success depends on correct timing, strain selection, and local disease prevalence. A vaccine given too early, too late, or against the wrong strain can fail to protect — or even mask outbreaks.</p>
            <p>This section provides region-specific, bird-specific, and production-type-specific vaccine schedules, grounded in global veterinary guidelines and adapted for Morocco’s climate, disease pressures, and farming systems.</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200/80 mb-8">
            <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🌍 Why Vaccine Schedules Must Be Localized</h2>
            <p className="prose prose-sm max-w-none text-gray-700">Vaccination is not one-size-fits-all. The right schedule depends on disease prevalence, bird species, production system, and climate.</p>
             <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 italic text-gray-600 text-sm">
                <p>"Vaccination programs must be tailored to local epidemiology to be effective."</p>
                <footer className="text-right not-italic text-xs text-gray-500 mt-1">— FAO, 2022</footer>
            </blockquote>
        </div>

        <ContentTable 
            caption="📋 General Principles of Poultry Vaccination"
            headers={["Principle", "Explanation", "Source"]}
            data={[
                ["Maternal Antibodies Interfere", "Chicks inherit antibodies that can neutralize live vaccines if given too early (wait 7-14 days).", "Avian Diseases"],
                ["Live vs. Inactivated", "Live vaccines (e.g., eye drop) provide rapid mucosal immunity; inactivated vaccines offer longer systemic protection.", "Poultry Science"],
                ["Route Matters", "Eye drop/nasal spray targets respiratory immunity. Injection targets systemic immunity. Poor technique reduces efficacy.", "OIE Terrestrial Code"],
                ["Cold Chain is Critical", "Live vaccines are sensitive to heat/sunlight. Store at 2-8°C and use within 2 hours of reconstitution.", "USDA APHIS, 2022"],
                ["Booster Doses Are Essential", "Single doses often provide short-lived immunity. Boosters are crucial for enhancing memory response.", "USDA APHIS, 2022"]
            ]}
        />
        
        <h2 className="text-3xl font-bold font-manrope text-gray-800 my-8 text-center">Vaccine Schedules by Bird Type & Region</h2>

        <ContentTable 
            caption="🐔 1. Chickens – Layers (Morocco & Similar Climates)"
            headers={["Age", "Disease", "Vaccine", "Type", "Route", "Notes"]}
            data={[
                ["Day 1", "Marek's Disease", "HVT or bivalent (HVT+SB-1)", "Live", "Injection (subcutaneous)", "Must be given within 24 hours of hatch. Prevents tumors."],
                ["Day 7", "Newcastle (ND)", "LaSota (strain AAVV-1)", "Live", "Eye drop or spray", "Given after maternal antibodies wane."],
                ["Day 14", "Infectious Bursal Disease (IBD)", "Intermediate strain (e.g., D78)", "Live", "Drinking water", "Avoid overdosing to prevent immunosuppression."],
                ["Day 21", "ND Booster", "LaSota or VG/GA", "Live", "Spray", "Enhances respiratory immunity."],
                ["Day 28", "IBD Booster", "Intermediate-plus strain", "Live", "Water", "For high-challenge areas."],
                ["Week 8", "ND + IB (Dual)", "Inactivated emulsion", "Inactivated", "Breast muscle", "Long-lasting systemic protection. Critical before lay."],
                ["Week 16", "Egg Drop Syndrome (EDS)", "Inactivated", "Inactivated", "Subcutaneous", "Prevents egg shell defects."],
                ["Pre-Lay", "ND + IB + EDS + AE", "Inactivated multivalent", "Inactivated", "Breast muscle", "Final boost before production."]
            ]}
            quote="Layer flocks in Morocco require at least two ND inactivated doses to maintain immunity during peak lay."
            quoteAuthor="El Houadfi et al., Moroccan Journal of Veterinary Sciences, 2021"
        />

        <ContentTable 
            caption="🍗 2. Chickens – Broilers (Morocco & Similar Climates)"
            headers={["Age", "Disease", "Vaccine", "Type", "Route", "Notes"]}
            data={[
                ["Day 1", "Marek's", "HVT", "Live", "Injection", "Essential in hatchery."],
                ["Day 5-7", "IB (Mass-type)", "H120", "Live", "Spray", "Prevents respiratory and reproductive damage."],
                ["Day 10-14", "ND (LaSota)", "LaSota", "Live", "Spray", "Avoid stress; ensure even distribution."],
                ["Day 18-21", "IBD (Intermediate)", "Intermediate strain", "Live", "Water", "Use immune complex vaccines in high-risk farms."]
            ]}
            quote="Spray vaccination at 10 days provides optimal ND protection in Moroccan broilers."
            quoteAuthor="Bouzoubaa et al., Avian Pathology, 2019"
        />

         <ContentTable 
            caption="🦆 3. Ducks – Commercial & Backyard (Morocco)"
            headers={["Age", "Disease", "Vaccine", "Type", "Route", "Notes"]}
            data={[
                ["Day 1", "Duck Virus Enteritis (DVE)", "Attenuated DEV (e.g., C-KCE strain)", "Live", "Subcutaneous", "Single dose provides lifelong immunity."],
                ["Week 4", "Newcastle", "LaSota", "Live", "Eye drop", "Ducks are less susceptible but can carry virus."],
                ["Week 8", "DVE Booster (if high risk)", "Inactivated", "Inactivated", "Injection", "Only in endemic zones."]
            ]}
            quote="DVE vaccination is mandatory in Moroccan duck farms near wetlands."
            quoteAuthor="Direction de l’Aviculture, Ministry of Agriculture, Morocco (2023)"
        />

        <ContentTable 
            caption="🦃 4. Turkeys – Commercial Flocks (Morocco & Global)"
            headers={["Age", "Disease", "Vaccine", "Type", "Route", "Notes"]}
            data={[
                ["Day 1", "Marek's (if applicable)", "HVT", "Live", "Injection", "Rarely used; turkeys less susceptible."],
                ["Day 7", "Mycoplasma gallisepticum (MG)", "F-strain or ts-11", "Live", "Eye drop", "Prevents chronic respiratory disease."],
                ["Day 14", "ND (LaSota)", "LaSota", "Live", "Spray", "Use low-pH water to stabilize virus."],
                ["Day 21", "IBD (Turkey-adapted)", "Turkey-specific strain", "Live", "Water", "Turkey-specific strains available."],
                ["Week 8", "ND + IB Inactivated", "Oil-emulsion", "Inactivated", "Injection", "Critical for breeder turkeys."]
            ]}
             quote="MG vaccination reduces condemnations at slaughter by 18%."
            quoteAuthor="USDA, Turkey Health Management, 2021"
        />
        
        <ContentTable 
            caption="🦢 5. Geese – Smallholder & Commercial (Morocco)"
            headers={["Age", "Disease", "Vaccine", "Type", "Route", "Notes"]}
            data={[
                ["Day 1", "Goose Parvovirus (Derzsy's)", "Attenuated live", "Live", "Injection", "Must be given within 24 hours."],
                ["Week 2", "DVE", "Duck vaccine (cross-protection)", "Live", "Subcutaneous", "Geese highly susceptible."],
                ["Week 6", "ND", "LaSota", "Live", "Eye drop", "Lower priority than DVE/Parvovirus."]
            ]}
             quote="Goose parvovirus causes up to 80% mortality in goslings under 3 weeks."
            quoteAuthor="Bi et al., Veterinary Microbiology, 2020"
        />

        <ContentTable 
            caption="🌍 Adjusting for Other Regions"
            headers={["Region", "Key Adjustments"]}
            data={[
                ["Sub-Saharan Africa", "Higher NDV challenge → more frequent ND boosters. Use thermostable vaccines where cold chain is weak."],
                ["Southeast Asia", "HPAI vaccination required (H5 inactivated). Follow national programs."],
                ["Europe/North America", "IB vaccines include QX strain (common there). ND vaccines often use VG/GA strain."],
                ["Hot Climates (e.g., Gulf)", "Avoid spray vaccination at midday — heat inactivates virus. Use early morning."]
            ]}
             quote="Thermostable ND vaccines reduce field failure by 40% in tropical zones."
            quoteAuthor="FAO EMPRES-i, 2023"
        />

        <ContentTable 
            caption="🧪 Scientific Basis for Vaccine Selection"
            headers={["Disease/Vaccine", "Why This Vaccine?"]}
            data={[
                ["Newcastle (LaSota)", "Safe, effective, provides strong mucosal immunity."],
                ["IB H120", "Mild strain, good for priming immunity in young birds."],
                ["Inactivated ND/IB", "Provides long-lasting IgG, protects layers during production."],
                ["DVE C-KCE", "Live-attenuated strain that confers lifelong immunity."]
            ]}
        />
        
        <VaccineSchedulesReferencesSection />
        <VaccineSchedulesDownloadsSection />

    </>
);


const EfficacyStatus: React.FC<{ status: 'inactivated' | 'effective' | 'moderate' | 'not-effective' | 'limited-data'; text?: string }> = ({ status, text }) => {
    switch (status) {
        case 'inactivated':
        case 'effective':
            return <span className="flex items-center text-green-700 font-medium"><CheckIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> {text || 'Effective'}</span>;
        case 'moderate':
            return <span className="flex items-center text-yellow-700 font-medium"><AlertTriangleIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> {text || 'Moderate'}</span>;
        case 'not-effective':
            return <span className="flex items-center text-red-700 font-medium"><XIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> {text || 'Not effective'}</span>;
        case 'limited-data':
            return <span className="flex items-center text-gray-600 font-medium"><span className="mr-1.5">?</span> {text || 'Limited data'}</span>;
        default:
            return <span>{text}</span>;
    }
};

const StepCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 h-full">
        <h3 className="text-lg font-bold font-manrope text-gray-800 mb-3">{title}</h3>
        <div className="prose prose-sm max-w-none text-gray-700">
            {children}
        </div>
    </div>
);

const FootbathGuideContent = () => {
    const disinfectantData = [
        ["Virkon S", "Best overall (broad-spectrum)", "1% (10g/L)", "10-30 min", "Works in organic matter; ideal for farms"],
        ["Bleach (Sodium Hypochlorite)", "Low-cost option", "1:200 (500 ppm)", "10 min", "Inactivated by organic matter and sunlight"],
        ["Calcium Hydroxide (Slaked Lime)", "For outdoor areas, driveways", "10-20% slurry", "N/A", "Deters rodents, dries litter, but not for footwear"]
    ];
    const mistakesData = [
        ["No scrubbing before dipping", "Disinfectant fails", "Always use a brush"],
        ["Using dirty or diluted bleach", "No viral kill", "Use fresh 1:200 solution daily"],
        ["Leaving footbath in rain", "Diluted, ineffective", "Cover or move indoors"],
        ["Using the same footbath for all pens", "Cross-contamination", "One per pen or clean between uses"],
        ["Not changing solution", "Becomes a pathogen soup", "Replace daily (twice in heat)"]
    ];
    const moroccoTipsData = [
        ["High temperatures (up to 45°C)", "Use covered footbaths to reduce evaporation and UV degradation"],
        ["Dust and sand", "Pre-clean boots thoroughly – sand protects microbes"],
        ["Water scarcity", "Use small-volume trays and Virkon S (more efficient than bleach)"],
        ["Backyard mixed-species flocks", "Place footbaths at each species enclosure (chickens → ducks → geese)"],
        ["Limited access to commercial disinfectants", "Use locally available alternatives: Ash + water (alkaline), Vinegar (5%) for low-risk areas."]
    ];
    const efficacyData = [
        [<strong>Pathogen</strong>, <strong>Virkon S (1%)</strong>, <strong>Bleach (500 ppm)</strong>, <strong>Lime (10%)</strong>],
        ["Newcastle Disease Virus", <EfficacyStatus status="inactivated" text="Inactivated in 10 min" />, <EfficacyStatus status="inactivated" text="Inactivated in 10 min" />, <EfficacyStatus status="limited-data" />],
        ["Avian Influenza (H5N1)", <EfficacyStatus status="inactivated" text="Inactivated in 10 min" />, <EfficacyStatus status="inactivated" text="Inactivated in 10 min" />, <EfficacyStatus status="not-effective" />],
        ["Salmonella spp.", <EfficacyStatus status="effective" />, <EfficacyStatus status="effective" />, <EfficacyStatus status="effective" text="Effective (on surfaces)" />],
        ["E. coli", <EfficacyStatus status="effective" />, <EfficacyStatus status="effective" />, <EfficacyStatus status="effective" />],
        ["Aspergillus fumigatus", <EfficacyStatus status="moderate" />, <EfficacyStatus status="moderate" />, <EfficacyStatus status="effective" text="Effective (drying effect)" />]
    ];


    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Footbath & Disinfection Guide</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Your First Line of Defense Against Disease</p>
            </header>

            <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>A well-maintained footbath is one of the simplest, most effective biosecurity tools. It stops pathogens like Newcastle Disease virus, Avian Influenza, and Salmonella from being carried into your flock on boots. But a poorly managed footbath offers false security — it can even spread disease.</p>
                <p>This guide provides evidence-based protocols for setting up and maintaining footbaths, with specific recommendations for Morocco’s climate.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🧼 Why Footbaths Matter: The Science</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                    <p>Footwear is a major vector for disease. Studies show that NDV and H5N1 can survive on contaminated boots for up to 48 hours. A properly used footbath reduces the microbial load on boots by 90–99% and prevents cross-contamination.</p>
                    <blockquote className="border-l-4 border-[#8A9B6C] pl-4 italic">
                        <p>"Over 60% of poultry disease outbreaks in smallholder systems are linked to human movement and contaminated footwear.”</p>
                        <footer className="text-right not-italic text-sm text-gray-500 mt-2">— FAO, 2023</footer>
                    </blockquote>
                </div>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-6 text-center md:text-left">🛠️ How to Set Up an Effective Footbath</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StepCard title="✅ Step 1: Choose Location">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Place at every entry point.</li>
                            <li>Use before/after visiting groups.</li>
                            <li>Avoid direct rain or sun.</li>
                        </ul>
                    </StepCard>
                    <StepCard title="✅ Step 2: Select Container">
                         <ul className="list-disc pl-5 space-y-1">
                            <li>Use a plastic tray (50-60cm) with 5-10cm depth.</li>
                            <li>Add handles for easy cleaning.</li>
                            <li>Optional: Use a covered lid.</li>
                        </ul>
                    </StepCard>
                    
                    <div className="md:col-span-3 lg:col-span-1">
                         <StepCard title="✅ Step 3: Prepare Solution">
                            <p>Use the correct chemical and concentration, like Virkon S (1%) or Bleach (1:200). See table below for details.</p>
                        </StepCard>
                    </div>
                </div>
                 <div className="mt-6">
                    <ContentTable caption="Disinfectant Solutions" headers={["Disinfectant", "Use", "Dilution", "Time", "Notes"]} data={disinfectantData} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <StepCard title="✅ Step 4: Pre-Clean Boots First">
                        <p>Scrub boots with a brush to remove mud and manure. Organic matter inactivates most disinfectants.</p>
                        <blockquote className="border-l-4 border-[#8A9B6C] pl-4 italic mt-2 text-xs">"Disinfection cannot occur without prior cleaning."<footer className="text-right not-italic mt-2">— USDA APHIS, 2021</footer></blockquote>
                    </StepCard>
                    
                    <StepCard title="✅ Step 5: Change Solution Daily">
                        <p>Replace liquid every 24 hours (or twice daily in hot climates). Never top off old solution.</p>
                        <blockquote className="border-l-4 border-[#8A9B6C] pl-4 italic mt-2 text-xs">"Efficacy drops by 70% after 24 hours due to contamination."<footer className="text-right not-italic mt-2">— J. Applied Micro., 2020</footer></blockquote>
                    </StepCard>
                 </div>
            </section>
            
            <ContentTable caption="🚫 Common Footbath Mistakes (and How to Avoid Them)" headers={["Mistake", "Risk", "Solution"]} data={mistakesData} />
            <ContentTable 
                caption={
                    <span className="flex items-center gap-2">
                        <MoroccoIcon className="w-6 h-6" />
                        Footbath Tips for Moroccan Conditions
                    </span>
                }
                headers={["Challenge", "Solution"]}
                data={moroccoTipsData}
            />
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                 <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🧪 Scientific Basis for Disinfectant Efficacy</h2>
                 <p className="text-xs text-gray-500 mb-4">Source: WOAH, FAO, Disinfectant Efficacy in Poultry Systems, 2023</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                             <tr>
                                {efficacyData[0].map((header, index) => <th key={index} scope="col" className="px-4 py-3">{header}</th>)}
                             </tr>
                        </thead>
                        <tbody>
                            {efficacyData.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className={`px-4 py-3 ${cellIndex === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📋 Footbath Maintenance Checklist</h2>
                <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none text-gray-700">
                    <li>Remove mud and debris from boots</li>
                    <li>Scrub boots with brush</li>
                    <li>Check footbath for contamination</li>
                    <li>Drain old solution and rinse tray</li>
                    <li>Prepare fresh disinfectant at the correct dilution</li>
                    <li>Place footbath back at the entry point</li>
                </ul>
                 <a href="#" className="mt-4 inline-flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                    <span className="text-sm font-medium text-gray-700">[PDF] Footbath Maintenance Log (printable)</span>
                </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📚 Authoritative References</h2>
                <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
                    <li><span className="font-semibold">FAO:</span> Biosecurity for Small-Scale Poultry Keepers (2023). <a href="https://www.fao.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org</a></li>
                    <li><span className="font-semibold">WOAH:</span> Manual of Diagnostic Tests and Vaccines (2023). <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a></li>
                    <li><span className="font-semibold">USDA APHIS:</span> Biosecurity for Poultry Guidelines (2021). <a href="https://www.aphis.usda.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aphis.usda.gov</a></li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📥 Downloadable Resources</h2>
                <div className="space-y-3">
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Footbath Setup Guide (with diagrams)</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Daily Footbath Log (fillable)</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Footbath Guide in Arabic & French</span>
                    </a>
                </div>
            </div>

        </>
    );
};

const PestSectionCard: React.FC<{ icon: React.ReactNode; title: string; color: string; children: React.ReactNode }> = ({ icon, title, color, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
        <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold font-manrope text-gray-800">{title}</h3>
        </div>
        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            {children}
        </div>
    </div>
);

const SimpleTable = ({ headers, data }: { headers: string[], data: (string|JSX.Element)[][] }) => (
    <div className="overflow-x-auto my-4">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>{headers.map((h, i) => <th key={i} scope="col" className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                        {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Checklist: React.FC<{ items: { text: string; subtext?: string }[] }> = ({ items }) => (
    <ul className="space-y-3">
        {items.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mt-1 w-5 h-5 border-2 border-gray-400 rounded-sm mr-3 bg-white"></span>
                <div>
                    <span className="text-gray-800">{item.text}</span>
                    {item.subtext && <p className="text-xs text-gray-500">{item.subtext}</p>}
                </div>
            </li>
        ))}
    </ul>
);


const PestControlContent = () => {
    const parasiteData = [
        ["Red Mite (Dermanyssus gallinae)", "Anemia, restlessness, reduced egg production", "Can carry Salmonella"],
        ["Northern Fowl Mite", "Scabs, feather loss, huddling", "Severe in winter"],
        ["Chicken Lice", "Itching, feather damage", "Secondary infections"],
        ["Ticks (Argas persicus)", "Swollen joints, paralysis, fever", "Transmits Borrelia anserina"]
    ];
    
    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Pest & Vector Control</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Managing Pests in Poultry Systems to Stop Disease Spread</p>
            </header>

            <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>Pests are more than a nuisance; they are silent carriers of diseases like Avian Influenza, Newcastle Disease, and Salmonellosis. This guide provides evidence-based, practical pest control strategies tailored for Moroccan poultry farms, from backyard coops to commercial operations.</p>
            </div>

            <ContentTable
                caption="Why Pest Control Is Critical for Biosecurity"
                headers={["Pest", "Diseases Transmitted", "Transmission Mode"]}
                data={[
                    ["Rodents (rats, mice)", "Salmonella, Leptospira", "Feces, aerosols, shared water"],
                    ["External Parasites (mites, lice)", "Fowl pox (via mites), secondary bacterial infections", "Direct infestation"],
                    ["Flies (houseflies, blowflies)", "Salmonella, E. coli", "Bite transmission"],
                    ["Wild Birds (ducks, pigeons)", "Avian Influenza, Newcastle Disease", "Feces, aerosols, shared water"]
                ]}
            />

            <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🧰 Integrated Pest Management (IPM)</h2>
                <p className="prose prose-sm max-w-none text-gray-700">IPM is a sustainable strategy combining prevention, monitoring, and control, reducing pesticide use while improving disease management.</p>
                <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 italic text-gray-600 text-sm">
                    <p>"IPM reduces pesticide use by 40–70% while improving disease control."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— WOAH, 2023</footer>
                </blockquote>
            </div>
            
            <div className="space-y-8">
                <PestSectionCard icon={<RodentIcon className="w-6 h-6" />} title="1. Rodent Control" color="bg-orange-100 text-orange-700">
                    <div>
                        <h4 className="font-semibold text-gray-600">✅ Prevention & Exclusion</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Seal all entry points (&gt;6 mm) with steel wool or cement.</li>
                            <li>Store feed in rodent-proof containers.</li>
                            <li>Keep the coop area clean and cut surrounding grass.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-600">✅ Monitoring & Trapping</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Use snap traps or live traps along walls and near feed.</li>
                            <li>Check traps daily and remove rodents safely (wear gloves).</li>
                        </ul>
                    </div>
                </PestSectionCard>
                
                <PestSectionCard icon={<BugIcon className="w-6 h-6" />} title="2. External Parasites (Mites, Lice & Ticks)" color="bg-red-100 text-red-700">
                    <SimpleTable headers={["Parasite", "Signs", "Disease Risk"]} data={parasiteData} />
                    <div>
                        <h4 className="font-semibold text-gray-600">✅ Prevention & Control</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Provide dust baths with sand, diatomaceous earth (DE), or ash.</li>
                            <li>Inspect birds weekly, especially under wings and around the vent.</li>
                            <li>Clean and disinfect perches and nest boxes monthly.</li>
                        </ul>
                        <blockquote className="border-l-4 border-[#8A9B6C] pl-4 italic mt-2 text-xs">"Diatomaceous earth reduces red mite populations by 60–80% when used consistently."<footer className="text-right not-italic mt-2">— Poultry Science, 2019</footer></blockquote>
                    </div>
                </PestSectionCard>

                <PestSectionCard icon={<FlyIcon className="w-6 h-6" />} title="3. Fly Control" color="bg-gray-200 text-gray-700">
                     <div>
                        <h4 className="font-semibold text-gray-600">✅ Prevention</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Remove manure at least twice weekly to break the breeding cycle.</li>
                            <li>Keep litter dry and cover compost piles.</li>
                            <li>Install fine-mesh screens on windows and vents.</li>
                        </ul>
                    </div>
                </PestSectionCard>

                <PestSectionCard icon={<BirdIcon className="w-6 h-6" />} title="4. Wild Bird Control" color="bg-sky-100 text-sky-700">
                     <div>
                        <h4 className="font-semibold text-gray-600">✅ Exclusion Strategies</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Cover outdoor runs with netting (1.5 cm mesh).</li>
                            <li>Use deterrents like motion-activated sprinklers.</li>
                            <li>Do not feed wild birds and cover poultry feed/water sources.</li>
                        </ul>
                    </div>
                </PestSectionCard>
            </div>
            
            <ContentTable
                caption={
                    <span className="flex items-center gap-2">
                        <MoroccoIcon className="w-6 h-6" />
                        Pest Control Tips for Moroccan Conditions
                    </span>
                }
                headers={["Challenge", "Solution"]}
                data={[
                    ["Hot, dry climate", "Focus on dust baths and dry litter to deter mites."],
                    ["Humid coastal zones", "Increase manure removal to prevent fly breeding."],
                    ["Backyard mixed flocks", "Separate species to reduce cross-infestation."],
                    ["Limited access to chemicals", "Use local alternatives: Ash + sand for dust baths, garlic in water (mild repellent), diluted neem oil spray."]
                ]}
            />
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h3 className="text-xl font-bold font-manrope text-gray-800 mb-4">📋 Pest Monitoring Checklist (Weekly)</h3>
                <Checklist items={[
                    { text: "Inspect birds for mites, lice, ticks" },
                    { text: "Check for rodent droppings or gnaw marks" },
                    { text: "Remove manure and wet litter" },
                    { text: "Clean nest boxes and perches" },
                    { text: "Refill dust bath (sand + DE/ash)" },
                    { text: "Set or check traps" },
                    { text: "Inspect netting for tears" }
                ]} />
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📚 Authoritative References</h2>
                <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
                    <li><span className="font-semibold">FAO:</span> Integrated Pest Management in Poultry (2022). <a href="https://www.fao.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org</a></li>
                    <li><span className="font-semibold">WOAH:</span> Terrestrial Animal Health Code, Chapter 10.10. <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a></li>
                    <li><span className="font-semibold">Peer-Reviewed Studies:</span> El Allali, K. et al. (2021) in <em>Veterinary Microbiology</em>; Benbouzid, B. et al. (2020) in <em>Transboundary and Emerging Diseases</em>.</li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📥 Downloadable Resources</h2>
                <div className="space-y-3">
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Pest ID Guide (with photos)</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Weekly Pest Monitoring Log</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Pest Control Guide in Arabic & French</span>
                    </a>
                </div>
            </div>
        </>
    )
};

const IsolationProtocolContent = () => {
    const observationData = [
        ["Respiration", "Quiet, no effort", "Coughing, gasping, nasal discharge"],
        ["Eyes & Nose", "Clean, bright", "Swelling, mucus, closed eyes"],
        ["Feces", "Firm, brown", "Diarrhea, blood, white urates"],
        ["Appetite", "Eating well", "Reduced feed intake"],
        ["Activity", "Alert, moving", "Lethargy, huddling, reluctance to move"],
        ["Comb/Wattles", "Bright red", "Pale, cyanotic, swollen"]
    ];

    const testingData = [
        ["Mycoplasma gallisepticum (MG)", "ELISA or PCR", "Day 7 and Day 28"],
        ["Salmonella Pullorum", "Rapid Agglutination Test (RAT)", "Day 14"],
        ["Avian Influenza / Newcastle", "PCR (swabs)", "If symptoms appear"]
    ];

    const speciesTipsData = [
        ["Chickens", "Most common carriers of MG, Salmonella"],
        ["Ducks & Geese", "Can carry Avian Influenza and Duck Virus Enteritis without symptoms"],
        ["Turkeys", "Highly susceptible to Mycoplasma meleagridis and Blackhead disease"],
        ["Bantams & Ornamental Birds", "Often from unregulated sources — highest risk"]
    ];
    
    const moroccoTipsData = [
        ["Small backyard space", "Use a portable isolation cage (wire mesh with cover)"],
        ["Hot climate", "Provide shade"],
        ["Mixed-species flocks", "Quarantine each species separately — diseases jump between types"],
        ["Purchasing from local markets", "Assume high risk — extend quarantine to 45 days if possible"],
        ["No access to testing", "Double down on observation and hygiene"]
    ];

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Isolation Protocol for New Birds</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">The 30-Day Quarantine Rule to Protect Your Flock</p>
            </header>

            <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>Introducing new birds without quarantine is risky. Many diseases like Mycoplasma, Salmonella, and Avian Influenza can be carried silently by birds that show no symptoms. This guide provides a step-by-step isolation protocol to ensure new birds don’t bring disease into your healthy flock.</p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-red-800 mb-4">🛑 Why Quarantine Is Non-Negotiable</h2>
                 <ul className="list-disc pl-5 prose prose-sm max-w-none text-red-700">
                    <li>Up to 40% of “healthy” birds from markets carry subclinical infections (FAO, 2022).</li>
                    <li>Newcastle Disease and Avian Influenza can spread before symptoms appear.</li>
                </ul>
                <blockquote className="mt-4 border-l-4 border-red-500 pl-4 italic text-gray-600 text-sm">
                    <p>"Quarantine is the single most effective biosecurity measure to prevent disease introduction."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— WOAH, Terrestrial Animal Health Code</footer>
                </blockquote>
                 <blockquote className="mt-4 border-l-4 border-red-500 pl-4 italic text-gray-600 text-sm">
                    <p>"Farms that skip quarantine are 5x more likely to experience an outbreak within 3 months."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— El Allali et al., 2021 (Moroccan study)</footer>
                </blockquote>
            </div>

             <h2 className="text-3xl font-bold font-manrope text-gray-800 my-8 text-center">📅 The 30-Day Isolation Protocol (Step-by-Step)</h2>
            <div className="space-y-6">
                <StepCard title="✅ Step 1: Prepare a Dedicated Isolation Area">
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Location:</strong> At least 10 meters from your main flock.</li>
                        <li><strong>Enclosure:</strong> Separate building or pen with no shared airspace.</li>
                        <li><strong>Traffic:</strong> No foot traffic between quarantine and main flock.</li>
                        <li><strong>Tools:</strong> Dedicated feeders, waterers, gloves, and boots.</li>
                    </ul>
                </StepCard>
                <StepCard title="✅ Step 2: Duration – 30 Days Minimum">
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Days 1–7:</strong> Monitor for acute signs (respiratory, diarrhea).</li>
                        <li><strong>Days 8–21:</strong> Watch for delayed infections (e.g., MG, IBD).</li>
                        <li><strong>Days 22–30:</strong> Final observation and decision.</li>
                    </ul>
                </StepCard>
                <div>
                    <ContentTable caption="✅ Step 3: Daily Observation Checklist" headers={["Symptom", "Normal", "Warning Sign"]} data={observationData} />
                </div>
                <StepCard title="✅ Step 4: Prevent Cross-Contamination">
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Order of chores:</strong> Care for healthy flock first, then quarantined birds.</li>
                        <li>Change clothes or use dedicated coveralls.</li>
                        <li>Disinfect boots before leaving the quarantine area.</li>
                        <li>Never share equipment between groups.</li>
                    </ul>
                </StepCard>

                <div>
                    <ContentTable 
                        caption="✅ Step 5: Testing (If Available)" 
                        headers={["Disease", "Test Type", "When to Test"]} 
                        data={testingData}
                        note={
                            <p className="text-sm text-gray-600">
                                <strong>🏥 Moroccan Note:</strong> Contact your regional veterinary lab or Direction de l’Aviculture for testing options.
                            </p>
                        }
                    />
                </div>

                <StepCard title="✅ Step 6: Gradual Introduction (After 30 Days)">
                     <p>If birds remain healthy, introduce them safely:</p>
                     <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Vaccinate both groups 7-14 days before mixing.</li>
                        <li>Place new birds in a shared pen with a temporary barrier for 7 days.</li>
                        <li>If no issues, remove the barrier and continue daily observation.</li>
                    </ul>
                    <p className="font-semibold text-red-700 mt-2">Never dump new birds into the flock overnight — stress increases disease risk.</p>
                </StepCard>
                <ContentTable 
                    caption="🐔 Species-Specific Quarantine Tips" 
                    headers={["Species", "Notes"]} 
                    data={speciesTipsData} 
                    quote="Waterfowl can be asymptomatic carriers of HPAI for up to 10 days."
                    quoteAuthor="WOAH, Manual of Diagnostic Tests, 2023"
                />
            </div>
            
            <ContentTable 
                caption={
                    <span className="flex items-center gap-2">
                        <MoroccoIcon className="w-6 h-6" />
                        Quarantine Tips for Moroccan Conditions
                    </span>
                }
                headers={["Challenge", "Solution"]} 
                data={moroccoTipsData}
            />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📚 Scientific References</h2>
                <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
                    <li><span className="font-semibold">WOAH:</span> Terrestrial Animal Health Code, Chapter 10.10. <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a></li>
                    <li><span className="font-semibold">FAO:</span> Biosecurity for Small-Scale Poultry Keepers (2023). <a href="https://www.fao.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org</a></li>
                    <li><span className="font-semibold">USDA APHIS:</span> Healthy Birds Program: Quarantine Guidelines (2022). <a href="https://www.aphis.usda.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aphis.usda.gov</a></li>
                    <li><span className="font-semibold">Peer-Reviewed Studies:</span> El Allali, K. et al. (2021) in <em>Veterinary Microbiology</em>.</li>
                </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📥 Downloadable Resources</h2>
                <div className="space-y-3">
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] 30-Day Quarantine Protocol (printable checklist)</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Daily Quarantine Log (fillable)</span>
                    </a>
                     <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Quarantine Guide in Arabic & French</span>
                    </a>
                </div>
            </div>
        </>
    );
};

const ChecklistCard = ({ title, description, items, quote, quoteAuthor, tip, downloadLink }: { title: string, description: string, items: { text: string, subtext?: string }[], quote?: string, quoteAuthor?: string, tip?: string, downloadLink: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 flex flex-col h-full">
        <h3 className="text-xl font-bold font-manrope text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="flex-grow">
            <Checklist items={items} />
        </div>
        {quote && quoteAuthor && (
            <blockquote className="mt-4 border-l-4 border-[#8A9B6C] pl-4 italic text-gray-600 text-xs">
                <p>"{quote}"</p>
                <footer className="text-right not-italic mt-1">— {quoteAuthor}</footer>
            </blockquote>
        )}
        {tip && (
            <div className="mt-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800 rounded-r-lg">
                <span className="font-semibold">Moroccan Tip:</span> {tip}
            </div>
        )}
        <a href="#" className="mt-4 flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-700">
            <DownloadIcon className="w-4 h-4 text-[#8A9B6C] mr-2" />
            <span>{downloadLink}</span>
        </a>
    </div>
);


const FarmHygieneChecklistsContent = () => {
    const dailyItems = [
        { text: "Clean and refill waterers", subtext: "Scrub with brush; avoid algae buildup" },
        { text: "Remove wet litter", subtext: "Replace with dry straw or wood shavings" },
        { text: "Check feeders for mold", subtext: "Discard spoiled feed" },
        { text: "Observe flock behavior", subtext: "Look for coughing, diarrhea, lethargy" },
        { text: "Remove dead birds immediately", subtext: "Dispose safely (burn or bury)" },
        { text: "Wash hands after handling birds", subtext: "Use soap and clean water" },
    ];
    const weeklyItems = [
        { text: "Disinfect feeders and waterers", subtext: "Use 1% Virkon or 1:200 bleach solution" },
        { text: "Clean nest boxes", subtext: "Remove old bedding; spray with disinfectant" },
        { text: "Inspect for mites, lice, rodents", subtext: "Look in cracks, perches, under nests" },
        { text: "Check ventilation", subtext: "Ensure airflow without drafts" },
        { text: "Sweep and disinfect coop floor", subtext: "Remove manure first" },
        { text: "Refill dust bath (sand + ash/DE)", subtext: "Essential for bird self-care" },
    ];
    const monthlyItems = [
        { text: "Deep-clean and disinfect entire coop", subtext: "Remove all bedding; wash walls, perches, tools" },
        { text: "Inspect and repair netting/fencing", subtext: "Prevent wild bird or predator entry" },
        { text: "Review vaccine and treatment records", subtext: "Update log; schedule next doses" },
        { text: "Test water quality (if using well)", subtext: "Check for bacteria, nitrates" },
        { text: "Calibrate feed storage", subtext: "Ensure no moisture or rodent access" },
        { text: "Conduct a biosecurity audit", subtext: "Walk the farm: “What could go wrong?”" },
    ];

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Farm Hygiene Checklists</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Small Actions, Big Protection: Daily, Weekly & Monthly Habits for a Healthy Flock</p>
            </header>

             <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>Good hygiene isn’t about perfection — it’s about consistency. The difference between a healthy flock and an outbreak often comes down to small, repeated actions. This section provides simple, actionable checklists to build a culture of cleanliness.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🧼 Why Hygiene Matters: The Science</h2>
                <ul className="list-disc pl-5 prose prose-sm max-w-none text-gray-700">
                    <li>90% of Coccidiosis outbreaks are linked to wet, dirty litter (FAO, 2022).</li>
                    <li>Newcastle Disease virus can survive on feeders for up to 48 hours.</li>
                    <li>Salmonella thrives in damp, organic material — including old feed and manure.</li>
                </ul>
                <blockquote className="mt-4 border-l-4 border-[#8A9B6C] pl-4 italic text-gray-600 text-sm">
                    <p>"Farms with structured hygiene routines have 60% fewer disease incidents."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— Poultry Science, 2021</footer>
                </blockquote>
            </div>
            
            <h2 className="text-3xl font-bold font-manrope text-gray-800 my-8 text-center">📋 The 3 Core Hygiene Checklists</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ChecklistCard 
                    title="✅ Daily Hygiene"
                    description="5–10 minutes a day saves lives"
                    items={dailyItems}
                    tip="In hot weather, clean waterers twice daily to prevent bacterial growth."
                    downloadLink="Download Daily Checklist"
                />
                <ChecklistCard 
                    title="✅ Weekly Hygiene"
                    description="Deep clean to stop pathogens"
                    items={weeklyItems}
                    quote="Weekly disinfection of feeders reduces E. coli contamination by 80%."
                    quoteAuthor="J. Applied Poultry Research, 2020"
                    downloadLink="Download Weekly Checklist"
                />
                <ChecklistCard 
                    title="✅ Monthly Hygiene"
                    description="System-wide review"
                    items={monthlyItems}
                    quote="Monthly deep-cleaning reduces ammonia levels and respiratory disease."
                    quoteAuthor="FAO, Poultry House Management, 2022"
                    downloadLink="Download Monthly Checklist"
                />
            </div>
        </>
    );
};


const EmergencyPrepKitContent = () => {
    const checklistData = [
        ["PPE (Personal Protective Equipment)", "Disposable gloves (nitrile)", "Prevent pathogen transfer", "Pack 5-10 pairs"],
        ["", "N95 or surgical masks", "Protect against airborne viruses", "Especially critical for HPAI"],
        ["", "Disposable coveralls or apron", "Full-body protection", "Reusable if washable"],
        ["", "Rubber boots or boot covers", "Prevent tracking pathogens", "Keep near coop entrance"],
        ["", "Goggles or face shield", "Eye protection from splashes", "Important when handling sick birds"],
        ["Disinfection Supplies", "Virkon S or bleach", "Kill viruses and bacteria", "Store in sealed container"],
        ["", "Measuring cup or syringe", "Accurate dilution", "1% Virkon or 1:200 bleach"],
        ["", "Spray bottle", "Apply disinfectant to surfaces", "Label clearly"],
        ["", "Scrub brush", "Pre-clean before disinfecting", "One for boots, one for tools"],
        ["", "Lime (calcium hydroxide)", "Treat outdoor areas, driveways", "Use in high-traffic zones"],
        ["Isolation Tools", "Portable cage or pen", "Separate sick birds", "Must be escape-proof"],
        ["", "Dedicated feeders & waterers", "No cross-use", "Label 'QUARANTINE ONLY'"],
        ["", "Thermometer (digital)", "Monitor bird temperature", "Poultry fever = >42°C"],
        ["Documentation", "Flock health logbook", "Track symptoms, dates, actions", "Paper or digital"],
        ["", "Vaccine records", "Prove vaccination status", "Required for reporting"],
        ["", "Contact list", "Vets, agriculture office, lab", "Include phone & address"],
        ["", "Farm map", "Show coop layout, water sources", "Helps responders"],
        ["", "Notifiable disease poster", "Quick guide: 'What to do if you suspect HPAI'", "Print in Arabic/French/English"],
        ["Emergency Response", "Signage: 'Biosecurity Zone - Keep Out'", "Control access", "Use bright colors"],
        ["", "Rope or tape", "Block off areas", "Prevent foot traffic"],
        ["", "Heavy-duty trash bags", "Safe disposal of dead birds", "Burn or bury — never dump"]
    ];

    const maintenanceData = [
        ["Store in a cool, dry place", "Heat and moisture degrade PPE and disinfectants"],
        ["Keep near the coop entrance", "Ensures fast access during emergencies"],
        ["Label clearly: 'EMERGENCY – DO NOT REMOVE'", "Prevents misuse"],
        ["Check every 3 months", "Replace expired gloves, empty spray bottles, moldy items"],
        ["Train family/farm workers", "Everyone should know where it is and how to use it"]
    ];
    
    const moroccoAdaptationsData = [
        ["No access to Virkon", "Use bleach (1:200) or lime for disinfection"],
        ["Limited electricity/refrigeration", "Store PPE and bleach in the dark"],
        ["Backyard or mobile flocks", "Use a portable backpack kit with essentials"],
        ["Multilingual households", "Include Arabic and French labels on all items and instructions"],
        ["Remote areas", "Pre-print emergency contact cards with vet numbers and reporting steps"]
    ];

    return (
        <>
            <header className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">Emergency Prep Kit</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Be Ready Before Disease Strikes</p>
            </header>
            
            <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                <p>When a notifiable disease like Newcastle or Avian Influenza hits, every minute counts. Waiting to find gloves, disinfectant, or vet contacts wastes time and can turn a single sick bird into a farm-wide outbreak. This guide helps you build a ready-to-use Emergency Prep Kit.</p>
            </div>
            
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">🧰 What Is an Emergency Prep Kit?</h2>
                <p className="prose prose-sm max-w-none text-gray-700">It’s a labeled, organized container filled with essential supplies to isolate sick birds, protect yourself, report to authorities, and document the outbreak.</p>
                <blockquote className="mt-4 border-l-4 border-[#8A9B6C] pl-4 italic text-gray-600 text-sm">
                    <p>"Farms with emergency kits initiate response 3x faster during disease outbreaks."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— FAO, 2023</footer>
                </blockquote>
            </div>

            <ContentTable caption="📦 Emergency Kit Checklist: What to Include" headers={["Category", "Item", "Purpose", "Notes"]} data={checklistData} />
            
            <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200/80 my-8">
                <h2 className="text-2xl font-bold font-manrope text-red-800 mb-4">🆘 What to Do If You Suspect a Notifiable Disease</h2>
                <ol className="list-decimal pl-5 space-y-3 prose prose-sm max-w-none text-red-700">
                    <li><strong>Isolate:</strong> Move sick birds to a separate area. Stop all movement of birds, eggs, or equipment.</li>
                    <li><strong>Secure the Area:</strong> Put up “No Entry” signs and restrict access.</li>
                    <li><strong>Call Authorities:</strong> Contact your local veterinary office or Direction de l’Aviculture.</li>
                    <li><strong>Document Everything:</strong> Record symptoms, number of sick/dead birds, and recent visitors.</li>
                    <li><strong>Maintain Hygiene:</strong> Use PPE and disinfect boots, tools, and hands after contact.</li>
                </ol>
                 <blockquote className="mt-4 border-l-4 border-red-500 pl-4 italic text-gray-600 text-sm">
                    <p>"Suspected cases of Avian Influenza or Newcastle Disease must be reported within 24 hours under Moroccan law."</p>
                    <footer className="text-right not-italic text-xs text-gray-500 mt-1">— Moroccan Ministry of Agriculture, 2023</footer>
                </blockquote>
            </div>
            
            <ContentTable caption="🏠 Kit Storage & Maintenance Tips" headers={["Tip", "Why It Matters"]} data={maintenanceData} />
            
            <ContentTable 
                caption={
                    <span className="flex items-center gap-2">
                        <MoroccoIcon className="w-6 h-6" />
                        Emergency Kit Adaptations for Morocco
                    </span>
                }
                headers={["Situation", "Solution"]} 
                data={moroccoAdaptationsData}
            />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📚 Scientific & Regulatory References</h2>
                <ul className="list-disc pl-5 space-y-2 prose prose-sm max-w-none">
                    <li><span className="font-semibold">FAO:</span> Emergency Preparedness for Smallholder Poultry (2023). <a href="https://www.fao.org/empres-i" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.fao.org/empres-i</a></li>
                    <li><span className="font-semibold">WOAH:</span> Terrestrial Animal Health Code, Chapter 10.10. <a href="https://www.woah.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.woah.org</a></li>
                    <li><span className="font-semibold">Moroccan Ministry of Agriculture:</span> National Strategy for Avian Disease Control (2023). <a href="http://www.agriculture.gov.ma" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.agriculture.gov.ma</a></li>
                </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4">📥 Downloadable Resources</h2>
                <div className="space-y-3">
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Emergency Kit Checklist (printable)</span>
                    </a>
                    <a href="#" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <DownloadIcon className="w-5 h-5 text-[#8A9B6C] mr-3" />
                        <span className="text-sm font-medium text-gray-700">[PDF] Emergency Response Plan Template</span>
                    </a>
                </div>
            </div>
        </>
    );
};

const ComingSoonContent = ({ title }: { title: string }) => {
    const { t } = useLanguage();
    return (
        <div className="text-center bg-white p-10 rounded-xl shadow-sm border border-gray-200/80">
            <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{title}</h1>
            <p className="mt-4 text-xl text-gray-500">{t('prevention_comingSoonSubtitle')}</p>
            <p className="mt-2 text-gray-500">{t('prevention_comingSoonText')}</p>
        </div>
    );
};

const PreventionTopicPage: React.FC = () => {
    const { topicId } = ReactRouterDOM.useParams<{ topicId: string }>();
    const { t } = useLanguage();

    const preventionTopics = getPreventionTopics(t);

    const topic = preventionTopics.find(t => t.slug === topicId);

    if (!topic) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">{t('prevention_topicNotFoundTitle')}</h1>
                <p className="text-gray-600 mt-2">{t('prevention_topicNotFoundText')}</p>
                <ReactRouterDOM.Link to="/prevention" className="mt-6 inline-block px-6 py-2 bg-[#8A9B6C] text-white font-semibold rounded-lg hover:bg-green-700">
                    {t('prevention_backLink')}
                </ReactRouterDOM.Link>
            </div>
        );
    }

    const isGoldenRules = topic.slug === 'the-5-golden-rules-of-biosecurity';
    const isVaccineSchedules = topic.slug === 'vaccine-schedules-by-region-bird-type';
    const isFootbathGuide = topic.slug === 'footbath-disinfection-guide';
    const isPestControl = topic.slug === 'pest-vector-control';
    const isIsolationProtocol = topic.slug === 'isolation-protocol-for-new-birds';
    const isFarmHygiene = topic.slug === 'farm-hygiene-checklists';
    const isEmergencyKit = topic.slug === 'emergency-prep-kit';

    return (
        <div className="py-12 md:py-16 animate-fadeIn">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <ReactRouterDOM.Link to="/prevention" className="flex items-center text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        {t('prevention_backLink')}
                    </ReactRouterDOM.Link>
                </div>
                
                {isGoldenRules ? <GoldenRulesContent /> : 
                isVaccineSchedules ? <VaccineSchedulesContent /> : 
                isFootbathGuide ? <FootbathGuideContent /> :
                isPestControl ? <PestControlContent /> :
                isIsolationProtocol ? <IsolationProtocolContent /> :
                isFarmHygiene ? <FarmHygieneChecklistsContent /> :
                isEmergencyKit ? <EmergencyPrepKitContent /> :
                <ComingSoonContent title={topic.title} />}

            </div>
        </div>
    );
};

export default PreventionTopicPage;