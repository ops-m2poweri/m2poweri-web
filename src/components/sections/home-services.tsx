// src/components/sections/home-services.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { ArrowRight, Globe2, Layers, PanelsTopLeft } from "lucide-react";

const services = [
  {
    icon: Globe2,
    tagKey: "home.services.cards.presence.tag",
    titleKey: "home.services.cards.presence.title",
    descriptionKey: "home.services.cards.presence.description",
  },
  {
    icon: Layers,
    tagKey: "home.services.cards.migration.tag",
    titleKey: "home.services.cards.migration.title",
    descriptionKey: "home.services.cards.migration.description",
  },
  {
    icon: PanelsTopLeft,
    tagKey: "home.services.cards.custom.tag",
    titleKey: "home.services.cards.custom.title",
    descriptionKey: "home.services.cards.custom.description",
  },
];

export function HomeServices() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
              {t("home.services.eyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-dark md:text-3xl">
              {t("home.services.title")}
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600">
            {t("home.services.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity group-hover:opacity-100">
                  <div className="h-full w-full bg-gradient-to-br from-brand-blue/10 via-brand-orange/10 to-brand-mauve/20" />
                </div>

                <div className="relative flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                      {t(service.tagKey)}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-brand-dark">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t(service.descriptionKey)}
                  </p>

                  <button className="mt-2 inline-flex items-center text-xs font-medium text-brand-blue">
                    {t("home.services.cardCta")}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
