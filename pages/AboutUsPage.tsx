import React from 'react';
import { UsersIcon, BookOpenIcon, ShieldCheckIcon } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

const TeamMemberCard: React.FC<{ name: string; title: string; description: string; email: string; contactText: string; }> = ({ name, title, description, email, contactText }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 text-center flex flex-col">
        <div className="mx-auto mb-4 w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            {/* Placeholder for image */}
            <UsersIcon className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold font-manrope text-gray-800">{name}</h3>
        <p className="text-sm font-semibold text-[#8A9B6C] mb-3">{title}</p>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        <div className="mt-4">
            <a href={`mailto:${email}`} className="text-sm font-semibold text-blue-600 hover:underline">
                {contactText}
            </a>
        </div>
    </div>
);

const AboutUsPage: React.FC = () => {
    const { t } = useLanguage();

    const teamMembers = [
        {
            name: "Pr. Nassik Saâdia",
            title: t('about_member1_title'),
            description: t('about_member1_desc'),
            email: "S.nassik@yahoo.com",
        },
        {
            name: "Dr. Safae Skenndri",
            title: t('about_member2_title'),
            description: t('about_member2_desc'),
            email: "safaesk7@gmail.com",
        },
        {
            name: "Dr. Oumnia Abelouch",
            title: t('about_member3_title'),
            description: t('about_member3_desc'),
            email: "oumniaabelouch@gmail.com",
        }
    ];

    return (
        <div className="py-12 md:py-16 bg-[#f5fbf8] animate-fadeIn">
            <div className="container mx-auto px-6 max-w-5xl">
                <header className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope">{t('about_pageTitle')}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('about_pageSubtitle')}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <TeamMemberCard 
                            key={member.name} 
                            name={member.name}
                            title={member.title}
                            description={member.description}
                            email={member.email}
                            contactText={t('about_contact')}
                        />
                    ))}
                </div>

                <section className="mt-20 bg-white p-8 rounded-xl shadow-sm border border-gray-200/80">
                    <h2 className="text-2xl font-bold font-manrope text-gray-800 text-center mb-6">{t('about_missionTitle')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                             <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                                <BookOpenIcon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t('about_mission1_title')}</h3>
                            <p className="text-gray-500 text-sm">{t('about_mission1_desc')}</p>
                        </div>
                        <div>
                             <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                                <ShieldCheckIcon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t('about_mission2_title')}</h3>
                             <p className="text-gray-500 text-sm">{t('about_mission2_desc')}</p>
                        </div>
                        <div>
                             <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                                <UsersIcon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t('about_mission3_title')}</h3>
                             <p className="text-gray-500 text-sm">{t('about_mission3_desc')}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;