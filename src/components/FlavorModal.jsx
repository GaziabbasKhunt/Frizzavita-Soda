import React from 'react';
import { X, Sparkles, MapPin, Calendar, Check, Wine, Droplet } from 'lucide-react';
import { playChimeSound } from '../utils/sound';
import InteractiveCanCanvas from './Can3D';

export default function FlavorModal({ flavor, onClose, onSelect3DView }) {
  if (!flavor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#FBF8F2] text-text-espresso rounded-3xl overflow-hidden shadow-2xl border border-white/40 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playChimeSound(400);
            onClose();
          }}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-text-espresso flex items-center justify-center shadow-md hover:scale-105 transition-all"
          aria-label="Chiudi"
          data-cursor-hover="true"
        >
          <X size={20} />
        </button>

        {/* Left Column: Interactive 3D Visual Preview */}
        <div
          className="w-full md:w-5/12 p-6 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background: `radial-gradient(circle at center, ${flavor.bgLight} 0%, #ECE4D6 100%)`,
          }}
        >
          <div className="w-full h-72 md:h-96 relative">
            <InteractiveCanCanvas
              flavor={flavor}
              autoRotate={true}
              rotationSpeed={1.0}
              scale={0.95}
              className="w-full h-full"
            />
          </div>
          <p className="text-[11px] font-sans tracking-widest text-text-espresso-muted uppercase mt-2">
            ✦ Ruota la lattina con il mouse ✦
          </p>
        </div>

        {/* Right Column: Detailed Sensory Dossier */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="border-b border-[#181412]/10 pb-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-[0.25em] px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${flavor.color}15`,
                  color: flavor.color,
                }}
              >
                Collezione N° {flavor.number}
              </span>
              <span className="text-xs text-text-espresso-muted">• {flavor.juicePercent}</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-text-espresso leading-none">
              {flavor.name}
            </h2>
            <p className="font-serif-body italic text-xl text-text-espresso-muted mt-1">
              {flavor.italianTitle}
            </p>
          </div>

          {/* Sensory Profile */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-espresso-muted mb-2">
              Profilo Sensoriale
            </h4>
            <p className="font-sans text-sm text-text-espresso/90 leading-relaxed mb-4">
              {flavor.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {flavor.notes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#181412]/10 shadow-sm text-text-espresso"
                >
                  ✦ {note}
                </span>
              ))}
            </div>
          </div>

          {/* Origin & Harvest Info */}
          <div className="grid grid-cols-2 gap-4 bg-white/70 rounded-2xl p-4 border border-[#181412]/5 mb-6 text-xs font-sans">
            <div>
              <div className="flex items-center gap-1 text-text-espresso-muted mb-1">
                <MapPin size={13} className="text-color-red" />
                <span className="font-bold uppercase tracking-wider">Origine</span>
              </div>
              <p className="text-text-espresso font-medium">{flavor.origin}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-text-espresso-muted mb-1">
                <Calendar size={13} className="text-color-red" />
                <span className="font-bold uppercase tracking-wider">Raccolta</span>
              </div>
              <p className="text-text-espresso font-medium">{flavor.harvest}</p>
            </div>
          </div>

          {/* Gastronomic Pairing */}
          <div className="mb-6 bg-[#181412]/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Wine size={15} className="text-color-red" />
              <span className="text-xs font-bold uppercase tracking-wider text-text-espresso">
                Abbinamento Aperitivo Consigliato
              </span>
            </div>
            <p className="text-xs text-text-espresso-muted font-serif-body italic text-base leading-snug">
              "{flavor.pairings}"
            </p>
          </div>

          {/* Full Ingredients List */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-text-espresso-muted mb-2">
              Ingredienti Naturali 100%
            </h4>
            <ul className="space-y-1.5 text-xs text-text-espresso/80">
              {flavor.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check size={13} className="text-color-green" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onSelect3DView(flavor);
                onClose();
              }}
              className="flex-1 py-3.5 px-6 rounded-full bg-color-red text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-red-800 transition-all shadow-md text-center"
              data-cursor-hover="true"
            >
              Esplora in Studio 3D
            </button>
            <button
              onClick={onClose}
              className="py-3.5 px-6 rounded-full border border-text-espresso/30 text-text-espresso text-xs font-bold tracking-[0.2em] uppercase hover:bg-text-espresso hover:text-white transition-all text-center"
              data-cursor-hover="true"
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
