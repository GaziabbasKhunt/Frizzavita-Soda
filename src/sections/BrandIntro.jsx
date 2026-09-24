import React from 'react';
import { Sun, Sparkles, Droplets, Award, Compass, ShieldCheck } from 'lucide-react';
import { BRAND_STORY } from '../data/brandContent';

export default function BrandIntro() {
  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#F4EFE6] border-y border-[#181412]/10 overflow-hidden">
      {/* Editorial Watermark in Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
        <span className="font-serif-display text-[26vw] leading-none text-text-espresso whitespace-nowrap">
          FRIZZANTE
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Mini Tag & Grid Coordinates */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#181412]/10 pb-6 mb-12 text-xs font-sans uppercase tracking-[0.25em] text-text-espresso-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-color-red rounded-full" />
            <span className="font-bold text-text-espresso">02 / MANIFESTO DI MARCA</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>ORIGINE: SICILIA & AMALFI</span>
            <span>PRESSIONE: 4.2 BAR</span>
            <span>ALTITUDINE: 1,800M</span>
          </div>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Giant Editorial Title (6 cols) */}
          <div className="lg:col-span-6">
            <span className="caps-label text-color-red block mb-3">
              ✦ Filosofia Mediterranea
            </span>
            <h2 className="display-title-1 text-text-espresso mb-6">
              MADE FOR<br />
              <span className="italic font-serif-display text-color-red">SUNNY DAYS.</span>
            </h2>

            <div className="flex items-center gap-4 pt-4">
              <div className="heritage-stamp">
                <span>MILANO • EST. 2026 • PURA SODA</span>
              </div>
              <div className="text-xs font-sans text-text-espresso-muted max-w-xs leading-relaxed">
                Nata nel cuore di Milano per reinventare il rito dell'aperitivo italiano in chiave contemporanea.
              </div>
            </div>
          </div>

          {/* Editorial Paragraphs & Feature Badges (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="font-serif-body text-2xl sm:text-3xl text-text-espresso leading-snug italic">
              "{BRAND_STORY.introBody}"
            </p>

            <p className="font-sans text-base sm:text-lg text-text-espresso/80 leading-relaxed">
              {BRAND_STORY.introDetail}
            </p>

            {/* 3 Pillars Badge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#181412]/10 shadow-sm">
                <Sun className="text-color-orange mb-2" size={22} />
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-text-espresso mb-1">
                  100% IGP
                </h4>
                <p className="text-xs text-text-espresso-muted">
                  Agrumi coltivati sotto il sole caldo del Sud.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#181412]/10 shadow-sm">
                <Droplets className="text-color-green mb-2" size={22} />
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-text-espresso mb-1">
                  Acqua Alpina
                </h4>
                <p className="text-xs text-text-espresso-muted">
                  Sorgente pura filtrata dalle rocce dolomitiche.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#181412]/10 shadow-sm">
                <Sparkles className="text-color-red mb-2" size={22} />
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-text-espresso mb-1">
                  Micro-Bollicine
                </h4>
                <p className="text-xs text-text-espresso-muted">
                  Effervescenza fine come un grande spumante.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Italian Ticker */}
        <div className="mt-20 pt-8 border-t border-[#181412]/10 overflow-hidden select-none">
          <div className="marquee-track flex items-center gap-12 text-sm font-sans font-extrabold tracking-[0.3em] uppercase text-text-espresso/60">
            <span>✦ ASSAPORA LA VITA FRIZZANTE</span>
            <span>✦ SENZA COLORANTI ARTIFICIALI</span>
            <span>✦ 100% SPREMUTA ITALIANA</span>
            <span>✦ SODA ARTIGIANALE MILANESE</span>
            <span>✦ BOLLICINE A GRANA FINISSIMA</span>
            <span>✦ ASSAPORA LA VITA FRIZZANTE</span>
            <span>✦ SENZA COLORANTI ARTIFICIALI</span>
            <span>✦ 100% SPREMUTA ITALIANA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
