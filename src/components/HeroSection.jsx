import { Sparkles, Compass } from 'lucide-react';

export default function HeroSection({ onStartClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blob 1: Soft Blue */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-soft-blue-300/40 dark:bg-soft-blue-600/20 blur-3xl animate-blob-slow"></div>
        {/* Blob 2: Sage Green */}
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-sage-300/40 dark:bg-sage-600/20 blur-3xl animate-blob-delayed"></div>
        {/* Blob 3: Light Lavender */}
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-lavender-100/60 dark:bg-lavender-500/15 blur-3xl animate-blob-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm mb-8 backdrop-blur-md animate-float">
          <Sparkles className="w-4 h-4 text-soft-blue-600 dark:text-soft-blue-400" />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
            A Safe, Peaceful Space for Emotional Clarity
          </span>
        </div>

        {/* Large Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15] mb-6">
          Take a Moment <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-soft-blue-600 via-sage-500 to-lavender-500 bg-clip-text text-transparent">
            for Yourself.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          MindMirror AI helps you understand your emotions through a short wellness journey and provides personalised suggestions and a private wellness report.
        </p>

        {/* Call to Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sage-300 dark:bg-sage-600 hover:bg-sage-400 dark:hover:bg-sage-500 text-slate-800 dark:text-white font-semibold text-base shadow-lg glow-sage hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Start Wellness Journey</span>
            <Compass className="w-5 h-5 text-slate-800 dark:text-white group-hover:rotate-45 transition-transform duration-300" />
          </button>

          <a
            href="#corner"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-base border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Explore Relaxation Corner</span>
          </a>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-sage-400"></span>
            100% Private & Anonymous
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-soft-blue-400"></span>
            2-Minute Guided Check-in
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-lavender-400"></span>
            Powered by n8n Workflows
          </div>
        </div>

      </div>
    </section>
  );
}
