import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sprout, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Box, 
  Maximize2,
  Leaf,
  ShieldCheck,
  Globe,
  ShoppingCart,
  CreditCard,
  Truck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useSocketContext } from '../context/SocketContext';
import ARVisualizer from './ARVisualizer';

type Step = 'discover' | 'visualize' | 'grow' | 'harvest' | 'smoke';

export default function SeedToSmokeFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('discover');
  const [progress, setProgress] = useState(0);
  const { addXp, addSeeds, notify, triggerShake } = useSocketContext();

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'visualize', label: 'Visualize', icon: Maximize2 },
    { id: 'grow', label: 'Grow', icon: Sprout },
    { id: 'harvest', label: 'Harvest', icon: Zap },
    { id: 'smoke', label: 'Enjoy', icon: Leaf },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].id;
      setCurrentStep(nextStep);
      addXp(100);
      triggerShake(5);
      notify(`STEP COMPLETE: ${currentStep.toUpperCase()} -> ${nextStep.toUpperCase()}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cannabis-light/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-curiosity-purple/10 blur-[120px] rounded-full" />

      {/* Header & Progress */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tighter mb-2">
            SEED-TO-SMOKE <span className="text-cannabis-light">FLOW</span>
          </h2>
          <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em]">Automated. Eco-Friendly. Gamified.</p>
        </div>

        <div className="flex items-center gap-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div 
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border",
                  currentStep === step.id 
                    ? "bg-cannabis-light text-cannabis-dark border-cannabis-light shadow-[0_0_20px_rgba(163,230,53,0.3)]" 
                    : steps.findIndex(s => s.id === currentStep) > idx
                      ? "bg-cannabis-light/20 text-cannabis-light border-cannabis-light/30"
                      : "bg-white/5 text-white/20 border-white/10"
                )}
              >
                <step.icon size={18} />
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "w-4 h-0.5 rounded-full transition-colors duration-500",
                  steps.findIndex(s => s.id === currentStep) > idx ? "bg-cannabis-light/30" : "bg-white/5"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-money-gold/10 rounded-full border border-money-gold/20 text-[10px] font-mono text-money-gold uppercase">
                  <Globe size={12} /> Eco-Sourced Genetics
                </div>
                <h3 className="text-5xl font-display font-bold leading-none">
                  FIND YOUR <br /> <span className="text-money-gold">PERFECT MATCH</span>
                </h3>
                <p className="text-lg text-white/60 leading-relaxed">
                  Our automated sourcing engine scans global repositories for biodegradable, 
                  eco-certified genetics. Every seed is tracked from origin to your door.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="p-4 glass-morphism rounded-2xl border border-white/5 flex items-center gap-3">
                    <ShieldCheck className="text-cannabis-light" />
                    <div>
                      <p className="text-xs font-bold">ECO-CERTIFIED</p>
                      <p className="text-[10px] text-white/40">100% Biodegradable</p>
                    </div>
                  </div>
                  <div className="p-4 glass-morphism rounded-2xl border border-white/5 flex items-center gap-3">
                    <Zap className="text-money-gold" />
                    <div>
                      <p className="text-xs font-bold">AUTO-SOURCED</p>
                      <p className="text-[10px] text-white/40">Real-time Inventory</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                  START VISUALIZATION <ArrowRight size={20} />
                </button>
              </div>
              <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10">
                <img 
                  src="https://picsum.photos/seed/seeds/800/800" 
                  alt="Seeds" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass-morphism rounded-3xl border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-white/40 uppercase">Strain Profile</span>
                    <span className="text-xs font-mono text-cannabis-light">98% ECO-SCORE</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">NEURAL HAZE v4</h4>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono">SATIVA</span>
                    <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono">24% THC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'visualize' && (
            <motion.div
              key="visualize"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="w-full max-w-4xl aspect-video glass-morphism rounded-[40px] border border-white/10 relative overflow-hidden group shadow-2xl">
                <ARVisualizer />
                
                {/* AR Overlays */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-cannabis-light/40 rounded-3xl animate-spin-slow pointer-events-none" />
                <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
                  <div className="px-3 py-1 bg-black/60 rounded-lg border border-white/10 text-[10px] font-mono">LAT: 34.0522</div>
                  <div className="px-3 py-1 bg-black/60 rounded-lg border border-white/10 text-[10px] font-mono">LNG: -118.2437</div>
                </div>
              </div>
              
              <div className="max-w-2xl">
                <h3 className="text-4xl font-display font-bold mb-4">VIRTUAL <span className="text-curiosity-purple">PLACEMENT</span></h3>
                <p className="text-white/60 mb-8">
                  Use our AR engine to visualize your grow space in real-time. 
                  Our automated sourcing ensures all hardware is eco-friendly and sized for your specific environment.
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={handleNext}
                    className="px-8 py-4 bg-curiosity-purple text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                  >
                    CONFIRM PLACEMENT <CheckCircle2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'grow' && (
            <motion.div
              key="grow"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="aspect-video glass-morphism rounded-[40px] border border-white/10 overflow-hidden relative">
                  <img 
                    src="https://picsum.photos/seed/grow/1200/800" 
                    alt="Growth" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-mono text-cannabis-light uppercase mb-1">Growth Status</p>
                      <h4 className="text-3xl font-bold">VEGETATIVE STAGE</h4>
                      <p className="text-xs text-white/40">Day 24 of 60</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-1">
                          <Thermometer size={20} className="text-money-gold" />
                        </div>
                        <p className="text-[10px] font-mono">24°C</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-1">
                          <Droplets size={20} className="text-cannabis-light" />
                        </div>
                        <p className="text-[10px] font-mono">60%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 glass-morphism rounded-3xl border border-white/5">
                    <h5 className="text-xs font-mono text-white/40 uppercase mb-4">Nutrient Mix</h5>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="h-full bg-cannabis-light"
                      />
                    </div>
                    <p className="text-[10px] font-mono text-right">75% OPTIMAL</p>
                  </div>
                  <div className="p-6 glass-morphism rounded-3xl border border-white/5">
                    <h5 className="text-xs font-mono text-white/40 uppercase mb-4">Light Cycle</h5>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-money-gold"
                      />
                    </div>
                    <p className="text-[10px] font-mono text-right">18/6 ACTIVE</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 glass-morphism rounded-[40px] border border-white/10 bg-cannabis-light/5">
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Zap size={20} className="text-cannabis-light" /> GROW LOG
                  </h4>
                  <div className="space-y-4">
                    {[
                      { time: '14:20', msg: 'Nutrient delivery automated' },
                      { time: '12:00', msg: 'Light intensity adjusted' },
                      { time: '09:42', msg: 'Eco-filter sync complete' },
                      { time: '04:20', msg: 'Growth spurt detected' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 text-xs">
                        <span className="font-mono text-white/20">{log.time}</span>
                        <span className="text-white/60">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full mt-8 py-4 bg-cannabis-light text-cannabis-dark font-bold rounded-2xl hover:scale-105 transition-transform"
                  >
                    TRIGGER HARVEST
                  </button>
                </div>
                
                <div className="p-6 glass-morphism rounded-3xl border border-white/5 text-center">
                  <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Estimated Yield</p>
                  <p className="text-3xl font-display font-bold text-money-gold">420g</p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'harvest' && (
            <motion.div
              key="harvest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-12"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-cannabis-light/20 rounded-full flex items-center justify-center animate-pulse">
                  <Zap size={80} className="text-cannabis-light" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-cannabis-light/20 rounded-full"
                />
              </div>

              <div className="max-w-2xl">
                <h3 className="text-5xl font-display font-bold mb-4">HARVEST <span className="text-money-gold">COMPLETE</span></h3>
                <p className="text-white/60 text-lg mb-8">
                  Your eco-sourced genetics have reached peak maturity. 
                  Automated processing has secured your yield in 100% biodegradable packaging.
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="p-6 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Quality</p>
                    <p className="text-2xl font-bold text-cannabis-light">A+++</p>
                  </div>
                  <div className="p-6 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Purity</p>
                    <p className="text-2xl font-bold text-money-gold">100%</p>
                  </div>
                  <div className="p-6 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-[10px] font-mono text-white/40 uppercase mb-2">Eco-Impact</p>
                    <p className="text-2xl font-bold text-curiosity-purple">ZERO</p>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                >
                  ENTER THE VIBE
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'smoke' && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-[40px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.2)_0%,transparent_70%)] animate-pulse" />
              
              <div className="relative z-10 text-center space-y-8">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-white/10 backdrop-blur-3xl rounded-[40px] border border-white/20 flex items-center justify-center mx-auto shadow-2xl"
                >
                  <Leaf size={64} className="text-cannabis-light" />
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-6xl font-display font-bold tracking-tighter">ULTIMATE <span className="text-cannabis-light">VIBE</span></h3>
                  <p className="text-white/40 font-mono uppercase tracking-[0.3em]">Seed-To-Smoke Journey Complete</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setCurrentStep('discover');
                      addSeeds(420);
                      notify("NEW CYCLE INITIATED: +420 SEEDS");
                    }}
                    className="px-8 py-4 glass-morphism border border-cannabis-light/30 text-cannabis-light font-bold rounded-2xl hover:bg-cannabis-light hover:text-cannabis-dark transition-all"
                  >
                    RESTART CYCLE
                  </button>
                  <button 
                    className="px-8 py-4 bg-money-gold text-black font-bold rounded-2xl hover:scale-105 transition-transform"
                  >
                    SHARE JOURNEY
                  </button>
                </div>
              </div>

              {/* Floating Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 800 - 400, 
                    y: Math.random() * 400 - 200,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: Math.random() * -400 - 200,
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: Math.random() * 2 
                  }}
                  className="absolute w-1 h-1 bg-cannabis-light rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
