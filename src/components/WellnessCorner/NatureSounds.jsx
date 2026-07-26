import { useState } from 'react';
import { Volume2, VolumeX, CloudRain, Trees, Waves } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynth';

const SOUND_OPTIONS = [
  { id: 'rain', label: 'Rain', icon: CloudRain, color: 'hover:bg-blue-100 text-blue-600 dark:text-blue-300' },
  { id: 'forest', label: 'Forest', icon: Trees, color: 'hover:bg-emerald-100 text-emerald-600 dark:text-emerald-300' },
  { id: 'ocean', label: 'Ocean', icon: Waves, color: 'hover:bg-teal-100 text-teal-600 dark:text-teal-300' },
  { id: 'mute', label: 'Mute', icon: VolumeX, color: 'hover:bg-slate-100 text-slate-600 dark:text-slate-300' },
];

export default function NatureSounds() {
  const [activeSound, setActiveSound] = useState('mute');

  const handleSelectSound = (soundId) => {
    setActiveSound(soundId);
    soundEngine.setSound(soundId);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-500">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Nature Soundscapes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Synthesized organic sound loops</p>
          </div>
        </div>

        {/* Audio Pulse Wave */}
        {activeSound !== 'mute' && (
          <div className="flex items-end gap-1 h-4">
            <span className="w-1 bg-teal-400 rounded-full h-full animate-bounce"></span>
            <span className="w-1 bg-teal-400 rounded-full h-2 animate-pulse"></span>
            <span className="w-1 bg-teal-400 rounded-full h-3 animate-bounce"></span>
          </div>
        )}
      </div>

      {/* Sound Options Grid */}
      <div className="grid grid-cols-2 gap-3 my-2">
        {SOUND_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = activeSound === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectSound(opt.id)}
              className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-200 ${
                isSelected
                  ? 'bg-teal-100 dark:bg-teal-900/60 border-teal-400 text-teal-900 dark:text-teal-100 font-bold shadow-md scale-[1.03]'
                  : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${opt.color}`} />
              <span className="text-xs">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-3">
        {activeSound === 'mute'
          ? 'Tap any soundscape above to activate ambient audio.'
          : `Playing soothing ${activeSound} soundscape...`}
      </p>
    </div>
  );
}
