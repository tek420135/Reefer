import React from 'react';
import { motion } from 'motion/react';
import { Box, Layers, Globe, Cpu, ShoppingBag, Calendar, HelpCircle, Users, Mail, ShieldCheck, BookOpen, MessageSquare, Layout, Activity, Zap, Leaf, Code, Download, Smartphone, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, description, icon, children, className }) => {
  const { plugIn } = useSocketContext();
  
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
      className={cn(
        "relative min-h-[600px] w-full max-w-6xl mx-auto my-32 p-12 wacky-border glass-morphism flex flex-col items-center justify-center text-center overflow-hidden",
        className
      )}
    >
      {/* 3D Floating Accents */}
      <div className="absolute top-4 left-4 text-cannabis-light/20 opacity-50 orbital-spin">
        {icon}
      </div>
      <div className="absolute bottom-4 right-4 text-money-gold/20 opacity-50 orbital-spin" style={{ animationDirection: 'reverse' }}>
        {icon}
      </div>

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cannabis-dark/30 border border-cannabis-light/30 text-cannabis-light font-mono text-xs uppercase tracking-widest">
          <Zap size={14} /> {subtitle}
        </div>
        
        <h2 className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cannabis-light via-money-gold to-curiosity-purple leading-tight">
          {title}
        </h2>
        
        <p className="max-w-2xl mx-auto text-xl font-jazzy italic text-white/80 leading-relaxed">
          {description}
        </p>

        <div className="pt-8">
          {children}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 pt-12">
          <button 
            onClick={() => plugIn(title)}
            className="px-8 py-4 bg-cannabis-light text-cannabis-dark font-bold rounded-2xl hover:scale-110 transition-transform shadow-[0_0_20px_rgba(163,230,53,0.4)]"
          >
            PLUG IN
          </button>
          <button 
            onClick={() => plugIn(`Learn: ${title}`)}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </motion.section>
  );
};

import GanjaGuruChat from './GanjaGuruChat';
import DesignStudio from './DesignStudio';
import GrowDashboard from './GrowDashboard';
import BookingSystem from './BookingSystem';
import Marketplace from './Marketplace';
import VirtualGrow from './VirtualGrow';
import SeedToSmokeFlow from './SeedToSmokeFlow';
import NeuralHacking from './NeuralHacking';
import TheVault from './TheVault';

import AboutUs from './AboutUs';

interface LandingPageProps {
  xp?: number;
  onInstall?: () => void;
}

