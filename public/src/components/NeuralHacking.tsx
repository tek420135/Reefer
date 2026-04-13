import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Terminal, Shield, Cpu, Loader2, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { useSocketContext } from '../context/SocketContext';
import { cn } from '@/src/lib/utils';

interface Packet {
  id: string;
  x: number;
  y: number;
  type: 'data' | 'virus' | 'bonus';
  value: number;
}

export default function NeuralHacking() {
  const { addSeeds, addXp, notify, triggerShake } = useSocketContext();
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [logs, setLogs] = useState<string[]>(['INITIALIZING NEURAL LINK...', 'WAITING FOR GRID SYNC...']);
  const containerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-5), `> ${msg}`]);
  };

  const spawnPacket = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const types: Packet['type'][] = ['data', 'data', 'data', 'bonus', 'virus'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const newPacket: Packet = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (width - 60) + 30,
      y: Math.random() * (height - 60) + 30,
      type,
      value: type === 'bonus' ? 50 : type === 'virus' ? -100 : 10,
    };
    
    setPackets(prev => [...prev, newPacket]);
    
    // Auto-remove packet after 2 seconds
    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== newPacket.id));
    }, 2000);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (Math.random() > 0.4) spawnPacket();
      }, 1000);
    } else if (timeLeft === 0) {
      handleGameOver();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, spawnPacket]);

  const handleStart = () => {
    setIsActive(true);
    setScore(0);
    setTimeLeft(30);
    setPackets([]);
    setLogs(['NEURAL LINK ESTABLISHED', 'HACKING COMMENCED...']);
    notify('NEURAL HACKING ACTIVE');
  };

  const handleGameOver = () => {
    setIsActive(false);
    const bonusSeeds = Math.floor(score / 10);
    const bonusXp = score;
    addSeeds(bonusSeeds);
    addXp(bonusXp);
    addLog(`HACK COMPLETE. SCORE: ${score}`);
    addLog(`REWARDS: +${bonusSeeds} SEEDS, +${bonusXp} XP`);
    notify(`HACK SUCCESSFUL: +${bonusSeeds} SEEDS`);
    triggerShake(10);
  };

  const handlePacketClick = (packet: Packet) => {
    setScore(prev => Math.max(0, prev + packet.value));
    setPackets(prev => prev.filter(p => p.id !== packet.id));
    
    if (packet.type === 'virus') {
      addLog('!!! SECURITY BREACH DETECTED !!!');
      triggerShake(15);
    } else {
      addLog(`PACKET INTERCEPTED: +${packet.value}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between p-6 glass-morphism rounded-3xl border border-cannabis-light/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cannabis-light/20 rounded-2xl flex items-center justify-center text-cannabis-light">
            <Terminal size={24} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold uppercase tracking-tight">Neural <span className="text-cannabis-light">Sync</span></h3>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Intercept data packets to farm digital seeds</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[8px] font-mono text-white/40 uppercase">Sync Level</p>
            <p className="text-xl font-display font-bold text-money-gold">{score}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-mono text-white/40 uppercase">Time Remaining</p>
            <p className={cn("text-xl font-display font-bold", timeLeft < 10 ? "text-red-500 animate-pulse" : "text-cannabis-light")}>
              {timeLeft}s
            </p>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[400px] glass-morphism rounded-[40px] border border-white/10 bg-black/40 overflow-hidden cursor-crosshair"
      >
        {!isActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black/60 backdrop-blur-sm z-10">
            <Cpu size={64} className="text-cannabis-light animate-pulse" />
            <div className="text-center space-y-2">
              <h4 className="text-2xl font-display font-bold uppercase">Ready to Sync?</h4>
              <p className="text-sm text-white/60 max-w-xs mx-auto">
                Click green data packets for XP. Avoid red viruses. Bonus gold packets provide massive eco-rewards.
              </p>
            </div>
            <button 
              onClick={handleStart}
              className="px-10 py-4 bg-cannabis-light text-cannabis-dark font-black rounded-2xl hover:scale-110 transition-transform shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              INITIALIZE LINK
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {packets.map(packet => (
              <motion.button
                key={packet.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => handlePacketClick(packet)}
                className={cn(
                  "absolute w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-2 z-20",
                  packet.type === 'data' && "bg-cannabis-light/20 border-cannabis-light text-cannabis-light",
                  packet.type === 'virus' && "bg-red-500/20 border-red-500 text-red-500",
                  packet.type === 'bonus' && "bg-money-gold/20 border-money-gold text-money-gold animate-bounce"
                )}
                style={{ left: packet.x, top: packet.y }}
              >
                {packet.type === 'data' && <Zap size={20} />}
                {packet.type === 'virus' && <AlertTriangle size={20} />}
                {packet.type === 'bonus' && <Star size={20} />}
              </motion.button>
            ))}
          </AnimatePresence>
        )}

        {/* Matrix Rain Effect (Simplified) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none font-mono text-[8px] overflow-hidden whitespace-pre leading-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: Math.random() * 5 + 2, repeat: Infinity, ease: "linear" }}
              className="absolute text-cannabis-light"
              style={{ left: `${i * 5}%` }}
            >
              {Array.from({ length: 50 }).map(() => Math.random() > 0.5 ? '0' : '1').join('\n')}
            </motion.div>
          ))}
        </div>

        {/* Terminal Log Overlay */}
        <div className="absolute bottom-6 left-6 p-4 bg-black/80 rounded-xl border border-white/10 font-mono text-[10px] space-y-1 w-64 pointer-events-none">
          {logs.map((log, i) => (
            <div key={i} className={cn(
              log.includes('!!!') ? "text-red-500" : "text-cannabis-light",
              i === logs.length - 1 && "animate-pulse"
            )}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
