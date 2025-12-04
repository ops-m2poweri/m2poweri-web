// src/components/layout/site-header.tsx
"use client";

import "@/i18n/i18n";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HamburgerBlob } from "../ui/hamburgher-blob";
import { BookCallButton } from "../common/book-call-button";

const navItems = [
  { href: "/services", key: "header.nav.services" },
  { href: "/headless-poc", key: "header.nav.poc" },
  { href: "/web-agency", key: "header.nav.agency" },
  { href: "/contacts", key: "header.nav.contacts" },
];

export function SiteHeader() {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <motion.header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      animate={
        scrolled
          ? {
              backgroundColor: "rgba(15,23,42,0.96)",
              boxShadow: "0 16px 45px rgba(15,23,42,0.55)",
              borderColor: "rgba(51,65,85,0.9)",
            }
          : {
              backgroundColor: "rgba(15,23,42,0.75)",
              boxShadow: "0 10px 30px rgba(15,23,42,0.45)",
              borderColor: "rgba(51,65,85,0.4)",
            }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <motion.div
          whileHover={!prefersReducedMotion ? { y: -1 } : undefined}
          className="flex items-center cursor-pointer"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/m2poweri-logo-esteso-azzurro_bianco-schermi.png"
                alt={t("header.logoAlt")}
                width={200}
                height={32}
                priority
                className="origin-left scale-110 md:scale-125 drop-shadow-[0_0_18px_rgba(0,202,255,0.25)]"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <motion.div
              key={item.key}
              whileHover={
                !prefersReducedMotion ? { y: -1, opacity: 1 } : undefined
              }
              className="group relative cursor-pointer"
            >
              <Link
                href={item.href}
                className="text-slate-200 transition-colors group-hover:text-brand-blue"
              >
                {t(item.key)}
              </Link>
              {!prefersReducedMotion && (
                <motion.span
                  className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-brand-blue via-brand-mauve to-brand-orange opacity-0"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
            </motion.div>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <motion.div
            className="cursor-pointer"
            whileHover={
              !prefersReducedMotion ? { y: -1, scale: 1.01 } : undefined
            }
            whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
          >
            <BookCallButton
              label={t("header.cta")}
              className="cursor-pointer bg-brand-orange text-slate-950 shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90"
            />
          </motion.div>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-100 md:hidden cursor-pointer"
          onClick={toggle}
          aria-label="Toggle navigation"
          whileTap={!prefersReducedMotion ? { scale: 0.9 } : undefined}
        >
          <HamburgerBlob open={open} reducedMotion={!!prefersReducedMotion} />
        </motion.button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-slate-700/70 bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: 0.03 * index,
                  }}
                  whileHover={!prefersReducedMotion ? { x: 4 } : undefined}
                  className="cursor-pointer"
                >
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between py-2 text-sm font-medium text-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    <span className="transition-colors group-hover:text-brand-blue">
                      {t(item.key)}
                    </span>
                    {/* barra gradient che appare in hover */}
                    <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-brand-blue via-brand-mauve to-brand-orange opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: 0.03 * navItems.length }}
                className="cursor-pointer"
                whileHover={
                  !prefersReducedMotion ? { y: -1, scale: 1.01 } : undefined
                }
                whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
              >
                <BookCallButton
                  label={t("header.cta")}
                  className="mt-2 w-full cursor-pointer bg-brand-orange text-slate-950 shadow-md shadow-brand-orange/40 hover:bg-brand-orange/90"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
