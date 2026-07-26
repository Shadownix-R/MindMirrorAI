import { BookOpen, Briefcase, Users, Heart, DollarSign, Activity, Compass, HelpCircle } from 'lucide-react';

const STRESS_SOURCES = [
  { id: 'Studies', label: 'Studies', icon: BookOpen, color: 'text-blue-500' },
  { id: 'Work', label: 'Work', icon: Briefcase, color: 'text-purple-500' },
  { id: 'Family', label: 'Family', icon: Users, color: 'text-emerald-500' },
  { id: 'Relationships', label: 'Relationships', icon: Heart, color: 'text-rose-500' },
  { id: 'Financial', label: 'Financial', icon: DollarSign, color: 'text-amber-500' },
  { id: 'Health', label: 'Health', icon: Activity, color: 'text-teal-500' },
  { id: 'Career', label: 'Career', icon: Compass, color: 'text-indigo-500' },
  { id: 'Other', label: 'Other', icon: HelpCircle, color: 'text-slate-500' },
];

export default function Step4StressSource({ data, updateData }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Main Source of Stress
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          What area of your life feels most demanding or heavy right now?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {STRESS_SOURCES.map((source) => {
          const Icon = source.icon;
          const isSelected = data.stressSource === source.id;
          return (
            <button
              key={source.id}
              type="button"
              onClick={() => updateData({ stressSource: source.id })}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-28 group ${
                isSelected
                  ? 'bg-soft-blue-100 dark:bg-soft-blue-900/60 border-soft-blue-400 dark:border-soft-blue-400 ring-2 ring-soft-blue-400/50 scale-[1.03] shadow-md'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-soft-blue-300 hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${source.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'bg-soft-blue-500 border-soft-blue-500' : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {source.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
