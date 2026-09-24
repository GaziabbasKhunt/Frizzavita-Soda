import React, { useState } from 'react';
import { RotateCw, Droplet, Sparkles, Layers, Sliders, Info } from 'lucide-react';
import InteractiveCanCanvas from '../components/Can3D';
import { FLAVORS } from '../data/flavors';
import { playCanOpenSound, playFizzSound, playChimeSound } from '../utils/sound';

export default function CanExperienceSection({ onOpenFlavorModal }) {
  const [activeFlavor, setActiveFlavor] = useState(FLAVORS[0]);
  const [enableDroplets, setEnableDroplets] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);

  const handleFlavorChange = (flavor) => {
    playCanOpenSound();
    setActiveFlavor(flavor);
  };

  const handleToggleDroplets = () => {
    playFizzSound(0.4);
    setEnableDroplets(!enableDroplets);
  };

  return (
    <section id="experience" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#181412] text-[#FBF8F2] overflow-hidden">
      {/* Dynamic Background Glow matching active flavor */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none opacity-25 transition-all duration-1000 -top-40 left-1/2 -translate-x-1/2"
        style={{ background: activeFlavor.gradient }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles size={14} />
              <span>03 / STUDIO 3D INTERATTIVO</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none">
              DESIGN ANATOMY.<br />
              <span className="italic text-color-lemon font-serif-body">L'ALLUMINIO PERFETTO.</span>
            </h2>
          </div>

          <p className="font-serif-body italic text-lg sm:text-xl text-white/70 max-w-md">
            Esplora la lattina da ogni angolazione. Alluminio 100% riciclabile all'infinito, finitura satinata e grafica d'ispirazione futurista milanese.
          </p>
        </div>

        {/* Studio Center Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Controls & Flavor Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            {/* Flavor Tabs */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-white/60 block mb-4">
                Scegli il Gusto
              </span>
              <div className="flex flex-col gap-2.5">
                {FLAVORS.map((fl) => {
                  const isActive = activeFlavor.id === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => handleFlavorChange(fl)}
                      className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition-all duration-300 text-left cursor-pointer ${
                        isActive
                          ? 'bg-white/15 border border-white/30 shadow-lg translate-x-1'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      data-cursor-hover="true"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full shadow-inner"
                          style={{ backgroundColor: fl.color }}
                        />
                        <div>
                          <span className="font-serif-display text-lg text-white block leading-tight">
                            {fl.name}
                          </span>
                          <span className="text-[11px] font-sans text-white/50 tracking-wider">
                            {fl.subname}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-sans font-bold text-white/40">
                        {fl.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Studio Environment Toggles */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-white/60 block">
                Controlli di Studio
              </span>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleToggleDroplets}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                    enableDroplets
                      ? 'bg-color-red text-white shadow-md'
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                  data-cursor-hover="true"
                >
                  <Droplet size={14} />
                  <span>Condensa {enableDroplets ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    playChimeSound(600);
                    setAutoRotate(!autoRotate);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                    autoRotate
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/50'
                  }`}
                  data-cursor-hover="true"
                >
                  <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} />
                  <span>Rotazione {autoRotate ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    playChimeSound(700);
                    onOpenFlavorModal(activeFlavor);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                  data-cursor-hover="true"
                >
                  <Info size={14} />
                  <span>Dettagli</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center 3D Showcase (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2 relative">
            <div className="w-full h-[480px] sm:h-[580px] lg:h-[640px] relative">
              <InteractiveCanCanvas
                flavor={activeFlavor}
                autoRotate={autoRotate}
                rotationSpeed={rotationSpeed}
                enableDroplets={enableDroplets}
                enableOrbit={true}
                scale={1.15}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Status Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-sans tracking-widest uppercase mt-4">
              <span>✦ ALLUMINIO VERGINE 100% RICICLABILE</span>
              <span>✦ RESISTENZA 4.2 BAR</span>
              <span>✦ CHIUSURA SAVE-FIZZ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
