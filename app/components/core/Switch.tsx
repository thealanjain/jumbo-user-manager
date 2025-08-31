"use client";
import * as Switch from "@radix-ui/react-switch";

export function ThemeSwitch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Light</span>
      <Switch.Root
        className="relative h-6 w-11 cursor-pointer rounded-full bg-gray-300 data-[state=checked]:bg-green-600"
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-[2px] rounded-full bg-white transition-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
      <span className="text-sm">Dark</span>
    </div>
  );
}
