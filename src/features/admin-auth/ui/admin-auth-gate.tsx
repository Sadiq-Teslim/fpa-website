"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useAdminAuth } from "@/shared/hooks/use-admin-auth";
import { fadeInUp } from "@/shared/lib/animations";

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const { authenticated, loading, error, verify } = useAdminAuth();
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setVerifying(true);
    await verify(password);
    setVerifying(false);
  }

  // Initial loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>
    );
  }

  // Authenticated — render children
  if (authenticated) {
    return <>{children}</>;
  }

  // Password modal
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-8 backdrop-blur-xl shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-teal-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm">
              Enter the admin password to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
                disabled={verifying}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={verifying || !password.trim()}
              className="w-full gap-2"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Unlock"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
