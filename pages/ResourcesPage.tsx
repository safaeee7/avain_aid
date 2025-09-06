import React, { useState, useEffect } from 'react';
import { 
    ChevronDownIcon, 
    GavelIcon,
    BuildingIcon,
    CoinsIcon,
    AlertTriangleIcon,
    BookOpenIcon,
    GlobeIcon
} from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Law {
    id: number;
    title: string;
    originalTitle: string;
    summaryEn: string;
    summaryFr: string;
    summaryAr: string;
    whyItMatters: string;
    source: string;
    sourceUrl?: string;
}

interface Institution {
    id: number;
    name: string;
    role: string;
    contact: { website?: string; phone?: string };
}

const LawCard: React.FC<{ law: Law; isOpen: boolean; onClick: () => void }> = ({ law, isOpen, onClick }) => {
    const { t, language } = useLanguage();
    const [summaryLang, setSummaryLang] = useState<'en' | 'fr' | 'ar'>(language);

    useEffect(() => {
        setSummaryLang(language);
    }, [language]);

    const getSummary = () => {
        if (summaryLang === 'fr') return law.summaryFr;
        if (summaryLang === 'ar') return law.summaryAr;
        return law.summaryEn;
    };

    return (
        <div className="border-b border-gray-200">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50 focus:outline-none">
                <div className="flex-1 pr-4">
                    <span className="font-semibold text-gray-800">{law.title}</span>
                    <p className="text-xs text-gray-500 italic mt-1">{law.originalTitle}</p>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-50/50 border-t border-gray-200 space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-semibold text-gray-600">{t('resources_law_summary')}</h4>
                            <div className="flex border border-gray-300 rounded-md overflow-hidden text-xs">
                                <button onClick={() => setSummaryLang('en')} className={`px-2 py-0.5 transition-colors ${summaryLang === 'en' ? 'bg-[#8A9B6C] text-white' : 'bg-white text-gray-600'}`}>English</button>
                                <button onClick={() => setSummaryLang('fr')} className={`px-2 py-0.5 transition-colors ${summaryLang === 'fr' ? 'bg-[#8A9B6C] text-white' : 'bg-white text-gray-600'}`}>Français</button>
                                <button onClick={() => setSummaryLang('ar')} className={`px-2 py-0.5 transition-colors ${summaryLang === 'ar' ? 'bg-[#8A9B6C] text-white' : 'bg-white text-gray-600'}`}>العربية</button>
                            </div>
                        </div>
                        <p className={`text-sm text-gray-700 ${summaryLang === 'ar' ? 'text-right' : 'text-left'}`}>{getSummary()}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">{t('resources_law_why')}</h4>
                        <p className="text-sm text-gray-700">{law.whyItMatters}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-semibold text-gray-600 mb-1">{t('resources_law_source')}</h4>
                        <p className="text-sm text-gray-700">
                            {law.sourceUrl ? (
                                <a href={law.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{law.source}</a>
                            ) : (
                                law.source
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 text-[#8A9B6C] flex items-center justify-center">
                {icon}
            </div>
            <h2 className="text-2xl font-bold font-manrope text-gray-800">{title}</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
            {children}
        </div>
    </section>
);


const ResourcesPage: React.FC = () => {
    const { t } = useLanguage();
    const [openAccordion, setOpenAccordion] = useState<number | null>(1);
    
    const lawsData: Law[] = [
        {
            id: 1,
            title: t('resources_law_1_title'),
            originalTitle: "Loi 28-11 relative à la santé animale",
            summaryEn: "This law establishes the framework for health surveillance, disease control, and rules for animal movement to protect national livestock.",
            summaryFr: "Cette loi établit le cadre de la surveillance sanitaire, du contrôle des maladies, et des règles pour le mouvement des animaux afin de protéger le cheptel national.",
            summaryAr: "يحدد هذا القانون إطار المراقبة الصحية ومكافحة الأمراض وقواعد حركة الحيوانات لحماية الثروة الحيوانية الوطنية.",
            whyItMatters: t('resources_law_1_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/reglementation/sante-animale/loi-28-11"
        },
        {
            id: 2,
            title: t('resources_law_2_title'),
            originalTitle: "Arrêté sur les maladies animales notifiables",
            summaryEn: "Official list of notifiable diseases, including Avian Influenza and Newcastle Disease. Any suspicion must be reported immediately.",
            summaryFr: "Liste officielle des maladies à déclaration obligatoire, incluant l'Influenza Aviaire et la Maladie de Newcastle. Toute suspicion doit être immédiatement signalée.",
            summaryAr: "قائمة رسمية بالأمراض التي يجب الإبلاغ عنها فورًا، بما في ذلك إنفلونزا الطيور ومرض نيوكاسل. يجب الإبلاغ عن أي اشتباه على الفور.",
            whyItMatters: t('resources_law_2_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/vigilance-sanitaire/maladies-animales/maladies-reglementees"
        },
        {
            id: 3,
            title: t('resources_law_3_title'),
            originalTitle: "Arrêté sur la biosécurité en aviculture",
            summaryEn: "Defines mandatory biosecurity measures for poultry farms, such as footbaths, visitor management, and building disinfection.",
            summaryFr: "Définit les mesures de biosécurité obligatoires pour les élevages avicoles, comme les pédiluves, la gestion des visiteurs, et la désinfection des bâtiments.",
            summaryAr: "يحدد تدابير الأمن الحيوي الإلزامية لمزارع الدواجن، مثل أحواض تطهير الأقدام، وإدارة الزوار، وتطهير المباني.",
            whyItMatters: t('resources_law_3_why'),
            source: t('resources_source_onssa_da'),
            sourceUrl: "https://www.onssa.gov.ma/reglementation/sante-animale/biosecurite-avicole"
        },
        {
            id: 4,
            title: t('resources_law_4_title'),
            originalTitle: "Règlement sanitaire pour les marchés avicoles",
            summaryEn: "Establishes health and hygiene rules for live bird markets to limit disease spread.",
            summaryFr: "Établit les règles d'hygiène et de santé pour les marchés d'oiseaux vivants afin de limiter la propagation des maladies.",
            summaryAr: "يضع القواعد الصحية لأسواق الطيور الحية للحد من انتشار الأمراض.",
            whyItMatters: t('resources_law_4_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/reglementation/hygiene/marches-volailles"
        },
        {
            id: 5,
            title: t('resources_law_5_title'),
            originalTitle: "Normes d’importation des volailles et œufs",
            summaryEn: "Defines health certification and quarantine requirements for importing poultry, day-old chicks, and hatching eggs.",
            summaryFr: "Définit les exigences de certification sanitaire et de quarantaine pour l'importation de volailles, de poussins d'un jour et d'œufs à couver.",
            summaryAr: "تحدد متطلبات الشهادات الصحية والحجر الصحي لاستيراد الدواجن والكتاكيت عمر يوم وبيض التفقيس.",
            whyItMatters: t('resources_law_5_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/procedures/importation-animaux"
        },
        {
            id: 6,
            title: t('resources_law_6_title'),
            originalTitle: "Programme national de lutte contre la grippe aviaire",
            summaryEn: "The national strategic plan for the prevention, early detection, and rapid response to outbreaks of Highly Pathogenic Avian Influenza (HPAI).",
            summaryFr: "Le plan stratégique national pour la prévention, la détection précoce et la réponse rapide aux foyers de grippe aviaire hautement pathogène (IAHP).",
            summaryAr: "الخطة الاستراتيجية الوطنية للوقاية والكشف المبكر والاستجابة السريعة لتفشي إنفلونزا الطيور شديدة الإمراض.",
            whyItMatters: t('resources_law_6_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/vigilance-sanitaire/plans-de-lutte/influenza-aviaire"
        },
        {
            id: 7,
            title: t('resources_law_7_title'),
            originalTitle: "Cahier des charges – élevages familiaux",
            summaryEn: "Recommended standards and best practices for backyard farms to improve poultry health and productivity.",
            summaryFr: "Normes et bonnes pratiques recommandées pour les élevages de basse-cour afin d'améliorer la productivité et la santé des volailles.",
            summaryAr: "المعايير والممارسات الجيدة الموصى بها لمزارع الدواجن الصغيرة لتحسين الإنتاجية وصحة الطيور.",
            whyItMatters: t('resources_law_7_why'),
            source: t('resources_source_moa'),
            sourceUrl: "https://www.agriculture.gov.ma/guides/elevage-familial"
        },
         {
            id: 8,
            title: t('resources_law_8_title'),
            originalTitle: "Loi 30-13 – sécurité sanitaire",
            summaryEn: "General framework for the safety of food products, including eggs and poultry meat, from farm to table.",
            summaryFr: "Cadre général pour la sécurité sanitaire des produits alimentaires, y compris les œufs et la viande de volaille, de la ferme à la table.",
            summaryAr: "الإطار العام للسلامة الصحية للمنتجات الغذائية، بما في ذلك بيض ولحوم الدواجن، من المزرعة إلى المستهلك.",
            whyItMatters: t('resources_law_8_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/reglementation/securite-alimentaire/loi-30-13"
        },
         {
            id: 9,
            title: t('resources_law_9_title'),
            originalTitle: "Loi 49-99",
            summaryEn: "Law on the identification and traceability of animals, including poultry, for better health monitoring and effective crisis management.",
            summaryFr: "Loi sur l'identification et la traçabilité des animaux, y compris la volaille, pour un meilleur suivi sanitaire et une gestion efficace des crises.",
            summaryAr: "قانون تحديد وتتبع الحيوانات، بما في ذلك الدواجن، لتحسين المراقبة الصحية والإدارة الفعالة للأزمات.",
            whyItMatters: t('resources_law_9_why'),
            source: t('resources_source_onssa'),
            sourceUrl: "https://www.onssa.gov.ma/reglementation/sante-animale/identification-tracabilite"
        }
    ];

    const institutionsData: Institution[] = [
        { id: 1, name: t('resources_inst_agri_name'), role: t('resources_inst_agri_role'), contact: { website: "https://www.agriculture.gov.ma" }},
        { id: 2, name: t('resources_inst_onssa_name'), role: t('resources_inst_onssa_role'), contact: { website: "https://www.onssa.gov.ma" }},
        { id: 3, name: t('resources_inst_iav_name'), role: t('resources_inst_iav_role'), contact: { website: "http://www.iav.ac.ma" }},
    ];

    const supportProgramsData = [
        { id: 1, title: t('resources_support_gg_title'), content: t('resources_support_gg_content') },
        { id: 2, title: t('resources_support_coop_title'), content: t('resources_support_coop_content') },
        { id: 3, title: t('resources_support_help_title'), content: t('resources_support_help_content') }
    ];

    return (
        <div className="py-12 md:py-16 bg-[#f5fbf8] animate-fadeIn">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('resources_pageTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('resources_pageSubtitle')}
                    </p>
                </header>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12 shadow-md">
                    <div className="flex items-start gap-4">
                        <AlertTriangleIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-bold font-manrope text-red-900">{t('resources_reportTitle')}</h2>
                            <p className="mt-2 text-red-800">{t('resources_reportSubtitle')}</p>
                            <ol className="list-decimal pl-5 mt-3 space-y-1 text-red-800 font-semibold">
                                <li>{t('resources_reportStep1')}</li>
                                <li>{t('resources_reportStep2')}</li>
                                <li>{t('resources_reportStep3')}</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <Section icon={<BuildingIcon className="w-6 h-6" />} title={t('resources_sectionInstitutions')}>
                    {institutionsData.map(inst => (
                        <div key={inst.id} className="p-4 border-b border-gray-200 last:border-b-0">
                            <h3 className="font-semibold text-gray-800">{inst.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{inst.role}</p>
                            {inst.contact.website && <a href={inst.contact.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{t('resources_inst_website')}</a>}
                        </div>
                    ))}
                </Section>
                
                <Section icon={<GavelIcon className="w-6 h-6" />} title={t('resources_sectionLaws')}>
                     {lawsData.map(law => (
                        <LawCard 
                            key={law.id} 
                            law={law} 
                            isOpen={openAccordion === law.id} 
                            onClick={() => setOpenAccordion(openAccordion === law.id ? null : law.id)} 
                        />
                    ))}
                </Section>
                
                <Section icon={<CoinsIcon className="w-6 h-6" />} title={t('resources_sectionSupport')}>
                    {supportProgramsData.map(prog => (
                         <div key={prog.id} className="p-4 border-b border-gray-200 last:border-b-0">
                            <h3 className="font-semibold text-gray-800">{prog.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{prog.content}</p>
                        </div>
                    ))}
                </Section>

                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mt-12">
                    <h2 className="text-2xl font-bold font-manrope text-gray-800 mb-4 text-center">{t('resources_sectionInternational')}</h2>
                     <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold flex items-center gap-2"><GlobeIcon className="w-5 h-5 text-blue-600"/> WOAH (World Organisation for Animal Health)</h3>
                            <p className="mt-1 text-gray-600">{t('resources_intl_woah_desc')}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold flex items-center gap-2"><BookOpenIcon className="w-5 h-5 text-blue-600"/> FAO (Food and Agriculture Organization)</h3>
                            <p className="mt-1 text-gray-600">{t('resources_intl_fao_desc')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResourcesPage;