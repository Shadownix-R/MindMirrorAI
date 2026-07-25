import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, Settings, HeartHandshake, ShieldCheck, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, webhookUrl, setWebhookUrl }) {
  const [showSettings, setShowSettings] = useState(false);
  const [tempUrl, setTempUrl] = useState(webhookUrl);

  useEffect(() => {
    setTempUrl(webhookUrl);
  }, [webhookUrl]);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setWebhookUrl(tempUrl);
    setShowSettings(false);
  };

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
            {/* Settings button */}
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="n8n Webhook Settings"
            >
              <Settings className="w-5 h-5" />
              {webhookUrl && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sage-400"></span>
              )}
            </button>

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

      {/* Settings Modal for n8n Webhook configuration */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 relative shadow-2xl">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-soft-blue-100 dark:bg-soft-blue-900/40 text-soft-blue-600 dark:text-soft-blue-300">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">n8n Webhook Settings</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure your n8n workflow endpoint</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  n8n Webhook URL (POST)
                </label>
                <input
                  type="url"
                  placeholder="https://your-n8n-instance.com/webhook/..."
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sage-300"
                />
                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  MindMirror AI posts JSON reflection payloads to this URL. If empty or offline, our fallback AI reflection engine generates responses automatically.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium rounded-xl bg-sage-300 dark:bg-sage-600 text-slate-800 dark:text-white hover:bg-sage-400"
                >
                  Save Webhook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
