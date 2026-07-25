import React, { useState, useEffect } from 'react';
import { Play, Pause, Wind } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynth';

const PHASES = [
  { name: 'Inhale', duration: 4, prompt: 'Inhale slowly through your nose...', scale: 'scale-[1.25]' },
  { name: 'Hold', duration: 4, prompt: 'Hold your breath softly...', scale: 'scale-[1.25]' },
  { name: 'Exhale', duration: 4, prompt: 'Exhale gently through your mouth...', scale: 'scale-[0.85]' },
  { name: 'Rest', duration: 4, prompt: 'Pause and rest your body...', scale: 'scale-[0.85]' },
];

export default function GuidedBreathing() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextIdx = (phaseIdx + 1) % PHASES.length;
            setPhaseIdx(nextIdx);
            soundEngine.playBreathingChime();
            return PHASES[nextIdx].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phaseIdx]);

  const toggleBreathing = () => {
    if (!isActive) {
      soundEngine.playBreathingChime();
    }
    setIsActive(!isActive);
  };

  const currentPhase = PHASES[phaseIdx];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-lg relative overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-4 w-full">
        <div className="p-2 rounded-xl bg-soft-blue-100 dark:bg-soft-blue-900/40 text-soft-blue-600 dark:text-soft-blue-300">
          <Wind className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Guided Breathing</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">4-4-4 Box Breathing Cycle</p>
        </div>
      </div>

      {/* Animated Breathing Circle */}
      <div className="my-6 relative flex items-center justify-center">
        <div
          className={`w-36 h-36 rounded-full bg-gradient-to-tr from-soft-blue-200 via-sage-200 to-lavender-200 dark:from-soft-blue-900/50 dark:via-sage-900/50 dark:to-lavender-900/50 flex items-center justify-center shadow-inner transition-transform duration-[4000ms] ease-in-out ${
            isActive ? currentPhase.scale : 'scale-100'
          }`}
        >
          <div className="w-24 h-24 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-600 dark:text-sage-300">
              {isActive ? currentPhase.name : 'Ready'}
            </span>
            {isActive && (
              <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                {timeLeft}s
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Guidance Text */}
      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center min-h-[32px] mb-4">
        {isActive ? currentPhase.prompt : 'Click start to begin your breathing pause.'}
      </p>

      {/* Control Button */}
      <button
        onClick={toggleBreathing}
        className={`w-full py-3 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
          isActive
            ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200'
            : 'bg-soft-blue-300 dark:bg-soft-blue-600 text-slate-800 dark:text-white hover:bg-soft-blue-400'
        }`}
      >
        {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        <span>{isActive ? 'Pause Exercise' : 'Start Guided Breath'}</span>
      </button>
    </div>
  );
}
