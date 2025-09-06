
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import {
    LungsIcon,
    StomachIcon,
    EggIcon,
    ShieldIcon,
    BoneIcon,
    HeartbeatIcon,
    FeatherIcon
} from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

const VisualLibraryPage: React.FC = () => {
    const { t } = useLanguage();

    const systemCategories = [
        { name: t('vl_respiratory'), slug: 'respiratory', icon: <LungsIcon className="w-8 h-8" /> },
        { name: t('vl_digestive'), slug: 'digestive', icon: <StomachIcon className="w-8 h-8" /> },
        { name: t('vl_reproductive'), slug: 'reproductive', icon: <EggIcon className="w-8 h-8" /> },
        { name: t('vl_immune'), slug: 'immune-lymphoid', icon: <ShieldIcon className="w-8 h-8" /> },
        { name: t('vl_musculoskeletal'), slug: 'musculoskeletal', icon: <BoneIcon className="w-8 h-8" /> },
        { name: t('vl_systemic'), slug: 'systemic-nervous', icon: <HeartbeatIcon className="w-8 h-8" /> },
        { name: t('vl_integumentary'), slug: 'integumentary-skin', icon: <FeatherIcon className="w-8 h-8" /> },
    ];

    return (
        <div className="py-12 md:py-16 bg-[#f5fbf8] animate-fadeIn">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('vl_pageTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('vl_pageSubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {systemCategories.map(category => (
                        <ReactRouterDOM.Link
                            key={category.slug}
                            to={`/visual-library/${category.slug}`}
                            className="group block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/80 transform hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-green-100 text-[#8A9B6C] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#8A9B6C] group-hover:text-white">
                                    {category.icon}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
                            </div>
                        </ReactRouterDOM.Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VisualLibraryPage;
