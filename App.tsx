
import React from 'react';
// FIX: Updated react-router-dom import to a namespace import to fix module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import DiseaseDatabasePage from './pages/DiseaseDatabasePage';
import DiseaseDetailPage from './pages/DiseaseDetailPage';
import ScrollToTop from './components/ScrollToTop';
import PreventionPage from './pages/PreventionPage';
import PreventionTopicPage from './pages/PreventionTopicPage';
import BreedsPage from './pages/BreedsPage';
import BreedDetailPage from './pages/BreedDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import VisualLibraryPage from './pages/VisualLibraryPage';
import LesionSystemPage from './pages/LesionSystemPage';
import AboutUsPage from './pages/AboutUsPage';
import ChatAssistant from './components/ChatAssistant';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ReactRouterDOM.HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#333333]">
          <Header />
          <main className="flex-grow">
            <ReactRouterDOM.Routes>
              <ReactRouterDOM.Route path="/" element={<HomePage />} />
              <ReactRouterDOM.Route path="/diagnostics-playground" element={<SymptomCheckerPage />} />
              <ReactRouterDOM.Route path="/disease-database" element={<DiseaseDatabasePage />} />
              <ReactRouterDOM.Route path="/disease-database/:diseaseId" element={<DiseaseDetailPage />} />
              <ReactRouterDOM.Route path="/prevention" element={<PreventionPage />} />
              <ReactRouterDOM.Route path="/prevention/:topicId" element={<PreventionTopicPage />} />
              <ReactRouterDOM.Route path="/visual-library" element={<VisualLibraryPage />} />
              <ReactRouterDOM.Route path="/visual-library/:systemId" element={<LesionSystemPage />} />
              <ReactRouterDOM.Route path="/breeds" element={<BreedsPage />} />
              <ReactRouterDOM.Route path="/breeds/:breedId" element={<BreedDetailPage />} />
              <ReactRouterDOM.Route path="/resources" element={<ResourcesPage />} />
              <ReactRouterDOM.Route path="/about-us" element={<AboutUsPage />} />
            </ReactRouterDOM.Routes>
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      </ReactRouterDOM.HashRouter>
    </LanguageProvider>
  );
};

export default App;
