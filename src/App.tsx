import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Menu, X, Leaf, Zap, Globe, MessageSquare, ShoppingBag, Calendar, Users, Mail, ShieldCheck, Activity, Box, Layers, Bell, Smartphone } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import LandingPage from './components/LandingPage';
import SmokeCursor from './components/SmokeCursor';
import SlangSearch from './components/SlangSearch';
import WarpPortal from './components/WarpPortal';
import FloatingGuru from './components/FloatingGuru';
import OfflineGuide from './components/OfflineGuide';
import { SocketProvider, useSocketContext } from './context/SocketContext';

function SocketApp() {
  const { 
    vibe, seeds, xp, isWarping, isMenuOpen, notifications,
    switchVibe, triggerWarp, toggleMenu, plugIn 
  } = useSocketContext();
  
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineGuide, setShowOfflineGuide] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const vibes = {
    willie: { color: '#fbbf24', label: 'Willie Mode' },
    snoop: { color: '#a3e635', label: 'Snoop Mode' },
    bruce: { color: '#ef4444', label: 'Bruce Mode' },
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const menuItems = [
    { id: 'hero', icon: <Leaf size={20} />, label: 'Home' },
    { id: 'ganjaguru', icon: <MessageSquare size={20} />, label: 'AI Guru' },
    { id: 'ar-vr', icon: <Activity size={20} />, label: 'Live Grid' },
    { id: 'design-studio', icon: <Box size={20} />, label: '3D Studio' },
    { id: 'virtual-grow', icon: <Layers size={20} />, label: 'Virtual Grow' },
    { id: 'ecommerce', icon: <ShoppingBag size={20} />, label: 'Market' },
    { id: 'onboarding', icon: <Zap size={20} />, label: 'The Flow' },
    { id: 'shop', icon: <ShoppingBag size={20} />, label: 'Shop' },
    { id: 'booking', icon: <Calendar size={20} />, label: 'The Plug' },
    { id: 'contact', icon: <Mail size={20} />, label: 'Join' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-cannabis-light selection:text-cannabis-dark transition-colors duration-1000" data-vibe={vibe}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cannabis-light via-money-gold to-curiosity-purple z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Vibe Switcher */}
      <div className="fixed top-8 right-8 flex gap-2 z-50">
        {(['willie', 'snoop', 'bruce'] as const).map((v) => (
          <button
            key={v}
            onClick={() => switchVibe(v)}
            className={cn(
              "w-10 h-10 rounded-full border transition-all flex items-center justify-center",
              vibe === v 
                ? "border-white scale-110 shadow-lg" 
                : "border-white/10 opacity-40 hover:opacity-100"
            )}
            style={{ backgroundColor: vibes[v].color }}
            title={vibes[v].label}
          >
            <Zap size={16} className={vibe === v ? 'text-black' : 'text-white'} />
          </button>
        ))}
      </div>

      {/* Global Notifications */}
      <div className="fixed top-24 right-8 flex flex-col gap-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((note, i) => (
            <motion.div
              key={note + i}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="p-4 glass-morphism rounded-xl border border-cannabis-light/30 flex items-center gap-3 shadow-xl"
            >
              <Bell size={16} className="text-cannabis-light" />
              <span className="text-[10px] font-mono uppercase tracking-widest">{note}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <SmokeCursor />
      <SlangSearch />
      <WarpPortal active={isWarping} />
      <FloatingGuru />
      
      <AnimatePresence>
        {showOfflineGuide && <OfflineGuide onClose={() => setShowOfflineGuide(false)} />}
      </AnimatePresence>

      {/* Seed Counter */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="fixed top-8 left-8 p-3 glass-morphism rounded-2xl border border-money-gold/30 flex items-center gap-3 z-50 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
      >
        <button 
          onClick={() => plugIn('Power Surge')}
          className="w-8 h-8 bg-money-gold rounded-full flex items-center justify-center hover:scale-125 transition-transform active:scale-90"
        >
          <Zap size={16} className="text-money-green" />
        </button>
        <div>
          <p className="text-[8px] font-mono text-money-gold uppercase leading-none mb-1">Digital Seeds</p>
          <p className="text-lg font-display font-bold leading-none">{seeds.toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Floating Orbital Menu Toggle */}
      <button
        onClick={toggleMenu}
        className="fixed bottom-8 right-8 w-16 h-16 bg-cannabis-light text-cannabis-dark rounded-full flex items-center justify-center z-50 shadow-[0_0_30px_rgba(163,230,53,0.5)] hover:scale-110 transition-transform"
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Orbital Navigation Overlay */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-40 flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-[400px] h-[400px]">
          {menuItems.map((item, i) => {
            const angle = (i / menuItems.length) * Math.PI * 2;
            const x = Math.cos(angle) * 150;
            const y = Math.sin(angle) * 150;

            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  toggleMenu();
                  triggerWarp();
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={isMenuOpen ? { x, y, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white/5 border border-white/10 rounded-full hover:bg-cannabis-light hover:text-cannabis-dark transition-all group"
                )}
              >
                <div className="relative">
                  {item.icon}
                  <span className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-display font-bold text-xl whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </motion.a>
            );
          })}
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="text-4xl font-black text-money-gold tracking-tighter">THE SOCKET</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Orbital Navigation</p>
          </div>
        </div>
      </motion.div>

      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const initialX = (i * 7) % 100;
          const initialY = (i * 13) % 100;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                left: `${initialX}%`, 
                top: `${initialY}%`,
                rotate: Math.random() * 360
              }}
              animate={{ 
                x: (mousePos.x - (window.innerWidth * initialX / 100)) * -0.05,
                y: (mousePos.y - (window.innerHeight * initialY / 100)) * -0.05,
                rotate: [null, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                x: { type: 'spring', stiffness: 20, damping: 10 },
                y: { type: 'spring', stiffness: 20, damping: 10 },
                rotate: { duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity }
              }}
              className="absolute opacity-[0.03]"
            >
              <Leaf size={150 + Math.random() * 200} className="text-cannabis-light" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <LandingPage xp={xp} />
      </main>

      {/* Floating GanjaGuru Indicator */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="fixed bottom-8 left-8 flex flex-col gap-2 z-30"
      >
        <button 
          onClick={() => setShowOfflineGuide(true)}
          className="p-3 glass-morphism rounded-2xl border border-money-gold/30 flex items-center gap-2 hover:bg-money-gold/10 transition-colors group"
        >
          <Smartphone size={14} className="text-money-gold group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-mono text-money-gold uppercase tracking-widest">Android Guide</span>
        </button>
        <div className="p-4 glass-morphism rounded-2xl border border-cannabis-light/30 flex items-center gap-3">
          <div className={cn("w-3 h-3 rounded-full animate-pulse", isOnline ? "bg-cannabis-light" : "bg-red-500")} />
          <span className="text-[10px] font-mono text-cannabis-light uppercase tracking-widest">
            {isOnline ? 'Guru Online' : 'Offline Mode'}
          </span>
        </div>
        {!isOnline && (
          <div className="p-2 glass-morphism rounded-xl border border-money-gold/30 text-[8px] font-mono text-money-gold uppercase text-center">
            Local Persistence Active
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <SocketProvider>
      <SocketApp />
    </SocketProvider>
  );
}
