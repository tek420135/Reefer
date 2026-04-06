export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  file?: {
    name: string;
    type: string;
    size: number;
    data?: string; // base64
  };
}

export type SectionId = 
  | 'hero' 
  | 'what-we-do' 
  | 'onboarding' 
  | 'services' 
  | 'ganjaguru' 
  | 'ar-vr' 
  | 'design-studio' 
  | 'virtual-grow'
  | 'ecommerce' 
  | 'shop'
  | 'booking' 
  | 'how-it-works' 
  | 'features' 
  | 'testimonials' 
  | 'team' 
  | 'contact';
