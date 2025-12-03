// src/components/sections/home-highlights.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

const highlights = [
  {
    labelKey: "home.highlights.pocTime.label",
    valueKey: "home.highlights.pocTime.value",
    detailKey: "home.highlights.pocTime.detail",
  },
  {
    labelKey: "home.highlights.approach.label",
    valueKey: "home.highlights.approach.value",
    detailKey: "home.highlights.approach.detail",
  },
  {
    labelKey: "home.highlights.target.label",
    valueKey: "home.highlights.target.value",
    detailKey: "home.highlights.target.detail",
  },
];

export function HomeHighlights() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {highlights.map((item) => (
            <div
              key={item.labelKey}
              className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {t(item.labelKey)}
              </p>
              <p className="mt-2 text-xl font-semibold text-brand-dark">
                {t(item.valueKey)}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {t(item.detailKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
