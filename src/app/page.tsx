// src/app/page.tsx
import { HomeClientsStrip } from "@/components/sections/home-clients-strip";
import { HomeCtaBand } from "@/components/sections/home-cta-band";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeHighlights } from "@/components/sections/home-highlights";
import { HomePocProcess } from "@/components/sections/home-poc-process";
import { HomeServices } from "@/components/sections/home-services";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeClientsStrip />
      <HomeServices />
      <HomePocProcess />
      <HomeHighlights />
      <HomeCtaBand />
    </>
  );
}
