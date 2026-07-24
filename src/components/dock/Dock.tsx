'use client';

import React from 'react';
import { useMotionValue } from 'motion/react';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/components/apps/registry';
import { DockIcon } from './DockIcon';
import { DOCK_ICONS } from '@/components/apps/icons';
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoDocumentText,
} from 'react-icons/io5';
import { FaXTwitter } from 'react-icons/fa6';

export const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const windows = useWindowStore((s) => s.windows);
  const toggleApp = useWindowStore((s) => s.toggleApp);
  const openAboutGroup = useWindowStore((s) => s.openAboutGroup);

  // App shortcuts in Dock (About, Projects, Certificates, Hari AI)
  const dockApps = APP_REGISTRY.filter((app) => ['about', 'projects', 'certificates', 'chat'].includes(app.id));

  // External link items in Dock
  const externalItems = [
    {
      id: 'resume',
      label: 'Resume (PDF)',
      icon: <IoDocumentText className="w-full h-full text-red-400" />,
      url: "/Hari'sResume.pdf",
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <IoLogoLinkedin className="w-full h-full text-blue-400" />,
      url: 'https://www.linkedin.com/in/hari-babu-nese-a29b27237/',
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: <IoLogoGithub className="w-full h-full text-white" />,
      url: 'https://github.com/harinese/',
    },
    {
      id: 'twitter',
      label: 'X (Twitter)',
      icon: <FaXTwitter className="w-full h-full text-white/90" />,
      url: 'https://x.com/Hari_Nese',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <IoLogoInstagram className="w-full h-full text-pink-400" />,
      url: 'https://www.instagram.com/hari.nese/',
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-3 py-2 rounded-[var(--radius-dock)] mac-glass mac-shadow-dock"
      >
        {/* App Windows */}
        {dockApps.map((app) => {
          const isActive = app.id === 'about'
            ? windows.some((w) => ['about', 'skills', 'photo'].includes(w.appId) && !w.isMinimized)
            : windows.some((w) => w.appId === app.id && !w.isMinimized);

          const iconData = DOCK_ICONS[app.id];

          const handleClick = () => {
            if (app.id === 'about') {
              openAboutGroup();
            } else {
              toggleApp(app.id, app.title, app.defaultSize, app.defaultPosition);
            }
          };

          return (
            <DockIcon
              key={app.id}
              mouseX={mouseX}
              label={app.id === 'about' ? 'About / Skills / Photo' : app.title}
              icon={iconData}
              isActive={isActive}
              onClick={handleClick}
            />
          );
        })}

        {/* Separator Divider */}
        <div className="w-[1px] h-8 bg-white/15 mx-1 my-auto rounded-full" />

        {/* External Links & Resume */}
        {externalItems.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            label={item.label}
            icon={item.icon}
            isActive={false}
            onClick={() => window.open(item.url, '_blank')}
          />
        ))}
      </div>
    </div>
  );
};
