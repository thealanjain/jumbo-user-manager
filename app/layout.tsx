import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/app/lib/react-query";
import Navbar from "./components/part/Navbar";

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "Users CRUD with Next.js + TS + Tailwind + Radix + React Query + Zustand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <Navbar />
          <main className="container mx-auto my-4 grid gap-4 md:grid-cols-[2fr_1fr]">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
