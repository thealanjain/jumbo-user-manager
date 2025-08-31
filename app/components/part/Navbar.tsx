"use client";

import Link from "next/link";
import { ThemeSwitch } from "../core/Switch";
import { useEffect } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { useAuthStore } from "@/app/store/authStore";
import { InitialsAvatar } from "../core/Avatar";
import { getInitials } from "@/app/utils/getInitials";

export default function Navbar() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const dark = useThemeStore((s) => s.dark);
  const toggle = useThemeStore((s) => s.toggle);

  // Toggle .dark on <html>
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  return (
    <header className="px-4 sticky top-0 z-40 border-b
        bg-white/80 backdrop-blur text-gray-900
        dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-100">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-base font-semibold hover:opacity-80">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitch checked={dark} onCheckedChange={toggle} />
          {currentUser && (
            <div className="flex items-center gap-2">
              <InitialsAvatar initials={getInitials(currentUser.name)} />
              <div className="text-sm">
                <div className="font-medium leading-4">{currentUser.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
