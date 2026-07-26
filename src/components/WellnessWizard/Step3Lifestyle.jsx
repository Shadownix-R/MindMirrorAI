import { Moon, CheckSquare, Square } from 'lucide-react';

const SLEEP_OPTIONS = [
  { label: 'Excellent', icon: '✨' },
  { label: 'Good', icon: '😴' },
  { label: 'Average', icon: '🥱' },
  { label: 'Poor', icon: '🛌' },
  { label: 'Very Poor', icon: '🌩️' },
];

const HABIT_OPTIONS = [
  'Ate properly today',
  'Went outside',
  'Exercised recently',
  'Talked to someone recently',
];

export default function Step3Lifestyle({ data, updateData }) {
  const toggleHabit = (habit) => {
    const current = data.habits || [];
    if (current.includes(habit)) {
      updateData({ habits: current.filter((h) => h !== habit) });
    } else {
      updateData({ habits: [...current, habit] });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Lifestyle & Daily Rhythm
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Small habits build our biological foundation. How has your routine been?
        </p>
      </div>

      {/* Sleep Quality */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          <Moon className="w-4 h-4 text-lavender-500" />
          <span>Sleep Quality</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SLEEP_OPTIONS.map((opt) => {
            const isSelected = data.sleepQuality === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => updateData({ sleepQuality: opt.label })}
                className={`py-3.5 px-2 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-lavender-100 dark:bg-lavender-900/60 border-lavender-400 dark:border-lavender-400 text-lavender-900 dark:text-lavender-100 font-semibold shadow-sm scale-[1.03]'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-lavender-300'
                }`}
              >
                <span className="text-xl">{opt.icon}</span>
                <span className="text-xs">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Habits Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Today&apos;s Positive Habits
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HABIT_OPTIONS.map((habit) => {
            const isChecked = (data.habits || []).includes(habit);
            return (
              <button
                key={habit}
                type="button"
                onClick={() => toggleHabit(habit)}
                className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-medium transition-all duration-200 ${
                  isChecked
                    ? 'bg-sage-100 dark:bg-sage-900/50 border-sage-400 text-sage-900 dark:text-sage-100 shadow-sm'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-sage-300'
                }`}
              >
                <span>{habit}</span>
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-sage-600 dark:text-sage-300" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
