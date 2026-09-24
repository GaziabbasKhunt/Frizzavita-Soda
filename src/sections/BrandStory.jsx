import React from 'react';
import { Quote, Sparkles, Award } from 'lucide-react';
import { BRAND_STORY, PRESS_ACCOLADES } from '../data/brandContent';

export default function BrandStory() {
  return (
    <section id="story" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#FBF8F2] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#181412]/10 text-color-red text-xs font-sans font-bold uppercase tracking-[0.25em] mb-8 shadow-sm">
          <Sparkles size={14} />
          <span>09 / IL MANIFESTO</span>
        </div>

        {/* Heading */}
        <h2 className="display-title-1 text-text-espresso mb-8">
          UNA STORIA<br />
          <span className="italic text-color-red font-serif-body">DI GUSTO.</span>
        </h2>

        {/* Manifesto Core Quote */}
        <div className="relative my-12 py-6">
          <Quote size={48} className="text-color-red/20 mx-auto mb-4" />
          <p className="font-serif-body italic text-3xl sm:text-4xl md:text-5xl text-text-espresso leading-tight max-w-4xl mx-auto">
            "{BRAND_STORY.manifestoText}"
          </p>
        </div>

        {/* Heritage Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#181412]/10 text-left">
          {PRESS_ACCOLADES.map((accolade, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-[#181412]/10 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans font-extrabold text-xs tracking-[0.2em] text-text-espresso">
                  {accolade.outlet}
                </span>
                <span className="text-[10px] uppercase font-sans text-text-espresso-muted">
                  {accolade.city}
                </span>
              </div>
              <p className="font-serif-body italic text-base text-text-espresso-muted leading-snug">
                "{accolade.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
