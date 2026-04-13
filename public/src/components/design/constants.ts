import { Material, Color, Decal } from './types';

export const MATERIALS: Material[] = [
  { id: 'matte', name: 'Matte Stealth', roughness: 0.8, metalness: 0.1 },
  { id: 'glossy', name: 'High Gloss', roughness: 0.1, metalness: 0.2 },
  { id: 'metallic', name: 'Liquid Metal', roughness: 0.2, metalness: 0.9 },
  { id: 'neon', name: 'Neon Pulse', roughness: 0.5, metalness: 0.5, emissive: true },
  { id: 'wood', name: 'Organic Grain', roughness: 0.9, metalness: 0.0, map: 'https://picsum.photos/seed/wood/512/512' },
  { id: 'brushed', name: 'Brushed Alloy', roughness: 0.3, metalness: 0.8 },
  { id: 'iridescent', name: 'Oil Slick', roughness: 0.1, metalness: 0.5, transmission: 0.5 },
  { id: 'carbon', name: 'Carbon Fiber', roughness: 0.4, metalness: 0.3, map: 'https://picsum.photos/seed/carbon/512/512' },
  { id: 'goldleaf', name: '24K Gold Leaf', roughness: 0.1, metalness: 1.0 },
];

export const COLORS: Color[] = [
  { id: 'cannabis', value: '#a3e635', name: 'Cannabis Green' },
  { id: 'gold', value: '#fbbf24', name: 'Money Gold' },
  { id: 'purple', value: '#8b5cf6', name: 'Curiosity Purple' },
  { id: 'crimson', value: '#ef4444', name: 'Hype Crimson' },
  { id: 'cyan', value: '#06b6d4', name: 'Cyber Cyan' },
  { id: 'obsidian', value: '#111111', name: 'Obsidian' },
  { id: 'ghost', value: '#f8fafc', name: 'Ghost White' },
];

export const DECALS: Decal[] = [
  { id: 'socket', name: 'Socket Logo', icon: '⚡' },
  { id: 'leaf', name: 'Eco Leaf', icon: '🌿' },
  { id: 'guru', name: 'Guru Seal', icon: '🧘' },
  { id: 'fire', name: 'Hype Fire', icon: '🔥' },
  { id: 'skull', name: 'Stealth Skull', icon: '💀' },
  { id: 'diamond', name: 'Pure Diamond', icon: '💎' },
];

export const ENVIRONMENTS = [
  { id: 'night', name: 'Night Studio', icon: '🌙' },
  { id: 'city', name: 'Cyber City', icon: '🏙️' },
  { id: 'studio', name: 'Clean Studio', icon: '📸' },
  { id: 'forest', name: 'Deep Forest', icon: '🌲' },
  { id: 'apartment', name: 'Grow Loft', icon: '🏠' },
];
