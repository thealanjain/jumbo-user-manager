"use client";

import ActivityLog from "./components/template/ActivityLog";
import UserTable from "./components/template/UserTable";

export default function HomePage() {
  return (
    <>
      <section className="ps-4"><UserTable /></section>
      <section className="pe-4"><ActivityLog /></section>
    </>
  );
}
