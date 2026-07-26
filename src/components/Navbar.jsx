import { useState } from 'react';
import { Sparkles, Moon, Sun, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-soft-blue-300 via-sage-300 to-lavender-200 dark:from-soft-blue-600 dark:via-sage-600 dark:to-lavender-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-slate-800 dark:text-white animate-pulse-subtle" />
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight text-slate-800 dark:text-slate-100">
                Mind<span className="text-sage-500 dark:text-sage-300">Mirror</span> <span className="text-xs px-2 py-0.5 rounded-full bg-soft-blue-100 dark:bg-soft-blue-900/60 text-soft-blue-700 dark:text-soft-blue-300 font-medium">AI</span>
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#journey" className="hover:text-sage-600 dark:hover:text-sage-300 transition-colors">Wellness Journey</a>
            <a href="#results" className="hover:text-sage-600 dark:hover:text-sage-300 transition-colors">Your Reflection</a>
            <a href="#corner" className="hover:text-sage-600 dark:hover:text-sage-300 transition-colors">Wellness Corner</a>
            <a href="#footer" className="hover:text-sage-600 dark:hover:text-sage-300 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-sage-400" /> Privacy
            </a>
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* CTA Button */}
            <a
              href="#journey"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-sage-300 dark:bg-sage-600 text-slate-800 dark:text-white hover:bg-sage-400 dark:hover:bg-sage-500 shadow-sm transition-all duration-200"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Begin Pause</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
