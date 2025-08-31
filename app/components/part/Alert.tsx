"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export function Confirm({
  open, onOpenChange, title, description, confirmText="Confirm", cancelText="Cancel", onConfirm
}: {
  open: boolean; onOpenChange: (v: boolean) => void; title: string; description?: string;
  confirmText?: string; cancelText?: string; onConfirm: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
          <AlertDialog.Title className="text-lg font-semibold dark:text-gray-100">{title}</AlertDialog.Title>
          {description && <AlertDialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</AlertDialog.Description>}
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel className="rounded-lg border px-3 py-2 text-sm dark:border-gray-700 text-white"> {cancelText} </AlertDialog.Cancel>
            <AlertDialog.Action onClick={onConfirm} className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700">
              {confirmText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
