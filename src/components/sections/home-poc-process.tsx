// src/components/sections/home-poc-process.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

const steps = [
  {
    labelKey: "home.poc.steps.kickoff.label",
    titleKey: "home.poc.steps.kickoff.title",
    descriptionKey: "home.poc.steps.kickoff.description",
  },
  {
    labelKey: "home.poc.steps.build.label",
    titleKey: "home.poc.steps.build.title",
    descriptionKey: "home.poc.steps.build.description",
  },
  {
    labelKey: "home.poc.steps.handover.label",
    titleKey: "home.poc.steps.handover.title",
    descriptionKey: "home.poc.steps.handover.description",
  },
];

export function HomePocProcess() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
              {t("home.poc.eyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {t("home.poc.title")}
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-300">
            {t("home.poc.description")}
          </p>
        </div>

        <div className="relative">
          {/* linea */}
          <div className="pointer-events-none absolute left-[14px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-blue via-brand-mauve to-brand-orange md:left-1/2 md:top-0 md:h-full" />

          <div className="flex flex-col gap-10 md:gap-14">
            {steps.map((step, index) => (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col gap-3 md:flex-row md:items-center"
              >
                {/* bullet */}
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-blue bg-slate-950 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-brand-blue" />
                </div>

                {/* testo */}
                <div className="mt-2 flex-1 md:pl-12">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
                    {t(step.labelKey)}
                  </p>
                  <h3 className="text-base font-semibold">
                    {t(step.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
