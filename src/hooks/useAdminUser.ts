// src/hooks/useAdminUser.ts
"use client";

import { useEffect, useState } from "react";

export type AdminUser = {
  id: string;
  email: string;
  role?: string;
  name?: string;
  // aggiungi qui altri campi se il tuo /me li ritorna
};

type UseAdminUserResult = {
  adminUser: AdminUser | null;
  isAdmin: boolean;
  isAdminLoading: boolean;
  error: Error | null;
  refreshAdminUser: () => Promise<void>;
};

export function useAdminUser(): UseAdminUserResult {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdminUser = async () => {
    setIsAdminLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/me", {
        method: "GET",
        credentials: "include", // manda i cookie (JWT httpOnly lato BFF)
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401 || res.status === 403) {
        // non loggato o non autorizzato
        setAdminUser(null);
        return;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Failed to fetch admin user: ${res.status} ${res.statusText} ${text}`
        );
      }

      const data = (await res.json()) as AdminUser;
      setAdminUser(data);
    } catch (err) {
      console.error("Error fetching admin user", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setAdminUser(null);
    } finally {
      setIsAdminLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await fetchAdminUser();
    };

    init();

    return () => {
      // semplice guard nel caso servisse in futuro
      isMounted = false;
      void isMounted; // per evitare warning "isMounted is declared but..."
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    adminUser,
    isAdmin: !!adminUser,
    isAdminLoading,
    error,
    refreshAdminUser: fetchAdminUser,
  };
}
