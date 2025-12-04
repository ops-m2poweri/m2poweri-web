// src/components/sections/home-hero.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

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

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function HomeHero() {
  const { t } = useTranslation("common");
  const [activeId, setActiveId] = useState<SlideId>("poc");
  const prefersReducedMotion = useReducedMotion();

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
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* sfondo: griglia + orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(148,163,184,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:26px_26px]" />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand-blue/35 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [-10, 10, -10], opacity: [0.7, 1, 0.7] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 14, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          aria-hidden
          className="absolute right-[-5rem] top-24 h-64 w-64 rounded-full bg-brand-mauve/40 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [8, -8, 8], opacity: [0.9, 0.6, 0.9] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[-4rem] left-24 h-52 w-52 rounded-full bg-brand-orange/35 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { x: [-10, 6, -10], opacity: [0.8, 1, 0.8] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Colonna testo */}
        <motion.div className="flex-1 space-y-6" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-slate-900/70 px-3 py-1 text-xs font-medium text-brand-blue shadow-sm backdrop-blur"
            whileHover={!prefersReducedMotion ? { scale: 1.03 } : undefined}
          >
            <span className="relative inline-flex h-2 w-2 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute h-3 w-3 rounded-full bg-brand-green/40"
                  animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.8, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </span>
            {t("home.hero.badge")}
          </motion.div>

          <motion.h1
            className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl"
            variants={itemVariants}
          >
            {t("home.hero.title")}{" "}
            <span className="relative inline-block text-brand-blue">
              {t("home.hero.highlight")}
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-brand-blue via-brand-mauve to-brand-orange"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                />
              )}
            </span>
            .
          </motion.h1>

          <motion.p
            className="max-w-xl text-sm text-slate-300 sm:text-base"
            variants={itemVariants}
          >
            {t("home.hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={itemVariants}
          >
            <motion.div
              whileHover={!prefersReducedMotion ? { y: -1 } : undefined}
            >
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-brand-orange text-slate-950 shadow-lg shadow-brand-orange/40 hover:bg-brand-orange/90"
              >
                <Link
                  href="https://calendly.com/m2poweri25/30min" // <-- metti il tuo link
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("home.hero.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={!prefersReducedMotion ? { y: -1 } : undefined}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-brand-blue/50 text-brand-blue hover:bg-brand-blue/10 hover:text-slate-50"
              >
                <Link href="/headless-poc">{t("home.hero.secondaryCta")}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 text-xs text-slate-400"
            variants={itemVariants}
          >
            <span>✔ {t("home.hero.bulletB2CPresence")}</span>
            <span>✔ {t("home.hero.bulletMigration")}</span>
            <span>✔ {t("home.hero.bulletCustomApps")}</span>
          </motion.div>
        </motion.div>

        {/* Colonna destra */}
        <motion.div
          className="relative flex-1"
          variants={itemVariants}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* LOGO / PITTOGRAMMA SOSPESO */}
          <motion.div
            className="pointer-events-none absolute -top-10 right-6 z-20"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [-6, 4, -6],
                    rotate: [-4, 3, -4],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Image
              src="/brand/m2poweri-pittogramma-colori-schermi.svg" // cambia path se diverso
              alt="M2Poweri logo glyph"
              width={40}
              height={40}
              className="h-10 w-auto drop-shadow-[0_0_18px_rgba(0,202,255,0.45)]"
            />
          </motion.div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/80 backdrop-blur">
            {!prefersReducedMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent"
                style={{
                  background:
                    "radial-gradient(circle at 0 0, rgba(0,202,255,0.24), transparent 55%), radial-gradient(circle at 100% 0, rgba(187,173,255,0.24), transparent 55%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}

            <div className="relative z-10">
              <div className="mb-5 flex flex-col gap-3 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-50">
                    {t("home.hero.mockupTitle")}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {t("home.hero.mockupVitals")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {slides.map((slide) => {
                    const isActive = slide.id === activeId;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveId(slide.id)}
                        className={`relative overflow-hidden rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                          isActive
                            ? "bg-brand-blue text-slate-950"
                            : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
                        }`}
                      >
                        {t(slide.labelKey)}
                        {isActive && !prefersReducedMotion && (
                          <motion.span
                            layoutId="hero-tab-glow-floating-logo"
                            className="pointer-events-none absolute inset-0 rounded-full bg-white/10"
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!prefersReducedMotion && (
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      key={activeId}
                      className="h-full bg-gradient-to-r from-brand-blue via-brand-mauve to-brand-orange"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 6.2, ease: "linear" }}
                    />
                  </div>
                )}
              </div>

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
                    <h3 className="text-sm font-semibold text-slate-50">
                      {t(activeSlide.titleKey)}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-300">
                      {t(activeSlide.bodyKey)}
                    </p>
                  </div>

                  {activeId === "poc" ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <MetricRow
                          label={t("home.hero.metricLcp")}
                          value="0.9s"
                          tone="green"
                        />
                        <MetricRow
                          label={t("home.hero.metricCls")}
                          value="0.01"
                          tone="green"
                        />
                        <MetricRow
                          label={t("home.hero.metricConversion")}
                          value="+18%"
                          tone="orange"
                        />
                      </div>

                      <div className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-3">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {t(
                            "home.hero.workflow.label",
                            "Workflow PoC (5 giorni)"
                          )}
                        </p>
                        <div className="flex flex-col gap-2 text-[11px] text-slate-300 sm:flex-row sm:items-center sm:gap-3">
                          <WorkflowStep
                            step="1"
                            label={t("home.hero.workflow.step1", "Kickoff")}
                          />
                          <WorkflowDivider />
                          <WorkflowStep
                            step="2"
                            label={t(
                              "home.hero.workflow.step2",
                              "Build UI + BFF"
                            )}
                          />
                          <WorkflowDivider />
                          <WorkflowStep
                            step="3"
                            label={t(
                              "home.hero.workflow.step3",
                              "Demo & Handover"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <MiniStat
                          label={t("home.hero.miniStat.leadTimeLabel")}
                          value={t("home.hero.miniStat.leadTimeValue")}
                        />
                        <MiniStat
                          label={t("home.hero.miniStat.collabLabel")}
                          value={t("home.hero.miniStat.collabValue")}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <TechPill label="React / Next.js" />
                        <TechPill label="API / BFF" />
                        <TechPill label="Headless CMS" />
                        <TechPill label="Monitoring & DX" />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Righe metriche */
function MetricRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "orange";
}) {
  const prefersReducedMotion = useReducedMotion();
  const colorClass =
    tone === "green" ? "text-brand-green" : "text-brand-orange";

  return (
    <motion.div
      className="flex items-center justify-between rounded-xl bg-slate-900/80 px-4 py-3"
      whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
    >
      <span className="text-slate-300">{label}</span>
      <motion.span
        className={`font-semibold ${colorClass}`}
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.6, repeat: Infinity, repeatDelay: 2 }
        }
      >
        {value}
      </motion.span>
    </motion.div>
  );
}

/** Mini-stat per altre slide */
function MiniStat({ label, value }: { label: string; value: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="rounded-xl bg-slate-900/80 px-4 py-3"
      whileHover={!prefersReducedMotion ? { y: -2 } : undefined}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-50">{value}</p>
    </motion.div>
  );
}

function WorkflowStep({ step, label }: { step: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/20 text-[11px] font-semibold text-brand-blue">
        {step}
      </div>
      <span className="text-[11px] text-slate-200">{label}</span>
    </div>
  );
}

function WorkflowDivider() {
  return (
    <div className="hidden h-px flex-1 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 sm:block" />
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[10px] text-slate-300">
      {label}
    </span>
  );
}
