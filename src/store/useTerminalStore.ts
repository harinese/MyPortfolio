'use client';

import { create } from 'zustand';

export interface TerminalLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
}

interface TerminalStore {
  isCliMode: boolean;
  history: TerminalLog[];
  commandHistory: string[];
  historyIndex: number;
  toggleCliMode: () => void;
  setCliMode: (enabled: boolean) => void;
  addLog: (command: string, output: string | React.ReactNode) => void;
  clearHistory: () => void;
}

const INITIAL_WELCOME: TerminalLog = {
  id: 'init-welcome',
  command: 'system.init',
  output: 'WELCOME', // Will be rendered with rich welcome banner in component
};

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  isCliMode: false,
  history: [INITIAL_WELCOME],
  commandHistory: [],
  historyIndex: -1,

  toggleCliMode: () => set((state) => ({ isCliMode: !state.isCliMode })),
  setCliMode: (enabled) => set({ isCliMode: enabled }),

  addLog: (command, output) => {
    const newLog: TerminalLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      command,
      output,
    };
    set((state) => ({
      history: [...state.history, newLog],
      commandHistory: command ? [...state.commandHistory, command] : state.commandHistory,
      historyIndex: -1,
    }));
  },

  clearHistory: () => set({ history: [INITIAL_WELCOME] }),
}));
