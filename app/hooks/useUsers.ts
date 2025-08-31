"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/app/lib/api";
import type { User } from "@/app/types/user";
import { useActivityLog } from "@/app/store/activityLogStore";

const KEY = ["users"];

export function useUsers() {
  const qc = useQueryClient();
  const logAdd = useActivityLog((s) => s.add);

  const usersQuery = useQuery<User[]>({
    queryKey: KEY,
    queryFn: async () => (await api.get<User[]>("/users")).data,
  });

  const addUser = useMutation({
    mutationFn: async (input: Omit<User, "id">) => (await api.post<User>("/users", input)).data,
    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<User[]>(KEY) ?? [];
      const tempId = Date.now();
      const optimistic: User = { ...input, id: tempId };
      qc.setQueryData<User[]>(KEY, [optimistic, ...prev]);
      logAdd({ id: String(tempId), action: "add", userName: input.name, at: Date.now() });
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(KEY, ctx.prev),
    // On success we keep optimistic row (JSONPlaceholder won’t persist anyway)
  });

  const editUser = useMutation({
    mutationFn: async (u: User) => (await api.put<User>(`/users/${u.id}`, u)).data,
    onMutate: async (u) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<User[]>(KEY) ?? [];
      qc.setQueryData<User[]>(KEY, prev.map((x) => (x.id === u.id ? { ...x, ...u } : x)));
      logAdd({ id: `${u.id}-edit-${Date.now()}`, action: "edit", userName: u.name, at: Date.now() });
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(KEY, ctx.prev),
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => { await api.delete(`/users/${id}`); return id; },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<User[]>(KEY) ?? [];
      const removed = prev.find((x) => x.id === id);
      qc.setQueryData<User[]>(KEY, prev.filter((x) => x.id !== id));
      if (removed) logAdd({ id: `${id}-del-${Date.now()}`, action: "delete", userName: removed.name, at: Date.now() });
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(KEY, ctx.prev),
  });

  return { usersQuery, addUser, editUser, deleteUser };
}
