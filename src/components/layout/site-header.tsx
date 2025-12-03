"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/servizi", key: "header.nav.services" },
  { href: "/headless-poc", key: "header.nav.poc" },
  { href: "/web-agency", key: "header.nav.agency" },
  { href: "/contatti", key: "header.nav.contacts" },
];

export function SiteHeader() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo + tagline mini */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/m2poweri-logo-esteso-colori-schermi.png"
              alt={t("header.logoAlt")}
              width={200}
              height={32}
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="transition-colors hover:text-brand-blue"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Button className="bg-brand-orange text-white hover:bg-brand-orange/90">
            {t("header.cta")}
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="py-2 text-sm font-medium text-neutral-700"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}

            <Button
              className="mt-2 w-full bg-brand-orange text-white hover:bg-brand-orange/90"
              onClick={() => setOpen(false)}
            >
              {t("header.cta")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
