// src/components/sections/service-detail.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ServiceKey = "b2c" | "poc" | "apps";

type ServiceDetailProps = {
  serviceKey: ServiceKey;
};

type ProcessStep = { title: string; description: string };
type FaqItem = { q: string; a: string };

export function ServiceDetail({ serviceKey }: ServiceDetailProps) {
  const { t } = useTranslation("common");
  const baseKey = `services.details.${serviceKey}`;

  const rawWhen = t(`${baseKey}.when`, { returnObjects: true }) as unknown;
  const rawDeliverables = t(`${baseKey}.deliverables`, {
    returnObjects: true,
  }) as unknown;
  const rawCaseResults = t(`${baseKey}.case.results`, {
    returnObjects: true,
  }) as unknown;
  const rawProcessSteps = t(`${baseKey}.process.steps`, {
    returnObjects: true,
  }) as unknown;
  const rawFaqs = t(`${baseKey}.faq.items`, {
    returnObjects: true,
  }) as unknown;

  const when = Array.isArray(rawWhen) ? (rawWhen as string[]) : [];
  const deliverables = Array.isArray(rawDeliverables)
    ? (rawDeliverables as string[])
    : [];
  const caseResults = Array.isArray(rawCaseResults)
    ? (rawCaseResults as string[])
    : [];
  const processSteps = Array.isArray(rawProcessSteps)
    ? (rawProcessSteps as ProcessStep[])
    : [];
  const faqs = Array.isArray(rawFaqs) ? (rawFaqs as FaqItem[]) : [];

  return (
    <main className="bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800/70 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            className="max-w-3xl space-y-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-blue">
              {t(`${baseKey}.hero.badge`)}
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t(`${baseKey}.hero.title`)}
            </h1>

            <p className="text-sm text-slate-300 sm:text-base">
              {t(`${baseKey}.hero.subtitle`)}
            </p>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  {t(`${baseKey}.hero.kpi1Label`)}
                </p>
                <p className="mt-1 text-2xl font-semibold text-brand-green">
                  {t(`${baseKey}.hero.kpi1Value`)}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {t(`${baseKey}.hero.kpi1Note`)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  {t(`${baseKey}.hero.kpi2Label`)}
                </p>
                <p className="mt-1 text-2xl font-semibold text-brand-orange">
                  {t(`${baseKey}.hero.kpi2Value`)}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {t(`${baseKey}.hero.kpi2Note`)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                asChild
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
                  {t(`${baseKey}.hero.primaryCta`)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-blue/40 bg-slate-900/60 text-brand-blue hover:bg-brand-blue/10 hover:text-slate-50"
              >
                <Link href="/contacts">
                  {t(`${baseKey}.hero.secondaryCta`)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHEN + DELIVERABLES */}
      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {t(`${baseKey}.whenTitle`)}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {when.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {t(`${baseKey}.deliverablesTitle`)}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-4 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-mauve">
              {t(`${baseKey}.case.label`)}
            </p>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {t(`${baseKey}.case.title`)}
            </h2>
            <p className="text-xs text-slate-400">
              {t(`${baseKey}.case.meta`)}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.3fr,1fr]">
            <div className="space-y-3 text-sm text-slate-300">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t(`${baseKey}.case.problemTitle`)}
              </h3>
              <p>{t(`${baseKey}.case.problem`)}</p>

              <h3 className="pt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t(`${baseKey}.case.solutionTitle`)}
              </h3>
              <p>{t(`${baseKey}.case.solution`)}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t(`${baseKey}.case.resultsTitle`)}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {caseResults.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="border-b border-slate-800/70 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            {t(`${baseKey}.process.title`)}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {t(`${baseKey}.process.subtitle`)}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {t(`${baseKey}.process.stepLabel`, { index: index + 1 })}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-12 md:flex md:items-start md:justify-between md:gap-10 md:px-6 md:py-16">
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {t(`${baseKey}.faq.title`)}
            </h2>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="font-medium text-slate-100">{item.q}</p>
                  <p className="mt-1 text-xs text-slate-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:w-1/3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
              <h3 className="text-base font-semibold">
                {t(`${baseKey}.cta.title`)}
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                {t(`${baseKey}.cta.subtitle`)}
              </p>
              <Button className="cursor-pointer mt-4 w-full bg-brand-orange text-slate-950 shadow-lg shadow-brand-orange/40 hover:bg-brand-orange/90">
                {t(`${baseKey}.cta.button`)}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
