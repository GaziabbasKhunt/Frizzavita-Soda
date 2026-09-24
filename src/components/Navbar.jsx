import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ArrowUpRight } from 'lucide-react';
import { playChimeSound } from '../utils/sound';

export default function Navbar({ onOpenVipModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: '3D Experience', href: '#experience' },
    { label: 'Flavors', href: '#flavors' },
    { label: 'Posters', href: '#posters' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Campaign', href: '#campaign' },
    { label: 'Story', href: '#story' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    playChimeSound(600);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#FBF8F2]/90 backdrop-blur-md border-b border-[#181412]/10 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-3 group text-decoration-none"
            data-cursor-hover="true"
          >
            <span className="w-7 h-7 rounded-full bg-color-red flex items-center justify-center text-white font-serif font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
              F
            </span>
            <div className="flex flex-col">
              <span className="font-serif-display font-black text-2xl tracking-[0.18em] text-text-espresso leading-none group-hover:text-color-red transition-colors">
                FRIZZAVITA<span className="text-xs align-super ml-0.5 text-color-red">™</span>
              </span>
              <span className="text-[9px] font-sans tracking-[0.25em] text-text-espresso-muted uppercase">
                Milano • Italia
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-text-espresso/80 hover:text-color-red transition-colors py-1 relative group"
                data-cursor-hover="true"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-color-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: SHOP SOON & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playChimeSound(750);
                onOpenVipModal();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text-espresso text-bg-cream text-xs font-sans font-bold tracking-[0.18em] uppercase hover:bg-color-red hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              data-cursor-hover="true"
            >
              <Sparkles size={13} className="text-color-lemon group-hover:rotate-45 transition-transform" />
              <span>SHOP SOON</span>
              <ArrowUpRight size={13} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playChimeSound(520);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-text-espresso hover:text-color-red transition-colors rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
              data-cursor-hover="true"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#181412] text-[#FBF8F2] flex flex-col justify-between p-8 transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
        style={{ paddingTop: '6rem' }}
      >
        <div className="flex flex-col gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-color-red font-bold">Menu Principale</span>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-serif-display text-4xl hover:text-color-red transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>{link.label}</span>
                <span className="text-sm font-sans tracking-widest text-white/40">0{idx + 1}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVipModal();
            }}
            className="w-full py-4 rounded-full bg-color-red text-white font-sans font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-xl"
          >
            <Sparkles size={16} />
            <span>UNISCITI AL CLUB • SHOP SOON</span>
          </button>
          <div className="flex justify-between text-xs text-white/50 pt-2 tracking-widest uppercase font-sans">
            <span>Milano • Roma • Capri</span>
            <span>© 2026 Frizzavita™</span>
          </div>
        </div>
      </div>
    </>
  );
}
