"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Loader2, RefreshCw } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type LeadType = "contact" | "poc" | "newsletter";
type LeadStatus = "new" | "in_progress" | "closed";

type Lead = {
  id: number;
  name: string;
  email: string;
  type: LeadType;
  company?: string | null;
  message?: string | null;
  createdAt: string;
  status?: LeadStatus | null;
};

type Props = {
  initialLeads: Lead[];
};

const leadTypeLabel: Record<LeadType, string> = {
  contact: "Contatto",
  poc: "PoC",
  newsletter: "Newsletter",
};

const leadStatusLabel: Record<LeadStatus, string> = {
  new: "New",
  in_progress: "WiP",
  closed: "Closed",
};

function statusColor(status: LeadStatus | undefined | null) {
  switch (status) {
    case "in_progress":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "closed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "new":
    default:
      return "bg-sky-100 text-sky-800 border-sky-200";
  }
}

export function LeadsDashboard({ initialLeads }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [typeFilter, setTypeFilter] = useState<"all" | LeadType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (typeFilter !== "all" && lead.type !== typeFilter) return false;
      if (statusFilter !== "all" && (lead.status ?? "new") !== statusFilter)
        return false;

      if (!search.trim()) return true;

      const term = search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        (lead.company ?? "").toLowerCase().includes(term) ||
        (lead.message ?? "").toLowerCase().includes(term)
      );
    });
  }, [leads, typeFilter, statusFilter, search]);

  async function refreshLeads() {
    try {
      setRefreshing(true);

      const res = await fetch(`${API_BASE_URL}/leads`, {
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error refreshing leads:", res.status, text);
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const data = (await res.json()) as Lead[];
      setLeads(data);
    } catch (err) {
      console.error("refreshLeads error:", err);
      alert("Errore durante il refresh dei lead.");
    } finally {
      setRefreshing(false);
    }
  }

  async function updateLeadStatus(id: number, status: LeadStatus) {
    try {
      setUpdatingId(String(id));

      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error response:", res.status, text);
        throw new Error(`Error ${res.status}: ${text}`);
      }

      const updated = (await res.json()) as Lead;

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, ...updated } : lead))
      );
    } catch (err) {
      console.error("updateLeadStatus error:", err);
      alert("Si è verificato un errore durante l'aggiornamento dello stato.");
    } finally {
      setUpdatingId(null);
    }
  }

  function openMail(email: string) {
    window.location.href = `mailto:${email}`;
  }

  return (
    <div className="space-y-4">
      {/* FILTRI + REFRESH */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
          <Input
            placeholder="Cerca per nome, email, azienda o testo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-xs"
          />

          <div className="flex gap-2 md:ml-4">
            <Select
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as "all" | LeadType)
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="contact">Contatto</SelectItem>
                <SelectItem value="poc">PoC</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as "all" | LeadStatus)
              }
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="new">Nuovi</SelectItem>
                <SelectItem value="in_progress">In lavorazione</SelectItem>
                <SelectItem value="closed">Chiusi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>
            Mostrati{" "}
            <span className="font-semibold text-slate-100">
              {filteredLeads.length}
            </span>{" "}
            lead su {leads.length}
          </span>

          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={refreshing}
            onClick={refreshLeads}
            className="border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
          >
            {refreshing ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Refresh…
              </>
            ) : (
              <>
                <RefreshCw className="mr-1 h-3 w-3" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>

      {/* TABELLA */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-900">
            <tr className="border-b border-slate-800">
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Data
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Tipo
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Stato
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Nome / Email
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Azienda
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">
                Messaggio
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-slate-400">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  Nessun lead trovato con i filtri correnti.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const status = (lead.status ?? "new") as LeadStatus;
                return (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-800/70 align-top hover:bg-slate-900/60"
                  >
                    <td className="px-3 py-2 text-xs text-slate-400">
                      {new Date(lead.createdAt).toLocaleString("it-IT")}
                    </td>

                    <td className="px-3 py-2">
                      <Badge
                        variant="outline"
                        className="border-slate-600 bg-slate-900/60 text-slate-100"
                      >
                        {leadTypeLabel[lead.type]}
                      </Badge>
                    </td>

                    <td className="px-3 py-2">
                      <Badge variant="outline" className={statusColor(status)}>
                        {leadStatusLabel[status]}
                      </Badge>
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-50">
                          {lead.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => openMail(lead.email)}
                          className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline"
                        >
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </button>
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <span className="text-sm text-slate-200">
                        {lead.company || (
                          <span className="text-slate-500">—</span>
                        )}
                      </span>
                    </td>

                    <td className="max-w-xs px-3 py-2">
                      <p className="line-clamp-4 whitespace-pre-wrap text-xs text-slate-200">
                        {lead.message || (
                          <span className="text-slate-500">—</span>
                        )}
                      </p>
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex justify-end gap-2">
                        {status !== "in_progress" && status !== "closed" && (
                          <Button
                            size="xs"
                            variant="outline"
                            disabled={updatingId === String(lead.id)}
                            onClick={() =>
                              updateLeadStatus(lead.id, "in_progress")
                            }
                            className="border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
                          >
                            {updatingId === String(lead.id) ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "In lavorazione"
                            )}
                          </Button>
                        )}
                        {status !== "closed" && (
                          <Button
                            size="xs"
                            variant="outline"
                            disabled={updatingId === String(lead.id)}
                            onClick={() => updateLeadStatus(lead.id, "closed")}
                            className="border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
                          >
                            {updatingId === String(lead.id) ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "Chiudi"
                            )}
                          </Button>
                        )}
                        {status === "closed" && (
                          <Button
                            size="xs"
                            variant="ghost"
                            disabled={updatingId === String(lead.id)}
                            onClick={() => updateLeadStatus(lead.id, "new")}
                            className="text-slate-300 hover:bg-slate-800"
                          >
                            {updatingId === String(lead.id) ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "Riapri"
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
