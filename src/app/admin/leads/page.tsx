// app/admin/leads/page.tsx
import { LeadsDashboard } from "@/components/admin/leads-dashboard";
import { getLeads } from "@/lib/api";

async function fetchLeads() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

  const res = await fetch(`${baseUrl}/leads`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Errore nel recupero dei lead");
  }

  return res.json();
}

export default async function AdminLeadsPage() {
  const leads = await fetchLeads();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="mb-2 text-2xl font-semibold">Lead ricevuti</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Gestisci le richieste arrivate dai form sul sito: filtra, cerca e
        aggiorna lo stato.
      </p>
      <LeadsDashboard initialLeads={leads} />
    </div>
  );
}
