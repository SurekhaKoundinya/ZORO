"use client";

import { motion } from "framer-motion";
import { GitBranch, Trophy, TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { referrals, referralStats, referralChartData } from "@/lib/dummy-data";
import { formatCurrency, formatNumber, cn } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tierColors: Record<string, string> = {
  Diamond: "text-[#B9F2FF] bg-[#B9F2FF]/10 border-[#B9F2FF]/20",
  Platinum: "text-[#E5E4E2] bg-[#E5E4E2]/10 border-[#E5E4E2]/20",
  Gold: "text-[#FBD12D] bg-[#FBD12D]/10 border-[#FBD12D]/20",
  Silver: "text-[#C0C0C0] bg-[#C0C0C0]/10 border-[#C0C0C0]/20",
  Bronze: "text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/20",
};

const rankColors = ["text-[#FBD12D]", "text-[#C0C0C0]", "text-[#CD7F32]"];

export default function ReferralsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Referrals</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">Track referral performance and reward distribution</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {[
          { label: "Total Referrals", value: formatNumber(referralStats.totalReferrals), icon: GitBranch, color: "text-[#FBD12D] bg-[#FBD12D]/10" },
          { label: "Active Referrers", value: formatNumber(referralStats.activeReferrers), icon: Users, color: "text-success bg-success/10" },
          { label: "Rewards Issued", value: `$${formatNumber(referralStats.totalRewardsIssued)}`, icon: DollarSign, color: "text-[#FBD12D] bg-[#FBD12D]/10" },
          { label: "Pending Rewards", value: `$${formatNumber(referralStats.pendingRewards)}`, icon: TrendingUp, color: "text-warning bg-warning/10" },
          { label: "Conversion Rate", value: `${referralStats.conversionRate}%`, icon: ArrowUpRight, color: "text-success bg-success/10" },
          { label: "Avg. Earnings", value: formatCurrency(referralStats.avgEarningsPerReferrer), icon: Trophy, color: "text-[#FBD12D] bg-[#FBD12D]/10" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} whileHover={{ y: -2 }} className="card p-5">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", s.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-[11px] text-[var(--muted)] mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Referral Growth</h3>
            <p className="text-xs text-[var(--muted)] mt-0.5">Monthly new referrals 2026</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={referralChartData}>
              <defs>
                <linearGradient id="refGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FBD12D" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FBD12D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="referrals" stroke="#FBD12D" strokeWidth={2} fill="url(#refGrad)" name="Referrals" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Reward Distribution</h3>
            <p className="text-xs text-[var(--muted)] mt-0.5">Monthly rewards paid out</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={referralChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} formatter={(v: any) => [formatCurrency(v), "Rewards"]} />
              <Bar dataKey="rewards" fill="#FBD12D" radius={[4, 4, 0, 0]} name="Rewards" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Top Referrers</h3>
            <p className="text-xs text-[var(--muted)] mt-0.5">All-time leaderboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FBD12D]" />
            <span className="text-xs text-[#FBD12D] font-semibold">Top Performers</span>
          </div>
        </div>

        <div className="space-y-2">
          {referrals.map((referrer, i) => (
            <motion.div
              key={referrer.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ x: 2 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] hover:border-[#FBD12D]/20 hover:bg-[#FBD12D]/3 transition-all cursor-pointer"
            >
              {/* Rank */}
              <div className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0",
                i < 3
                  ? `${rankColors[i]} bg-current/10`
                  : "text-[var(--muted)] bg-[var(--border)]"
              )}>
                {i < 3 ? (i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉") : referrer.rank}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBD12D]/20 to-[#FBD12D]/5 border border-[#FBD12D]/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#FBD12D]">{referrer.avatar}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--foreground)]">{referrer.user}</p>
                <p className="text-xs text-[var(--muted)]">Joined {referrer.joinDate}</p>
              </div>

              {/* Tier */}
              <span className={cn("badge border hidden sm:inline-flex", tierColors[referrer.tier])}>{referrer.tier}</span>

              {/* Referrals */}
              <div className="text-center hidden md:block">
                <p className="text-lg font-bold text-[var(--foreground)]">{referrer.referrals}</p>
                <p className="text-[10px] text-[var(--muted)]">referrals</p>
              </div>

              {/* Earnings */}
              <div className="text-right">
                <p className="text-base font-bold gold-text">{formatCurrency(referrer.earnings)}</p>
                <p className="text-[10px] text-[var(--muted)]">earned</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
