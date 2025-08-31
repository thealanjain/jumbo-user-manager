"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2
             rounded-2xl bg-white p-6 shadow-2xl focus:outline-none
             text-gray-900
             dark:bg-gray-900 dark:text-gray-100"
        >
          <Dialog.Title className="text-xl font-semibold dark:text-gray-100">
            {title}
          </Dialog.Title>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
