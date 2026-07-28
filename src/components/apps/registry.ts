import type { AppDefinition } from '@/types/window';
import { AboutApp } from './AboutApp';
import { SkillsApp } from './SkillsApp';
import { ProjectsApp } from './ProjectsApp';
import { CertificatesApp } from './CertificatesApp';
import { PhotoApp } from './PhotoApp';
import { ChatApp } from './ChatApp';

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: 'about',
    title: 'About Me.txt',
    defaultSize: { width: 500, height: 550 },
    defaultPosition: { x: 550, y: 40 },
    minSize: { width: 360, height: 320 },
    component: AboutApp,
  },
  {
    id: 'skills',
    title: 'Skills.txt',
    defaultSize: { width: 440, height: 480 },
    defaultPosition: { x: 180, y: 250 },
    minSize: { width: 360, height: 300 },
    component: SkillsApp,
  },
  {
    id: 'photo',
    title: 'avatar1.jpg',
    defaultSize: { width: 440, height: 600 },
    defaultPosition: { x: 1000, y: 40 },
    minSize: { width: 320, height: 380 },
    component: PhotoApp,
  },
  {
    id: 'projects',
    title: 'Projects',
    defaultSize: { width: 680, height: 540 },
    defaultPosition: { x: 180, y: 50 },
    minSize: { width: 480, height: 380 },
    component: ProjectsApp,
  },
  {
    id: 'certificates',
    title: 'Certificates',
    defaultSize: { width: 580, height: 520 },
    defaultPosition: { x: 620, y: 60 },
    minSize: { width: 420, height: 360 },
    component: CertificatesApp,
  },
  {
    id: 'chat',
    title: 'Hari AI.app',
    defaultSize: { width: 480, height: 520 },
    defaultPosition: { x: 460, y: 50 },
    minSize: { width: 380, height: 400 },
    component: ChatApp,
  },
];
