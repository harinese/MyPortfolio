'use client';

import React, { useState } from 'react';

interface WindowHeaderProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  title,
  onClose,
  onMinimize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mac-window-header flex items-center px-3.5 py-2.5 bg-white/[0.04] border-b border-white/[0.06] select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close window"
          className="group relative w-3 h-3 rounded-full bg-[var(--color-traffic-close)] transition-opacity hover:opacity-90 flex items-center justify-center cursor-pointer"
        >
          {isHovered && (
            <svg className="w-2.5 h-2.5 text-black/70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" />
            </svg>
          )}
        </button>

        {/* Minimize Button */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          aria-label="Minimize window"
          className="group relative w-3 h-3 rounded-full bg-[var(--color-traffic-minimize)] transition-opacity hover:opacity-90 flex items-center justify-center cursor-pointer"
        >
          {isHovered && (
            <svg className="w-2.5 h-2.5 text-black/70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2.5 6H9.5" />
            </svg>
          )}
        </button>

        {/* Disabled Maximize Button */}
        <div
          aria-label="Maximize disabled"
          title="Maximize disabled"
          className="relative w-3 h-3 rounded-full bg-white/20 opacity-40 cursor-not-allowed flex items-center justify-center"
        />
      </div>
      <span className="flex-1 text-center text-xs font-medium text-white/70 tracking-tight truncate px-4">
        {title}
      </span>
      <div className="w-[52px]" />
    </div>
  );
};
