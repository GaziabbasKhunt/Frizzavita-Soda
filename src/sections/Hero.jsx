import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import InteractiveCanCanvas from '../components/Can3D';
import FizzBurstCanvas from '../components/FizzBurstCanvas';
import { FLAVORS } from '../data/flavors';
import { playCanOpenSound, playChimeSound } from '../utils/sound';

export default function Hero({ onOpenVipModal, onSelectFlavor }) {
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle gentle background parallax
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    setMouseOffset({ x, y });
  };

  const handleFlavorQuickSwitch = (flavor) => {
    playCanOpenSound();
    setSelectedFlavor(flavor);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 px-6 sm:px-8 flex items-center justify-center overflow-hidden bg-[#FBF8F2]"
    >
      {/* Ambient Fizzy Carbonation Canvas */}
      <FizzBurstCanvas count={35} color={selectedFlavor.color} />

      {/* Decorative Mediterranean Citrus Glow & Graphic Circles */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-20"
        style={{
          background: selectedFlavor.gradient,
          transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px)`,
          top: '15%',
          right: '5%',
        }}
      />

      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-2xl pointer-events-none opacity-10"
        style={{
          background: '#FFD166',
          transform: `translate(${-mouseOffset.x}px, ${-mouseOffset.y}px)`,
          bottom: '10%',
          left: '5%',
        }}
      />

      {/* Floating Italian Stamps / Vintage Geometric Accents */}
      <div
        className="absolute top-36 left-8 sm:left-14 hidden md:flex items-center gap-3 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)` }}
      >
        <div className="heritage-stamp text-[10px]">
          <span>MILANO • 2026 • NATURALE</span>
        </div>
      </div>

      <div
        className="absolute bottom-16 right-10 hidden lg:flex flex-col items-end pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px)` }}
      >
        <span className="text-[11px] font-sans font-extrabold uppercase tracking-[0.3em] text-text-espresso/40">
          PRODOTTO ITALIANO
        </span>
        <span className="font-serif-body italic text-sm text-text-espresso/60">
          « 100% Agrumi di Sicilia & Amalfi »
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Editorial Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Small Subtitle Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#181412]/10 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-color-red animate-pulse" />
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-text-espresso">
              Una nuova energia italiana
            </span>
          </div>

          {/* Massive Headline */}
          <h1 className="font-serif-display text-text-espresso text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[0.92] uppercase mb-6">
            LA VITA.<br />
            <span
              className="text-color-red italic font-normal transition-colors duration-500"
              style={{ color: selectedFlavor.color }}
            >
              FRIZZANTE.
            </span>
          </h1>

          {/* Subtitle / Manifesto paragraph */}
          <p className="font-serif-body italic text-xl sm:text-2xl text-text-espresso-muted max-w-xl mb-8 leading-relaxed">
            Assapora la vera essenza del Mediterraneo. Lattine artigianali con pura spremuta di agrumi italiani, acqua delle Alpi e bollicine vellutate.
          </p>

          {/* Luxury CTA Row */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#experience"
              onClick={() => playCanOpenSound()}
              className="btn-italian btn-primary shadow-xl group"
              data-cursor-hover="true"
            >
              <Sparkles size={16} className="text-color-lemon group-hover:rotate-45 transition-transform" />
              <span>Scopri Frizzavita</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#flavors"
              onClick={() => playChimeSound(680)}
              className="btn-italian btn-secondary group"
              data-cursor-hover="true"
            >
              <span>Esplora i gusti</span>
            </a>
          </div>

          {/* Quick Flavor Selector in Hero */}
          <div className="w-full pt-6 border-t border-[#181412]/10">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-[0.25em] text-text-espresso-muted block mb-3">
              ✦ Seleziona la lattina attiva ✦
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {FLAVORS.map((flavor) => {
                const isActive = selectedFlavor.id === flavor.id;
                return (
                  <button
                    key={flavor.id}
                    onClick={() => handleFlavorQuickSwitch(flavor)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-text-espresso text-white shadow-md scale-105'
                        : 'bg-white/80 text-text-espresso/70 hover:bg-white border border-[#181412]/10'
                    }`}
                    data-cursor-hover="true"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: flavor.color }}
                    />
                    <span>{flavor.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Can Centerpiece (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-[450px] sm:h-[520px] md:h-[580px] relative">
            <InteractiveCanCanvas
              flavor={selectedFlavor}
              autoRotate={true}
              rotationSpeed={0.9}
              enableOrbit={true}
              scale={1.05}
              className="w-full h-full"
            />
          </div>

          {/* Interactive Hint Under Can */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#181412]/10 text-[11px] font-sans text-text-espresso-muted tracking-wider uppercase shadow-sm mt-2">
            <Compass size={13} className="text-color-red animate-spin" style={{ animationDuration: '8s' }} />
            <span>Trascina per ruotare in 3D 360°</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-text-espresso-muted">
          SCORRI
        </span>
        <div className="w-[1.5px] h-6 bg-text-espresso/30 relative overflow-hidden">
          <div className="w-full h-full bg-color-red animate-bubbleRise" />
        </div>
      </div>
    </section>
  );
}
