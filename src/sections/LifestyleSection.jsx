import React from 'react';
import { Camera, MapPin, Sparkles, Compass } from 'lucide-react';
import { LIFESTYLE_GALLERY } from '../data/brandContent';

export default function LifestyleSection() {
  return (
    <section id="campaign" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#181412] text-[#FBF8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Compass size={14} />
              <span>07 / ATMOSFERA & STILE DI VITA</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl text-white leading-tight">
              FROM MILANO TO<br />
              <span className="italic text-color-lemon font-serif-body">THE MEDITERRANEO.</span>
            </h2>
          </div>

          <p className="font-serif-body italic text-lg sm:text-xl text-white/70 max-w-sm">
            Un viaggio visivo tra architettura d'avanguardia, terrazze affacciate sui Faraglioni e pomeriggi soleggiati.
          </p>
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIFESTYLE_GALLERY.map((item, idx) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-6 flex flex-col justify-between min-h-[420px] transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              data-cursor-hover="true"
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-color-red px-2.5 py-1 rounded-full bg-color-red/10 border border-color-red/20">
                  {item.category}
                </span>
                <span className="text-xs font-serif-display text-white/40">0{idx + 1}</span>
              </div>

              {/* Center Abstract Mediterranean Art Frame */}
              <div className="my-auto py-8 text-center flex flex-col items-center relative z-10">
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-color-lemon transition-all duration-500">
                  <Camera size={28} className="text-white/60 group-hover:text-color-lemon transition-colors" />
                </div>
                <h4 className="font-serif-display text-2xl text-white group-hover:text-color-lemon transition-colors mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <MapPin size={12} className="text-color-red" />
                  <span className="font-sans">{item.location}</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="border-t border-white/10 pt-4 z-10">
                <p className="font-serif-body italic text-sm text-white/80 leading-snug">
                  "{item.caption}"
                </p>
              </div>

              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
