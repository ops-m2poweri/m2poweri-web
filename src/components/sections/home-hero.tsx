// src/components/sections/home-hero.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function HomeHero() {
  const { t } = useTranslation("common");

  return (
    <section className="border-b bg-gradient-to-b from-white via-white to-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
        {/* Testo */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-brand-blue shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            {t("home.hero.badge")}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
            {t("home.hero.title")}{" "}
            <span className="text-brand-blue">{t("home.hero.highlight")}</span>.
          </h1>

          <p className="max-w-xl text-sm text-neutral-600 sm:text-base">
            {t("home.hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              {t("home.hero.primaryCta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5"
            >
              {t("home.hero.secondaryCta")}
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <span>✔ {t("home.hero.bulletB2CPresence")}</span>
            <span>✔ {t("home.hero.bulletMigration")}</span>
            <span>✔ {t("home.hero.bulletCustomApps")}</span>
          </div>
        </motion.div>

        {/* Mockup lato destro */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="relative rounded-2xl border bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
              <span className="font-medium text-brand-dark">
                {t("home.hero.mockupTitle")}
              </span>
              <span>{t("home.hero.mockupVitals")}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span>{t("home.hero.metricLcp")}</span>
                <span className="font-semibold text-brand-green">0.9s</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span>{t("home.hero.metricCls")}</span>
                <span className="font-semibold text-brand-green">0.01</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <span>{t("home.hero.metricConversion")}</span>
                <span className="font-semibold text-brand-orange">+18%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
