"use client";

import "@/i18n/i18n";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Handshake, Rocket, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function WebAgencyPage() {
  const { t } = useTranslation("common");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800/60 relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]
          [background-image:linear-gradient(to_right,rgba(148,163,184,0.28)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)]
          [background-size:26px_26px]"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-slate-900/70 px-3 py-1 text-xs font-medium text-brand-blue backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              {t("webAgency.hero.badge")}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              {t("webAgency.hero.title")}{" "}
              <span className="text-brand-blue">
                {t("webAgency.hero.highlight")}
              </span>
              .
            </h1>

            <p className="max-w-2xl text-slate-300 text-sm sm:text-base">
              {t("webAgency.hero.body")}
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <Button
                asChild
                size="lg"
                className="bg-brand-orange text-slate-950 hover:bg-brand-orange/90 shadow-lg shadow-brand-orange/40"
              >
                <Link
                  href={
                    process.env.CALENDLY_URL ||
                    "https://calendly.com/m2poweri25/30min"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("webAgency.hero.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-brand-blue/40 bg-slate-900/60 text-brand-blue hover:bg-slate-900 hover:text-slate-50"
                asChild
              >
                <Link href="/contacts">
                  {t("webAgency.hero.secondaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFIT */}
      <section className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="space-y-4 mb-10"
          >
            <h2 className="text-2xl font-semibold">
              {t("webAgency.benefits.title")}
            </h2>
            <p className="max-w-2xl text-slate-300 text-sm">
              {t("webAgency.benefits.intro")}
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              icon={Handshake}
              title={t("webAgency.benefits.whiteLabel.title")}
              body={t("webAgency.benefits.whiteLabel.body")}
            />
            <BenefitCard
              icon={Lightbulb}
              title={t("webAgency.benefits.presales.title")}
              body={t("webAgency.benefits.presales.body")}
            />
            <BenefitCard
              icon={Rocket}
              title={t("webAgency.benefits.modernProjects.title")}
              body={t("webAgency.benefits.modernProjects.body")}
            />
          </div>
        </div>
      </section>

      {/* SERVIZI RIVENDIBILI */}
      <section className="border-b border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
            className="space-y-4 mb-10"
          >
            <h2 className="text-2xl font-semibold">
              {t("webAgency.services.title")}
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title={t("webAgency.services.service1.title")}
              body={t("webAgency.services.service1.body")}
            />
            <ServiceCard
              title={t("webAgency.services.service2.title")}
              body={t("webAgency.services.service2.body")}
            />
            <ServiceCard
              title={t("webAgency.services.service3.title")}
              body={t("webAgency.services.service3.body")}
            />
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-8 text-center shadow-lg shadow-slate-950/40"
          >
            <h3 className="text-2xl font-semibold mb-3">
              {t("webAgency.cta.title")}
            </h3>

            <p className="max-w-xl mx-auto text-slate-300 text-sm mb-6">
              {t("webAgency.cta.body")}
            </p>

            <Button
              asChild
              size="lg"
              className="bg-brand-orange text-slate-950 hover:bg-brand-orange/90 shadow-md shadow-brand-orange/40"
            >
              <Link
                href={
                  process.env.CALENDLY_URL ||
                  "https://calendly.com/m2poweri25/30min"
                }
                target="_blank"
                rel="noreferrer"
              >
                {t("webAgency.cta.primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------- */
/* SUB-COMPONENTS              */
/* --------------------------- */

function BenefitCard({
  icon: Icon,
  title,
  body,
}: {
  icon: any;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm text-xs text-slate-300"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-brand-blue" />
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      </div>
      <p>{body}</p>
    </motion.div>
  );
}

function ServiceCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm text-xs text-slate-300"
    >
      <h3 className="text-sm font-semibold text-slate-50 mb-2">{title}</h3>
      <p>{body}</p>
    </motion.div>
  );
}
