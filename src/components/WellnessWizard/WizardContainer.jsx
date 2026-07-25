import React, { useState } from 'react';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Feelings from './Step2Feelings';
import Step3Lifestyle from './Step3Lifestyle';
import Step4StressSource from './Step4StressSource';
import Step5Reflection from './Step5Reflection';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WizardContainer({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ageGroup: '18–24',
    occupation: 'Working Professional',
    moodEmoji: '😌',
    moodLabel: 'Calm',
    stressLevel: 5,
    energyLevel: 6,
    sleepQuality: 'Good',
    habits: ['Ate properly today', 'Went outside'],
    stressSource: 'Work',
    thoughts: '',
    email: '',
  });

  const updateFormData = (patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const stepTitles = [
    'Basic Information',
    'Current Feelings',
    'Lifestyle & Habits',
    'Main Stress Area',
    'Personal Reflection',
  ];

  return (
    <section id="journey" className="py-12 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative transition-all duration-300">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="uppercase tracking-wider">Step {currentStep} of 5</span>
            <span className="text-sage-600 dark:text-sage-300">{stepTitles[currentStep - 1]}</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-soft-blue-300 via-sage-300 to-lavender-300 dark:from-soft-blue-500 dark:via-sage-500 dark:to-lavender-500 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between items-center mt-3">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div
                key={stepNum}
                onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                className={`flex items-center gap-1 cursor-pointer transition-all ${
                  stepNum === currentStep
                    ? 'text-sage-600 dark:text-sage-300 font-bold scale-110'
                    : stepNum < currentStep
                    ? 'text-soft-blue-600 dark:text-soft-blue-300 font-medium'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    stepNum === currentStep
                      ? 'bg-sage-300 dark:bg-sage-600 text-slate-900 dark:text-white'
                      : stepNum < currentStep
                      ? 'bg-soft-blue-100 dark:bg-soft-blue-900/60 text-soft-blue-700 dark:text-soft-blue-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {stepNum < currentStep ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[360px]">
          {currentStep === 1 && <Step1BasicInfo data={formData} updateData={updateFormData} />}
          {currentStep === 2 && <Step2Feelings data={formData} updateData={updateFormData} />}
          {currentStep === 3 && <Step3Lifestyle data={formData} updateData={updateFormData} />}
          {currentStep === 4 && <Step4StressSource data={formData} updateData={updateFormData} />}
          {currentStep === 5 && <Step5Reflection data={formData} updateData={updateFormData} onSubmit={handleSubmit} />}
        </div>

        {/* Wizard Footer Controls (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200/60 dark:border-slate-800/60">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentStep === 1
                  ? 'opacity-0 pointer-events-none'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-300 dark:bg-sage-600 hover:bg-sage-400 dark:hover:bg-sage-500 text-slate-800 dark:text-white font-semibold text-sm shadow-md transition-all duration-200"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
