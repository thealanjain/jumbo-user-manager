"use client";

import { useActivityLog } from "@/app/store/activityLogStore";

function fmt(ts: number) { return new Date(ts).toLocaleString(); }

export default function ActivityLog() {
  const { items, clear } = useActivityLog();
  return (
    <aside className="h-full w-full rounded-xl border p-3 dark:border-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Activity</h3>
        <button onClick={clear} className="rounded-md border px-2 py-1 text-xs dark:border-gray-700">
          Clear
        </button>
      </div>
      <div className="space-y-2 overflow-y-auto">
        {items.length === 0 && <div className="text-sm text-gray-500">No activity yet.</div>}
        {items.map((i) => (
          <div key={i.id} className="rounded-md border px-2 py-1 text-xs dark:border-gray-800">
            <span className="font-medium capitalize">{i.action}</span> · <span>{i.userName}</span>
            <div className="text-[10px] text-gray-500">{fmt(i.at)}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
