import React from 'react';
import { Sparkles, ArrowRight, Wine, Gift } from 'lucide-react';
import FizzBurstCanvas from '../components/FizzBurstCanvas';
import { playCanOpenSound } from '../utils/sound';

export default function CTASection({ onOpenVipModal }) {
  const handleClick = () => {
    playCanOpenSound();
    onOpenVipModal();
  };

  return (
    <section className="relative py-32 sm:py-44 px-6 sm:px-8 bg-[#181412] text-[#FBF8F2] overflow-hidden text-center">
      {/* Carbonation Sparkles */}
      <FizzBurstCanvas count={45} color="#FFD166" />

      {/* Dramatic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-color-red/20 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-color-lemon text-xs font-sans font-bold uppercase tracking-[0.25em] mb-8 shadow-sm">
          <Wine size={14} />
          <span>10 / INVITO SPECIALE</span>
        </div>

        <h2 className="font-serif-display text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none mb-6">
          READY TO<br />
          <span className="italic text-color-red font-serif-body">FRIZZARE?</span>
        </h2>

        <p className="font-serif-body italic text-2xl sm:text-3xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Assapora la vita frizzante. Entra nel club per accedere alla prima tiratura numerata e vivere l'estate italiana ovunque tu sia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleClick}
            className="btn-italian btn-primary shadow-2xl scale-105 group"
            data-cursor-hover="true"
          >
            <Sparkles size={16} className="text-color-lemon group-hover:rotate-45 transition-transform" />
            <span>SCOPRI LA COLLEZIONE & VIP CLUB</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mini Trust Stamps */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-white/50 uppercase tracking-widest font-sans mt-16 pt-8 border-t border-white/10">
          <span>✦ SPEDIZIONI IN CASSA TERMICA</span>
          <span>✦ ALLUMINIO 100% INFINITAMENTE RICICLABILE</span>
          <span>✦ PRODOTTO A MILANO</span>
        </div>
      </div>
    </section>
  );
}
