
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { LogoIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Mission */}
          <div className="md:col-span-1">
            <ReactRouterDOM.Link to="/" className="flex items-center gap-2 mb-4">
              <LogoIcon className="h-8 w-8 text-[#8A9B6C]" />
              <span className="text-2xl font-bold font-manrope text-white">AvianAid</span>
            </ReactRouterDOM.Link>
            <p className="text-sm text-gray-400">
              {t('footerMission')}
            </p>
          </div>

          {/* Column 2: Core Features */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">{t('footerCoreFeatures')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><ReactRouterDOM.Link to="/diagnostics-playground" className="text-gray-400 hover:text-white">{t('footerDiagnostics')}</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/disease-database" className="text-gray-400 hover:text-white">{t('footerDatabase')}</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/prevention" className="text-gray-400 hover:text-white">{t('footerPrevention')}</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/breeds" className="text-gray-400 hover:text-white">{t('footerBreeds')}</ReactRouterDOM.Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">{t('footerResources')}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><ReactRouterDOM.Link to="/resources" className="text-gray-400 hover:text-white">{t('footerMoroccoResources')}</ReactRouterDOM.Link></li>
              <li><ReactRouterDOM.Link to="/about-us" className="text-gray-400 hover:text-white">{t('footerAboutUs')}</ReactRouterDOM.Link></li>
            </ul>
          </div>

          {/* Column 4: Disclaimer */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">{t('footerDisclaimer')}</h3>
            <p className="mt-4 text-sm text-gray-400">
              {t('footerDisclaimerText')}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {t('footerCopyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
