"use client";

import { Confirm } from "../part/Alert";


export default function DeleteConfirmDialog({
  open, onOpenChange, onConfirm, name
}: { open: boolean; onOpenChange: (v: boolean) => void; onConfirm: () => void; name: string; }) {
  return (
    <Confirm
      open={open}
      onOpenChange={onOpenChange}
      title="Delete user?"
      description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
    />
  );
}
