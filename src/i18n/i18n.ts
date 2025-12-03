"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import itCommon from "./locales/it/common.json";
import enCommon from "./locales/en/common.json";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector) // legge lingua da browser / localStorage / query
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["it", "en"],
      defaultNS: "common",
      ns: ["common"],
      resources: {
        it: { common: itCommon },
        en: { common: enCommon },
      },
      interpolation: {
        escapeValue: false, // React già sanifica
      },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
