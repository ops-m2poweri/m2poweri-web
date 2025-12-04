const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type LeadType = "contact" | "poc" | "newsletter";

export async function createLead(input: {
  name: string;
  email: string;
  type: LeadType;
  message?: string;
  company?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error("Failed to create lead", await res.text());
    throw new Error("Errore nella creazione del lead");
  }

  return res.json();
}
