"use client";

import * as React from "react";
import { supabase } from "@/shared/lib/supabase";

interface UseSubscribeOptions {
  source?: string;
}

interface UseSubscribeReturn {
  subscribe: (email: string) => Promise<void>;
  status: "idle" | "loading" | "success" | "already" | "error";
  message: string;
  reset: () => void;
}

export function useSubscribe(
  options: UseSubscribeOptions = {},
): UseSubscribeReturn {
  const { source = "footer" } = options;
  const [status, setStatus] =
    React.useState<UseSubscribeReturn["status"]>("idle");
  const [message, setMessage] = React.useState("");

  const subscribe = React.useCallback(
    async (email: string) => {
      const trimmed = email.trim().toLowerCase();
      if (!trimmed) {
        setStatus("error");
        setMessage("Please enter your email address.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setStatus("error");
        setMessage("Please enter a valid email address.");
        return;
      }

      setStatus("loading");
      setMessage("");

      try {
        // Try insert directly into Supabase (anon key has INSERT permission via RLS)
        const { error } = await supabase
          .from("subscribers")
          .insert({ email: trimmed, source });

        if (error) {
          // Unique constraint violation = already subscribed
          if (error.code === "23505") {
            setStatus("already");
            setMessage("You're already subscribed!");
            return;
          }
          throw error;
        }

        setStatus("success");
        setMessage("Successfully subscribed! 🎉");
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
        console.error("Subscribe error:", err);
      }
    },
    [source],
  );

  const reset = React.useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { subscribe, status, message, reset };
}
