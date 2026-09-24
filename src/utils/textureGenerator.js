import * as THREE from 'three';

// Cache generated textures so we don't redraw repeatedly
const textureCache = new Map();
let condensationBumpCache = null;

export function createCanTexture(flavor) {
  const cacheKey = flavor.id;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // 1. Base Gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0.0, flavor.canColor);
  grad.addColorStop(0.25, flavor.color);
  grad.addColorStop(0.5, flavor.accentColor);
  grad.addColorStop(0.75, flavor.color);
  grad.addColorStop(1.0, flavor.canColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle brushed metal sheen lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Top and Bottom Aluminum Foil Borders
  ctx.fillStyle = '#C5A059'; // Italian Gold accent line
  ctx.fillRect(0, 40, canvas.width, 8);
  ctx.fillRect(0, canvas.height - 48, canvas.width, 8);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 48, canvas.width, 24);
  ctx.fillRect(0, canvas.height - 72, canvas.width, 24);

  // Repeat the main artwork 2 times across the 360 wrap (front and back)
  const sections = [canvas.width * 0.25, canvas.width * 0.75];

  sections.forEach((centerX) => {
    ctx.save();
    ctx.translate(centerX, 0);

    // Subtle Italian Ribbon Banner
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(-240, 90, 480, 48, 8);
    ctx.fill();

    ctx.fillStyle = '#C91D1D';
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('PRODOTTO IN ITALIA', 0, 122);

    // Brand Name: FRIZZAVITA
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 20;
    ctx.font = '900 130px "Italiana", "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '8px';
    ctx.fillText('FRIZZAVITA', 0, 260);

    // Tagline in Italian
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFD166';
    ctx.font = 'italic 600 32px "Cormorant Garamond", serif';
    ctx.fillText('« Assapora la vita frizzante »', 0, 315);

    // Decorative Floral / Citrus Medallion
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 480, 110, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 480, 118, 0, Math.PI * 2);
    ctx.stroke();

    // Flavor Number & Name inside Medallion
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`N° ${flavor.number}`, 0, 435);

    ctx.fillStyle = '#FFD166';
    ctx.font = '900 44px "Cinzel", "Syne", sans-serif';
    ctx.letterSpacing = '4px';
    const splitName = flavor.name.split(' ');
    if (splitName.length > 1) {
      ctx.fillText(splitName[0], 0, 485);
      ctx.fillText(splitName.slice(1).join(' '), 0, 530);
    } else {
      ctx.fillText(flavor.name, 0, 495);
    }

    // Italian Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'italic 500 28px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(flavor.italianTitle, 0, 650);

    // Origin Badge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.roundRect(-200, 690, 400, 50, 25);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(`✦ ${flavor.origin.toUpperCase()} ✦`, 0, 722);

    // Botanical / Sparkling specs grid at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(`NATURALE 100%  •  ${flavor.fizzLevel.toUpperCase()}  •  ${flavor.calories.toUpperCase()}`, 0, 810);

    // Fine print stamp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('330ml ℮  •  SODA ARTIGIANALE ITALIANA  •  MILANO', 0, 860);

    ctx.restore();
  });

  // Barcode on the side seam
  ctx.save();
  ctx.translate(canvas.width * 0.5, 680);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(-60, 0, 120, 140);
  ctx.fillStyle = '#181412';
  for (let b = -50; b < 50; b += 5) {
    if (Math.random() > 0.3) {
      ctx.fillRect(b, 10, (b % 10 === 0 ? 3 : 1.5), 100);
    }
  }
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('8 024890 120261', 0, 125);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

// Procedural Condensation Water Droplet Bump Map
export function createCondensationBumpMap() {
  if (condensationBumpCache) return condensationBumpCache;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  ctx.fillStyle = '#808080'; // Neutral 50% gray
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Scatter realistic water drops of varying sizes
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = 2 + Math.random() * 8;

    const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    radGrad.addColorStop(0, '#FFFFFF');
    radGrad.addColorStop(0.7, '#C0C0C0');
    radGrad.addColorStop(1, '#808080');

    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Occasional subtle droplet run/trickle
    if (Math.random() > 0.92) {
      const trickleLen = 15 + Math.random() * 35;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = r * 0.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + (Math.random() - 0.5) * 4, y + trickleLen * 0.5, x, y + trickleLen);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;

  condensationBumpCache = texture;
  return texture;
}
