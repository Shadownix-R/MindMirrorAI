import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WizardContainer from './components/WellnessWizard/WizardContainer';
import AIProcessingModal from './components/AIProcessingModal';
import ResultsReport from './components/ResultsReport';
import GuidedBreathing from './components/WellnessCorner/GuidedBreathing';
import MoodGarden from './components/WellnessCorner/MoodGarden';
import GratitudeWall from './components/WellnessCorner/GratitudeWall';
import BubblePop from './components/WellnessCorner/BubblePop';
import NatureSounds from './components/WellnessCorner/NatureSounds';
import Footer from './components/Footer';

import { submitToN8nWebhook } from './utils/n8nApi';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://rushil13.app.n8n.cloud/webhook/mindmirror-assessment');
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [n8nStatus, setN8nStatus] = useState(null);

  // Synchronize Dark Mode Class on Root Document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to Wizard
  const handleStartClick = () => {
    const wizardEl = document.getElementById('journey');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Complete Wizard -> Send JSON to n8n Webhook & Generate Reflection
  const handleWizardComplete = async (formData) => {
    setIsProcessing(true);
    setUserEmail(formData.email || '');

    try {
      // Simulate/Trigger API submission
      const result = await submitToN8nWebhook(formData, webhookUrl);
      setN8nStatus({
        success: result.webhookSuccess,
        info: result.diagnosticInfo,
      });

      // Brief delay for calming animation experience
      setTimeout(() => {
        setReportData(result.report);
        setIsProcessing(false);

        // Smooth scroll to results
        setTimeout(() => {
          const resultsEl = document.getElementById('results');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 3500);
    } catch (err) {
      console.error("Submission error", err);
      setIsProcessing(false);
    }
  };

  // Reset Reflection Journey
  const handleResetReflection = () => {
    setReportData(null);
    setN8nStatus(null);
    setTimeout(() => {
      handleStartClick();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-calm-slate-50 dark:bg-calm-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 relative selection:bg-soft-blue-200 dark:selection:bg-soft-blue-800">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        webhookUrl={webhookUrl}
        setWebhookUrl={setWebhookUrl}
      />

      {/* Hero Section */}
      <HeroSection onStartClick={handleStartClick} />

      {/* Main Content Area */}
      <main className="space-y-16">
        
        {/* Wizard Assessment or Results Report */}
        {!reportData ? (
          <WizardContainer onComplete={handleWizardComplete} />
        ) : (
          <ResultsReport
            report={reportData}
            userEmail={userEmail}
            webhookUrl={webhookUrl}
            n8nStatus={n8nStatus}
            onReset={handleResetReflection}
          />
        )}

        {/* AI Loading Processing Overlay */}
        {isProcessing && <AIProcessingModal />}

        {/* Interactive Wellness Corner */}
        <section id="corner" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-blue-100 dark:bg-soft-blue-900/60 text-soft-blue-800 dark:text-soft-blue-200 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Relaxation Suite</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Interactive Wellness Corner
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Engage with ambient relaxation micro-tools whenever you need a calming mental break.
            </p>
          </div>

          {/* Grid of 5 Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GuidedBreathing />
            <MoodGarden initialGrowth={reportData ? 85 : 35} />
            <GratitudeWall />
            <BubblePop />
            <div className="md:col-span-2 lg:col-span-1">
              <NatureSounds />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
