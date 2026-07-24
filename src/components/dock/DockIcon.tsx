'use client';

import React, { useRef } from 'react';
import { motion, useTransform, useSpring, type MotionValue } from 'motion/react';

interface DockIconProps {
  mouseX: MotionValue<number>;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

export const DockIcon: React.FC<DockIconProps> = ({
  mouseX,
  label,
  icon,
  onClick,
  isActive,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onClick={onClick}
        className="group relative flex items-center justify-center rounded-[var(--radius-icon)] bg-white/10 border border-white/[0.12] backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors duration-200"
      >
        <div className="flex items-center justify-center text-white" style={{ width: '55%', height: '55%' }}>
          {icon}
        </div>
        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-150 origin-bottom px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-white/10 text-[11px] text-white whitespace-nowrap shadow-lg pointer-events-none">
          {label}
        </span>
      </motion.div>
      <div className={`w-1 h-1 rounded-full transition-opacity duration-200 ${isActive ? 'bg-white/70 opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
