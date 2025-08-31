"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import UserFormDialog from "./UserFormDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useUsers } from "@/app/hooks/useUsers";
import { User } from "@/app/types/user";
import { CompanySelect } from "../core/Select";
import { InitialsAvatar } from "../core/Avatar";
import { getInitials } from "@/app/utils/getInitials";
import Pagination from "../part/Pagination";

const PAGE_SIZE = 5;

export default function UserTable() {
  const { usersQuery, addUser, editUser, deleteUser } = useUsers();
  const users = usersQuery.data || [];

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [companyFilter, setCompanyFilter] = useState("");
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selected, setSelected] = useState<User | null>(null);

  const [openDelete, setOpenDelete] = useState(false);

  const companies = useMemo(() => {
    const set = new Set(users.map((u) => u.company?.name).filter(Boolean));
    return Array.from(set);
  }, [users]);

  const filtered = useMemo(() => {
    let arr = [...users];
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter((u) => u.name.toLowerCase().includes(q));
    }
    if (companyFilter) arr = arr.filter((u) => u.company?.name === companyFilter);
    arr.sort((a, b) => {
      const ae = a.email.toLowerCase(), be = b.email.toLowerCase();
      if (ae < be) return sortAsc ? -1 : 1;
      if (ae > be) return sortAsc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [users, search, companyFilter, sortAsc]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleAdd() { setMode("add"); setSelected(null); setOpenForm(true); }
  function handleEdit(u: User) { setMode("edit"); setSelected(u); setOpenForm(true); }
  function handleDelete(u: User) { setSelected(u); setOpenDelete(true); }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <input
            placeholder="Search by name..."
            className="w-56 rounded-lg border px-3 py-2 text-sm
                bg-white text-gray-900 placeholder:text-gray-500
                border-gray-300
                dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400 dark:border-gray-700"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <button
            className="rounded-lg border px-3 py-2 text-sm
           bg-white text-gray-900 border-gray-300
           dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            onClick={() => setSortAsc((s) => !s)}
            title="Sort by email"
          >
            Sort Email {sortAsc ? "(A–Z)" : "(Z–A)"}
          </button>
          <CompanySelect items={companies} value={companyFilter} onValueChange={(v) => { setCompanyFilter(v); setPage(1); }} />
        </div>
        <button onClick={handleAdd} className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700">
          + Add User
        </button>
      </div>

      <div className="overflow-auto rounded-xl border dark:border-gray-800">
        <table className="min-w-[720px] w-full border-separate border-spacing-0">
          <thead className="bg-gray-50 text-left text-sm
             text-gray-700
             dark:bg-gray-900 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2">Avatar</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersQuery.isLoading && <tr><td colSpan={6} className="px-3 py-6 text-center text-sm">Loading...</td></tr>}
            {usersQuery.isError && <tr><td colSpan={6} className="px-3 py-6 text-center text-sm text-red-600">Failed to load.</td></tr>}
            {!usersQuery.isLoading && pageItems.length === 0 && <tr><td colSpan={6} className="px-3 py-6 text-center text-sm">No results.</td></tr>}
            {pageItems.map((u) => (
              <tr key={u.id} className="border-t text-sm dark:border-gray-800">
                <td className="px-3 py-2"><InitialsAvatar initials={getInitials(u.name)} /></td>
                <td className="px-3 py-2"><Link href={`/users/${u.id}`} className="font-medium hover:underline">{u.name}</Link></td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.phone}</td>
                <td className="px-3 py-2">{u.company?.name}</td>
                <td className="px-3 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg border px-2 py-1 dark:border-gray-700" onClick={() => handleEdit(u)}>Edit</button>
                    <button className="rounded-lg border px-2 py-1 text-red-600 hover:bg-red-50 dark:border-gray-700" onClick={() => handleDelete(u)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        pageCount={pageCount}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(pageCount || 1, p + 1))}
      />

      <UserFormDialog
        open={openForm}
        onOpenChange={setOpenForm}
        mode={mode}
        initial={selected || undefined}
        onSubmit={(v) => {
          if (mode === "add") {
            addUser.mutate({
              name: v.name, email: v.email, phone: v.phone,
              address: { street: "", city: "", zipcode: "" },
              company: { name: v.company },
              id: 0, // ignored in optimistic
            } as User);
          } else if (selected) {
            const updated: User = {
              ...selected, name: v.name, email: v.email, phone: v.phone, company: { name: v.company }
            };
            editUser.mutate(updated);
          }
          setOpenForm(false);
        }}
      />

      <DeleteConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        name={selected?.name || ""}
        onConfirm={() => { if (selected) deleteUser.mutate(selected.id); setOpenDelete(false); }}
      />
    </div>
  );
}
