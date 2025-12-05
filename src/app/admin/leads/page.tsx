// app/admin/leads/page.tsx
import { LeadsDashboard } from "@/components/admin/leads-dashboard";

async function fetchLeads() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Lead ricevuti</h1>
        <p className="mt-1 text-sm text-slate-400">
          Gestisci le richieste arrivate dai form sul sito: filtra, cerca e
          aggiorna lo stato.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <LeadsDashboard initialLeads={leads} />
      </div>
    </div>
  );
}
