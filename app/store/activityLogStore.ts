"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActivityLogItem = {
  id: string;
  action: "add" | "edit" | "delete";
  userName: string;
  at: number;
};

type LogState = {
  items: ActivityLogItem[];
  add: (i: ActivityLogItem) => void;
  clear: () => void;
};

export const useActivityLog = create<LogState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (i) => set({ items: [i, ...get().items].slice(0, 200) }),
      clear: () => set({ items: [] }),
    }),
    { name: "um-activity" }
  )
);
