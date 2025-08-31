"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/api";
import { User } from "@/app/types/user";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const router = useRouter();

  const q = useQuery({
    queryKey: ["user", id],
    queryFn: async () => (await api.get<User>(`/users/${id}`)).data,
  });

  if (q.isLoading) return <div className="ps-4">Loading...</div>;
  if (q.isError || !q.data) return <div className="ps-4">Failed to load user.</div>;

  const u = q.data;
  return (
    <div className="ms-4">
      <button onClick={() => router.back()} className="rounded-lg border px-3 py-1 mb-4 text-sm disabled:opacity-50 dark:border-gray-700">← Back</button>

      <h1 className="mb-2 text-xl font-semibold">{u.name}</h1>
      <div className="space-y-1">
        <div><span className="font-medium">Email:</span> {u.email}</div>
        <div><span className="font-medium">Phone:</span> {u.phone}</div>
        <div><span className="font-medium">Company:</span> {u.company?.name}</div>
        <div className="mt-2">
          <div className="font-medium">Address</div>
          <div>{u.address?.street}, {u.address?.city} {u.address?.zipcode}</div>
        </div>
      </div>
    </div>
  );
}
