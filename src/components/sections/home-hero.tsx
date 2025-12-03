// src/components/sections/home-hero.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

type SlideId = "poc" | "b2c" | "custom";

const slides: {
  id: SlideId;
  labelKey: string;
  titleKey: string;
  bodyKey: string;
}[] = [
  {
    id: "poc",
    labelKey: "home.hero.carousel.poc.label",
    titleKey: "home.hero.carousel.poc.title",
    bodyKey: "home.hero.carousel.poc.body",
  },
  {
    id: "b2c",
    labelKey: "home.hero.carousel.b2c.label",
    titleKey: "home.hero.carousel.b2c.title",
    bodyKey: "home.hero.carousel.b2c.body",
  },
  {
    id: "custom",
    labelKey: "home.hero.carousel.custom.label",
    titleKey: "home.hero.carousel.custom.title",
    bodyKey: "home.hero.carousel.custom.body",
  },
];

export function HomeHero() {
  const { t } = useTranslation("common");
  const [activeId, setActiveId] = useState<SlideId>("poc");
  const prefersReducedMotion = useReducedMotion();

  // auto-rotate carousel
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = slides.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % slides.length;
        return slides[nextIndex].id;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeSlide = slides.find((s) => s.id === activeId) ?? slides[0];

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-white via-white to-slate-50">
      {/* background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-64 w-64 rounded-full bg-brand-mauve/20 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-24 h-52 w-52 rounded-full bg-brand-orange/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
        {/* Testo hero */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-brand-blue shadow-sm backdrop-blur">
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
              className="bg-brand-orange text-white shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90"
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

        {/* Card destra con carousel servizi + metriche */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl border bg-white/90 p-6 shadow-xl backdrop-blur">
            {/* top label + tabs servizi */}
            <div className="mb-5 flex flex-col gap-3 text-xs text-neutral-500">
              <div className="flex items-center justify-between">
                <span className="font-medium text-brand-dark">
                  {t("home.hero.mockupTitle")}
                </span>
                <span>{t("home.hero.mockupVitals")}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {slides.map((slide) => {
                  const isActive = slide.id === activeId;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveId(slide.id)}
                      className={`relative rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                        isActive
                          ? "bg-brand-blue text-white"
                          : "bg-slate-50 text-neutral-600 hover:bg-slate-100"
                      }`}
                    >
                      {t(slide.labelKey)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* contenuto slide animato */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 text-xs"
              >
                <div>
                  <h3 className="text-sm font-semibold text-brand-dark">
                    {t(activeSlide.titleKey)}
                  </h3>
                  <p className="mt-1 text-[11px] text-neutral-600">
                    {t(activeSlide.bodyKey)}
                  </p>
                </div>

                {/* metriche solo per la slide PoC, per le altre mostriamo "mini insights" */}
                {activeId === "poc" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span>{t("home.hero.metricLcp")}</span>
                      <span className="font-semibold text-brand-green">
                        0.9s
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span>{t("home.hero.metricCls")}</span>
                      <span className="font-semibold text-brand-green">
                        0.01
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span>{t("home.hero.metricConversion")}</span>
                      <span className="font-semibold text-brand-orange">
                        +18%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        {t("home.hero.miniStat.leadTimeLabel")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-brand-dark">
                        {t("home.hero.miniStat.leadTimeValue")}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                        {t("home.hero.miniStat.collabLabel")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-brand-dark">
                        {t("home.hero.miniStat.collabValue")}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
