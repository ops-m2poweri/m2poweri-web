// src/components/sections/home-clients-strip.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

const tech = ["React", "Next.js", "NestJS", "FastAPI", "Headless CMS"];

export function HomeClientsStrip() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between md:px-6">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-medium text-neutral-600"
        >
          {t("home.clients.title")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 text-[11px] uppercase tracking-wide"
        >
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-dashed border-slate-200 bg-slate-50 px-3 py-1"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
