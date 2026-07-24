'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { IoCamera, IoSparkles } from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

export const PhotoApp: React.FC = () => {
  return (
    <div className="p-3 flex flex-col items-center justify-center h-full select-none">
      <motion.div
        className="relative w-full h-full min-h-[360px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      >
        <Image
          src="/avatar1.jpg"
          alt="Hari Babu S R"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 420px"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Top Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
          <IoCamera className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-semibold text-white/90 tracking-wide uppercase">
            Portrait &middot; avatar1.jpg
          </span>
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-white tracking-wide">
              Hari Babu S R
            </h3>
            <p className="text-[10px] text-white/60">
              Full-Stack Architect &amp; MCA Student
            </p>
          </div>
          <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-medium">
            <IoSparkles className="w-3 h-3" />
            <span>Developer Profile</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
