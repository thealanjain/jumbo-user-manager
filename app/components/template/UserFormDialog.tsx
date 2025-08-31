"use client";

import { User } from "@/app/types/user";
import { useEffect, useState } from "react";
import { Modal } from "../part/Dialog";

export default function UserFormDialog({
  open, onOpenChange, onSubmit, mode, initial
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  onSubmit: (v: { id?: number; name: string; email: string; phone: string; company: string }) => void;
  mode: "add" | "edit"; initial?: User | null;
}) {
  const [name, setName] = useState(""), [email, setEmail] = useState(""),
        [phone, setPhone] = useState(""), [company, setCompany] = useState("");

  useEffect(() => {
    if (open && initial && mode === "edit") {
      setName(initial.name); setEmail(initial.email); setPhone(initial.phone);
      setCompany(initial.company?.name ?? "");
    } else if (open && mode === "add") {
      setName(""); setEmail(""); setPhone(""); setCompany("");
    }
  }, [open, mode, initial]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={mode === "add" ? "Add User" : "Edit User"}>
      <form
        className="space-y-3"
        onSubmit={(e) => { e.preventDefault(); onSubmit({ id: initial?.id, name, email, phone, company }); }}
      >
        {([
          ["Name", name, setName, "text"],
          ["Email", email, setEmail, "email"],
          ["Phone", phone, setPhone, "text"],
          ["Company", company, setCompany, "text"],
        ] as [string, string, React.Dispatch<React.SetStateAction<string>>, string][]).map(([label, val, set, type]) => (
          <div key={label} className="grid gap-1">
            <label className="text-sm">{label}</label>
            <input
              type={type}
              className="rounded-md border px-3 py-2
                bg-white text-gray-900 placeholder:text-gray-500
                dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400
                border-gray-300 dark:border-gray-700"
              value={val}
              onChange={(e) => set(e.target.value)}
              required
            />
          </div>
        ))}

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className="rounded-lg border px-3 py-2 text-sm dark:border-gray-700" onClick={() => onOpenChange(false)}>Cancel</button>
          <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
            {mode === "add" ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
