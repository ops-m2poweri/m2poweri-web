// src/components/sections/services-page.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "b2c-presence",
    href: "/services/b2c-presence", // puoi lasciarlo anche solo "#" per ora
    i18nKey: "services.cards.b2c",
  },
  {
    id: "headless-poc",
    href: "/services/headless-poc",
    i18nKey: "services.cards.poc",
  },
  {
    id: "web-apps",
    href: "/services/web-app-custom",
    i18nKey: "services.cards.apps",
  },
];

export function ServicesPage() {
  const { t } = useTranslation("common");

  return (
    <main className="bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800/70 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-20">
          <motion.div
            className="max-w-xl space-y-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-blue">
              {t("services.hero.badge")}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t("services.hero.title")}
            </h1>
            <p className="text-sm text-slate-300 sm:text-base">
              {t("services.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-brand-orange text-slate-950 shadow-lg shadow-brand-orange/40 hover:bg-brand-orange/90"
              >
                <Link
                  href={
                    process.env.CALENDLY_URL ||
                    "https://calendly.com/m2poweri25/30min"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("headlessPoc.hero.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-brand-blue/40 bg-slate-900/60 text-brand-blue hover:bg-slate-900 hover:text-slate-50"
                asChild
              >
                <Link href="/headless-poc">
                  {t("services.hero.secondaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/60 md:mt-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-xs font-medium text-slate-300">
              {t("services.hero.sideTitle")}
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate-400">
              <li>• {t("services.hero.sideItems.0")}</li>
              <li>• {t("services.hero.sideItems.1")}</li>
              <li>• {t("services.hero.sideItems.2")}</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* GRID SERVIZI */}
      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-8 max-w-xl space-y-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {t("services.list.title")}
            </h2>
            <p className="text-sm text-slate-300">
              {t("services.list.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => {
              // ➜ QUI il fix TypeScript: cast esplicito a string[]
              const tags = t(`${service.i18nKey}.tags`, {
                returnObjects: true,
              }) as string[];

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm shadow-slate-900/50"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    {t(`${service.i18nKey}.label`)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-slate-50">
                    {t(`${service.i18nKey}.title`)}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300">
                    {t(`${service.i18nKey}.description`)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.isArray(tags) &&
                      tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-0.5 text-[11px] text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className="mt-4 flex-1" />

                  <Link
                    href={service.href}
                    className="mt-4 inline-flex items-center text-xs font-medium text-brand-blue transition-colors group-hover:text-brand-orange"
                  >
                    {t("services.list.cta")}
                    <ArrowRight className="ml-1.5 h-3 w-3" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center md:px-6 md:py-16">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t("services.final.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            {t("services.final.subtitle")}
          </p>
          <div className="mt-6 flex justify-center">
            <Button className="bg-brand-orange text-slate-950 shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90">
              {t("services.final.cta")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
