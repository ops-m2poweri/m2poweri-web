"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ListChecks, LogOut, Menu, X } from "lucide-react";

const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || "http://localhost:4000";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Home", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: ListChecks },
];

type AdminSidebarProps = {
  userEmail?: string;
};

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  async function handleLogout() {
    try {
      await fetch(`${BFF_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // anche se fallisce, proviamo comunque a mandare al login
    } finally {
      router.push("/login");
    }
  }

  // --- versione desktop ---
  const desktopNav = (
    <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-950/95 px-4 py-5 md:flex">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          M2Poweri
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-50">Internal CRM</p>
        {userEmail && (
          <p className="mt-1 text-[11px] text-slate-400 truncate">
            {userEmail}
          </p>
        )}
      </div>

      <nav className="flex-1 space-y-1 text-sm">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                active
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </aside>
  );

  // --- versione mobile (top bar + drawer) ---
  const mobileBar = (
    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 md:hidden">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          M2Poweri
        </span>
        <span className="text-sm font-semibold text-slate-50">
          Admin dashboard
        </span>
      </div>
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="rounded-md border border-slate-700 p-1.5 text-slate-200"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
    </div>
  );

  const mobileDrawer = mobileOpen && (
    <div className="border-b border-slate-800 bg-slate-950/98 px-4 py-3 md:hidden">
      <nav className="space-y-1 text-sm">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => {
                setMobileOpen(false);
                router.push(item.href);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                active
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <>
      {desktopNav}
      {mobileBar}
      {mobileDrawer}
    </>
  );
}
