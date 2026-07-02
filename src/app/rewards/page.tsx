"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Zap, Star, TrendingUp, Users } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

type Reward = { id: string; user: string; avatar: string; type: string; amount: number; status: string; date: string };

const initialRewards: Reward[] = [
  { id: "RWD-001", user: "Liam O'Brien", avatar: "LO", type: "Referral Bonus", amount: 450.00, status: "pending", date: "Jun 25, 2026" },
  { id: "RWD-002", user: "Priya Sharma", avatar: "PS", type: "Trading Reward", amount: 280.00, status: "paid", date: "Jun 24, 2026" },
  { id: "RWD-003", user: "Arjun Mehta", avatar: "AM", type: "Referral Bonus", amount: 190.00, status: "paid", date: "Jun 24, 2026" },
  { id: "RWD-004", user: "Yuki Tanaka", avatar: "YT", type: "Loyalty Reward", amount: 320.00, status: "pending", date: "Jun 23, 2026" },
  { id: "RWD-005", user: "Marcus Johnson", avatar: "MJ", type: "Milestone Bonus", amount: 500.00, status: "paid", date: "Jun 23, 2026" },
  { id: "RWD-006", user: "Sarah Chen", avatar: "SC", type: "Referral Bonus", amount: 160.00, status: "processing", date: "Jun 22, 2026" },
];

const rewardPrograms = [
  { name: "Referral Program", icon: Users, color: "from-[#FBD12D]/20 to-[#FBD12D]/5 border-[#FBD12D]/20 text-[#FBD12D]", totalPaid: "$284,730", rate: "$30 per referral", active: 1248 },
  { name: "Trading Rewards", icon: TrendingUp, color: "from-success/20 to-success/5 border-success/20 text-success", totalPaid: "$142,810", rate: "0.05% of volume", active: 8421 },
  { name: "Loyalty Program", icon: Star, color: "from-[#6366F1]/20 to-[#6366F1]/5 border-[#6366F1]/20 text-[#6366F1]", totalPaid: "$98,240", rate: "Based on tier", active: 4200 },
  { name: "Milestone Bonuses", icon: Zap, color: "from-warning/20 to-warning/5 border-warning/20 text-warning", totalPaid: "$56,800", rate: "One-time awards", active: 892 },
];

const statusColors: Record<string, string> = {
  paid: "text-success bg-success/10 border-success/20",
  pending: "text-warning bg-warning/10 border-warning/20",
  processing: "text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20",
};

export default function RewardsPage() {
  const { toast } = useToast();
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);

  const handleApprove = (reward: Reward) => {
    setRewards((prev) => prev.map((r) => r.id === reward.id ? { ...r, status: "paid" } : r));
    toast("success", "Reward Approved", `${formatCurrency(reward.amount)} approved for ${reward.user}`);
  };

  const handleApproveAll = () => {
    const pendingCount = rewards.filter((r) => r.status === "pending").length;
    if (pendingCount === 0) { toast("info", "No Pending Rewards", "All rewards are already processed"); return; }
    setRewards((prev) => prev.map((r) => r.status === "pending" ? { ...r, status: "paid" } : r));
    toast("success", "All Pending Approved", `${pendingCount} rewards queued for payment`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Rewards</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">Manage reward programs and distributions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {rewardPrograms.map((prog, i) => {
          const Icon = prog.icon;
          return (
            <motion.div key={prog.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }} className={cn("card p-5 bg-gradient-to-br border", prog.color)}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-current/10">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">{prog.name}</h3>
              <p className="text-2xl font-bold gold-text mt-1">{prog.totalPaid}</p>
              <div className="mt-3 pt-3 border-t border-[var(--border)] flex justify-between text-[11px]">
                <span className="text-[var(--muted)]">{prog.rate}</span>
                <span className="font-semibold text-[var(--foreground)]">{prog.active.toLocaleString()} users</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Reward Distributions</h3>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              {rewards.filter(r => r.status === "pending").length} pending · {rewards.filter(r => r.status === "paid").length} paid
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleApproveAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FBD12D] to-[#FBD12D] text-black text-xs font-semibold shadow-gold-sm">
            Approve All Pending
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["ID", "User", "Reward Type", "Amount", "Status", "Date", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {rewards.map((reward, i) => (
                <motion.tr key={reward.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-[#FBD12D]/3 transition-colors">
                  <td className="px-5 py-3.5"><span className="text-xs font-mono text-[var(--muted)]">{reward.id}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FBD12D]/10 border border-[#FBD12D]/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#FBD12D]">{reward.avatar}</span>
                      </div>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{reward.user}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#FBD12D]" />
                      <span className="text-sm text-[var(--foreground)]">{reward.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="text-sm font-bold gold-text">{formatCurrency(reward.amount)}</span></td>
                  <td className="px-5 py-3.5"><span className={cn("badge border", statusColors[reward.status])}>{reward.status}</span></td>
                  <td className="px-5 py-3.5"><span className="text-xs text-[var(--muted)]">{reward.date}</span></td>
                  <td className="px-5 py-3.5">
                    {reward.status === "pending" && (
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleApprove(reward)}
                        className="px-3 py-1 rounded-lg bg-success/10 text-success text-xs font-semibold border border-success/20 hover:bg-success/20 transition-colors">
                        Approve
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
