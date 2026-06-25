"use client";

import { motion } from "framer-motion";
import { FileText, Download, BarChart3, TrendingUp, Users, Wallet, ArrowLeftRight, GitBranch, CheckCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const reports = [
  {
    title: "Monthly Revenue Report",
    description: "Full revenue breakdown, fees, and P&L for June 2026",
    icon: TrendingUp,
    color: "from-[#FBD12D]/20 to-[#FBD12D]/5 border-[#FBD12D]/20",
    iconColor: "text-[#FBD12D] bg-[#FBD12D]/10",
    formats: ["CSV", "Excel", "PDF"],
    size: "4.2 MB",
    generated: "Jun 25, 2026",
    status: "ready",
  },
  {
    title: "User Growth Analytics",
    description: "Registration trends, KYC completion rates, and user segments",
    icon: Users,
    color: "from-success/20 to-success/5 border-success/20",
    iconColor: "text-success bg-success/10",
    formats: ["CSV", "Excel", "PDF"],
    size: "2.8 MB",
    generated: "Jun 25, 2026",
    status: "ready",
  },
  {
    title: "Transaction Audit Report",
    description: "Complete transaction log with flags, risk scores and blockchain refs",
    icon: ArrowLeftRight,
    color: "from-[#6366F1]/20 to-[#6366F1]/5 border-[#6366F1]/20",
    iconColor: "text-[#6366F1] bg-[#6366F1]/10",
    formats: ["CSV", "Excel"],
    size: "18.4 MB",
    generated: "Jun 25, 2026",
    status: "ready",
  },
  {
    title: "Wallet Balance Snapshot",
    description: "All wallet balances, network distribution and risk breakdown",
    icon: Wallet,
    color: "from-warning/20 to-warning/5 border-warning/20",
    iconColor: "text-warning bg-warning/10",
    formats: ["CSV", "Excel", "PDF"],
    size: "1.6 MB",
    generated: "Jun 24, 2026",
    status: "ready",
  },
  {
    title: "Referral Performance Report",
    description: "Referrer tiers, conversion rates, and reward distribution",
    icon: GitBranch,
    color: "from-[#EC4899]/20 to-[#EC4899]/5 border-[#EC4899]/20",
    iconColor: "text-[#EC4899] bg-[#EC4899]/10",
    formats: ["CSV", "PDF"],
    size: "0.9 MB",
    generated: "Jun 24, 2026",
    status: "ready",
  },
  {
    title: "Compliance & KYC Summary",
    description: "KYC approval rates, rejected documents, and risk flags",
    icon: CheckCircle,
    color: "from-[#FBD12D]/20 to-[#FBD12D]/5 border-[#FBD12D]/20",
    iconColor: "text-[#FBD12D] bg-[#FBD12D]/10",
    formats: ["PDF"],
    size: "2.1 MB",
    generated: "Processing...",
    status: "processing",
  },
];

const formatColors: Record<string, string> = {
  CSV: "text-success bg-success/10 border-success/20",
  Excel: "text-[#1D6F42] bg-[#1D6F42]/10 border-[#1D6F42]/20",
  PDF: "text-danger bg-danger/10 border-danger/20",
};

const quickStats = [
  { label: "Reports Generated", value: "1,284", icon: FileText },
  { label: "Data Exported", value: "48.2 GB", icon: Download },
  { label: "Scheduled Reports", value: "12", icon: RefreshCw },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Reports</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">Export and analyze platform data</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FBD12D] to-[#FBD12D] text-black text-sm font-semibold shadow-gold-sm flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New Report
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} whileHover={{ y: -2 }} className="card p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBD12D]/10 border border-[#FBD12D]/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#FBD12D]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
                <p className="text-xs text-[var(--muted)]">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((report, i) => {
          const Icon = report.icon;
          return (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className={cn("card p-6 bg-gradient-to-br border relative overflow-hidden", report.color)}
            >
              {report.status === "processing" && (
                <div className="absolute top-3 right-3">
                  <RefreshCw className="w-3.5 h-3.5 text-[var(--muted)] animate-spin" />
                </div>
              )}

              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", report.iconColor)}>
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-sm font-bold text-[var(--foreground)] mb-1.5">{report.title}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{report.description}</p>

              <div className="flex items-center gap-1.5 mb-4">
                {report.formats.map((fmt) => (
                  <span key={fmt} className={cn("badge border text-[10px]", formatColors[fmt])}>{fmt}</span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[var(--muted)] mb-4">
                <span>{report.generated}</span>
                <span>{report.size}</span>
              </div>

              {report.status === "ready" ? (
                <div className="grid grid-cols-3 gap-2">
                  {report.formats.map((fmt) => (
                    <motion.button
                      key={fmt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn("flex items-center justify-center gap-1.5 py-2 rounded-xl border text-[11px] font-semibold transition-all hover:opacity-80", formatColors[fmt])}
                    >
                      <Download className="w-3 h-3" />
                      {fmt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] justify-center">
                  <RefreshCw className="w-3.5 h-3.5 text-[var(--muted)] animate-spin" />
                  <span className="text-xs text-[var(--muted)]">Generating...</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Scheduled Reports */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Scheduled Reports</h3>
        <div className="space-y-3">
          {[
            { name: "Daily Transaction Summary", schedule: "Every day at 00:00 UTC", next: "Jun 26, 2026", format: "CSV" },
            { name: "Weekly Revenue Report", schedule: "Every Monday at 06:00 UTC", next: "Jun 30, 2026", format: "PDF" },
            { name: "Monthly Compliance Report", schedule: "1st of each month", next: "Jul 1, 2026", format: "PDF" },
          ].map((sched) => (
            <div key={sched.name} className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] hover:border-[#FBD12D]/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FBD12D]/10 flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5 text-[#FBD12D]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--foreground)]">{sched.name}</p>
                <p className="text-xs text-[var(--muted)]">{sched.schedule}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--muted)]">Next: {sched.next}</p>
                <span className={cn("badge border text-[10px] mt-1", formatColors[sched.format])}>{sched.format}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
