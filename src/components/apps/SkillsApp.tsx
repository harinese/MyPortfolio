'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiGit,
  SiTailwindcss,
} from 'react-icons/si';
import { IoHardwareChip, IoGlobe } from 'react-icons/io5';
import { EASE_OUT_EXPO } from '@/lib/animations';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const SKILLS: Skill[] = [
  { name: 'Python', icon: <SiPython />, category: 'Languages' },
  { name: 'JavaScript', icon: <SiJavascript />, category: 'Languages' },
  { name: 'React', icon: <SiReact />, category: 'Frontend' },
  { name: 'Next.js', icon: <SiNextdotjs />, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, category: 'Frontend' },
  { name: 'Flask', icon: <SiFlask />, category: 'Backend' },
  { name: 'REST APIs', icon: <IoGlobe />, category: 'Backend' },
  { name: 'MongoDB', icon: <SiMongodb />, category: 'Database' },
  { name: 'MySQL', icon: <SiMysql />, category: 'Database' },
  { name: 'Git', icon: <SiGit />, category: 'Tools' },
  { name: 'Machine Learning', icon: <IoHardwareChip />, category: 'Other' },
];

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
  Languages: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  Frontend: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20',
  Backend: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
  Database: 'from-orange-500/20 to-orange-600/5 border-orange-500/20',
  Tools: 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
  Other: 'from-pink-500/20 to-pink-600/5 border-pink-500/20',
};

export const SkillsApp: React.FC = () => {
  const grouped = CATEGORIES.filter((cat) =>
    SKILLS.some((s) => s.category === cat)
  );

  let globalIndex = 0;

  return (
    <div className="p-6 space-y-5 select-text">
      <motion.div
        className="space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      >
        <h1 className="text-lg font-bold tracking-tight text-white">
          Tech Arsenal
        </h1>
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Technologies and tools I work with
        </p>
      </motion.div>

      <div className="space-y-4">
        {grouped.map((category, catIdx) => {
          const skills = SKILLS.filter((s) => s.category === category);
          const colorClass = CATEGORY_COLORS[category] ?? '';

          return (
            <motion.div
              key={category}
              className="space-y-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: catIdx * 0.07,
                ease: EASE_OUT_EXPO,
              }}
            >
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const idx = globalIndex++;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + idx * 0.04,
                        ease: EASE_OUT_EXPO,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm cursor-default transition-shadow duration-200 hover:shadow-md hover:shadow-black/15 hover:border-white/20`}
                    >
                      <span className="w-4 h-4 text-white/80">
                        {skill.icon}
                      </span>
                      <span className="text-xs font-medium text-white/90">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
