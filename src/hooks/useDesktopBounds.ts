"use client";

import { useState, useEffect } from "react";

const MENUBAR_HEIGHT = 28;
const DOCK_HEIGHT = 80;
const DOCK_MARGIN = 16;

interface DesktopBounds {
  width: number;
  height: number;
  offsetTop: number;
  isReady: boolean;
}

export function useDesktopBounds(): DesktopBounds {
  const [bounds, setBounds] = useState<DesktopBounds>({
    width: 1280,
    height: 720,
    offsetTop: MENUBAR_HEIGHT,
    isReady: false,
  });

  useEffect(() => {
    const update = () => {
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight - MENUBAR_HEIGHT - DOCK_HEIGHT - DOCK_MARGIN,
        offsetTop: MENUBAR_HEIGHT,
        isReady: true,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bounds;
}

export { MENUBAR_HEIGHT, DOCK_HEIGHT, DOCK_MARGIN };
