import { useState } from 'react';
import { Sparkles, RefreshCw, XCircle } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynth';

const INITIAL_BUBBLES = [
  { id: 1, text: 'Anxiety', color: 'from-rose-200 to-rose-300 dark:from-rose-900/60 dark:to-rose-800/60 text-rose-900 dark:text-rose-100' },
  { id: 2, text: 'Self-Doubt', color: 'from-amber-200 to-amber-300 dark:from-amber-900/60 dark:to-amber-800/60 text-amber-900 dark:text-amber-100' },
  { id: 3, text: 'Burnout', color: 'from-orange-200 to-orange-300 dark:from-orange-900/60 dark:to-orange-800/60 text-orange-900 dark:text-orange-100' },
  { id: 4, text: 'Overwhelm', color: 'from-purple-200 to-purple-300 dark:from-purple-900/60 dark:to-purple-800/60 text-purple-900 dark:text-purple-100' },
  { id: 5, text: 'Pressure', color: 'from-blue-200 to-blue-300 dark:from-blue-900/60 dark:to-blue-800/60 text-blue-900 dark:text-blue-100' },
  { id: 6, text: 'Perfectionism', color: 'from-teal-200 to-teal-300 dark:from-teal-900/60 dark:to-teal-800/60 text-teal-900 dark:text-teal-100' },
];

export default function BubblePop() {
  const [bubbles, setBubbles] = useState(INITIAL_BUBBLES);
  const [poppedCount, setPoppedCount] = useState(0);

  const popBubble = (id) => {
    soundEngine.playBubblePopSFX();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setPoppedCount((prev) => prev + 1);
  };

  const resetBubbles = () => {
    setBubbles(INITIAL_BUBBLES);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-500">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Bubble Pop Release</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Click to dissolve heavy thoughts</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
          {poppedCount} Released
        </span>
      </div>

      {/* Bubble Playing Field */}
      <div className="my-2 min-h-[170px] p-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-2.5 items-center justify-center relative">
        {bubbles.length > 0 ? (
          bubbles.map((bubble) => (
            <button
              key={bubble.id}
              onClick={() => popBubble(bubble.id)}
              className={`px-4 py-2.5 rounded-full bg-gradient-to-r ${bubble.color} font-bold text-xs shadow-md hover:scale-110 active:scale-75 transition-all duration-200 animate-float`}
            >
              🫧 {bubble.text}
            </button>
          ))
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <Sparkles className="w-8 h-8 text-sage-400 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              All heavy thoughts dissolved!
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Take a slow, peaceful breath.
            </p>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetBubbles}
        className="w-full py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 mt-4"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reset Bubbles</span>
      </button>
    </div>
  );
}
