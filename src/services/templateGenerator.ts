import type { Template } from '../data/templates';

export async function generateTemplate(template: Template, width = 1080, height = 1080): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Load the image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = template.photoUrl;
  });

  // Calculate cover sizing
  const scale = Math.max(width / img.width, height / img.height);
  const x = (width / 2) - (img.width / 2) * scale;
  const y = (height / 2) - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  // Apply subtle editorial overlays
  // 1. Dark vignette at bottom for text readability
  const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
  gradient.addColorStop(0, 'rgba(11, 8, 20, 0.0)');
  gradient.addColorStop(1, 'rgba(11, 8, 20, 0.85)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle color tint based on the Vice City theme (electric purple / magenta)
  ctx.fillStyle = 'rgba(144, 19, 254, 0.15)';
  ctx.fillRect(0, 0, width, height);

  // Thin, clean border frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  return canvas.toDataURL('image/jpeg', 0.9);
}
