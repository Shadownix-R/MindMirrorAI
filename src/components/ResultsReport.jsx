import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, MailCheck, RotateCcw, Sparkles, CheckCircle2, Quote, Flame, Zap, Moon, Heart, Shield, Award } from 'lucide-react';
import { downloadWellnessReport } from '../utils/exportReport';
import { triggerEmailSend } from '../utils/n8nApi';

export default function ResultsReport({ report, userEmail, webhookUrl, n8nStatus, onReset }) {
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Fire festive celebration confetti on load
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A7D8F0', '#9DBA9E', '#E8E5F8'],
      });
    } catch (e) {
      console.log('Confetti error', e);
    }
  }, []);

  const handleDownload = () => {
    downloadWellnessReport(report, userEmail);
  };

  const handleEmailToggle = async () => {
    setEmailSent(true);
    if (userEmail && webhookUrl) {
      await triggerEmailSend(webhookUrl, report, userEmail);
    }
  };

  if (!report) return null;

  return (
    <section id="results" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto animate-fade-in">
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900/50 text-sage-800 dark:text-sage-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wellness Reflection Complete</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Your Personal Wellness Mirror
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-lg mx-auto">
            Here is your holistic reflection breakdown and tailored micro-actions for today.
          </p>

          {/* n8n Connection Status Badge */}
          {n8nStatus && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border bg-white/70 dark:bg-slate-800/70 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${n8nStatus.success ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>
                {n8nStatus.success
                  ? 'n8n Workflow Connected & Responded (200 OK)'
                  : `n8n Cloud Status: ${n8nStatus.info?.statusCode ? `HTTP ${n8nStatus.info.statusCode}` : 'Using Safe Fallback AI'}`}
              </span>
            </div>
          )}
        </div>

        {/* Large Circular Wellness Reflection Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Circular Summary Hero */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
            
            {/* Large Circular Badge */}
            <div className="relative shrink-0">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-soft-blue-200 via-sage-200 to-lavender-200 dark:from-soft-blue-900/60 dark:via-sage-900/60 dark:to-lavender-900/60 p-2 shadow-inner flex items-center justify-center glow-soft-blue">
                <div className="w-full h-full rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1">
                    Primary State
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                    {report.primaryEmotion}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              
              <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Stress Level</span>
                </div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {report.stressLevel}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold mb-1">
                  <Zap className="w-4 h-4" />
                  <span>Energy Level</span>
                </div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {report.energyLevel}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-lavender-500 text-xs font-semibold mb-1">
                  <Moon className="w-4 h-4" />
                  <span>Sleep Quality</span>
                </div>
                <div className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {report.sleepSummary}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 col-span-2 sm:col-span-2">
                <div className="flex items-center gap-2 text-sage-600 dark:text-sage-400 text-xs font-semibold mb-1">
                  <Heart className="w-4 h-4" />
                  <span>Positive Habits Logged</span>
                </div>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                  {report.positiveHabits}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-soft-blue-600 text-xs font-semibold mb-1">
                  <Shield className="w-4 h-4" />
                  <span>Stress Focus</span>
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  {report.mainStressArea}
                </div>
              </div>

            </div>
          </div>

          {/* AI Reflection Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sage-500" />
              <span>AI Reflection & Guidance</span>
            </h3>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sage-50/70 via-soft-blue-50/70 to-lavender-50/70 dark:from-slate-800/70 dark:via-slate-800/60 dark:to-slate-800/70 border border-sage-200/60 dark:border-slate-700/80 leading-relaxed text-sm sm:text-base text-slate-700 dark:text-slate-200">
              {report.aiReflection}
            </div>
          </div>

          {/* Action Plan (3 Personalized Recommendations) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-soft-blue-500" />
              <span>Personalised Action Plan</span>
            </h3>
            <div className="space-y-3">
              {(report.actionPlan || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3 shadow-sm hover:border-sage-300 transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-sage-200 dark:bg-sage-800 text-sage-800 dark:text-sage-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div
                    className="text-sm text-slate-700 dark:text-slate-200 leading-normal"
                    dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Today's Challenge & Motivational Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Today&apos;s Micro Challenge</span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {report.todaysChallenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-lavender-50/60 dark:bg-lavender-950/20 border border-lavender-200/70 dark:border-lavender-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-lavender-800 dark:text-lavender-300 uppercase tracking-wider mb-2">
                <Quote className="w-4 h-4" />
                <span>Daily Affirming Thought</span>
              </div>
              <p className="text-xs sm:text-sm font-medium italic text-slate-800 dark:text-slate-200 mb-1">
                &ldquo;{report.motivationalQuote?.text}&rdquo;
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                — {report.motivationalQuote?.author}
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
            
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sage-300 dark:bg-sage-600 hover:bg-sage-400 dark:hover:bg-sage-500 text-slate-800 dark:text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Summary</span>
            </button>

            <button
              onClick={handleEmailToggle}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                emailSent
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300'
                  : 'bg-soft-blue-200 dark:bg-soft-blue-800 hover:bg-soft-blue-300 text-slate-800 dark:text-white'
              }`}
            >
              <MailCheck className="w-4 h-4" />
              <span>{emailSent ? 'Email Sent ✓' : userEmail ? `Send Report to ${userEmail}` : 'Email Sent ✓'}</span>
            </button>

            <button
              onClick={onReset}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Reflection</span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
