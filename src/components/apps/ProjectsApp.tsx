'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IoGlobeOutline,
  IoLockClosed,
  IoLeaf,
  IoFilm,
  IoFlower,
  IoCalendar,
  IoRestaurant,
  IoQrCode,
  IoCheckmarkCircle,
  IoOpenOutline,
} from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

type ProjectStatus = 'live' | 'internal';
type ProjectCategory = 'flagship' | 'freelance' | 'enterprise';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  url?: string;
  accent: string;
  accentBg: string;
  icon: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    name: 'AgriLens AI',
    description: 'AI-powered agricultural lens for crop disease detection and smart farming insights.',
    tech: ['React', 'Python', 'FastAPI', 'Gemini AI', 'Docker'],
    status: 'live',
    category: 'flagship',
    url: 'https://agrilensai.onrender.com/',
    accent: 'text-emerald-400',
    accentBg: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/15',
    icon: <IoLeaf className="w-5 h-5" />,
  },
  {
    name: 'CORA',
    description: 'Content-based filtering engine for personalized movie recommendations.',
    tech: ['Flask', 'Vanilla JS', 'REST APIs'],
    status: 'live',
    category: 'flagship',
    url: 'https://cora-b6o6.onrender.com/',
    accent: 'text-violet-400',
    accentBg: 'from-violet-500/20 via-violet-500/5 to-transparent border-violet-500/15',
    icon: <IoFilm className="w-5 h-5" />,
  },
  {
    name: 'Tassels by Saritha',
    description: 'Handcrafted tassel brand showcase with product catalog and client engagement.',
    tech: ['React', 'Vite', 'Tailwind'],
    status: 'live',
    category: 'freelance',
    url: 'https://tasselsbysaritha.me',
    accent: 'text-rose-400',
    accentBg: 'from-rose-500/20 via-rose-500/5 to-transparent border-rose-500/15',
    icon: <IoFlower className="w-5 h-5" />,
  },
  {
    name: 'Zyra Unique Events',
    description: 'Event management platform for planning and showcasing unique events.',
    tech: ['React', 'Vite', 'Tailwind'],
    status: 'live',
    category: 'freelance',
    url: 'https://zyra-unique-events.vercel.app',
    accent: 'text-cyan-400',
    accentBg: 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/15',
    icon: <IoCalendar className="w-5 h-5" />,
  },
  {
    name: "Varada's Kitchen",
    description: 'Responsive cloud kitchen platform with backend order management logic.',
    tech: ['React', 'JavaScript', 'Tailwind'],
    status: 'live',
    category: 'freelance',
    url: 'https://varadas-kitchen-oaxa.onrender.com',
    accent: 'text-orange-400',
    accentBg: 'from-orange-500/20 via-orange-500/5 to-transparent border-orange-500/15',
    icon: <IoRestaurant className="w-5 h-5" />,
  },
  {
    name: 'QR Attendance System',
    description: 'Automated attendance tracking via QR code scanning for institutional use.',
    tech: ['Python', 'Flask', 'MySQL'],
    status: 'internal',
    category: 'enterprise',
    accent: 'text-sky-400',
    accentBg: 'from-sky-500/20 via-sky-500/5 to-transparent border-sky-500/15',
    icon: <IoQrCode className="w-5 h-5" />,
  },
  {
    name: 'Event Approval System',
    description: 'Multi-tier event approval workflow with role-based access control.',
    tech: ['Node.js', 'Express', 'Socket.IO', 'React', 'MySQL'],
    status: 'internal',
    category: 'enterprise',
    accent: 'text-indigo-400',
    accentBg: 'from-indigo-500/20 via-indigo-500/5 to-transparent border-indigo-500/15',
    icon: <IoCheckmarkCircle className="w-5 h-5" />,
  },
];

const FILTER_TABS: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Flagship', value: 'flagship' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Enterprise', value: 'enterprise' },
];

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="p-5 space-y-4 select-text">
      {/* Header */}
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      >
        <div className="space-y-0.5">
          <h1 className="text-lg font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="text-[11px] text-[var(--color-text-tertiary)]">
            {PROJECTS.length} projects &middot; {PROJECTS.filter((p) => p.status === 'live').length} live deployments
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`relative px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors duration-200 ${
                filter === tab.value
                  ? 'text-white'
                  : 'text-[var(--color-text-tertiary)] hover:text-white/60'
              }`}
            >
              {filter === tab.value && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-white/12 rounded-md border border-white/[0.06]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                duration: 0.35,
                delay: i * 0.05,
                ease: EASE_OUT_EXPO,
                layout: { type: 'spring', stiffness: 350, damping: 30 },
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`group relative p-4 rounded-xl bg-gradient-to-br ${project.accentBg} border overflow-hidden cursor-default flex flex-col justify-between`}
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/[0.08] transition-colors duration-500" />

              <div>
                {/* Icon + Status Row */}
                <div className="flex items-start justify-between mb-3 relative">
                  <motion.div
                    className={`w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center ${project.accent}`}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {project.icon}
                  </motion.div>
                  <div className="flex items-center gap-1.5">
                    {project.status === 'live' && project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors duration-150"
                        title={`Visit ${project.name}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">
                          Live
                        </span>
                        <IoOpenOutline className="w-2.5 h-2.5 ml-0.5" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[var(--color-text-tertiary)]">
                        <IoLockClosed className="w-2.5 h-2.5" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider">
                          Internal
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between gap-2 mb-1 relative">
                  <h3 className="text-[13px] font-semibold text-white">
                    {project.name}
                  </h3>
                  <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/[0.04]">
                    {project.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] leading-relaxed text-white/50 mb-3 line-clamp-2 relative">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags & Visit Link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] relative">
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-white/[0.08] text-white/60 border border-white/[0.04]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium text-white/40">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition-colors"
                  >
                    <span>Visit</span>
                    <IoOpenOutline className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
