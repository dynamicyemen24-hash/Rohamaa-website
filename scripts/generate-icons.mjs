// Generate PWA Icons from SVG files
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import sharp from 'sharp';
import path from 'path';

const iconsDir = path.join(process.cwd(), 'public', 'icons');
const sizes = [48, 72, 96, 144, 192, 384, 512];

// SVG templates for different sizes
const createSVG = (size) => {
  const scale = size / 144;
  const center = size / 2;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>
  <circle cx="${center}" cy="${center}" r="${center}" fill="url(#bg)"/>
  <g transform="translate(${center}, ${center * 0.7}) scale(${scale})">
    <path d="M-15,-10 C-25,-25 -35,-20 -35,-5 C-35,10 -20,25 -10,30 C-5,32 0,35 5,35 C10,35 15,30 15,25" fill="#FFFFFF"/>
    <path d="M15,-10 C25,-25 35,-20 35,-5 C35,10 20,25 10,30 C5,32 0,35 -5,35 C-10,35 -15,30 -15,25" fill="#FFFFFF"/>
    <path d="M0,5 C-3,-2 -10,-5 -10,-10 C-10,-15 -5,-18 0,-15 C5,-18 10,-15 10,-10 C10,-5 3,-2 0,5Z" fill="url(#gold)"/>
  </g>
</svg>`;
};

async function generateIcons() {
  console.log('🎨 بدء توليد أيقونات PWA...');
  
  for (const size of sizes) {
    const svgContent = createSVG(size);
    const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
    
    await writeFile(svgPath, svgContent);
    console.log(`✅ تم إنشاء: icon-${size}x${size}.svg`);
  }
  
  // Generate shortcut icons
  const donateIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="48" fill="url(#bg)"/>
    <g transform="translate(48, 48)">
      <path d="M0,-25 L8,-10 L25,-10 L12,2 L18,20 L0,10 L-18,20 L-12,2 L-25,-10 L-8,-10 Z" fill="#FFFFFF"/>
    </g>
  </svg>`;
  
  await writeFile(path.join(iconsDir, 'shortcut-donate.svg'), donateIcon);
  console.log('✅ تم إنشاء: shortcut-donate.svg');
  
  const newsIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563EB"/>
        <stop offset="100%" stop-color="#1D4ED8"/>
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="48" fill="url(#bg)"/>
    <g transform="translate(48, 48)" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">
      <rect x="-20" y="-25" width="40" height="50" rx="3"/>
      <line x1="-12" y1="-15" x2="12" y2="-15"/>
      <line x1="-12" y1="-5" x2="12" y2="-5"/>
    </g>
  </svg>`;
  
  await writeFile(path.join(iconsDir, 'shortcut-news.svg'), newsIcon);
  console.log('✅ تم إنشاء: shortcut-news.svg');
  
  console.log('\n🎉 تم إنشاء جميع الأيقونات SVG!');
  console.log('\nملاحظة: لتحويل SVG إلى PNG، استخدم أمر:');
  console.log('npx sharp -i public/icons/icon-*.svg -o public/pwa-');
}

generateIcons().catch(console.error);