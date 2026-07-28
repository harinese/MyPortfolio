"use client";

import { create } from "zustand";
import type { AppId, WindowPosition, WindowSize, WindowState } from "@/types/window";
import { APP_REGISTRY } from "@/components/apps/registry";

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openApp: (appId: AppId, title: string, defaultSize: WindowSize, defaultPosition: WindowPosition) => void;
  toggleApp: (appId: AppId, title: string, defaultSize: WindowSize, defaultPosition: WindowPosition) => void;
  openAboutGroup: () => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string, desktopWidth: number, desktopHeight: number) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: WindowPosition) => void;
  updateSize: (id: string, size: WindowSize, position: WindowPosition) => void;
  getActiveWindows: () => WindowState[];
}

// Uses clean static pixel coordinates from src/components/apps/registry.ts for easy editing!
function getPosition(defaultPos: WindowPosition): WindowPosition {
  return defaultPos;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 10,

  openApp: (appId, title, defaultSize, defaultPosition) => {
    const { windows, nextZIndex } = get();
    const existing = windows.find((w) => w.appId === appId);
    const pos = getPosition(defaultPosition);

    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          ),
          nextZIndex: nextZIndex + 1,
        });
      } else {
        get().focusWindow(existing.id);
      }
      return;
    }

    const newWindow: WindowState = {
      id: `window-${appId}-${Date.now()}`,
      appId,
      title,
      position: pos,
      size: defaultSize,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    });
  },

  toggleApp: (appId, title, defaultSize, defaultPosition) => {
    const { windows, nextZIndex } = get();
    const existing = windows.find((w) => w.appId === appId);
    const pos = getPosition(defaultPosition);

    if (existing) {
      if (existing.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: nextZIndex }
              : w
          ),
          nextZIndex: nextZIndex + 1,
        });
      } else {
        const visibleWindows = windows.filter((w) => !w.isMinimized);
        const maxZ = Math.max(...visibleWindows.map((w) => w.zIndex), 0);
        if (existing.zIndex === maxZ) {
          set({
            windows: windows.map((w) =>
              w.id === existing.id ? { ...w, isMinimized: true } : w
            ),
          });
        } else {
          get().focusWindow(existing.id);
        }
      }
      return;
    }

    const newWindow: WindowState = {
      id: `window-${appId}-${Date.now()}`,
      appId,
      title,
      position: pos,
      size: defaultSize,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    });
  },

  openAboutGroup: () => {
    const groupAppIds: AppId[] = ['skills', 'photo', 'about'];
    const { windows, nextZIndex } = get();

    const aboutWin = windows.find((w) => w.appId === 'about');
    const visibleWindows = windows.filter((w) => !w.isMinimized);
    const maxZ = Math.max(...visibleWindows.map((w) => w.zIndex), 0);

    if (aboutWin && !aboutWin.isMinimized && aboutWin.zIndex === maxZ) {
      set({
        windows: windows.map((w) =>
          groupAppIds.includes(w.appId as AppId) ? { ...w, isMinimized: true } : w
        ),
      });
      return;
    }

    let currentZ = nextZIndex;
    let updatedWindows = [...windows];

    for (const appId of groupAppIds) {
      const appDef = APP_REGISTRY.find((a) => a.id === appId);
      if (!appDef) continue;

      const pos = getPosition(appDef.defaultPosition);
      const existingIndex = updatedWindows.findIndex((w) => w.appId === appId);

      if (existingIndex !== -1) {
        updatedWindows[existingIndex] = {
          ...updatedWindows[existingIndex],
          position: pos,
          isMinimized: false,
          zIndex: currentZ++,
        };
      } else {
        updatedWindows.push({
          id: `window-${appId}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          appId,
          title: appDef.title,
          position: pos,
          size: appDef.defaultSize,
          isMinimized: false,
          isMaximized: false,
          zIndex: currentZ++,
        });
      }
    }

    set({
      windows: updatedWindows,
      nextZIndex: currentZ,
    });
  },

  closeWindow: (id) => {
    set({ windows: get().windows.filter((w) => w.id !== id) });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    });
  },

  maximizeWindow: (id, desktopWidth, desktopHeight) => {
    set({
      windows: get().windows.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            position: w.prevBounds?.position ?? w.position,
            size: w.prevBounds?.size ?? w.size,
          };
        }
        return {
          ...w,
          isMaximized: true,
          prevBounds: { position: w.position, size: w.size },
          position: { x: 0, y: 0 },
          size: { width: desktopWidth, height: desktopHeight },
        };
      }),
    });
  },

  focusWindow: (id) => {
    const { nextZIndex } = get();
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      nextZIndex: nextZIndex + 1,
    });
  },

  updatePosition: (id, position) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, position, isMaximized: false } : w
      ),
    });
  },

  updateSize: (id, size, position) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, size, position, isMaximized: false } : w
      ),
    });
  },

  getActiveWindows: () => {
    return get().windows.filter((w) => !w.isMinimized);
  },
}));
