"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  // 🔁 METTI QUI IL TUO NUMERO
  // - phoneDisplay => quello che vedi nell'interfaccia
  // - whatsappHref => deve essere in formato internazionale, senza "+" e senza spazi
  const phoneDisplay = "+44 7463 873277";
  const whatsappHref = "https://wa.me/+447463873277";

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatta con noi su WhatsApp"
      className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6"
    >
      <div className="group flex items-center gap-3">
        {/* label che appare solo su desktop */}
        <span className="hidden rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-100 shadow-lg backdrop-blur md:inline group-hover:bg-slate-950">
          Chatta con noi
        </span>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-xl ring-2 ring-emerald-300/60 transition-all hover:scale-105 hover:bg-emerald-400">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
      </div>
    </a>
  );
}