export default function LandingPage({ xp = 1200, onInstall }: LandingPageProps) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Section
        id="hero"
        title="THE SOCKET"
        subtitle="The Eco-Grid Sync"
        description="The world's first AI-powered, 3D-printed cannabis metaverse. We've digitized the wisdom of legends to automate your grow, design your gear, and sync your stash with the grid."
        icon={<Leaf size={120} />}
        className="mt-0 relative overflow-hidden"
      >
        {/* Neural Background Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cannabis-light blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-curiosity-purple blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="w-full max-w-md aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-money-gold/50 relative group">
            <img 
              src="https://picsum.photos/seed/cannabis-meta/800/450" 
              alt="Metaverse Preview" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-mono text-white/80 uppercase tracking-widest">LIVE STREAM: GROW ROOM ALPHA v0.42</p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-money-gold" 
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Main Chat / AI Consultant Section */}
      <Section
        id="ganjaguru"
        title="AI CONSULTANT"
        subtitle="Neural Eco-Expert"
        description="Meet your new head of cultivation. Our AI Consultant analyzes your grow space, optimizes your design, and provides real-time wisdom for the perfect sustainable harvest."
        icon={<MessageSquare size={120} />}
      >
        <GanjaGuruChat />
      </Section>

      {/* Neural Hacking Section */}
      <Section
        id="neural-hacking"
        title="NEURAL SYNC"
        subtitle="Farm Digital Seeds"
        description="Sync with the grid to earn XP and Digital Seeds. Our interactive neural link allows you to farm resources for your next 3D-printed grow tool."
        icon={<Terminal size={120} />}
        className="bg-cannabis-light/5"
      >
        <NeuralHacking />
      </Section>

      {/* The Vault Section */}
      <Section
        id="the-vault"
        title="THE VAULT"
        subtitle="Secured Inventory"
        description="Manage your digital stash. The Vault stores your 3D blueprints, eco-sourced genetics, and custom designs in a secure, encrypted grid."
        icon={<ShieldCheck size={120} />}
      >
        <TheVault />
      </Section>

      {/* Grow Dashboard Section */}
      <Section
        id="ar-vr"
        title="ECO-GRID"
        subtitle="Real-Time Grow Analytics"
        description="Monitor your virtual and physical grow rooms through our real-time analytics dashboard. Precision tracking for temperature, humidity, and CO2."
        icon={<Activity size={120} />}
        className="bg-cannabis-dark/10"
      >
        <GrowDashboard />
      </Section>

      {/* Design Studio Section */}
      <Section
        id="design-studio"
        title="3D STUDIO"
        subtitle="3D Print on Demand"
        description="Design custom grow brackets, bongs, and stealth cabinets. We use 100% biodegradable hemp filament to print your vision on demand."
        icon={<Box size={120} />}
      >
        <DesignStudio />
      </Section>

      {/* What We Do */}
      <Section
        id="what-we-do"
        title="THE GRID"
        subtitle="Sustainable Ecosystem"
        description="We've eliminated inventory waste. Our just-in-time manufacturing model ensures 100% sustainable sourcing and pinpoint delivery."
        icon={<Globe size={120} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: '3DPoD', desc: 'Custom grow tools and hardware printed on demand with zero waste.', icon: <Box className="text-cannabis-light" /> },
            { title: 'AR/VR Design', desc: 'Visualize your automated grow room before manufacturing begins.', icon: <Layers className="text-money-gold" /> },
            { title: 'Eco-Sourcing', desc: '100% biodegradable materials sourced from sustainable hemp farms.', icon: <ShieldCheck className="text-curiosity-purple" /> },
          ].map((item, i) => (
            <div key={i} className="p-6 glass-morphism rounded-3xl border border-white/10 hover:border-cannabis-light transition-all group">
              <div className="mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
              <h4 className="font-display font-bold text-xl mb-2">{item.title}</h4>
              <p className="text-sm text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Marketplace Section */}
      <Section
        id="ecommerce"
        title="THE MARKET"
        subtitle="Eco-Friendly Marketplace"
        description="Sustainably sourced genetics and hardware. Every item in our market is verified for eco-impact and delivered via pinpoint drop."
        icon={<ShoppingBag size={120} />}
      >
        <Marketplace />
      </Section>

      {/* Booking Section */}
      <Section
        id="booking"
        title="THE PLUG"
        subtitle="Expert Consultation"
        description="Book a one-on-one session with our master cultivators. Get personalized advice on grow room automation and design."
        icon={<Calendar size={120} />}
      >
        <BookingSystem />
      </Section>

      {/* Onboarding Section */}
      <Section
        id="onboarding"
        title="SYNC NOW"
        subtitle="Interactive Onboarding"
        description="Your journey from seed to smoke starts here. Sync your device with the grid to begin your automated grow journey."
        icon={<Zap size={120} />}
      >
        <SeedToSmokeFlow />
      </Section>

      {/* AR/VR Section */}
      <Section
        id="virtual-grow"
        title="VIRTUAL GROW"
        subtitle="AR Grow Room Design"
        description="Use Augmented Reality to walk through your grow space. Adjust lighting, airflow, and plant placement in real-time 3D."
        icon={<Layers size={120} />}
        className="bg-curiosity-purple/10"
      >
        <VirtualGrow />
      </Section>

      {/* Features / How it Works */}
      <Section
        id="how-it-works"
        title="THE FLOW"
        subtitle="Automated Supply Chain"
        description="We've reinvented the supply chain. From digital design to physical delivery in 24 hours."
        icon={<Zap size={120} />}
      >
        <div className="flex flex-col space-y-12 max-w-2xl mx-auto">
          {[
            { title: 'Neural Consultation', desc: 'Consult with our AI to define your grow needs and custom hardware specs.' },
            { title: 'Eco-Sourcing', desc: 'Our grid sources sustainable, eco-friendly materials for your 3D-printed designs.' },
            { title: '3D Reality', desc: 'We manufacture your custom gear on demand using hemp-based filaments.' },
            { title: 'Pinpoint Drop', desc: 'Precision 24-hour delivery to your exact GPS coordinates.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start text-left group">
              <div className="text-4xl font-black text-white/10 group-hover:text-cannabis-light transition-colors">0{i+1}</div>
              <div>
                <h4 className="text-2xl font-display font-bold mb-2">{item.title}</h4>
                <p className="text-white/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team / Blog / Testimonials */}
      <Section
        id="testimonials"
        title="THE WORD"
        subtitle="Street Cred"
        description="Don't just take our word for it. The streets are talking."
        icon={<Users size={120} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Slick Rick', quote: 'The Socket is the real deal. My grow room design is pure fire.', role: 'Master Grower' },
            { name: 'D-Low', quote: 'Custom 3D printed rolling trays? Say less. The Socket is the plug.', role: 'Connoisseur' },
          ].map((t, i) => (
            <div key={i} className="p-8 glass-morphism rounded-3xl border-t-4 border-money-gold text-left italic">
              <p className="text-lg mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3 not-italic">
                <div className="w-10 h-10 bg-white/10 rounded-full" />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-[10px] text-white/40 uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* E-Commerce */}
      <Section
        id="shop"
        title="THE SHOP"
        subtitle="Automated Flow"
        description="Auto-sourced, drop-shipped, and legal. The ultimate one-stop hemp shop."
        icon={<ShoppingBag size={120} />}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square glass-morphism rounded-2xl border border-white/10 overflow-hidden relative group">
              <img src={`https://picsum.photos/seed/product-${i}/400/400`} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-lg">
                <p className="text-[10px] font-mono text-money-gold">ITEM #{i}042</p>
                <p className="text-xs font-bold">KUSH KIT v{i}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Dedicated About Us Section */}
      <Section
        id="about-us"
        title="THE ORIGIN"
        subtitle="About Us"
        description="We didn't just build a website. We built a grid. A collective of visionaries, hackers, and growers who believe the street deserves better tech."
        icon={<BookOpen size={120} />}
      >
        <AboutUs />
      </Section>

      {/* Blog Section */}
      <Section
        id="blog"
        title="THE CHRONICLES"
        subtitle="The Blog"
        description="Latest dispatches from the grid. Blueprints, grow tips, and tech leaks."
        icon={<Layout size={120} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'The 3DPoD Revolution', date: 'APR 04', tag: 'TECH' },
            { title: 'Neural Sync: A Deep Dive', date: 'APR 02', tag: 'VIBE' },
            { title: 'Eco-Friendly Grow Ops', date: 'MAR 28', tag: 'GUIDE' },
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-white/5 rounded-2xl mb-4 overflow-hidden border border-white/10 group-hover:border-cannabis-light transition-all">
                <img src={`https://picsum.photos/seed/blog-${i}/400/225`} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono text-cannabis-light">{post.tag}</span>
                  <span className="text-[10px] font-mono text-white/30">•</span>
                  <span className="text-[10px] font-mono text-white/30">{post.date}</span>
                </div>
                <h4 className="font-bold group-hover:text-money-gold transition-colors">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        id="faq"
        title="THE CIPHER"
        subtitle="Help & Support"
        description="Got questions? We got answers. If not, the AI Consultant will find them."
        icon={<HelpCircle size={120} />}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { q: 'Is it legal?', a: 'We handle the legalities once, you stay legal after that. The Socket is a tool for innovation.' },
            { q: 'How does 3DPoD work?', a: 'You design it in the studio, we print it using hemp-based filament and drop it at your door.' },
            { q: 'What is Neural Sync?', a: 'It is a high-frequency UI state optimized for smooth navigation and deep focus.' },
          ].map((item, i) => (
            <div key={i} className="text-left p-6 glass-morphism rounded-2xl border border-white/10 hover:border-money-gold transition-all">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Zap size={14} className="text-money-gold" /> {item.q}
              </h4>
              <p className="text-sm text-white/60">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Account Section */}
      <Section
        id="account"
        title="THE VAULT"
        subtitle="Your Credentials"
        description="Secure your stash. Access your blueprints, orders, and grow stats from one secure portal."
        icon={<ShieldCheck size={120} />}
      >
        <div className="p-8 glass-morphism rounded-3xl border-2 border-money-gold max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-money-gold rounded-full flex items-center justify-center">
              <Users className="text-money-green" size={32} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-xl">GUEST_420</h4>
              <p className="text-xs text-money-gold font-mono uppercase">RANK: {xp > 2000 ? 'MASTER GROWER' : xp > 1500 ? 'CULTIVATOR' : 'SEEDLING'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${(xp % 500) / 5}%` }}
                className="h-full bg-cannabis-light" 
              />
            </div>
            <p className="text-[10px] text-right text-white/40 uppercase">XP: {xp.toLocaleString()} • NEXT LEVEL IN: {500 - (xp % 500)} XP</p>
          </div>
        </div>
      </Section>

      {/* Installation / Offline Section */}
      <Section
        id="installation"
        title="GO OFFLINE"
        subtitle="PWA & Installation"
        description="Take the grid with you. Install the Socket on your device for offline blueprints and pinpoint delivery alerts."
        icon={<Layout size={120} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 glass-morphism rounded-[32px] border border-white/10 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-cannabis-light/20 rounded-2xl flex items-center justify-center text-cannabis-light">
              <Smartphone size={32} />
            </div>
            <h4 className="text-xl font-display font-bold uppercase">Install as PWA</h4>
            <p className="text-sm text-white/50">
              Open the app in Chrome, tap the menu, and select "Add to Home Screen" for a full-screen, offline-ready experience.
            </p>
            <button 
              onClick={onInstall}
              className="w-full py-4 bg-cannabis-light text-cannabis-dark font-black rounded-2xl shadow-xl hover:scale-105 transition-transform"
            >
              INSTALL NOW
            </button>
          </div>

          <div className="p-8 glass-morphism rounded-[32px] border border-white/10 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-money-gold/20 rounded-2xl flex items-center justify-center text-money-gold">
              <Code size={32} />
            </div>
            <h4 className="text-xl font-display font-bold uppercase">The Blueprint</h4>
            <p className="text-sm text-white/50">
              Want to advance the grid? Run the full development environment on your Android using Termux and Acode.
            </p>
            <button 
              onClick={() => {
                const guide = `THE SOCKET: Android Development Guide\n\n1. Install Termux & Acode\n2. pkg install nodejs git\n3. npm install\n4. npm run dev\n5. Visit localhost:3000`;
                const blob = new Blob([guide], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'DEVELOPMENT_GUIDE.txt';
                a.click();
              }}
              className="w-full py-4 bg-white/10 text-white border border-white/10 font-black rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} /> DEV GUIDE
            </button>
          </div>
        </div>
        <p className="mt-8 text-xs font-mono text-white/30">v1.0.42-STABLE • ANDROID & iOS READY • OFFLINE PERSISTENCE ACTIVE</p>
      </Section>

      <footer className="py-12 text-center border-t border-white/10 font-mono text-[10px] text-white/30">
        <p>© 2026 THE SOCKET. ALL RIGHTS RESERVED. KEEP IT GREEN.</p>
        <div className="flex justify-center gap-4 mt-4">
          <span>TOS</span>
          <span>PRIVACY</span>
          <span>SECURITY</span>
        </div>
      </footer>
    </div>
  );
}
