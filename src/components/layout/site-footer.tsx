// src/components/layout/site-footer.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";

export function SiteFooter() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  // 🔁 SOSTITUISCI con il tuo numero reale
  const phoneDisplay = "+44 303 003 2064";
  const phoneHref = "tel:+443030032064"; // numero senza spazi
  const whatsappHref = "https://wa.me/+447463873277"; // stesso numero in formato internazionale

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Colonna 1: logo + descrizione */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/m2poweri-logo-esteso-bianco-schermi.png"
                alt={t("footer.logoAlt")}
                width={200}
                height={32}
              />
            </div>
            <p className="text-sm text-slate-400">{t("footer.description")}</p>
          </div>

          {/* Colonna 2: link principali */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {t("footer.menu")}
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/services" className="hover:text-brand-blue">
                {t("header.nav.services")}
              </Link>
              <Link href="/headless-poc" className="hover:text-brand-blue">
                {t("header.nav.poc")}
              </Link>
              <Link href="/web-agency" className="hover:text-brand-blue">
                {t("header.nav.agency")}
              </Link>
              <Link href="/contacts" className="hover:text-brand-blue">
                {t("header.nav.contacts")}
              </Link>
            </div>
          </div>

          {/* Colonna 3: contatti PRO */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {t("footer.contacts")}
            </h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>{t("footer.contactLine")}</p>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-blue" />
                <a
                  href="mailto:info@m2poweri.com"
                  className="hover:text-brand-blue"
                >
                  info@m2poweri.com
                </a>
              </div>

              {/* Telefono */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-blue" />
                <a href={phoneHref} className="hover:text-brand-blue">
                  {phoneDisplay}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                </span>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-emerald-300"
                >
                  {t("footer.whatsappLabel")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom strip */}
        <div className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500 md:flex md:items-center md:justify-between">
          <p>{t("footer.rights", { year })}</p>
          <p className="mt-2 md:mt-0">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
