// src/components/common/book-call-button.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/m2poweri25/30min";

type Props = {
  label: string; // es. t("header.cta") o t("home.hero.primaryCta")
  className?: string;
};

export function BookCallButton({ label, className }: Props) {
  return (
    <Button asChild className={className}>
      <Link href={CALENDLY_URL} target="_blank" rel="noreferrer">
        {label}
      </Link>
    </Button>
  );
}
