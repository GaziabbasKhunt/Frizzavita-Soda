import React, { useState } from 'react';
import { Sparkles, Wine, ChevronRight } from 'lucide-react';
import FlavorCard from '../components/FlavorCard';
import { FLAVORS } from '../data/flavors';

export default function FlavorCollection({ onOpenFlavorModal, onSelectFlavor3D }) {
  const [activeFlavorId, setActiveFlavorId] = useState(FLAVORS[0].id);

  const handleSelect = (flavor) => {
    setActiveFlavorId(flavor.id);
    onOpenFlavorModal(flavor);
  };

  return (
    <section id="flavors" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#FBF8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#181412]/10 pb-8 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles size={14} />
              <span>04 / COLLEZIONE DEGUSTAZIONE</span>
            </div>
            <h2 className="display-title-1 text-text-espresso">
              I QUATTRO<br />
              <span className="italic text-color-red font-serif-body">GUSTI MAESTRI.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-text-espresso mb-1">
              EDIZIONE LIMITATA 2026
            </span>
            <p className="font-serif-body italic text-lg text-text-espresso-muted max-w-sm text-left md:text-right">
              Quattro ricette d'autore ispirate alle eccellenze agrumicole della penisola.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FLAVORS.map((flavor) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              isSelected={activeFlavorId === flavor.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-white border border-[#181412]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-color-red/10 flex items-center justify-center text-color-red shrink-0">
              <Wine size={32} />
            </div>
            <div>
              <h4 className="font-serif-display text-2xl sm:text-3xl text-text-espresso mb-1">
                Degustazione Completa in Cassa di Legno
              </h4>
              <p className="font-serif-body italic text-lg text-text-espresso-muted">
                Include tutte e quattro le referenze (12 lattine) con guida agli abbinamenti firmata.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenFlavorModal(FLAVORS[0])}
            className="btn-italian btn-primary whitespace-nowrap"
            data-cursor-hover="true"
          >
            <span>VEDI DETTAGLI CASSA</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
