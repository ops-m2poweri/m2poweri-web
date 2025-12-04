"use client";

import "@/i18n/i18n";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Gauge,
  Layers,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/m2poweri25/30min";

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.08 * i,
      ease: "easeOut" as const,
    },
  }),
};

export default function HeadlessPocPage() {
  const { t } = useTranslation("common");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(148,163,184,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="absolute right-[-5rem] top-24 h-64 w-64 rounded-full bg-brand-mauve/40 blur-3xl" />
          <div className="absolute bottom-[-4rem] left-24 h-52 w-52 rounded-full bg-brand-orange/35 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24 md:px-6">
          {/* Testo */}
          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-slate-900/80 px-3 py-1 text-xs font-medium text-brand-blue shadow-sm backdrop-blur">
              <span className="relative inline-flex h-2 w-2 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-brand-green" />
              </span>
              {t("headlessPoc.hero.badge")}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t("headlessPoc.hero.titlePrefix")}{" "}
              <span className="text-brand-blue">
                {t("headlessPoc.hero.titleHighlight")}
              </span>{" "}
              {t("headlessPoc.hero.titleSuffix")}
            </h1>

            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              {t("headlessPoc.hero.description")}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-brand-orange text-slate-950 shadow-lg shadow-brand-orange/40 hover:bg-brand-orange/90"
              >
                <Link href={CALENDLY_URL} target="_blank" rel="noreferrer">
                  {t("headlessPoc.hero.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-brand-blue/40 bg-slate-900/60 text-brand-blue hover:bg-slate-900 hover:text-slate-50"
                asChild
              >
                <Link href="/contacts">
                  {t("headlessPoc.hero.secondaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                {t("headlessPoc.hero.bullet1")}
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                {t("headlessPoc.hero.bullet2")}
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                {t("headlessPoc.hero.bullet3")}
              </span>
            </div>
          </motion.div>

          {/* Card metrics */}
          <motion.div
            custom={1}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-900/80 backdrop-blur">
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent" />

              <div className="relative z-10 space-y-4 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {t("headlessPoc.metrics.coreVitalsLabel")}
                  </span>
                  <span className="text-[11px]">
                    {t("headlessPoc.metrics.exampleLabel")}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MetricCard
                    label={t("headlessPoc.metrics.lcpLabel")}
                    value="0.9s"
                    tone="green"
                  />
                  <MetricCard
                    label={t("headlessPoc.metrics.clsLabel")}
                    value="0.01"
                    tone="green"
                  />
                  <MetricCard
                    label={t("headlessPoc.metrics.upliftLabel")}
                    value="+18%"
                    tone="orange"
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MiniHighlight
                    icon={Clock}
                    label={t("headlessPoc.metrics.timelineLabel")}
                    value={t("headlessPoc.metrics.timelineValue")}
                  />
                  <MiniHighlight
                    icon={Gauge}
                    label={t("headlessPoc.metrics.impactLabel")}
                    value={t("headlessPoc.metrics.impactValue")}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEZIONE: cos'è / per chi */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-10 md:grid-cols-[1.4fr,1fr]"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-50">
                {t("headlessPoc.whatIs.title")}
              </h2>
              <p className="text-sm text-slate-300">
                {t("headlessPoc.whatIs.body1")}
              </p>
              <p className="text-sm text-slate-300">
                {t("headlessPoc.whatIs.body2")}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <BulletPill title={t("headlessPoc.whatIs.pillMarketingTitle")}>
                  {t("headlessPoc.whatIs.pillMarketingBody")}
                </BulletPill>
                <BulletPill title={t("headlessPoc.whatIs.pillItTitle")}>
                  {t("headlessPoc.whatIs.pillItBody")}
                </BulletPill>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                {t("headlessPoc.whatIs.whenTitle")}
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  {t("headlessPoc.whatIs.whenItem1")}
                </li>
                <li className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  {t("headlessPoc.whatIs.whenItem2")}
                </li>
                <li className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  {t("headlessPoc.whatIs.whenItem3")}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE 5 GIORNI */}
      <section className="border-b border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-slate-50">
                {t("headlessPoc.timeline.title")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                {t("headlessPoc.timeline.subtitle")}
              </p>
            </div>
            <p className="text-xs text-slate-400">
              {t("headlessPoc.timeline.note")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-4">
            <TimelineStep
              index={1}
              stepLabel={t("headlessPoc.timeline.stepLabel")}
              title={t("headlessPoc.timeline.steps.1.title")}
              body={t("headlessPoc.timeline.steps.1.body")}
            />
            <TimelineStep
              index={2}
              stepLabel={t("headlessPoc.timeline.stepLabel")}
              title={t("headlessPoc.timeline.steps.2.title")}
              body={t("headlessPoc.timeline.steps.2.body")}
            />
            <TimelineStep
              index={3}
              stepLabel={t("headlessPoc.timeline.stepLabel")}
              title={t("headlessPoc.timeline.steps.3.title")}
              body={t("headlessPoc.timeline.steps.3.body")}
            />
            <TimelineStep
              index={4}
              stepLabel={t("headlessPoc.timeline.stepLabel")}
              title={t("headlessPoc.timeline.steps.4.title")}
              body={t("headlessPoc.timeline.steps.4.body")}
            />
          </div>
        </div>
      </section>

      {/* ARCHITETTURA */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-8 space-y-3"
          >
            <h2 className="text-2xl font-semibold text-slate-50">
              {t("headlessPoc.architecture.title")}
            </h2>
            <p className="max-w-2xl text-sm text-slate-300">
              {t("headlessPoc.architecture.body")}
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-xs text-slate-300 shadow-lg shadow-slate-950/70"
          >
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-blue" />
              <span className="text-sm font-medium text-slate-50">
                {t("headlessPoc.architecture.schemaTitle")}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
              {/* Diagramma */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <ArchitectureBox
                    title={t("headlessPoc.architecture.boxNewFrontendTitle")}
                    accent="from-brand-blue to-brand-mauve"
                  >
                    {t("headlessPoc.architecture.boxNewFrontendBody")}
                  </ArchitectureBox>

                  <div className="flex items-center justify-center text-[10px] text-slate-400">
                    <span className="mx-2 h-px flex-1 bg-gradient-to-r from-brand-blue/60 via-slate-500 to-brand-mauve/60" />
                    {t("headlessPoc.architecture.bffLabel")}
                    <span className="mx-2 h-px flex-1 bg-gradient-to-r from-brand-blue/60 via-slate-500 to-brand-mauve/60" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <ArchitectureBox
                      title={t("headlessPoc.architecture.boxCmsTitle")}
                    >
                      {t("headlessPoc.architecture.boxCmsBody")}
                    </ArchitectureBox>
                    <ArchitectureBox
                      title={t("headlessPoc.architecture.boxLegacyTitle")}
                    >
                      {t("headlessPoc.architecture.boxLegacyBody")}
                    </ArchitectureBox>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-3 rounded-xl bg-slate-900/80 p-4">
                <h3 className="text-sm font-semibold text-slate-50">
                  {t("headlessPoc.architecture.afterPocTitle")}
                </h3>
                <p>{t("headlessPoc.architecture.afterPocBody")}</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                    {t("headlessPoc.architecture.afterPocItem1")}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                    {t("headlessPoc.architecture.afterPocItem2")}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                    {t("headlessPoc.architecture.afterPocItem3")}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USE CASE */}
      <section className="border-b border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-8 space-y-3"
          >
            <h2 className="text-2xl font-semibold text-slate-50">
              {t("headlessPoc.useCases.title")}
            </h2>
            <p className="max-w-2xl text-sm text-slate-300">
              {t("headlessPoc.useCases.subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            <UseCaseCard
              title={t("headlessPoc.useCases.b2c.title")}
              body={t("headlessPoc.useCases.b2c.body")}
              points={[
                t("headlessPoc.useCases.b2c.point1"),
                t("headlessPoc.useCases.b2c.point2"),
                t("headlessPoc.useCases.b2c.point3"),
              ]}
            />
            <UseCaseCard
              title={t("headlessPoc.useCases.b2b.title")}
              body={t("headlessPoc.useCases.b2b.body")}
              points={[
                t("headlessPoc.useCases.b2b.point1"),
                t("headlessPoc.useCases.b2b.point2"),
                t("headlessPoc.useCases.b2b.point3"),
              ]}
            />
            <UseCaseCard
              title={t("headlessPoc.useCases.agency.title")}
              body={t("headlessPoc.useCases.agency.body")}
              points={[
                t("headlessPoc.useCases.agency.point1"),
                t("headlessPoc.useCases.agency.point2"),
                t("headlessPoc.useCases.agency.point3"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ + CTA FINALE */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr]">
            <motion.div
              custom={0}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-slate-50">
                {t("headlessPoc.faq.title")}
              </h2>
              <FAQItem
                question={t("headlessPoc.faq.q1")}
                answer={t("headlessPoc.faq.a1")}
              />
              <FAQItem
                question={t("headlessPoc.faq.q2")}
                answer={t("headlessPoc.faq.a2")}
              />
              <FAQItem
                question={t("headlessPoc.faq.q3")}
                answer={t("headlessPoc.faq.a3")}
              />
              <FAQItem
                question={t("headlessPoc.faq.q4")}
                answer={t("headlessPoc.faq.a4")}
              />
            </motion.div>

            {/* CTA finale */}
            <motion.div
              custom={1}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300 shadow-lg shadow-slate-950/60"
            >
              <h3 className="text-lg font-semibold text-slate-50">
                {t("headlessPoc.cta.title")}
              </h3>
              <p>{t("headlessPoc.cta.body")}</p>

              <div className="mt-3 flex flex-col gap-3">
                <Button
                  asChild
                  className="cursor-pointer bg-brand-orange text-slate-950 shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90"
                >
                  <Link href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    {t("headlessPoc.cta.primaryCta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="cursor-pointer justify-start px-0 text-slate-300 hover:text-brand-blue"
                >
                  <Link href="/servizi">
                    {t("headlessPoc.cta.secondaryCta")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --- SUB COMPONENTS --- */

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "orange";
}) {
  const color = tone === "green" ? "text-brand-green" : "text-brand-orange";

  return (
    <div className="rounded-xl bg-slate-900/80 px-4 py-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className={`mt-1 text-base font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function MiniHighlight({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-900/80 px-4 py-3">
      <Icon className="mt-1 h-4 w-4 text-brand-blue" />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-xs text-slate-200">{value}</p>
      </div>
    </div>
  );
}

function BulletPill({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
      <p className="mb-1 text-sm font-semibold text-slate-50">{title}</p>
      <p>{children}</p>
    </div>
  );
}

function TimelineStep({
  index,
  stepLabel,
  title,
  body,
}: {
  index: number;
  stepLabel: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300 shadow-sm shadow-slate-950/40"
    >
      <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue/20 text-[11px] font-semibold text-brand-blue">
          {index}
        </span>
        {stepLabel}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-slate-50">{title}</h3>
      <p>{body}</p>
    </motion.div>
  );
}

function ArchitectureBox({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${
            accent ?? "from-slate-500 to-slate-400"
          }`}
        />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </span>
      </div>
      <p>{children}</p>
    </div>
  );
}

function UseCaseCard({
  title,
  body,
  points,
}: {
  title: string;
  body: string;
  points: string[];
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs text-slate-300 shadow-sm shadow-slate-950/40"
    >
      <h3 className="mb-2 text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mb-3 text-xs text-slate-300">{body}</p>
      <ul className="mt-auto space-y-1.5">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-xs text-slate-300">
      <p className="text-sm font-semibold text-slate-50">{question}</p>
      <p className="mt-2">{answer}</p>
    </div>
  );
}
