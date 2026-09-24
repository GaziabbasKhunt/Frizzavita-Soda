import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AudioToggle from './components/AudioToggle';
import FlavorModal from './components/FlavorModal';
import VipModal from './components/VipModal';

import Hero from './sections/Hero';
import BrandIntro from './sections/BrandIntro';
import CanExperienceSection from './sections/CanExperienceSection';
import FlavorCollection from './sections/FlavorCollection';
import MotionPosters from './sections/MotionPosters';
import IngredientStory from './sections/IngredientStory';
import LifestyleSection from './sections/LifestyleSection';
import ProductShowcase from './sections/ProductShowcase';
import BrandStory from './sections/BrandStory';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

export default function App() {
  const [selectedFlavorModal, setSelectedFlavorModal] = useState(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  const handleOpenFlavorModal = (flavor) => {
    setSelectedFlavorModal(flavor);
  };

  const handleCloseFlavorModal = () => {
    setSelectedFlavorModal(null);
  };

  const handleSelectFlavor3D = (flavor) => {
    const experienceEl = document.getElementById('experience');
    if (experienceEl) {
      experienceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#181412] relative selection:bg-[#C91D1D] selection:text-white">
      {/* Subtle Analog Film Grain Overlay */}
      <div className="film-grain" />

      {/* Luxury Interactive Desktop Cursor */}
      <CustomCursor />

      {/* Global Interactive Web Audio Toggle */}
      <AudioToggle />

      {/* Sticky Luxury Navbar */}
      <Navbar onOpenVipModal={() => setIsVipModalOpen(true)} />

      {/* Main Campaign Website Sections */}
      <main>
        {/* 01. Hero Section */}
        <Hero
          onOpenVipModal={() => setIsVipModalOpen(true)}
          onSelectFlavor={handleOpenFlavorModal}
        />

        {/* 02. Brand Introduction & Manifesto */}
        <BrandIntro />

        {/* 03. 3D Can Experience Studio */}
        <CanExperienceSection onOpenFlavorModal={handleOpenFlavorModal} />

        {/* 04. Flavor Collection */}
        <FlavorCollection
          onOpenFlavorModal={handleOpenFlavorModal}
          onSelectFlavor3D={handleSelectFlavor3D}
        />

        {/* 05. Motion Poster Section */}
        <MotionPosters />

        {/* 06. Ingredient Story */}
        <IngredientStory />

        {/* 07. Italian Lifestyle & Campaign */}
        <LifestyleSection />

        {/* 08. Product Showcase */}
        <ProductShowcase onOpenVipModal={() => setIsVipModalOpen(true)} />

        {/* 09. Brand Story & Press Accolades */}
        <BrandStory />

        {/* 10. Call To Action Finale */}
        <CTASection onOpenVipModal={() => setIsVipModalOpen(true)} />
      </main>

      {/* 11. Luxury Minimal Footer */}
      <Footer onOpenVipModal={() => setIsVipModalOpen(true)} />

      {/* Modals */}
      <FlavorModal
        flavor={selectedFlavorModal}
        onClose={handleCloseFlavorModal}
        onSelect3DView={handleSelectFlavor3D}
      />

      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />
    </div>
  );
}
