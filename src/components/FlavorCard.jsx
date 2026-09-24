import React, { useState } from 'react';
import { ArrowRight, Sparkles, MapPin, Droplets } from 'lucide-react';
import { playCanOpenSound, playChimeSound } from '../utils/sound';

export default function FlavorCard({ flavor, onSelect, isSelected = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    playCanOpenSound();
    onSelect(flavor);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        playChimeSound(700);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl p-8 cursor-pointer transition-all duration-500 overflow-hidden border ${
        isSelected
          ? 'border-color-red ring-2 ring-color-red/20 shadow-2xl bg-white scale-[1.02]'
          : 'border-[#181412]/10 bg-white/80 hover:bg-white hover:border-[#181412]/30 hover:shadow-2xl hover:-translate-y-2'
      }`}
      style={{
        boxShadow: isHovered
          ? `0 20px 45px -10px ${flavor.color}25`
          : undefined,
      }}
      data-cursor-hover="true"
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div
        className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: flavor.gradient,
          opacity: isHovered ? 0.22 : 0.06,
        }}
      />

      {/* Header with Number & Italian Badge */}
      <div className="flex items-start justify-between relative z-10 mb-6">
        <div>
          <span
            className="font-serif-display text-4xl font-black block tracking-tighter transition-colors"
            style={{ color: flavor.color }}
          >
            {flavor.number}
          </span>
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-text-espresso-muted">
            Tiratura Artigianale
          </span>
        </div>

        <div
          className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase border flex items-center gap-1.5"
          style={{
            borderColor: `${flavor.color}40`,
            backgroundColor: `${flavor.color}10`,
            color: flavor.color,
          }}
        >
          <Sparkles size={11} />
          <span>{flavor.fizzLevel}</span>
        </div>
      </div>

      {/* Flavor Name & Subtitle */}
      <div className="relative z-10 mb-4">
        <h3 className="font-serif-display text-3xl sm:text-4xl text-text-espresso group-hover:text-color-red transition-colors tracking-tight leading-none mb-1">
          {flavor.name}
        </h3>
        <p className="font-serif-body italic text-lg text-text-espresso-muted">
          {flavor.italianTitle}
        </p>
      </div>

      {/* Origin & Description */}
      <div className="relative z-10 mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs text-text-espresso-muted">
          <MapPin size={13} className="text-color-red" />
          <span className="font-sans font-medium">{flavor.origin}</span>
        </div>
        <p className="text-sm font-sans text-text-espresso/80 leading-relaxed line-clamp-2">
          {flavor.description}
        </p>
      </div>

      {/* Tasting Profile Mini Radar / Metrics */}
      <div className="relative z-10 py-4 my-2 border-y border-[#181412]/5 grid grid-cols-2 gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-espresso-muted block mb-1">
            Freschezza
          </span>
          <div className="w-full bg-[#181412]/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${flavor.radar.freshness}%`,
                backgroundColor: flavor.color,
              }}
            />
          </div>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-espresso-muted block mb-1">
            Acidità Agrumata
          </span>
          <div className="w-full bg-[#181412]/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${flavor.radar.acidity}%`,
                backgroundColor: flavor.accentColor || flavor.color,
              }}
            />
          </div>
        </div>
      </div>

      {/* Tasting Notes Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-6">
        {flavor.notes.slice(0, 3).map((note) => (
          <span
            key={note}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#181412]/5 text-text-espresso/70 group-hover:bg-[#181412]/10 transition-colors"
          >
            {note}
          </span>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-espresso flex items-center gap-2 group-hover:text-color-red transition-colors">
          <span>SCOPRI GUSTO</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>

        <span className="text-xs font-sans text-text-espresso-muted">
          {flavor.calories}
        </span>
      </div>
    </div>
  );
}
