// src/components/sections/home-cta-band.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeCtaBand() {
  const { t } = useTranslation("common");

  return (
    <section className="bg-gradient-to-r from-brand-blue via-brand-mauve to-brand-orange">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start gap-4 text-white md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">
              {t("home.cta.eyebrow")}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {t("home.cta.description")}
            </p>
          </div>

          <Button
            size="lg"
            className="mt-2 bg-black/80 text-white hover:bg-black"
          >
            {t("home.cta.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
