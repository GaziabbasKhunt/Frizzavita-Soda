import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Sun, Award } from 'lucide-react';
import { POSTERS } from '../data/brandContent';
import { playChimeSound } from '../utils/sound';

export default function MotionPosters() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="posters" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#ECE4D6] border-y border-[#181412]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#181412]/15 pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles size={14} />
              <span>05 / CAMPAGNA GRAFICA D'AUTORE</span>
            </div>
            <h2 className="display-title-1 text-text-espresso">
              POSTERS FOR THE<br />
              <span className="italic text-color-red font-serif-body">PERFECT APERITIVO.</span>
            </h2>
          </div>

          <p className="font-serif-body italic text-lg sm:text-xl text-text-espresso-muted max-w-sm">
            Manifesti pubblicitari ispirati al futurismo milanese e alla grafica d'epoca della riviera italiana.
          </p>
        </div>

        {/* 3 Posters Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {POSTERS.map((poster, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={poster.id}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  playChimeSound(500 + index * 120);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-white border border-[#181412]/15 flex flex-col justify-between p-8 sm:p-10 min-h-[580px] cursor-pointer"
                style={{
                  backgroundColor: poster.id === 'frizzante' ? '#181412' : '#FFFFFF',
                  color: poster.id === 'frizzante' ? '#FBF8F2' : '#181412',
                }}
                data-cursor-hover="true"
              >
                {/* Vintage Poster Inner Border */}
                <div
                  className="absolute inset-3 rounded-2xl border pointer-events-none transition-colors duration-500"
                  style={{
                    borderColor: poster.id === 'frizzante' ? 'rgba(255,255,255,0.15)' : 'rgba(24,20,18,0.15)',
                  }}
                />

                {/* Top Poster Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-sans font-extrabold uppercase tracking-[0.3em] opacity-60">
                    {poster.tag}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center text-[10px] font-bold tracking-widest animate-rotateSlow"
                    style={{
                      borderColor: poster.accentColor,
                      color: poster.accentColor,
                    }}
                  >
                    ✦
                  </div>
                </div>

                {/* Center Graphic Artwork & Bold Poster Typography */}
                <div className="relative z-10 my-auto py-8 text-center flex flex-col items-center">
                  {/* Floating Medallion Visual */}
                  <div
                    className="w-32 h-32 rounded-full mb-8 flex items-center justify-center relative transition-transform duration-700 group-hover:scale-110 shadow-lg"
                    style={{
                      background: `radial-gradient(circle, ${poster.accentColor} 0%, ${poster.color} 100%)`,
                    }}
                  >
                    <span className="font-serif-display text-white font-black text-4xl">
                      F
                    </span>
                    {/* Orbiting ring */}
                    <div className="absolute inset-[-8px] rounded-full border border-dashed border-white/40 animate-spin" style={{ animationDuration: '14s' }} />
                  </div>

                  <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] mb-2" style={{ color: poster.accentColor }}>
                    {poster.theme}
                  </span>

                  <h3 className="font-serif-display text-5xl sm:text-6xl tracking-tight uppercase leading-none mb-3">
                    {poster.title}
                  </h3>

                  <p className="font-serif-body italic text-lg opacity-80 max-w-xs leading-snug">
                    {poster.quote}
                  </p>
                </div>

                {/* Bottom Poster Footer */}
                <div className="relative z-10 border-t border-current/10 pt-4 flex items-center justify-between text-xs font-sans">
                  <div>
                    <span className="font-bold tracking-widest uppercase block text-[10px]">
                      {poster.location}
                    </span>
                    <span className="opacity-60 text-[10px] uppercase">
                      {poster.stamp}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
