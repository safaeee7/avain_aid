
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { 
    SearchIcon, 
    ShieldIcon, 
    DatabaseIcon, 
    ShieldCheckIcon, 
    GlobeIcon, 
    MapPinIcon,
    BookOpenIcon,
    CameraIcon,
    SyringeIcon,
    BugIcon,
    HomeQuarantineIcon
} from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-green-100 to-sky-200 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 md:pt-24 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left z-10">
              <h1 className="text-5xl md:text-7xl font-manrope font-bold leading-tight text-gray-800">
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                {t('heroSubtitle')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <ReactRouterDOM.Link to="/diagnostics-playground" className="px-10 py-4 text-lg bg-[#8A9B6C] text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-0.5">
                  {t('heroCtaStart')}
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/disease-database" className="px-10 py-4 text-lg bg-white text-gray-700 font-semibold rounded-lg border-2 border-[#8A9B6C] hover:bg-green-50 transition-colors duration-300">
                  {t('heroCtaBrowse')}
                </ReactRouterDOM.Link>
              </div>
              <div className="mt-10 text-base text-gray-500 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-[#8A9B6C]"/>
                    <span>{t('heroFeature1')}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-[#8A9B6C]"/>
                    <span>{t('heroFeature2')}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <GlobeIcon className="w-5 h-5 text-[#8A9B6C]"/>
                    <span>{t('heroFeature3')}</span>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
               <div className="absolute -right-20 -top-20 w-80 h-80 bg-green-100 rounded-full opacity-50 blur-xl"></div>
               <div className="absolute right-40 bottom-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
              <div className="relative z-10 space-y-8">
                <ReactRouterDOM.Link to="/diagnostics-playground" className="group block bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:border-[#8A9B6C] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-lg bg-[#8A9B6C] text-white flex items-center justify-center flex-shrink-0">
                      <SearchIcon className="w-8 h-8"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{t('heroCard1Title')}</h3>
                      <p className="text-base text-gray-600 mt-1">{t('heroCard1Text')}</p>
                    </div>
                  </div>
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/prevention" className="group block bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:border-[#8A9B6C] transition-all duration-300 transform translate-x-8 hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-lg bg-[#6CA8D0] text-white flex items-center justify-center flex-shrink-0">
                      <ShieldIcon className="w-8 h-8"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{t('heroCard2Title')}</h3>
                      <p className="text-base text-gray-600 mt-1">{t('heroCard2Text')}</p>
                    </div>
                  </div>
                </ReactRouterDOM.Link>
                <ReactRouterDOM.Link to="/visual-library" className="group block bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:border-[#8A9B6C] transition-all duration-300 transform translate-x-16 hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-lg bg-[#A86CD0] text-white flex items-center justify-center flex-shrink-0">
                      <CameraIcon className="w-8 h-8"/>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{t('heroCard3Title')}</h3>
                      <p className="text-base text-gray-600 mt-1">{t('heroCard3Text')}</p>
                    </div>
                  </div>
                </ReactRouterDOM.Link>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Why AvianAid Section */}
       <section className="container mx-auto px-6 pb-16 md:pb-24">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{t('toolkitTitle')}</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                {t('toolkitSubtitle')}
            </p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                    <DatabaseIcon className="w-8 h-8"/>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('toolkitCard1Title')}</h3>
                <p className="text-gray-500 text-sm">{t('toolkitCard1Text')}</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                    <MapPinIcon className="w-8 h-8"/>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('toolkitCard2Title')}</h3>
                <p className="text-gray-500 text-sm">{t('toolkitCard2Text')}</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-[#8A9B6C] flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon className="w-8 h-8"/>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('toolkitCard3Title')}</h3>
                <p className="text-gray-500 text-sm">{t('toolkitCard3Text')}</p>
            </div>
         </div>
       </section>

        {/* Core Features Section */}
        <section className="bg-white">
            <div className="container mx-auto px-6 py-16 md:py-24 space-y-20">
                {/* Feature 1: Disease Database */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/50">
                        <img 
                            src="https://www.pilmico.com/wp-content/uploads/2023/07/Pilmico-Poultry.png" 
                            alt="A flock of healthy chickens in a clean barn, representing a well-managed poultry farm."
                            className="rounded-lg w-full object-cover aspect-video"
                        />
                        </div>
                        <div className="text-right text-xs text-gray-500 mt-2 pr-2">
                            Source: <a href="https://www.pilmico.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pilmico</a>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold font-manrope text-gray-800">{t('feature1Title')}</h2>
                        <p className="mt-4 text-lg text-gray-600">{t('feature1Text')}</p>
                        <ReactRouterDOM.Link to="/disease-database" className="mt-6 inline-block font-semibold text-[#8A9B6C] hover:text-green-700">
                            {t('feature1Link')}
                        </ReactRouterDOM.Link>
                    </div>
                </div>

                {/* Feature 2: Breed Catalog */}
                <div className="bg-gray-50/70 p-8 md:p-12 rounded-2xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-manrope text-gray-800">{t('feature2Title')}</h2>
                            <p className="mt-4 text-lg text-gray-600">{t('feature2Text')}</p>
                            <ReactRouterDOM.Link to="/breeds" className="mt-6 inline-block font-semibold text-[#8A9B6C] hover:text-green-700">
                                {t('feature2Link')}
                            </ReactRouterDOM.Link>
                        </div>
                        <div className="order-1 md:order-2">
                           <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/50">
                                <img 
                                    src="https://nocf.co.ke/sitepad-data/uploads/2024/02/407987933_326446226975112_6439129046374901601_n.jpg"
                                    alt="A diverse group of chickens, representing a breed catalog."
                                    className="rounded-lg w-full object-cover aspect-video"
                                />
                            </div>
                            <div className="text-right text-xs text-gray-500 mt-2 pr-2">
                                Source: <a href="https://nocf.co.ke/" target="_blank" rel="noopener noreferrer" className="hover:underline">NOCF Kenya</a>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Prevention Section */}
                <div className="text-center pt-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{t('preventionSectionTitle')}</h2>
                    <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('preventionSectionSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-[#6CA8D0] flex items-center justify-center mx-auto mb-4">
                            <ShieldCheckIcon className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{t('preventionCard1Title')}</h3>
                        <p className="text-gray-500 text-sm">{t('preventionCard1Text')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-[#6CA8D0] flex items-center justify-center mx-auto mb-4">
                            <SyringeIcon className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{t('preventionCard2Title')}</h3>
                        <p className="text-gray-500 text-sm">{t('preventionCard2Text')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-[#6CA8D0] flex items-center justify-center mx-auto mb-4">
                            <BugIcon className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{t('preventionCard3Title')}</h3>
                        <p className="text-gray-500 text-sm">{t('preventionCard3Text')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-[#6CA8D0] flex items-center justify-center mx-auto mb-4">
                            <HomeQuarantineIcon className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{t('preventionCard4Title')}</h3>
                        <p className="text-gray-500 text-sm">{t('preventionCard4Text')}</p>
                    </div>
                </div>
                 <div className="mt-12 text-center">
                    <ReactRouterDOM.Link to="/prevention" className="px-8 py-3 bg-[#6CA8D0] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5">
                        {t('preventionSectionCta')}
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#6CA8D0] to-[#8A9B6C]">
            <div className="container mx-auto px-6 py-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-manrope text-white">{t('ctaTitle')}</h2>
                <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
                    {t('ctaSubtitle')}
                </p>
                <div className="mt-8">
                    <ReactRouterDOM.Link to="/diagnostics-playground" className="px-8 py-3 bg-white text-[#333333] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5">
                        {t('ctaButton')}
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </section>
    </div>
  );
};

export default HomePage;
