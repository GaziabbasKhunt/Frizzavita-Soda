import React, { useState } from 'react';
import { Sparkles, Play, Volume2, ArrowRight } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { playCanOpenSound, playFizzSound } from '../utils/sound';

export default function ProductShowcase({ onOpenVipModal }) {
  const [isPouring, setIsPouring] = useState(false);

  const handleSimulatePour = () => {
    setIsPouring(true);
    playCanOpenSound();
    setTimeout(() => {
      playFizzSound(1.6);
    }, 250);
    setTimeout(() => {
      setIsPouring(false);
    }, 2000);
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#F4EFE6] border-y border-[#181412]/10 overflow-hidden text-center">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#181412]/10 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-6 shadow-sm">
          <Sparkles size={14} />
          <span>08 / IL RITUALE ITALIANO</span>
        </div>

        {/* 3 Giant Words */}
        <h2 className="display-title-1 text-text-espresso mb-8 leading-[0.9]">
          OPEN.<br />
          <span className="italic font-serif-display text-color-red">POUR.</span><br />
          VIVI.
        </h2>

        <p className="font-serif-body italic text-2xl sm:text-3xl text-text-espresso-muted max-w-2xl mx-auto mb-12">
          Tre gesti semplici per trasformare qualsiasi momento in un'autentica festa mediterranea.
        </p>

        {/* Interactive Pouring Simulator Button */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <button
            onClick={handleSimulatePour}
            className={`btn-italian ${isPouring ? 'bg-color-green text-white scale-105' : 'btn-primary'} shadow-2xl transition-all`}
            data-cursor-hover="true"
          >
            <Volume2 size={18} className={isPouring ? 'animate-bounce' : ''} />
            <span>{isPouring ? 'VERSANDO BOLLICINE...' : 'SIMULA L’APERTURA FRIZZANTE'}</span>
          </button>
          <span className="text-[11px] font-sans tracking-widest uppercase text-text-espresso-muted">
            ✦ Clicca per ascoltare il suono della lattina e della bollicina ✦
          </span>
        </div>

        {/* 4 Cans Minimal Showcase Lineup */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {FLAVORS.map((fl) => (
            <div
              key={fl.id}
              className="p-6 rounded-3xl bg-white border border-[#181412]/10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center"
            >
              <div
                className="w-12 h-28 rounded-xl mb-4 shadow-inner flex items-center justify-center text-white font-serif-display font-bold text-xs"
                style={{
                  background: fl.gradient,
                }}
              >
                {fl.number}
              </div>
              <h5 className="font-serif-display text-lg text-text-espresso leading-tight">
                {fl.name}
              </h5>
              <span className="text-[10px] font-sans text-text-espresso-muted uppercase tracking-wider">
                {fl.subname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
