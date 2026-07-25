import React from 'react';
import { Smile, Flame, Zap } from 'lucide-react';

const MOODS = [
  { emoji: '😊', label: 'Happy', color: 'from-amber-200 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40' },
  { emoji: '😌', label: 'Calm', color: 'from-sage-200 to-sage-100 dark:from-sage-900/40 dark:to-sage-800/40' },
  { emoji: '😐', label: 'Neutral', color: 'from-slate-200 to-slate-100 dark:from-slate-800/60 dark:to-slate-700/60' },
  { emoji: '😟', label: 'Worried', color: 'from-soft-blue-200 to-soft-blue-100 dark:from-soft-blue-900/40 dark:to-soft-blue-800/40' },
  { emoji: '😔', label: 'Sad', color: 'from-lavender-200 to-lavender-100 dark:from-lavender-900/40 dark:to-lavender-800/40' },
  { emoji: '😫', label: 'Overwhelmed', color: 'from-rose-200 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/40' },
];

export default function Step2Feelings({ data, updateData }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Current Feelings
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tune in to how your mind and body are feeling right at this moment.
        </p>
      </div>

      {/* Mood Selector Grid */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          <Smile className="w-4 h-4 text-amber-500" />
          <span>Select Your Mood</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MOODS.map((m) => {
            const isSelected = data.moodLabel === m.label;
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => updateData({ moodEmoji: m.emoji, moodLabel: m.label })}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 group ${
                  isSelected
                    ? `bg-gradient-to-b ${m.color} border-sage-400 dark:border-sage-400 ring-2 ring-sage-400/50 scale-[1.05] shadow-md`
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-sage-300 hover:scale-[1.02]'
                }`}
              >
                <span className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
                  {m.emoji}
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stress Level Slider */}
      <div className="bg-white/40 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Stress Level</span>
          </label>
          <span className="text-sm font-bold px-3 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
            {data.stressLevel} / 10
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={data.stressLevel}
          onChange={(e) => updateData({ stressLevel: parseInt(e.target.value, 10) })}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
          <span>1 (Very Calm)</span>
          <span>5 (Moderate)</span>
          <span>10 (Extremely High)</span>
        </div>
      </div>

      {/* Energy Level Slider */}
      <div className="bg-white/40 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Energy Level</span>
          </label>
          <span className="text-sm font-bold px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
            {data.energyLevel} / 10
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={data.energyLevel}
          onChange={(e) => updateData({ energyLevel: parseInt(e.target.value, 10) })}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
          <span>1 (Drained)</span>
          <span>5 (Balanced)</span>
          <span>10 (Fully Energized)</span>
        </div>
      </div>
    </div>
  );
}
