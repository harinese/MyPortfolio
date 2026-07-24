'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/components/apps/registry';
import { DOCK_ICONS } from '@/components/apps/icons';
import { IoDocumentText } from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

export const DesktopIcons: React.FC = () => {
  const openApp = useWindowStore((s) => s.openApp);
  const openAboutGroup = useWindowStore((s) => s.openAboutGroup);

  const desktopApps = APP_REGISTRY.filter((app) => ['about', 'projects', 'certificates', 'chat'].includes(app.id));

  return (
    <div className="absolute top-10 left-4 flex flex-col gap-3 z-10">
      {/* App Shortcuts */}
      {desktopApps.map((app, i) => {
        const icon = DOCK_ICONS[app.id];

        const handleDoubleClick = () => {
          if (app.id === 'about') {
            openAboutGroup();
          } else {
            openApp(app.id, app.title, app.defaultSize, app.defaultPosition);
          }
        };

        return (
          <motion.button
            key={app.id}
            onDoubleClick={handleDoubleClick}
            className="group flex flex-col items-center gap-1 w-[76px] p-2 rounded-xl cursor-default"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.2 + i * 0.08,
              ease: EASE_OUT_EXPO,
            }}
            whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Open ${app.title}`}
          >
            <motion.div
              className="w-12 h-12 rounded-[var(--radius-icon)] bg-white/10 border border-white/[0.08] flex items-center justify-center text-white/80 group-hover:bg-white/15 group-hover:border-white/15 transition-colors duration-200"
              whileHover={{ rotate: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <div className="w-6 h-6">
                {icon}
              </div>
            </motion.div>
            <span className="text-[10px] font-medium text-white/80 text-center leading-tight truncate w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {app.title}
            </span>
          </motion.button>
        );
      })}

      {/* Resume.pdf Shortcut */}
      <motion.button
        onDoubleClick={() => window.open("/Hari'sResume.pdf", '_blank')}
        className="group flex flex-col items-center gap-1 w-[76px] p-2 rounded-xl cursor-default"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5,
          ease: EASE_OUT_EXPO,
        }}
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open Resume.pdf"
      >
        <motion.div
          className="w-12 h-12 rounded-[var(--radius-icon)] bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500/25 transition-colors duration-200"
          whileHover={{ rotate: 6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <IoDocumentText className="w-6 h-6" />
        </motion.div>
        <span className="text-[10px] font-medium text-white/80 text-center leading-tight truncate w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Resume.pdf
        </span>
      </motion.button>
    </div>
  );
};
