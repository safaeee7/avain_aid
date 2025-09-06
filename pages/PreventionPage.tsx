
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { 
    ShieldCheckIcon,
    SyringeIcon,
    SprayIcon,
    BugIcon,
    HomeQuarantineIcon,
    ClipboardListIcon,
    FirstAidIcon
} from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

// FIX: Export slugify and getPreventionTopics to be shared with PreventionTopicPage.tsx to avoid code duplication and resolve import error.
export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

export const getPreventionTopics = (t: (key: string) => string) => [
    { 
        title: t('prevention_topic_goldenRules_title'),
        slug: slugify("The 5 Golden Rules of Biosecurity"),
        description: t('prevention_topic_goldenRules_desc'), 
        icon: <ShieldCheckIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_vaccineSchedules_title'),
        slug: slugify("Vaccine Schedules by Region & Bird Type"),
        description: t('prevention_topic_vaccineSchedules_desc'), 
        icon: <SyringeIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_footbathGuide_title'),
        slug: slugify("Footbath & Disinfection Guide"),
        description: t('prevention_topic_footbathGuide_desc'), 
        icon: <SprayIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_pestControl_title'),
        slug: slugify("Pest & Vector Control"),
        description: t('prevention_topic_pestControl_desc'), 
        icon: <BugIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_isolationProtocol_title'),
        slug: slugify("Isolation Protocol for New Birds"),
        description: t('prevention_topic_isolationProtocol_desc'), 
        icon: <HomeQuarantineIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_farmHygiene_title'),
        slug: slugify("Farm Hygiene Checklists"),
        description: t('prevention_topic_farmHygiene_desc'), 
        icon: <ClipboardListIcon className="w-6 h-6" /> 
    },
    { 
        title: t('prevention_topic_emergencyKit_title'),
        slug: slugify("Emergency Prep Kit"),
        description: t('prevention_topic_emergencyKit_desc'), 
        icon: <FirstAidIcon className="w-6 h-6" /> 
    }
];

const PreventionCard = ({ icon, title, description, to }: { icon: React.ReactNode, title: string, description: string, to: string }) => (
    <ReactRouterDOM.Link to={to} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200/80 flex flex-col">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-teal-100 text-teal-700">
            {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm flex-grow">{description}</p>
    </ReactRouterDOM.Link>
);

const PreventionPage: React.FC = () => {
    const { t } = useLanguage();
    const preventionTopics = getPreventionTopics(t);

    return (
        <div className="py-12 md:py-16 animate-fadeIn">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('prevention_pageTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('prevention_pageSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {preventionTopics.map(topic => (
                        <PreventionCard key={topic.slug} {...topic} to={`/prevention/${topic.slug}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreventionPage;
