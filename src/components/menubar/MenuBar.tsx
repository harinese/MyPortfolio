'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { IoWifi, IoTerminal } from 'react-icons/io5';
import { useTerminalStore } from '@/store/useTerminalStore';
import { EASE_OUT_EXPO } from '@/lib/animations';

export const MenuBar: React.FC = () => {
  const [time, setTime] = useState('');
  const toggleCliMode = useTerminalStore((s) => s.toggleCliMode);
  const isCliMode = useTerminalStore((s) => s.isCliMode);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        '  ' +
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 h-7 mac-glass z-50 flex items-center justify-between px-4 text-[11px] font-medium"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold text-white/90">Hari Babu S R</span>

        {/* Terminal / CLI Mode Button */}
        <motion.button
          onClick={toggleCliMode}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-mono transition-all duration-200 cursor-pointer ${
            isCliMode
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-white/[0.06] border-white/10 text-white/80 hover:bg-white/12 hover:border-emerald-500/30 hover:text-emerald-300'
          }`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          title="Open interactive CLI Terminal"
        >
          <IoTerminal className="w-3 h-3 text-emerald-400" />
          <span className="font-bold">Terminal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.button>
      </div>

      <div className="flex items-center gap-3 text-white/70">
        <IoWifi className="w-3.5 h-3.5" />
        <span>{time}</span>
      </div>
    </motion.header>
  );
};
