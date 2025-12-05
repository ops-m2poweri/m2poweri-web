// app/admin/layout.tsx
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

const BFF_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getCurrentUser() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");

  const res = await fetch(`${BFF_URL}/auth/me`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();

  if (data && typeof data === "object" && "user" in data) {
    return data.user;
  }

  return data ?? null;
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar sinistra (desktop) + top bar mobile */}
      <AdminSidebar userEmail={user.email} />

      {/* Contenuto principale */}
      <main className="flex-1 bg-slate-900/40 px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
