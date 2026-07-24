'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { WindowHeader } from './WindowHeader';

interface MacWindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minWidth: number;
  minHeight: number;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragStop: (position: { x: number; y: number }) => void;
  onResizeStop: (size: { width: number; height: number }, position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  title,
  position,
  size,
  zIndex,
  minWidth,
  minHeight,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragStop,
  onResizeStop,
  children,
}) => {
  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(_e, d) => onDragStop({ x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        onResizeStop(
          {
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
          },
          { x: pos.x, y: pos.y }
        );
      }}
      onMouseDown={onFocus}
      dragHandleClassName="mac-window-header"
      cancel=".mac-window-header button, .mac-window-header a"
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent"
      enableResizing={!isMaximized}
      disableDragging={isMaximized}
      style={{ zIndex }}
      className="flex flex-col rounded-xl overflow-hidden mac-glass-heavy mac-shadow"
    >
      <div className="relative w-full h-full flex flex-col">
        <WindowHeader
          title={title}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          {children}
        </div>
      </div>
    </Rnd>
  );
};
