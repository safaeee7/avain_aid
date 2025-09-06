import React from 'react';
import type { UrgencyLevel, ZoonoticRiskLevel, Etiology } from '../types';
import { ZoonoticHighIcon, ZoonoticModerateIcon, ZoonoticNoneIcon, AlertTriangleIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

export const UrgencyBadge: React.FC<{ level: UrgencyLevel }> = ({ level }) => {
  const { t } = useLanguage();
  const urgencyInfo = {
    HIGH: {
      text: t('badge_urgencyHigh'),
      className: 'bg-red-100 text-red-800',
      tooltip: t('badge_urgencyTooltipHigh')
    },
    MEDIUM: {
      text: t('badge_urgencyMedium'),
      className: 'bg-yellow-100 text-yellow-800',
      tooltip: t('badge_urgencyTooltipMedium')
    },
    LOW: {
      text: t('badge_urgencyLow'),
      className: 'bg-green-100 text-green-800',
      tooltip: t('badge_urgencyTooltipLow')
    },
  };
  const info = urgencyInfo[level];

  return (
    <span
      className={`relative group px-2.5 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${info.className}`}
    >
      {info.text}
      <span className="absolute bottom-full mb-2 w-max left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {info.tooltip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-800"></span>
      </span>
    </span>
  );
};


export const EtiologyBadge: React.FC<{ etiology: Etiology }> = ({ etiology }) => {
    const { t } = useLanguage();
    const etiologyInfo = {
      Viral: { text: t('badge_etiologyViral'), className: 'bg-indigo-100 text-indigo-800' },
      Bacterial: { text: t('badge_etiologyBacterial'), className: 'bg-blue-100 text-blue-800' },
      Parasitic: { text: t('badge_etiologyParasitic'), className: 'bg-orange-100 text-orange-800' },
      Fungal: { text: t('badge_etiologyFungal'), className: 'bg-purple-100 text-purple-800' },
      Other: { text: t('badge_etiologyOther'), className: 'bg-teal-100 text-teal-800' },
    };
    const info = etiologyInfo[etiology];
    
    return (
      <span className={`px-2.5 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${info.className}`}>
        {info.text}
      </span>
    );
  };

export const ZoonoticStatusBadge: React.FC<{ level?: ZoonoticRiskLevel }> = ({ level }) => {
    const { t } = useLanguage();
    const riskInfo = {
      HIGH: { text: t('badge_zoonoticHigh'), Icon: ZoonoticHighIcon, className: 'bg-[#D62828]/10 text-[#D62828]' },
      MODERATE: { text: t('badge_zoonoticModerate'), Icon: ZoonoticModerateIcon, className: 'bg-[#F77F00]/10 text-[#F77F00]' },
      LOW: { text: t('badge_zoonoticLow'), Icon: ZoonoticNoneIcon, className: 'bg-[#38A3A5]/10 text-[#38A3A5]' },
    };

    const info = riskInfo[level || 'LOW'];
  
    return (
        <span className={`inline-flex items-center px-2.5 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${info.className}`}>
          <info.Icon className="w-4 h-4 mr-1.5" />
          {info.text}
        </span>
    );
};

export const NotifiableBadge: React.FC = () => {
    const { t } = useLanguage();
    return (
        <span className="inline-flex items-center px-2.5 py-1 text-sm font-semibold rounded-full whitespace-nowrap bg-red-200 text-red-900">
            <AlertTriangleIcon className="w-4 h-4 mr-1.5" />
            {t('badge_notifiable')}
        </span>
    );
};
