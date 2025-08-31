"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const ALL = "__ALL__"; // sentinel (must be non-empty)

export function CompanySelect({
  items,
  value,                // parent can still pass "" for "no filter"
  onValueChange,
  placeholder = "Filter by company",
}: {
  items: string[];
  value: string;         // "" means "no filter"
  onValueChange: (v: string) => void; // will receive "" when ALL is chosen
  placeholder?: string;
}) {
  return (
    <Select.Root
      // If parent value is "", show the ALL sentinel as the selected item
      value={value === "" ? ALL : value}
      // Translate sentinel back to "" for parent state
      onValueChange={(v) => onValueChange(v === ALL ? "" : v)}
    >
      <Select.Trigger className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
           bg-white text-gray-900 border-gray-300
           dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 rounded-xl border bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <Select.Viewport className="p-1">
            {/* ✅ Use non-empty value for the "All" option */}
            <Select.Item
              value={ALL}
              className="cursor-pointer rounded-md px-2 py-1 text-sm
                  text-gray-900 hover:bg-gray-100
                  dark:text-gray-100 dark:hover:bg-gray-800"
            >
              <Select.ItemText>All Companies</Select.ItemText>
            </Select.Item>

            {items.map((c) => (
              <Select.Item
                key={c}
                value={c}
                className="cursor-pointer rounded-md px-2 py-1 text-sm
                  text-gray-900 hover:bg-gray-100
                  dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <Select.ItemText>{c}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
