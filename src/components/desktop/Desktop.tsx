'use client';

import React from 'react';
import Image from 'next/image';
import { MenuBar } from '@/components/menubar/MenuBar';
import { Dock } from '@/components/dock/Dock';
import { WindowManager } from '@/components/window/WindowManager';
import { DesktopIcons } from '@/components/desktop/DesktopIcons';
import { TerminalOverlay } from '@/components/terminal/TerminalOverlay';
import { MENUBAR_HEIGHT } from '@/hooks/useDesktopBounds';

export const Desktop: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper Image */}
      <Image
        src="/avatar.jpg"
        alt="Desktop wallpaper"
        fill
        className="object-cover"
        quality={85}
        priority
        sizes="100vw"
      />

      {/* Dark overlay so UI elements remain readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Subtle color tint overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(135deg, rgba(30, 20, 60, 0.6) 0%, rgba(10, 30, 60, 0.4) 50%, rgba(40, 10, 50, 0.3) 100%)',
        }}
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Area */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ top: `${MENUBAR_HEIGHT}px` }}
      >
        {/* Desktop Icons */}
        <DesktopIcons />

        {/* Window Manager */}
        <div className="relative w-full h-full">
          <WindowManager />
        </div>
      </div>

      {/* Dock */}
      <Dock />

      {/* Full CLI Terminal Overlay */}
      <TerminalOverlay />
    </div>
  );
};
