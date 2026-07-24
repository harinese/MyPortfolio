import React from 'react';
import { IoPersonCircle, IoRocket, IoCodeSlash, IoRibbon, IoImage, IoChatbubbleEllipses } from 'react-icons/io5';
import type { AppId } from '@/types/window';

export const DOCK_ICONS: Record<AppId, React.ReactNode> = {
  about: <IoPersonCircle className="w-full h-full" />,
  skills: <IoCodeSlash className="w-full h-full" />,
  projects: <IoRocket className="w-full h-full" />,
  certificates: <IoRibbon className="w-full h-full" />,
  photo: <IoImage className="w-full h-full" />,
  chat: <IoChatbubbleEllipses className="w-full h-full text-cyan-400" />,
};
