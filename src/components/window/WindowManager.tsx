'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWindowStore } from '@/store/useWindowStore';
import { useDesktopBounds } from '@/hooks/useDesktopBounds';
import { MacWindow } from './MacWindow';
import { APP_REGISTRY } from '@/components/apps/registry';

export const WindowManager: React.FC = () => {
  const windows = useWindowStore((s) => s.windows);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const updatePosition = useWindowStore((s) => s.updatePosition);
  const updateSize = useWindowStore((s) => s.updateSize);
  const { width: deskW, height: deskH } = useDesktopBounds();

  const visibleWindows = windows.filter((w) => !w.isMinimized);

  return (
    <AnimatePresence mode="popLayout">
      {visibleWindows.map((win) => {
        const appDef = APP_REGISTRY.find((a) => a.id === win.appId);
        if (!appDef) return null;
        const AppComponent = appDef.component;

        return (
          <motion.div
            key={win.id}
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.84, y: 32 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
              <MacWindow
                id={win.id}
                title={win.title}
                position={win.position}
                size={win.size}
                zIndex={win.zIndex}
                minWidth={appDef.minSize.width}
                minHeight={appDef.minSize.height}
                isMaximized={win.isMaximized}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id, deskW, deskH)}
                onFocus={() => focusWindow(win.id)}
                onDragStop={(pos) => updatePosition(win.id, pos)}
                onResizeStop={(size, pos) => updateSize(win.id, size, pos)}
              >
                <AppComponent />
              </MacWindow>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
