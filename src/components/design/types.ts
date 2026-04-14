export interface Material {
  id: string;
  name: string;
  roughness: number;
  metalness: number;
  emissive?: boolean;
  map?: string;
  transmission?: number;
}

export interface Color {
  id: string;
  value: string;
  name: string;
}

export interface Decal {
  id: string;
  name: string;
  icon: string;
}

export interface DesignState {
  color: Color;
  material: Material;
  decals: Decal[];
  activeTab: 'tent' | 'plant' | 'grid';
  environment: string;
}
