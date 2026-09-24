import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { toggleAudioMute, playCanOpenSound, isAudioMuted } from '../utils/sound';

export default function AudioToggle() {
  const [muted, setMuted] = useState(isAudioMuted());

  const handleToggle = () => {
    const nextState = toggleAudioMute();
    setMuted(nextState);
    if (!nextState) {
      playCanOpenSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-espresso text-cream shadow-2xl border border-white/10 hover:border-red/50 hover:bg-espresso-light transition-all duration-300 text-xs font-bold tracking-widest uppercase cursor-pointer group"
      aria-label={muted ? 'Enable Italian Soda Fizz Sound' : 'Mute Sound'}
      title={muted ? 'Attiva Audio Frizzante' : 'Disattiva Audio'}
      data-cursor-hover="true"
    >
      <span className="relative flex h-2 w-2">
        {!muted && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color-red opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${muted ? 'bg-zinc-500' : 'bg-color-red'}`}></span>
      </span>
      {muted ? (
        <>
          <VolumeX size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-[11px] font-sans tracking-widest text-zinc-400 group-hover:text-white">SUONO OFF</span>
        </>
      ) : (
        <>
          <Volume2 size={14} className="text-color-red group-hover:text-white transition-colors animate-pulse" />
          <span className="text-[11px] font-sans tracking-widest text-white">FIZZ ON</span>
        </>
      )}
    </button>
  );
}
