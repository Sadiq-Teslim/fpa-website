"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useSubscribe } from "@/shared/hooks/use-subscribe";
import { cn } from "@/shared/lib/utils";

interface NewsletterFormProps {
  source?: string;
  className?: string;
  layout?: "inline" | "stacked";
}

export function NewsletterForm({
  source = "footer",
  className,
  layout = "inline",
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("");
  const { subscribe, status, message, reset } = useSubscribe({ source });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await subscribe(email);
    if (status !== "error") {
      setEmail("");
    }
  }

  // Auto-reset after success/already messages
  React.useEffect(() => {
    if (status === "success" || status === "already") {
      const timer = setTimeout(reset, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, reset]);

  const isLoading = status === "loading";
  const isDone = status === "success" || status === "already";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex gap-3 w-full",
          layout === "stacked" ? "flex-col" : "flex-col sm:flex-row",
          layout === "inline" && "max-w-md lg:w-auto",
        )}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") reset();
          }}
          disabled={isLoading}
          className="flex-1"
          required
        />
        <Button
          type="submit"
          disabled={isLoading || isDone}
          className="shrink-0 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : isDone ? (
            <>
              <Check className="w-4 h-4" />
              Subscribed
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
      {message && (
        <p
          className={cn(
            "mt-2 text-sm",
            status === "error" ? "text-red-400" : "text-teal-400",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
