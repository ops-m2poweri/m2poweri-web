"use client";

import "@/i18n/i18n";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "info@m2poweri.com";
const CONTACT_PHONE_DISPLAY = "+44 303 003 2064";
const CONTACT_PHONE_TEL = "+443030032064";

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

export default function ContactPage() {
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState(false);
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessKey(null);
    setErrorKey(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 1) prendo il tipo selezionato nel form
    const rawType = (formData.get("type") as string) || "general";

    // 2) mappo i valori del select in quelli che si aspetta il backend / Prisma
    //    general   -> contact
    //    project   -> poc
    //    agency    -> newsletter (o scegli tu come meglio ha senso)
    const mappedType: "contact" | "poc" | "newsletter" =
      rawType === "project"
        ? "poc"
        : rawType === "agency"
        ? "newsletter"
        : "contact";

    const payload = {
      name: formData.get("name") as string,
      company: (formData.get("company") as string) || undefined,
      email: formData.get("email") as string,
      type: mappedType,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leads`, // 👈 nuovo endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      if (data?.ok) {
        setSuccessKey("contact.form.success");
        form.reset();
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.error(err);
      setErrorKey("contact.form.error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      <section className="border-b border-slate-800/60">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          {/* sfondo leggero a griglia */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(148,163,184,0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:26px_26px]" />

          <motion.div
            custom={0}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            className="relative mb-10 space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-slate-900/80 px-3 py-1 text-xs font-medium text-brand-blue shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              {t("contact.hero.badge")}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t("contact.hero.title")}
            </h1>

            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              {t("contact.hero.subtitle")}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
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
                  {t("contact.hero.primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="border-brand-blue/40 bg-slate-900/60 text-brand-blue hover:bg-slate-900 hover:text-slate-50"
                asChild
              >
                <Link href={`mailto:${CONTACT_EMAIL}`}>
                  {t("contact.hero.secondaryCta")}
                </Link>
              </Button>
            </div>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-[1.05fr,1fr]">
            {/* Colonna sinistra: info contatto */}
            <motion.div
              custom={1}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-300 shadow-lg shadow-slate-950/60"
            >
              <h2 className="text-lg font-semibold text-slate-50">
                {t("contact.info.title")}
              </h2>
              <p>{t("contact.info.description")}</p>

              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-brand-blue" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {t("contact.info.emailLabel")}
                    </p>
                    <Link
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="cursor-pointer text-sm text-slate-100 hover:text-brand-blue"
                    >
                      {CONTACT_EMAIL}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 text-brand-blue" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {t("contact.info.phoneLabel")}
                    </p>
                    <Link
                      href={`tel:${CONTACT_PHONE_TEL}`}
                      className="cursor-pointer text-sm text-slate-100 hover:text-brand-blue"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </Link>
                    <p className="mt-1 text-xs text-slate-400">
                      {t("contact.info.hoursValue")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-1 h-4 w-4 text-brand-blue" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {t("contact.info.companyLabel")}
                    </p>
                    <p className="text-sm text-slate-100">
                      {t("contact.info.companyValue")}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {t("contact.info.legalNote")}
              </p>
            </motion.div>

            {/* Colonna destra: form */}
            <motion.div
              custom={2}
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-300 shadow-lg shadow-slate-950/60"
            >
              <h2 className="text-lg font-semibold text-slate-50">
                {t("contact.form.title")}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {t("contact.form.subtitle")}
              </p>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-200">
                      {t("contact.form.fieldName")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/60"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-200">
                      {t("contact.form.fieldCompany")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/60"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-200">
                    {t("contact.form.fieldEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/60"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-200">
                    {t("contact.form.fieldType")}
                  </label>
                  <select
                    name="type"
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/60"
                  >
                    <option value="contact">
                      {t("contact.form.fieldTypeOptionGeneral")}
                    </option>
                    <option value="poc">
                      {t("contact.form.fieldTypeOptionProject")}
                    </option>
                    <option value="newsletter">
                      {t("contact.form.fieldTypeOptionAgency")}
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-200">
                    {t("contact.form.fieldMessage")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/60"
                    required
                  />
                </div>
                <p className="pt-1 text-[11px] text-slate-500">
                  {t("contact.form.disclaimer")}
                </p>
                {successKey && (
                  <p className="text-[11px] text-brand-green">
                    {t(successKey)}
                  </p>
                )}
                {errorKey && (
                  <p className="text-[11px] text-brand-orange">{t(errorKey)}</p>
                )}
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer bg-brand-orange text-slate-950 shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90 disabled:opacity-60"
                  >
                    {loading
                      ? t("contact.form.submitting")
                      : t("contact.form.submit")}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="cursor-pointer justify-start px-0 text-xs text-slate-400 hover:text-brand-blue"
                  >
                    <Link
                      href={
                        process.env.CALENDLY_URL ||
                        "https://calendly.com/m2poweri25/30min"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("contact.form.altCalendly")}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
