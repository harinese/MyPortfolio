import type { ComponentType } from "react";

export type AppId = "about" | "skills" | "projects" | "certificates" | "photo" | "chat";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  prevBounds?: {
    position: WindowPosition;
    size: WindowSize;
  };
}

export interface AppDefinition {
  id: AppId;
  title: string;
  defaultSize: WindowSize;
  defaultPosition: WindowPosition;
  minSize: WindowSize;
  component: ComponentType;
}
