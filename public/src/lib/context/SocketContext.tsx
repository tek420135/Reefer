import React, { createContext, useContext } from 'react';
import { useSocket, VibeType, InventoryItem } from '../hooks/useSocket';

interface SocketContextType {
  seeds: number;
  xp: number;
  vibe: VibeType;
  isWarping: boolean;
  isMenuOpen: boolean;
  notifications: string[];
  inventory: InventoryItem[];
  triggerWarp: () => void;
  addSeeds: (amount: number) => void;
  addXp: (amount: number) => void;
  switchVibe: (newVibe: VibeType) => void;
  plugIn: (context: string) => void;
  toggleMenu: () => void;
  notify: (message: string) => void;
  triggerShake: (intensity?: number) => void;
  addToInventory: (item: Omit<InventoryItem, 'timestamp'>) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket();
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};
