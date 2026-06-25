"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, AlertTriangle, CheckCircle, Info, Shield, Activity } from "lucide-react";
import { systemLogs } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const severityConfig = {
  info: { color: "text-[#FBD12D] bg-[#FBD12D]/10 border-[#FBD12D]/20", dotColor: "bg-[#FBD12D]", label: "INFO" },
  warning: { color: "text-warning bg-warning/10 border-warning/20", dotColor: "bg-warning", label: "WARN" },
  danger: { color: "text-danger bg-danger/10 border-danger/20", dotColor: "bg-danger", label: "ERROR" },
  success: { color: "text-success bg-success/10 border-success/20", dotColor: "bg-success", label: "SUCCESS" },
};

const categoryColors: Record<string, string> = {
  AUTH: "text-[#6366F1] bg-[#6366F1]/10",
  TRANSACTION: "text-[#FBD12D] bg-[#FBD12D]/10",
  SECURITY: "text-danger bg-danger/10",
  KYC: "text-success bg-success/10",
  WALLET: "text-[#EC4899] bg-[#EC4899]/10",
  SYSTEM: "text-[var(--muted)] bg-[var(--border)]",
  API: "text-warning bg-warning/10",
  REPORT: "text-[#FBD12D] bg-[#FBD12D]/10",
  FRAUD: "text-danger bg-danger/10",
};

export default function SystemLogsPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = systemLogs.filter((log) => {
    const matchSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.category.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase());
    const matchSev = severity === "all" || log.severity === severity;
    const matchCat = category === "all" || log.category === category;
    return matchSearch && matchSev && matchCat;
  });

  const categories = Array.from(new Set(systemLogs.map((l) => l.category)));

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">System Logs</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">Real-time platform activity and audit trail</p>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-semibold border border-success/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Live Feed
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: "48,291", color: "text-[#FBD12D] bg-[#FBD12D]/10", icon: Activity },
          { label: "Errors Today", value: "12", color: "text-danger bg-danger/10", icon: AlertTriangle },
          { label: "Warnings", value: "84", color: "text-warning bg-warning/10", icon: AlertTriangle },
          { label: "Security Events", value: "3", color: "text-danger bg-danger/10", icon: Shield },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} whileHover={{ y: -2 }} className="card p-5">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)]">
          <Search className="w-4 h-4 text-[var(--muted)] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="flex-1 bg-transparent text-sm outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
          />
          {search && <button onClick={() => setSearch("")}><X className="w-3.5 h-3.5 text-[var(--muted)]" /></button>}
        </div>
        <div className="flex items-center gap-2">
          {["all", "info", "success", "warning", "danger"].map((s) => (
            <motion.button key={s} whileTap={{ scale: 0.96 }} onClick={() => setSeverity(s)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border",
                severity === s ? "bg-[#FBD12D] text-black border-[#FBD12D]" : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--background)]")}>
              {s}
            </motion.button>
          ))}
        </div>
        <span className="text-xs text-[var(--muted)] ml-auto">{filtered.length} entries</span>
      </div>

      {/* Log Timeline */}
      <div className="card overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((log, i) => {
            const cfg = severityConfig[log.severity as keyof typeof severityConfig];
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ backgroundColor: "rgba(251,209,45,0.02)" }}
                className="flex items-start gap-4 px-5 py-4 transition-colors cursor-default"
              >
                {/* Severity indicator */}
                <div className="flex flex-col items-center gap-1 shrink-0 w-16">
                  <span className={cn("badge border text-[10px] w-full text-center justify-center", cfg.color)}>
                    {cfg.label}
                  </span>
                  <span className="text-[10px] text-[var(--muted)] font-mono">{log.time}</span>
                </div>

                {/* Category */}
                <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold shrink-0 mt-0.5", categoryColors[log.category] || "text-[var(--muted)] bg-[var(--border)]")}>
                  {log.category}
                </span>

                {/* Message */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--foreground)]">{log.message}</p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">{log.user} · {log.id}</p>
                </div>

                {/* Dot */}
                <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 shadow-sm", cfg.dotColor)} />
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--border)] flex items-center justify-center">
              <Search className="w-6 h-6 text-[var(--muted)]" />
            </div>
            <p className="text-sm text-[var(--muted)]">No logs match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
