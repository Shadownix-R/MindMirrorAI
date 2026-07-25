import React from 'react';
import { User, Briefcase } from 'lucide-react';

const AGE_GROUPS = ['Teens (<18)', '18–24', '25–34', '35–49', '50+'];
const OCCUPATIONS = [
  'Student',
  'Working Professional',
  'Job Seeker',
  'Homemaker',
  'Other'
];

export default function Step1BasicInfo({ data, updateData }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Basic Information
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Share a little context so we can tailor your reflection guide.
        </p>
      </div>

      {/* Age Group Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          <User className="w-4 h-4 text-soft-blue-500" />
          <span>Age Group</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {AGE_GROUPS.map((age) => {
            const isSelected = data.ageGroup === age;
            return (
              <button
                key={age}
                type="button"
                onClick={() => updateData({ ageGroup: age })}
                className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-medium border transition-all duration-200 ${
                  isSelected
                    ? 'bg-soft-blue-100 dark:bg-soft-blue-900/60 border-soft-blue-400 dark:border-soft-blue-500 text-soft-blue-800 dark:text-soft-blue-200 shadow-sm scale-[1.02]'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-soft-blue-300'
                }`}
              >
                {age}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occupation Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          <Briefcase className="w-4 h-4 text-sage-500" />
          <span>Occupation</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OCCUPATIONS.map((occ) => {
            const isSelected = data.occupation === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => updateData({ occupation: occ })}
                className={`py-3.5 px-4 rounded-2xl text-sm font-medium border text-left transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-sage-100 dark:bg-sage-900/60 border-sage-400 dark:border-sage-500 text-sage-900 dark:text-sage-100 shadow-sm scale-[1.02]'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-sage-300'
                }`}
              >
                <span>{occ}</span>
                <span className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-sage-500 border-sage-500' : 'border-slate-300 dark:border-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
