import React, { useState } from 'react';
import { Sprout, Droplets, Sparkles } from 'lucide-react';

export default function MoodGarden({ initialGrowth = 35 }) {
  const [growth, setGrowth] = useState(initialGrowth);
  const [isWatering, setIsWatering] = useState(false);

  const handleWater = () => {
    if (growth >= 100) return;
    setIsWatering(true);
    setTimeout(() => {
      setGrowth((prev) => Math.min(100, prev + 20));
      setIsWatering(false);
    }, 600);
  };

  const getPlantStage = () => {
    if (growth < 30) return { title: 'Seedling', desc: 'Nurture your calm daily.', icon: '🌱' };
    if (growth < 60) return { title: 'Young Sprout', desc: 'Growing strong roots.', icon: '🌿' };
    if (growth < 90) return { title: 'Blooming Sapling', desc: 'Emotional clarity blossoming.', icon: '🪴' };
    return { title: 'Lush Sanctuary Flower', desc: 'Fully nourished & flourishing!', icon: '🌸' };
  };

  const stage = getPlantStage();

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-lg relative overflow-hidden h-full">
      <div className="flex items-center gap-2 mb-4 w-full">
        <div className="p-2 rounded-xl bg-sage-100 dark:bg-sage-900/40 text-sage-600 dark:text-sage-300">
          <Sprout className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Mood Garden</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Nurture with reflections</p>
        </div>
      </div>

      {/* Plant Canvas Graphic */}
      <div className="my-4 relative flex flex-col items-center justify-center">
        {/* Pot & Plant Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div
            className={`text-6xl sm:text-7xl transition-all duration-500 transform ${
              isWatering ? 'scale-110 rotate-6' : 'hover:scale-105'
            }`}
          >
            {stage.icon}
          </div>

          {/* Droplet Animation Overlay */}
          {isWatering && (
            <div className="absolute -top-4 text-blue-400 animate-bounce">
              <Droplets className="w-6 h-6 fill-current" />
            </div>
          )}
        </div>

        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">
          {stage.title}
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
          {stage.desc}
        </span>
      </div>

      {/* Growth Progress Bar */}
      <div className="w-full space-y-1.5 mb-4">
        <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          <span>Garden Vitality</span>
          <span>{growth}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage-300 to-sage-500 transition-all duration-500"
            style={{ width: `${growth}%` }}
          />
        </div>
      </div>

      {/* Water Button */}
      <button
        onClick={handleWater}
        disabled={growth >= 100}
        className={`w-full py-3 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
          growth >= 100
            ? 'bg-sage-100 text-sage-700 cursor-default'
            : 'bg-sage-300 dark:bg-sage-600 text-slate-800 dark:text-white hover:bg-sage-400 shadow-sm'
        }`}
      >
        {growth >= 100 ? (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Garden Fully Bloomed</span>
          </>
        ) : (
          <>
            <Droplets className="w-4 h-4" />
            <span>Water Garden (+20%)</span>
          </>
        )}
      </button>
    </div>
  );
}
