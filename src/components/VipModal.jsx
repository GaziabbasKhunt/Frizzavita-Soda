import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Send, Wine } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCanOpenSound, playFizzSound, playChimeSound } from '../utils/sound';

export default function VipModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    playCanOpenSound();
    setTimeout(() => playFizzSound(1.2), 200);

    // Trigger celebratory Italian gold & red confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C91D1D', '#FFD166', '#E85D04', '#FBF8F2'],
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    playChimeSound(450);
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-[#FBF8F2] text-text-espresso rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/50 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-text-espresso flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          aria-label="Chiudi"
          data-cursor-hover="true"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="w-14 h-14 mx-auto rounded-full bg-color-red/10 text-color-red flex items-center justify-center mb-5">
              <Wine size={26} />
            </div>

            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-color-red block mb-1">
              Club Aperitivo Privato
            </span>

            <h3 className="font-serif-display text-3xl sm:text-4xl text-text-espresso leading-tight mb-3">
              PRE-ORDINE & TIRATURA LIMITATA
            </h3>

            <p className="font-serif-body italic text-lg text-text-espresso-muted mb-6 leading-relaxed">
              Ricevi in anteprima la prima cassa degustazione numerata di Frizzavita™ e gli inviti agli eventi estivi a Milano, Capri e Portofino.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email..."
                className="w-full px-5 py-3.5 rounded-full bg-white border border-[#181412]/15 text-text-espresso text-sm font-sans placeholder:text-[#181412]/40 focus:outline-none focus:border-color-red focus:ring-2 focus:ring-color-red/20 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-color-red text-white text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-red-800 transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 group cursor-pointer"
                data-cursor-hover="true"
              >
                <Sparkles size={14} className="text-color-lemon group-hover:rotate-45 transition-transform" />
                <span>ISCRIVITI AL CLUB DEGUSTAZIONE</span>
                <Send size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-[10px] text-text-espresso-muted/70 tracking-wider uppercase font-sans mt-4">
              Nessuno spam • Cancellazione in un clic • 100% Privacy Italiana
            </p>
          </>
        ) : (
          <div className="py-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-color-green/10 text-color-green flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-serif-display text-3xl text-text-espresso mb-2">
              BENVENUTO NEL CLUB
            </h3>
            <p className="font-serif-body italic text-lg text-text-espresso-muted mb-6">
              Abbiamo riservato il tuo invito alla prima tiratura numerata. Controlla la tua casella di posta per i dettagli dell'anteprima.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-text-espresso text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-color-red transition-colors"
              data-cursor-hover="true"
            >
              CONTINUA L'ESPLORAZIONE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
