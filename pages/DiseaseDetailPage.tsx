
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { DISEASES_DATA } from '../constants';
import { ArrowLeftIcon, AlertTriangleIcon } from '../components/Icons';
import { UrgencyBadge, EtiologyBadge, ZoonoticStatusBadge, NotifiableBadge } from '../components/Badges';
import { useLanguage } from '../contexts/LanguageContext';

const DetailSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200/80">
        <h3 className="text-lg font-semibold text-[#8A9B6C] mb-3">{title}</h3>
        <div className="prose prose-sm max-w-none text-gray-700">{children}</div>
    </div>
);

const InfoPill: React.FC<{ children: React.ReactNode; isLink?: boolean }> = ({ children, isLink }) => (
    <span className={`bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full ${isLink ? 'transition-colors hover:bg-blue-100 hover:text-blue-800 cursor-pointer' : ''}`}>
        {children}
    </span>
);

const DiseaseDetailPage: React.FC = () => {
  const { diseaseId } = ReactRouterDOM.useParams<{ diseaseId: string }>();
  const { t, language } = useLanguage();
  const disease = DISEASES_DATA.find(d => d.id.toString() === diseaseId);

  if (!disease) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">{t('dd_notFoundTitle')}</h1>
        <p className="text-gray-600 mt-2">{t('dd_notFoundText')}</p>
        <ReactRouterDOM.Link to="/disease-database" className="mt-6 inline-block px-6 py-2 bg-[#8A9B6C] text-white font-semibold rounded-lg hover:bg-green-700">
          {t('dd_backLink')}
        </ReactRouterDOM.Link>
      </div>
    );
  }

  const getLang = (field_en: any, field_fr: any) => language === 'fr' ? field_fr : field_en;

  return (
    <div className="py-12 md:py-16 animate-fadeIn">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <ReactRouterDOM.Link to="/disease-database" className="flex items-center text-sm font-semibold text-gray-600 hover:text-black transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {t('dd_backLink')}
          </ReactRouterDOM.Link>
        </div>

        <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-manrope text-gray-800">{getLang(disease.name, disease.name_fr)}</h1>
                    <p className="text-md text-gray-500 mt-1 italic">{disease.scientificName}</p>
                    {disease.aliases.length > 0 && <p className="text-sm text-gray-500">{t('dd_aliases')}: {getLang(disease.aliases, disease.aliases_fr).join(', ')}</p>}
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <EtiologyBadge etiology={disease.etiology} />
                      <UrgencyBadge level={disease.urgency} />
                    </div>
                     <ZoonoticStatusBadge level={disease.zoonoticRisk} />
                    {disease.isNotifiableInMorocco && <NotifiableBadge />}
                </div>
            </div>
        </header>

        <div className="space-y-6">
            <DetailSection title={t('dd_sectionDescription')}>
                <p>{getLang(disease.description, disease.description_fr)}</p>
            </DetailSection>

            {disease.isNotifiableInMorocco && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg" role="alert">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertTriangleIcon className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold text-red-900">{t('dd_notifiableWarningTitle')}</h4>
                            <div className="mt-2 text-sm text-red-800">
                                <p>{t('dd_notifiableWarningText1')}</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>{t('dd_notifiableWarningList1')}</li>
                                    <li>{t('dd_notifiableWarningList2')}</li>
                                    <li>{t('dd_notifiableWarningList3')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                <DetailSection title={t('dd_sectionSpecies')}>
                    <div className="flex flex-wrap gap-1.5">
                        {getLang(disease.speciesAffected, disease.speciesAffected_fr).map((s: string) => <InfoPill key={s}>{s}</InfoPill>)}
                    </div>
                </DetailSection>
                 <DetailSection title={t('dd_sectionSystems')}>
                    <div className="flex flex-wrap gap-1.5">
                        {getLang(disease.bodySystemAffected, disease.bodySystemAffected_fr).map((s: string) => <InfoPill key={s}>{s}</InfoPill>)}
                    </div>
                </DetailSection>
                 <DetailSection title={t('dd_sectionTransmission')}>
                    <p>{getLang(disease.transmission, disease.transmission_fr)}</p>
                </DetailSection>
            </div>

            {disease.moroccoNote && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">{t('dd_moroccoNoteTitle')}</h4>
                    <p className="text-sm text-yellow-800 mt-1">{getLang(disease.moroccoNote, disease.moroccoNote_fr)}</p>
                </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
                <DetailSection title={t('dd_sectionSymptoms')}>
                    <ul className="list-disc pl-5 space-y-1">
                        {getLang(disease.symptoms, disease.symptoms_fr).map((symptom: string) => <li key={symptom}>{symptom}</li>)}
                    </ul>
                </DetailSection>
                <DetailSection title={t('dd_sectionLesions')}>
                    <ul className="list-disc pl-5 space-y-1">
                        {getLang(disease.lesionsAtNecropsy, disease.lesionsAtNecropsy_fr).map((lesion: string) => <li key={lesion}>{lesion}</li>)}
                    </ul>
                </DetailSection>
                <DetailSection title={t('dd_sectionTreatment')}>
                    <p>{getLang(disease.treatment, disease.treatment_fr)}</p>
                </DetailSection>
                <DetailSection title={t('dd_sectionPrevention')}>
                    <p>{getLang(disease.prevention, disease.prevention_fr)}</p>
                </DetailSection>
            </div>
            
            <DetailSection title={t('dd_sectionDifferential')}>
                 <div className="flex flex-wrap gap-1.5">
                    {getLang(disease.differentialDiagnosis, disease.differentialDiagnosis_fr).map((diagnosisName: string) => {
                        const lowerDiagnosisName = diagnosisName.toLowerCase().trim();
                        // Find a disease that matches the diagnosis string in either language
                        const matchedDisease = DISEASES_DATA.find(d => {
                             const englishMatch = d.name.toLowerCase().includes(lowerDiagnosisName) || d.aliases.some(alias => alias.toLowerCase().includes(lowerDiagnosisName));
                             const frenchMatch = d.name_fr.toLowerCase().includes(lowerDiagnosisName) || d.aliases_fr.some(alias => alias.toLowerCase().includes(lowerDiagnosisName));
                             return englishMatch || frenchMatch;
                        });

                        if (matchedDisease) {
                            return (
                                <ReactRouterDOM.Link to={`/disease-database/${matchedDisease.id}`} key={diagnosisName}>
                                    <InfoPill isLink>{diagnosisName}</InfoPill>
                                </ReactRouterDOM.Link>
                            );
                        }
                        
                        // Render a non-clickable pill if no match is found
                        return <InfoPill key={diagnosisName}>{diagnosisName}</InfoPill>;
                    })}
                </div>
            </DetailSection>
            
            <DetailSection title={t('dd_sectionReferences')}>
                <ul className="list-disc pl-5 space-y-1">
                    {disease.references.map((ref, index) => (
                      <li key={index}>
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {ref.text}
                        </a>
                      </li>
                    ))}
                </ul>
            </DetailSection>

            <div className="text-right text-sm text-gray-400 pt-4">
                {t('dd_lastReviewed')}: {disease.lastReviewed}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetailPage;
