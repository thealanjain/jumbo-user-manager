"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = { dark: boolean; toggle: () => void; set: (v: boolean) => void };

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      dark: false,
      toggle: () => set({ dark: !get().dark }),
      set: (v: boolean) => set({ dark: v }),
    }),
    { name: "um-theme" }
  )
);
