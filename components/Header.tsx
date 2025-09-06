import React, { useState } from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { LogoIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <ReactRouterDOM.Link to="/" className="flex items-center gap-3">
            <LogoIcon className="h-10 w-10 text-[#8A9B6C]" />
            <span className="text-4xl font-bold font-manrope text-[#333333]">
              <span className="text-[#8A9B6C]">A</span>vian<span className="text-[#6CA8D0]">Aid</span>
            </span>
          </ReactRouterDOM.Link>
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <ReactRouterDOM.NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#8A9B6C] text-white'
                        : 'text-gray-600 hover:bg-gray-200/50 hover:text-black'
                    }`
                  }
                >
                  {t(link.name)}
                </ReactRouterDOM.NavLink>
              ))}
            </nav>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-sm font-semibold rounded-l-md transition-colors ${
                  language === 'en' ? 'bg-[#8A9B6C] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-sm font-semibold rounded-r-md transition-colors ${
                  language === 'fr' ? 'bg-[#8A9B6C] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                FR
              </button>
            </div>
            {/* Burger Menu Icon */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-black focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {NAV_LINKS.map((link) => (
              <ReactRouterDOM.NavLink
                key={link.name}
                to={link.path}
                onClick={toggleMobileMenu} // Close menu on link click
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#8A9B6C] text-white'
                      : 'text-gray-600 hover:bg-gray-200/50 hover:text-black'
                  }`
                }
              >
                {t(link.name)}
              </ReactRouterDOM.NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;