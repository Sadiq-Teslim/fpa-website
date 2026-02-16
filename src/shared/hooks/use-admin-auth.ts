"use client";

import * as React from "react";
import { supabase } from "@/shared/lib/supabase";

const STORAGE_KEY = "fp_admin_auth";
const SESSION_DURATION = 4 * 60 * 60 * 1000; // 4 hours

interface AuthState {
  token: string;
  expiresAt: number;
}

function getStoredAuth(): AuthState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: AuthState = JSON.parse(raw);
    if (Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  // Check stored session on mount
  React.useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const verify = React.useCallback(async (password: string) => {
    setError("");
    setLoading(true);

    try {
      // Call the backend auth endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Incorrect password.");
        setLoading(false);
        return false;
      }

      // Store session
      const authState: AuthState = {
        token: data.token,
        expiresAt: Date.now() + SESSION_DURATION,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
      setAuthenticated(true);
      setLoading(false);
      return true;
    } catch {
      setError("Unable to connect. Is the backend running?");
      setLoading(false);
      return false;
    }
  }, []);

  const logout = React.useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
  }, []);

  return { authenticated, loading, error, verify, logout };
}
