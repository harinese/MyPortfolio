'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { IoExpand, IoClose } from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  file: string;
  accent: string;
  accentBg: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'gdg-build-bengaluru',
    title: 'Build for Bengaluru Hackathon',
    issuer: 'Google Developer Group, Bengaluru',
    date: 'April 2025',
    file: '/Certs/Hari_Babu_SR_Certificate.png',
    accent: 'text-blue-400',
    accentBg: 'from-blue-500/20 via-blue-500/5 to-transparent border-blue-500/15',
  },
  {
    id: 'nxtwave-openai',
    title: 'OpenAI Academy x NxtWave Buildathon',
    issuer: 'NxtWave',
    date: 'December 2025',
    file: '/Certs/O7EVEWVTDJ.png',
    accent: 'text-violet-400',
    accentBg: 'from-violet-500/20 via-violet-500/5 to-transparent border-violet-500/15',
  },
  {
    id: 'google-agentic-ai',
    title: 'Google Cloud Agentic AI Day',
    issuer: 'Google Cloud x Hack2skill',
    date: '2025',
    file: '/Certs/AgenticAI.png',
    accent: 'text-emerald-400',
    accentBg: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/15',
  },
];

export const CertificatesApp: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const expandedCert = expanded
    ? CERTIFICATES.find((c) => c.id === expanded)
    : null;

  return (
    <div className="p-5 space-y-4 select-text relative">
      {/* Header */}
      <motion.div
        className="space-y-0.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      >
        <h1 className="text-lg font-bold tracking-tight text-white">
          Certificates
        </h1>
        <p className="text-[11px] text-[var(--color-text-tertiary)]">
          {CERTIFICATES.length} certifications earned
        </p>
      </motion.div>

      {/* Certificate Grid */}
      <div className="grid grid-cols-2 gap-3">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              ease: EASE_OUT_EXPO,
            }}
            className={`group relative rounded-xl bg-gradient-to-br ${cert.accentBg} border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 cursor-pointer`}
            onClick={() => setExpanded(cert.id)}
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/10] bg-black/20">
              <Image
                src={cert.file}
                alt={cert.title}
                fill
                className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 680px) 50vw, 300px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                <IoExpand className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Info */}
            <div className="p-3 space-y-0.5">
              <h3 className="text-[12px] font-semibold text-white leading-snug line-clamp-1">
                {cert.title}
              </h3>
              <p className="text-[10px] text-white/50">
                {cert.issuer}
              </p>
              <p className="text-[10px] text-white/35">
                {cert.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {expandedCert && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              key="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative max-w-[85vw] max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpanded(null)}
                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200"
                aria-label="Close preview"
              >
                <IoClose className="w-4 h-4" />
              </button>
              <Image
                src={expandedCert.file}
                alt={expandedCert.title}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh]"
                sizes="85vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
