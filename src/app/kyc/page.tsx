"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, XCircle, RefreshCw, Eye, Shield, FileText,
  Camera, Clock, AlertTriangle, X, ChevronRight, Globe, User,
  Search, Filter
} from "lucide-react";
import { kycRequests } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";

const tabItems = [
  { label: "Pending", count: 4, color: "text-warning" },
  { label: "Approved", count: 98421, color: "text-success" },
  { label: "Rejected", count: 1247, color: "text-danger" },
];

export default function KYCPage() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selected, setSelected] = useState<typeof kycRequests[0] | null>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">KYC Verification</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">Review and process identity verification requests</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/10 border border-warning/20">
          <Clock className="w-4 h-4 text-warning" />
          <span className="text-sm font-semibold text-warning">{kycRequests.length} awaiting review</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pending Review", value: "2,847", icon: Clock, color: "text-warning bg-warning/10", border: "border-warning/20" },
          { label: "Approved Today", value: "184", icon: CheckCircle, color: "text-success bg-success/10", border: "border-success/20" },
          { label: "Rejected Today", value: "23", icon: XCircle, color: "text-danger bg-danger/10", border: "border-danger/20" },
          { label: "Avg. Review Time", value: "4.2h", icon: Shield, color: "text-[#FBD12D] bg-[#FBD12D]/10", border: "border-[#FBD12D]/20" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              whileHover={{ y: -2 }}
              className={cn("card p-5 border", s.border)}
            >
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-xs text-[var(--muted)] mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Queue */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="card p-1 flex gap-1">
            {tabItems.map((tab) => (
              <motion.button
                key={tab.label}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.label)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5",
                  activeTab === tab.label
                    ? "bg-[#FBD12D] text-black shadow-gold-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {tab.label}
                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-bold", activeTab === tab.label ? "bg-black/20 text-black" : tab.color + " bg-current/10")}>
                  {tab.count > 999 ? `${Math.round(tab.count / 1000)}K` : tab.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)]">
            <Search className="w-4 h-4 text-[var(--muted)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="flex-1 bg-transparent text-sm outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
            />
          </div>

          {/* Request list */}
          <div className="space-y-2">
            {kycRequests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(req)}
                className={cn(
                  "card p-4 cursor-pointer transition-all",
                  selected?.id === req.id && "border-[#FBD12D]/40 bg-[#FBD12D]/3"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBD12D]/20 to-[#FBD12D]/5 border border-[#FBD12D]/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#FBD12D]">{req.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[var(--foreground)] truncate">{req.user}</p>
                      <span className="text-[10px] text-[var(--muted)]">{req.submittedAt}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-[var(--muted)]">{req.country}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                      <span className="text-[11px] text-[#FBD12D] font-medium">{req.level}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                      <span className={cn("text-[11px] font-medium", req.riskScore > 30 ? "text-danger" : "text-success")}>
                        Risk: {req.riskScore}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--muted)] shrink-0" />
                </div>
                <div className="flex gap-1.5 mt-3">
                  {req.documents.map((doc) => (
                    <span key={doc} className="px-2 py-0.5 rounded-md bg-[var(--border)] text-[10px] text-[var(--muted)] font-medium">
                      {doc}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="card p-6 space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FBD12D] to-[#FBD12D] flex items-center justify-center shadow-gold">
                      <span className="text-xl font-bold text-black">{selected.avatar}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[var(--foreground)]">{selected.user}</h2>
                      <p className="text-sm text-[var(--muted)]">{selected.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#FBD12D] font-medium">{selected.id}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--muted)]" />
                        <span className="text-xs text-[var(--muted)]">{selected.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-xl border text-sm font-semibold",
                    selected.riskScore <= 20 ? "text-success bg-success/10 border-success/20" :
                    selected.riskScore <= 40 ? "text-warning bg-warning/10 border-warning/20" :
                    "text-danger bg-danger/10 border-danger/20"
                  )}>
                    Risk Score: {selected.riskScore}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Globe, label: "Country", value: selected.country },
                    { icon: Shield, label: "KYC Level", value: selected.level },
                    { icon: Clock, label: "Submitted", value: selected.submittedAt },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
                      <Icon className="w-4 h-4 text-[var(--muted)] mb-2" />
                      <p className="text-[11px] text-[var(--muted)] font-medium">{label}</p>
                      <p className="text-sm font-semibold text-[var(--foreground)] mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Submitted Documents</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.documents.map((doc) => (
                      <motion.div
                        key={doc}
                        whileHover={{ scale: 1.01 }}
                        className="relative h-36 rounded-2xl border-2 border-dashed border-[#FBD12D]/30 bg-[#FBD12D]/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#FBD12D]/60 transition-colors"
                      >
                        <FileText className="w-8 h-8 text-[#FBD12D]" />
                        <p className="text-xs font-semibold text-[var(--foreground)]">{doc}</p>
                        <p className="text-[10px] text-[var(--muted)]">Click to preview</p>
                        <div className="absolute top-2 right-2">
                          <Eye className="w-3.5 h-3.5 text-[#FBD12D]" />
                        </div>
                      </motion.div>
                    ))}

                    {/* Selfie */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative h-36 rounded-2xl border-2 border-dashed border-[#6366F1]/30 bg-[#6366F1]/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#6366F1]/60 transition-colors"
                    >
                      <Camera className="w-8 h-8 text-[#6366F1]" />
                      <p className="text-xs font-semibold text-[var(--foreground)]">Selfie Photo</p>
                      <p className="text-[10px] text-[var(--muted)]">Liveness check passed</p>
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-3.5 h-3.5 text-success" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-success to-success/80 text-white text-sm font-semibold shadow-sm hover:shadow-success/20 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve KYC
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-danger/10 text-danger border border-danger/20 text-sm font-semibold hover:bg-danger/20 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--border)] transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Request Resubmission
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card h-full min-h-80 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FBD12D]/10 border border-[#FBD12D]/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#FBD12D]" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">Select a Request</p>
                  <p className="text-sm text-[var(--muted)] mt-1">Click any KYC request to review documents</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
