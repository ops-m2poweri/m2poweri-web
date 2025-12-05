// app/admin/page.tsx
export default function AdminHomePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Panoramica veloce su leads e attività interne.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Leads oggi
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">–</p>
          <p className="mt-1 text-xs text-slate-500">
            Collega più avanti alle metriche reali.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Conversioni
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">–</p>
          <p className="mt-1 text-xs text-slate-500">
            Spazio per KPI (CVR, tempo risposta, ecc.).
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Note interne
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Usa questo spazio per reminder o to-do (“richiamare lead X”, ecc.).
          </p>
        </div>
      </div>
    </div>
  );
}
