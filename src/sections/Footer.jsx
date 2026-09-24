import React from 'react';
import { ArrowUp, Sparkles, Heart, Globe, MessageCircle } from 'lucide-react';
import { playChimeSound } from '../utils/sound';

export default function Footer({ onOpenVipModal }) {
  const scrollToTop = () => {
    playChimeSound(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#110E0D] text-[#FBF8F2] pt-20 pb-12 px-6 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Brand Logo, Tagline, and Back-to-Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-12 mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-color-red flex items-center justify-center text-white font-serif font-bold text-base shadow-md">
                F
              </span>
              <span className="font-serif-display font-black text-3xl sm:text-4xl tracking-[0.2em] text-white">
                FRIZZAVITA<span className="text-xs align-super ml-1 text-color-red">™</span>
              </span>
            </div>
            <p className="font-serif-body italic text-xl text-white/70">
              « Assapora la vita frizzante. »
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-bold tracking-widest uppercase transition-colors"
            data-cursor-hover="true"
          >
            <span>Torna in alto</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-xs font-sans">
          {/* Col 1 */}
          <div>
            <span className="font-bold tracking-[0.2em] uppercase text-color-red block mb-4">
              Navigazione
            </span>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">3D Experience</a></li>
              <li><a href="#flavors" className="hover:text-white transition-colors">I Nostri Gusti</a></li>
              <li><a href="#posters" className="hover:text-white transition-colors">Manifesti Grafici</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Ingredienti IGP</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">La Nostra Storia</a></li>
            </ul>
          </div>

          {/* Col 2: Flavors */}
          <div>
            <span className="font-bold tracking-[0.2em] uppercase text-color-red block mb-4">
              Collezione
            </span>
            <ul className="space-y-2.5 text-white/70">
              <li>01 — Arancia Rossa di Sicilia</li>
              <li>02 — Limone Costa d'Amalfi</li>
              <li>03 — Pompelmo Rosa Calabrese</li>
              <li>04 — Pesca Bianca di Romagna</li>
              <li>Cassa Degustazione Legno</li>
            </ul>
          </div>

          {/* Col 3: Social & Experience */}
          <div>
            <span className="font-bold tracking-[0.2em] uppercase text-color-red block mb-4">
              Seguici
            </span>
            <ul className="space-y-2.5 text-white/70">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram @frizzavita</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok @frizzavita.soda</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Pinterest /frizzavita</a></li>
              <li><a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Spotify Aperitivo Playlist</a></li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <span className="font-bold tracking-[0.2em] uppercase text-color-red block mb-4">
              Sedi & Contatti
            </span>
            <p className="text-white/70 leading-relaxed mb-3">
              Frizzavita S.r.l.<br />
              Via Montenapoleone 18<br />
              20121 Milano (MI), Italia
            </p>
            <p className="text-white/50 text-[11px]">
              ciao@frizzavita.com
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/50">
          <div>
            © 2026 Frizzavita™ S.r.l. Tutti i diritti riservati. Prodotto in Italia.
          </div>
          <div className="flex items-center gap-6">
            <span>Milano • Roma • Capri</span>
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
