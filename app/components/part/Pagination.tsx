"use client";

export default function Pagination({
  page, pageCount, onPrev, onNext
}: { page: number; pageCount: number; onPrev: () => void; onNext: () => void; }) {
  return (
    <div className="flex items-center justify-between">
      <button onClick={onPrev} disabled={page <= 1} className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-700">Prev</button>
      <div className="text-sm">{page} / {pageCount || 1}</div>
      <button onClick={onNext} disabled={page >= pageCount} className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-700">Next</button>
    </div>
  );
}
