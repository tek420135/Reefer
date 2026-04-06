import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export type VibeType = 'willie' | 'snoop' | 'bruce';

interface SocketState {
  seeds: number;
  xp: number;
  vibe: VibeType;
  isWarping: boolean;
  isMenuOpen: boolean;
  notifications: string[];
  powerUpActive: boolean;
}

export const useSocket = () => {
  const [state, setState] = useState<SocketState>(() => {
    const saved = localStorage.getItem('socket_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          isWarping: false,
          isMenuOpen: false,
          notifications: [],
          powerUpActive: false
        };
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return {
      seeds: 420,
      xp: 1200,
      vibe: 'snoop',
      isWarping: false,
      isMenuOpen: false,
      notifications: [],
      powerUpActive: false,
    };
  });

  // Persist state to localStorage
  useEffect(() => {
    const { seeds, xp, vibe } = state;
    localStorage.setItem('socket_state', JSON.stringify({ seeds, xp, vibe }));
  }, [state.seeds, state.xp, state.vibe]);

  // Global Screen Shake Effect
  const triggerShake = useCallback((intensity = 5) => {
    const main = document.querySelector('main');
    if (main) {
      main.style.transition = 'none';
      let count = 0;
      const interval = setInterval(() => {
        const x = (Math.random() - 0.5) * intensity;
        const y = (Math.random() - 0.5) * intensity;
        main.style.transform = `translate(${x}px, ${y}px)`;
        count++;
        if (count > 10) {
          clearInterval(interval);
          main.style.transform = '';
          main.style.transition = 'all 0.5s ease';
        }
      }, 30);
    }
  }, []);

  // Notification System
  const notify = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, message].slice(-3)
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n !== message)
      }));
    }, 3000);
  }, []);

  // The "Warp" Interaction
  const triggerWarp = useCallback(() => {
    setState(prev => ({ ...prev, isWarping: true }));
    triggerShake(15);
    setTimeout(() => setState(prev => ({ ...prev, isWarping: false })), 1000);
  }, [triggerShake]);

  // Economy Actions
  const addSeeds = useCallback((amount: number) => {
    setState(prev => ({ ...prev, seeds: prev.seeds + amount }));
    if (amount > 50) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#a3e635']
      });
    }
  }, []);

  const addXp = useCallback((amount: number) => {
    setState(prev => {
      const newXp = prev.xp + amount;
      // Level up logic
      if (Math.floor(newXp / 1000) > Math.floor(prev.xp / 1000)) {
        notify("LEVEL UP: CULTIVATOR STATUS ACHIEVED");
        triggerWarp();
      }
      return { ...prev, xp: newXp };
    });
  }, [notify, triggerWarp]);

  // Vibe Management
  const switchVibe = useCallback((newVibe: VibeType) => {
    setState(prev => ({ ...prev, vibe: newVibe }));
    triggerWarp();
    notify(`${newVibe.toUpperCase()} MODE ACTIVATED`);
  }, [triggerWarp, notify]);

  // Global "Plug In" Action
  const plugIn = useCallback((context: string) => {
    notify(`PLUGGING INTO: ${context.toUpperCase()}`);
    triggerShake(8);
    addXp(50);
    addSeeds(5);
  }, [notify, triggerShake, addXp, addSeeds]);

  // Menu Toggle
  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  }, []);

  // Passive Income / Background Logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        addSeeds(1);
        addXp(5);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [addSeeds, addXp]);

  // Easter Egg: Konami Code (Simulated)
  useEffect(() => {
    let keys: string[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key);
      keys = keys.slice(-10);
      if (keys.join('') === 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba') {
        notify("GOD MODE: INFINITE VIBE DETECTED");
        addSeeds(1000000);
        triggerWarp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notify, addSeeds, triggerWarp]);

  return {
    ...state,
    triggerWarp,
    addSeeds,
    addXp,
    switchVibe,
    plugIn,
    toggleMenu,
    notify,
    triggerShake
  };
};
