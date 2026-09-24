import React, { useState } from 'react';
import { Citrus, Droplets, Sparkles, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';
import { INGREDIENTS, BRAND_STORY } from '../data/brandContent';
import { playChimeSound } from '../utils/sound';

export default function IngredientStory() {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [Citrus, Droplets, Sparkles, HeartPulse];

  return (
    <section id="ingredients" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#FBF8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="border-b border-[#181412]/10 pb-8 mb-16">
          <div className="flex items-center gap-2 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
            <Sparkles size={14} />
            <span>06 / LA PUREZZA DEGLI INGREDIENTI</span>
          </div>
          <h2 className="display-title-1 text-text-espresso">
            THE SECRET<br />
            <span className="italic text-color-red font-serif-body">IS SIMPLE.</span>
          </h2>
          <p className="font-serif-body italic text-xl text-text-espresso-muted max-w-xl mt-4">
            Quattro elementi fondamentali. Nessun compromesso sulla qualità delle materie prime della nostra terra.
          </p>
        </div>

        {/* Interactive Tabs + Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Ingredient Selection List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {INGREDIENTS.map((item, index) => {
              const IconComp = icons[index] || Sparkles;
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playChimeSound(600 + index * 80);
                    setActiveTab(index);
                  }}
                  className={`p-6 rounded-3xl text-left transition-all duration-400 flex items-start justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-white border-color-red/40 shadow-xl translate-x-2'
                      : 'bg-white/40 border-[#181412]/5 hover:bg-white/80'
                  }`}
                  data-cursor-hover="true"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-color-red text-white' : 'bg-[#181412]/5 text-text-espresso'
                      }`}
                    >
                      <IconComp size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans font-extrabold uppercase tracking-[0.2em] text-text-espresso-muted block">
                        ELEMENTO {item.number}
                      </span>
                      <h4 className="font-serif-display text-2xl text-text-espresso">
                        {item.title}
                      </h4>
                      <p className="font-serif-body italic text-sm text-text-espresso-muted">
                        {item.italian}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`transition-all duration-300 ${
                      isActive ? 'text-color-red translate-x-1 opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Hero Showcase of Active Ingredient (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#181412]/10 shadow-xl relative overflow-hidden">
              {/* Background watermark badge */}
              <div className="absolute right-4 bottom-4 text-9xl font-serif-display text-[#181412]/5 font-black select-none pointer-events-none">
                {INGREDIENTS[activeTab].number}
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-color-red/10 text-color-red text-xs font-bold uppercase tracking-widest mb-6">
                <CheckCircle2 size={13} />
                <span>{INGREDIENTS[activeTab].badge}</span>
              </div>

              <h3 className="font-serif-display text-4xl sm:text-5xl text-text-espresso leading-tight mb-2">
                {INGREDIENTS[activeTab].title}
              </h3>

              <p className="font-serif-body italic text-2xl text-color-red mb-6">
                {INGREDIENTS[activeTab].italian}
              </p>

              <p className="font-sans text-base sm:text-lg text-text-espresso/80 leading-relaxed mb-8">
                {INGREDIENTS[activeTab].description}
              </p>

              <div className="pt-6 border-t border-[#181412]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-text-espresso-muted block">
                    Garanzia di Purezza
                  </span>
                  <span className="font-serif-display text-3xl font-bold text-text-espresso">
                    {INGREDIENTS[activeTab].metric}
                  </span>
                </div>

                <div className="heritage-stamp text-[9px]">
                  <span>ORIGINE • ITALIA • PURA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
