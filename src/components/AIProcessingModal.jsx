import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

const AFFIRMATIONS = [
  "You are doing better than you think.",
  "One small step is enough.",
  "Take a slow breath.",
  "Your feelings are valid and temporary.",
  "Giving yourself time to pause is an act of care.",
  "Trust the process of taking one moment at a time."
];

export default function AIProcessingModal() {
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAffirmationIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="max-w-md w-full glass-card rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute w-64 h-64 rounded-full bg-soft-blue-300/30 dark:bg-soft-blue-600/20 blur-3xl animate-blob-slow pointer-events-none"></div>

        {/* Breathing Circle Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer expansion ring */}
          <div className="w-36 h-36 rounded-full border-2 border-sage-300/60 dark:border-sage-500/40 animate-breathe flex items-center justify-center">
            {/* Inner glowing core */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-soft-blue-300 via-sage-300 to-lavender-200 dark:from-soft-blue-600 dark:via-sage-600 dark:to-lavender-500 opacity-90 shadow-xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-slate-800 dark:text-white animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Status Header */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Synthesizing Your Reflection...
        </h3>

        <p className="text-xs text-sage-600 dark:text-sage-300 font-medium mb-6 flex items-center gap-1.5 justify-center">
          <Heart className="w-3.5 h-3.5 fill-current" />
          Processing with care & n8n privacy workflows
        </p>

        {/* Dynamic Affirmation Card */}
        <div className="w-full min-h-[70px] p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center transition-all duration-500">
          <p className="text-sm font-medium italic text-slate-700 dark:text-slate-200 transition-opacity duration-500 key={affirmationIndex}">
            "{AFFIRMATIONS[affirmationIndex]}"
          </p>
        </div>

      </div>
    </div>
  );
}
