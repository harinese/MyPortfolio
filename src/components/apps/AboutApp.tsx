'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoLocationSharp,
} from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';
import { EASE_OUT_EXPO } from '@/lib/animations';

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

export const AboutApp: React.FC = () => {
  return (
    <motion.div
      className="p-6 space-y-6 select-text"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Name Header with Location in Top-Right */}
      <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Hari Babu S R
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            MCA Student &amp; Full-Stack Architect
          </p>
        </div>

        {/* Location Badge in Top Right */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/70 whitespace-nowrap shrink-0">
          <IoLocationSharp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Davanagere, Karnataka, India</span>
        </div>
      </motion.div>

      {/* Bio Paragraph */}
      <motion.div variants={fadeUp} className="space-y-2">
        <p className="text-sm leading-relaxed text-white/80 font-normal">
          I specialize in architecting scalable solutions across the full stack.
          From React frontends to Python backends, I build systems that are
          performant, secure, and maintainable. Currently pursuing my MCA with a
          focus on network security, cryptography, and ethical hacking.
        </p>
      </motion.div>

      {/* Education Timeline */}
      <motion.div variants={fadeUp} className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Education
        </h2>

        <div className="space-y-2.5">
          {[
            {
              degree: 'Masters of Computer Applications',
              period: '2026 - 2027',
              school: 'GM University, Davanagere',
              detail: 'Network security, cryptography, secure software development, ethical hacking',
            },
            {
              degree: 'Bachelors of Computer Applications',
              period: '2022 - 2025',
              school: 'Don Bosco Degree College',
              detail: 'CGPA: 7.6 / 10 \u00B7 Python, full-stack development, database management',
            },
          ].map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] space-y-1"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: EASE_OUT_EXPO }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                <span className="text-[11px] text-white/40 whitespace-nowrap ml-3">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-white/70">{edu.school}</p>
              <p className="text-[11px] text-white/50">{edu.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Pills */}
      <motion.div variants={fadeUp} className="space-y-2 pt-2 border-t border-white/[0.06]">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Contact &amp; Socials
        </h2>

        <div className="flex flex-wrap gap-2">
          {[
            { label: 'haribabusr78@gmail.com', href: 'mailto:haribabusr78@gmail.com', icon: IoMail, color: 'hover:border-rose-500/30 hover:bg-rose-500/10' },
            { label: 'GitHub', href: 'https://github.com/harinese/', icon: IoLogoGithub, color: 'hover:border-white/30 hover:bg-white/10' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hari-babu-nese-a29b27237/', icon: IoLogoLinkedin, color: 'hover:border-blue-500/30 hover:bg-blue-500/10' },
            { label: 'X (Twitter)', href: 'https://x.com/Hari_Nese', icon: FaXTwitter, color: 'hover:border-neutral-400/30 hover:bg-neutral-400/10' },
          ].map(({ label, href, icon: Icon, color }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-white/80 transition-all duration-200 ${color}`}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
