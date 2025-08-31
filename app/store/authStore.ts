"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/app/types/user";

type AuthState = {
  currentUser: Pick<User, "id" | "name" | "email"> | null;
  setCurrentUser: (u: Pick<User, "id" | "name" | "email">) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: { id: 1, name: "Ayush Jain", email: "thealanjain@gmail.com" },
      setCurrentUser: (u) => set({ currentUser: u }),
    }),
    { name: "um-auth" }
  )
);
