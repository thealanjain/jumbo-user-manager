"use client";
import * as Avatar from "@radix-ui/react-avatar";

export function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <Avatar.Root className="inline-flex size-8 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-100">
      <Avatar.Fallback delayMs={0}>{initials}</Avatar.Fallback>
    </Avatar.Root>
  );
}
