import React, { useState } from 'react';
import { Star, Plus, Sparkles } from 'lucide-react';

const DEFAULT_STARS = [
  { id: 1, text: 'Warm sunshine on my morning walk', x: 20, y: 30, size: 'w-4 h-4' },
  { id: 2, text: 'A supportive phone call with a friend', x: 75, y: 25, size: 'w-5 h-5' },
  { id: 3, text: 'A quiet cup of tea before work', x: 45, y: 65, size: 'w-4 h-4' },
  { id: 4, text: 'Finishing a hard project step', x: 80, y: 70, size: 'w-3.5 h-3.5' },
  { id: 5, text: 'Laughter during lunch', x: 15, y: 75, size: 'w-4 h-4' },
];

export default function GratitudeWall() {
  const [stars, setStars] = useState(DEFAULT_STARS);
  const [note, setNote] = useState('');
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleAddGratitude = (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newStar = {
      id: Date.now(),
      text: note.trim(),
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 70) + 15,
      size: 'w-5 h-5',
    };

    setStars((prev) => [...prev, newStar]);
    setHoveredStar(newStar);
    setNote('');
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-500">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Gratitude Constellation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Post a thought to ignite a star</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
          {stars.length} Stars
        </span>
      </div>

      {/* Star Sky Container */}
      <div className="relative w-full h-44 my-2 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-inner">
        
        {/* Constellation Canvas Stars */}
        {stars.map((star) => (
          <button
            key={star.id}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => setHoveredStar(star)}
            className="absolute transition-transform duration-300 hover:scale-150 focus:outline-none group"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <Star className={`${star.size} text-amber-300 fill-amber-300 animate-pulse drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]`} />
          </button>
        ))}

        {/* Hovered Star Tooltip Note */}
        {hoveredStar ? (
          <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-800/90 text-amber-200 text-xs backdrop-blur-md border border-amber-300/30 flex items-center gap-2 animate-fade-in shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="truncate">"{hoveredStar.text}"</span>
          </div>
        ) : (
          <div className="absolute top-3 left-3 text-[10px] text-slate-400 font-medium">
            Hover over stars to read gratitude thoughts...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleAddGratitude} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="I am grateful for..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs shadow-sm transition-all shrink-0 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span>Star</span>
        </button>
      </form>
    </div>
  );
}
