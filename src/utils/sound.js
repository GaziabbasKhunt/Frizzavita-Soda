// Web Audio API Procedural Sound Engine
// Synthesizes realistic soda can opening, carbonated fizz, and crystal clicks without external audio files.

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted() {
  return isMuted;
}

export function setAudioMuted(muted) {
  isMuted = muted;
  return isMuted;
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  return isMuted;
}

// Crisp Aluminum Soda Can Tab Pop & Gas Burst
export function playCanOpenSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Sharp metallic snap / click
  const snapOsc = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snapOsc.type = 'triangle';
  snapOsc.frequency.setValueAtTime(1400, now);
  snapOsc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
  snapGain.gain.setValueAtTime(0.5, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  snapOsc.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapOsc.start(now);
  snapOsc.stop(now + 0.05);

  // 2. Secondary metallic pop resonance
  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();
  popOsc.type = 'sine';
  popOsc.frequency.setValueAtTime(650, now + 0.02);
  popOsc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
  popGain.gain.setValueAtTime(0.4, now + 0.02);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  popOsc.connect(popGain);
  popGain.connect(ctx.destination);
  popOsc.start(now + 0.02);
  popOsc.stop(now + 0.14);

  // 3. High pressure gas release (white noise filtered)
  const bufferSize = ctx.sampleRate * 0.45;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3800, now + 0.03);
  filter.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
  filter.Q.setValueAtTime(2.5, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.65, now + 0.03);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now + 0.03);
  whiteNoise.stop(now + 0.45);
}

// Effervescent Sparkling Fizz Sizzle
export function playFizzSound(duration = 0.6) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Pinkish crackle
    output[i] = (Math.random() * 2 - 1) * (0.8 + 0.2 * Math.sin(i * 0.05));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(2400, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

// Gentle Italian Chime / Interaction Click
export function playChimeSound(pitch = 880) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(pitch, now);
  osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.12);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}
