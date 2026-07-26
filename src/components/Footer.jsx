import { useState } from 'react';
import { ShieldCheck, AlertTriangle, PhoneCall, Heart, ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  const [showHelplines, setShowHelplines] = useState(false);

  return (
    <footer id="footer" className="mt-20 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          
          {/* Column 1: Brand & Privacy First */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-soft-blue-300 via-sage-300 to-lavender-200 dark:from-soft-blue-600 dark:via-sage-600 dark:to-lavender-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-800 dark:text-white" />
              </div>
              <span className="font-semibold text-base text-slate-800 dark:text-slate-100">
                MindMirror AI
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-sage-600 dark:text-sage-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy First Infrastructure</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No personal identity or sensitive trackable logs are stored. Reflection processing is routed via encrypted n8n webhooks for total privacy.
            </p>
          </div>

          {/* Column 2: Medical & AI Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Medical Disclaimer</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              MindMirror AI is an interactive emotional self-reflection companion tool. AI is not a replacement for mental health professionals, medical diagnosis, or therapy.
            </p>
          </div>

          {/* Column 3: Emergency & Crisis Support */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              <PhoneCall className="w-4 h-4" />
              <span>Immediate Support & Crisis Contacts</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              If someone feels unsafe or in crisis, encourage them to contact trusted people or professional emergency services immediately.
            </p>

            <button
              onClick={() => setShowHelplines(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-200 transition-colors"
            >
              <span>View 24/7 Crisis Helplines</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} MindMirror AI. Crafted for peaceful reflection.</p>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current inline" />
            <span>for emotional wellbeing</span>
          </div>
        </div>

      </div>

      {/* Helplines Modal */}
      {showHelplines && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full glass-card rounded-3xl p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
                <PhoneCall className="w-5 h-5" />
                <span>24/7 Crisis Support Helplines</span>
              </div>
              <button
                onClick={() => setShowHelplines(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-100">US & Canada (Call or Text)</p>
                <p className="text-rose-600 dark:text-rose-400 font-extrabold text-sm">988 Suicide & Crisis Lifeline</p>
                <p className="text-[11px] text-slate-500">Free, confidential, available 24/7</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-100">UK (Samaritans)</p>
                <p className="text-rose-600 dark:text-rose-400 font-extrabold text-sm">116 123</p>
                <p className="text-[11px] text-slate-500">Free 24/7 mental health support</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-100">International / Other Regions</p>
                <a
                  href="https://findahelpline.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-soft-blue-600 dark:text-soft-blue-400 underline font-medium flex items-center gap-1 mt-1"
                >
                  <span>findahelpline.com (Global Directory)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowHelplines(false)}
              className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-slate-300"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
