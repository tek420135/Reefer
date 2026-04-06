import React from 'react';
import { motion } from 'motion/react';
import { Box, Layers, Globe, Cpu, ShoppingBag, Calendar, HelpCircle, Users, Mail, ShieldCheck, BookOpen, MessageSquare, Layout, Activity, Zap, Leaf } from 'lucide-react';
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
        subtitle="Seed to Smoke Metaverse"
        description="What happens when Willie, Snoop, Bruce, and Pac roll one together? You get the GanjaGuru. The grid. The switchboard. The plug behind the plug."
        icon={<Leaf size={120} />}
        className="mt-0"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-md aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-money-gold/50 relative">
            <img 
              src="https://picsum.photos/seed/cannabis-meta/800/450" 
              alt="Metaverse Preview" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <p className="text-xs font-mono text-money-gold">LIVE STREAM: GROW ROOM ALPHA v0.42</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Main Chat / GanjaGuru Section */}
      <Section
        id="ganjaguru"
        title="GANJA GURU"
        subtitle="AI Powered Wisdom"
        description="Spit your vision, drop your blueprints, or just vibe. Our AI flavored blunt wrap is ready to analyze your flow."
        icon={<MessageSquare size={120} />}
      >
        <GanjaGuruChat />
      </Section>

      {/* Grow Dashboard Section */}
      <Section
        id="ar-vr"
        title="LIVE GRID"
        subtitle="Real-Time Monitoring"
        description="Your grow room, digitized. Monitor every breath your plants take through the Socket's neural link."
        icon={<Activity size={120} />}
        className="bg-cannabis-dark/10"
      >
        <GrowDashboard />
      </Section>

      {/* Design Studio Section */}
      <Section
        id="design-studio"
        title="3D STUDIO"
        subtitle="Design Studio"
        description="Custom brackets, bongs, or stealth grow cabinets. If you can dream it, the GanjaGuru can print it."
        icon={<Box size={120} />}
      >
        <DesignStudio />
      </Section>

      {/* What We Do */}
      <Section
        id="what-we-do"
        title="THE GRID"
        subtitle="Our Ecosystem"
        description="No inventory. No limits. Just pure innovation. We source, we design, we deliver. You just plug in."
        icon={<Globe size={120} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: '3DPoD', desc: 'Custom brackets, bongs, and grow tools printed on demand.', icon: <Box className="text-cannabis-light" /> },
            { title: 'AR/VR Design', desc: 'Walk through your grow space before the first seed drops.', icon: <Layers className="text-money-gold" /> },
            { title: 'Eco-Sourcing', desc: '100% biodegradable, sustainable, and earth-friendly.', icon: <ShieldCheck className="text-curiosity-purple" /> },
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
        subtitle="The Socket Marketplace"
        description="Auto-sourced, drop-shipped, and legal. Use your digital seeds to secure the latest genetics and hardware."
        icon={<ShoppingBag size={120} />}
      >
        <Marketplace />
      </Section>

      {/* Booking Section */}
      <Section
        id="booking"
        title="THE PLUG"
        subtitle="Book a Consultation"
        description="Need a one-on-one with a master? Secure your slot in the cipher and get that expert flow."
        icon={<Calendar size={120} />}
      >
        <BookingSystem />
      </Section>

      {/* Onboarding Section */}
      <Section
        id="onboarding"
        title="PLUG IN"
        subtitle="Interactive Onboarding"
        description="Step into the portal. Your journey from seed to smoke starts with a single spark."
        icon={<Zap size={120} />}
      >
        <SeedToSmokeFlow />
      </Section>

      {/* AR/VR Section */}
      <Section
        id="virtual-grow"
        title="VIRTUAL GROW"
        subtitle="AR & VR Integration"
        description="Walk through your automated grow space in full 3D. Adjust the lights, check the humidity, and vibe with your plants in real-time."
        icon={<Layers size={120} />}
        className="bg-curiosity-purple/10"
      >
        <VirtualGrow />
      </Section>

      {/* Features / How it Works */}
      <Section
        id="how-it-works"
        title="THE FLOW"
        subtitle="How It Works"
        description="We broke the rules so you don't have to. A seamless flow from browser to final sale."
        icon={<Zap size={120} />}
      >
        <div className="flex flex-col space-y-12 max-w-2xl mx-auto">
          {[
            { step: '01', title: 'Vibe Check', desc: 'Tell the GanjaGuru what you need. A custom bong? A stealth grow cabinet? A coloring book?' },
            { step: '02', title: 'Auto-Source', desc: 'Our grid scans the planet for eco-friendly, sustainable materials. No inventory, no waste.' },
            { step: '03', title: '3D Reality', desc: 'We print your custom gear or design your space in AR/VR.' },
            { step: '04', title: 'Pinpoint Drop', desc: '24-hour delivery to exactly where you sit your tush.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start text-left group">
              <div className="text-4xl font-black text-white/10 group-hover:text-cannabis-light transition-colors">{item.step}</div>
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
            { name: 'D-Low', quote: 'Custom 3D printed rolling trays? Say less. GanjaGuru is the plug.', role: 'Connoisseur' },
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

      {/* About Us Section */}
      <Section
        id="about-us"
        title="THE ORIGIN"
        subtitle="About Us"
        description="We didn't just build a website. We built a grid. A collective of visionaries, hackers, and growers who believe the street deserves better tech."
        icon={<BookOpen size={120} />}
      >
        <div className="max-w-3xl mx-auto text-left glass-morphism p-8 rounded-3xl border border-white/10">
          <p className="text-lg leading-relaxed mb-6">
            Born in the haze of a digital revolution, The Socket is the first AI-powered cannabis metaverse. We've combined the wisdom of legends with the raw power of artificial intelligence to create a seamless, end-to-end ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h5 className="font-bold text-cannabis-light">VISION</h5>
              <p className="text-xs text-white/60">To be the global switchboard for all things cannabis.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h5 className="font-bold text-money-gold">MISSION</h5>
              <p className="text-xs text-white/60">Sustainable, automated, and community-driven innovation.</p>
            </div>
          </div>
        </div>
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
            { title: 'Snoop Mode: A Deep Dive', date: 'APR 02', tag: 'VIBE' },
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

      {/* Team Section */}
      <Section
        id="team"
        title="THE COUNCIL"
        subtitle="Our Team"
        description="The hackers and growers behind the grid."
        icon={<Users size={120} />}
      >
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: 'GURU_01', role: 'Architect', color: 'bg-cannabis-light' },
            { name: 'PLUG_42', role: 'Sourcing', color: 'bg-money-gold' },
            { name: 'CODE_RED', role: 'AI Dev', color: 'bg-curiosity-purple' },
          ].map((member, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className={`w-24 h-24 rounded-full ${member.color} mb-4 shadow-xl group-hover:scale-110 transition-transform flex items-center justify-center text-black font-black text-2xl`}>
                {member.name[0]}
              </div>
              <h5 className="font-bold">{member.name}</h5>
              <p className="text-[10px] font-mono text-white/40 uppercase">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section
        id="faq"
        title="THE CIPHER"
        subtitle="Help & Support"
        description="Got questions? We got answers. If not, the GanjaGuru will find them."
        icon={<HelpCircle size={120} />}
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { q: 'Is it legal?', a: 'We handle the legalities once, you stay legal after that. The Socket is a tool for innovation.' },
            { q: 'How does 3DPoD work?', a: 'You design it in the studio, we print it using hemp-based filament and drop it at your door.' },
            { q: 'What is Snoop Mode?', a: 'It is a high-frequency UI state optimized for smooth navigation and deep focus.' },
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
        <div className="flex flex-col items-center gap-6">
          <div className="p-6 glass-morphism rounded-2xl border border-white/10 animate-bounce">
            <Zap className="text-money-gold" size={48} />
          </div>
          <button 
            onClick={onInstall}
            className="px-12 py-6 bg-gradient-to-r from-cannabis-light to-money-gold text-cannabis-dark font-black rounded-3xl shadow-2xl hover:scale-105 transition-transform"
          >
            INSTALL THE SOCKET
          </button>
          <p className="text-xs font-mono text-white/30">v1.0.42-STABLE • ANDROID & iOS READY</p>
        </div>
      </Section>

      <footer className="py-12 text-center border-t border-white/10 font-mono text-[10px] text-white/30">
        <p>© 2026 GANJAGURU - THE SOCKET. ALL RIGHTS RESERVED. KEEP IT GREEN.</p>
        <div className="flex justify-center gap-4 mt-4">
          <span>TOS</span>
          <span>PRIVACY</span>
          <span>SECURITY</span>
        </div>
      </footer>
    </div>
  );
}
