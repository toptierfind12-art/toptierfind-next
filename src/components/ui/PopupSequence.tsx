'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ArrowRight, CheckCircle } from 'lucide-react';

type PopupStep = 'email' | 'survey' | 'offer' | null;

const POPUP_KEY = 'ttf_popup_visit';
const POPUP_SHOWN_KEY = 'ttf_popup_shown';

const quizOptions = [
  { emoji: '🔥', label: 'Weight Loss' },
  { emoji: '💪', label: 'Fitness' },
  { emoji: '✨', label: 'Skincare' },
  { emoji: '💰', label: 'Make Money' },
  { emoji: '😴', label: 'Better Sleep' },
  { emoji: '🧘', label: 'Stress Relief' },
];

export default function PopupSequence() {
  const [step, setStep] = useState<PopupStep>(null);
  const [email, setEmail] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Count visits
    const visits = parseInt(localStorage.getItem(POPUP_KEY) || '0') + 1;
    localStorage.setItem(POPUP_KEY, String(visits));

    const alreadyShown = localStorage.getItem(POPUP_SHOWN_KEY);
    if (alreadyShown) return;

    // Show popup on 3rd visit (or 1st for testing — change to 3 for prod)
    if (visits >= 1) {
      const timer = setTimeout(() => setStep('email'), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setStep(null);
    localStorage.setItem(POPUP_SHOWN_KEY, 'true');
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // TODO: Connect to your email provider (Mailchimp, ConvertKit, etc.)
    await new Promise((r) => setTimeout(r, 800)); // Simulate API
    setIsSubmitting(false);
    setStep('survey');
  };

  const submitSurvey = () => {
    if (!selectedNiche) return;
    setStep('offer');
  };

  const goToQuiz = () => {
    close();
    window.location.href = `/quiz/${selectedNiche.toLowerCase().replace(' ', '-')}`;
  };

  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
      onClick={close}
    />
  );

  const popupBase = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md mx-4';

  return (
    <AnimatePresence>
      {step === 'email' && (
        <>
          {overlay}
          <motion.div
            key="email-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={popupBase}
          >
            <div className="bg-[#16213E] border border-white/10 rounded-3xl p-8 shadow-2xl relative mx-4">
              <button onClick={close} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#FF5A5F] flex items-center justify-center mb-6">
                <Zap size={22} className="text-white" fill="white" />
              </div>

              <h3 className="text-white font-black text-2xl mb-2">
                Get Your Free Guide
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Join 12,000+ people getting personalized product picks every week.
              </p>

              <form onSubmit={submitEmail} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#0F3460] border border-white/10 focus:border-[#00A699] text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF5A5F] hover:bg-[#e04e53] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Saving...' : (
                    <>Get Free Access <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="text-white/25 text-xs text-center mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </>
      )}

      {step === 'survey' && (
        <>
          {overlay}
          <motion.div
            key="survey-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={popupBase}
          >
            <div className="bg-[#16213E] border border-white/10 rounded-3xl p-8 shadow-2xl relative mx-4">
              <button onClick={close} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#00A699]" />
                <span className="text-[#00A699] text-sm font-semibold">You're in!</span>
              </div>

              <h3 className="text-white font-black text-2xl mb-2">
                One Quick Question
              </h3>
              <p className="text-white/50 text-sm mb-6">
                What are you most interested in improving right now?
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {quizOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedNiche(opt.label)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all duration-200 ${
                      selectedNiche === opt.label
                        ? 'border-[#FF5A5F] bg-[#FF5A5F]/10 text-white'
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={submitSurvey}
                disabled={!selectedNiche}
                className="w-full bg-[#FF5A5F] hover:bg-[#e04e53] disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition-all duration-200"
              >
                Show My Recommendations →
              </button>
            </div>
          </motion.div>
        </>
      )}

      {step === 'offer' && (
        <>
          {overlay}
          <motion.div
            key="offer-popup"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={popupBase}
          >
            <div className="bg-[#16213E] border border-white/10 rounded-3xl p-8 shadow-2xl relative mx-4 text-center">
              <button onClick={close} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-white font-black text-2xl mb-2">
                Your {selectedNiche} Guide is Ready
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Take our 60-second quiz to get your personalized {selectedNiche.toLowerCase()} product picks — handpicked based on your answers.
              </p>

              <button
                onClick={goToQuiz}
                className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#FF8A5F] text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105"
              >
                Take My {selectedNiche} Quiz →
              </button>

              <button
                onClick={close}
                className="mt-3 w-full text-white/30 hover:text-white/50 text-sm py-2 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
