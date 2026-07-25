import React from 'react';
import { MessageSquareQuote, Mail, Lock, Sparkles } from 'lucide-react';

export default function Step5Reflection({ data, updateData, onSubmit }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Personal Reflection
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Express whatever is on your heart. Writing things down externalizes emotional burden.
        </p>
      </div>

      {/* Mind Reflection Textarea */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <MessageSquareQuote className="w-4 h-4 text-sage-500" />
          <span>What's been occupying your mind lately?</span>
        </label>
        <textarea
          rows="4"
          placeholder="Feel free to write your thoughts, worries, or simple notes here..."
          value={data.thoughts || ''}
          onChange={(e) => updateData({ thoughts: e.target.value })}
          className="w-full p-4 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all duration-200 placeholder:text-slate-400"
        />
      </div>

      {/* Email Input */}
      <div className="bg-white/40 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Mail className="w-4 h-4 text-soft-blue-500" />
          <span>Email Address (Optional)</span>
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          value={data.email || ''}
          onChange={(e) => updateData({ email: e.target.value })}
          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-soft-blue-300"
        />
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Lock className="w-3.5 h-3.5 text-sage-500" />
          <span>We only use your email to send your personalised wellness report.</span>
        </div>
      </div>

      {/* Large Submit Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sage-300 via-soft-blue-300 to-lavender-200 dark:from-sage-600 dark:via-soft-blue-600 dark:to-lavender-600 text-slate-800 dark:text-white font-bold text-base shadow-lg glow-sage hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-slate-800 dark:text-white animate-spin-slow" />
          <span>Generate My Reflection</span>
        </button>
      </div>
    </div>
  );
}
