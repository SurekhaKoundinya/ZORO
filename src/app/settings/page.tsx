"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Shield, Key, Users2, Settings, Zap, Eye, EyeOff,
  CheckCircle, Copy, RefreshCw, Plus, Trash2, ToggleLeft, ToggleRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "roles", label: "Roles & Permissions", icon: Users2 },
  { id: "api", label: "API Keys", icon: Zap },
];

const apiKeys = [
  { id: "ZRO-API-8821", name: "Production API", scopes: ["read:users", "write:transactions", "read:wallets"], created: "Jan 15, 2026", lastUsed: "2 min ago", status: "active" },
  { id: "ZRO-API-7214", name: "Analytics Dashboard", scopes: ["read:all"], created: "Mar 3, 2026", lastUsed: "1 hr ago", status: "active" },
  { id: "ZRO-API-5521", name: "Webhook Service", scopes: ["webhook:all"], created: "May 20, 2026", lastUsed: "1 day ago", status: "active" },
];

const roles = [
  { name: "Super Admin", users: 1, permissions: "Full access", color: "text-[#FBD12D] bg-[#FBD12D]/10 border-[#FBD12D]/20" },
  { name: "Admin", users: 4, permissions: "No system settings", color: "text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20" },
  { name: "KYC Agent", users: 12, permissions: "KYC review only", color: "text-success bg-success/10 border-success/20" },
  { name: "Support", users: 28, permissions: "Read-only + messages", color: "text-warning bg-warning/10 border-warning/20" },
  { name: "Read Only", users: 8, permissions: "Dashboard view only", color: "text-[var(--muted)] bg-[var(--border)] border-[var(--border)]" },
];

const securitySettings = [
  { label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", enabled: true },
  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
  { label: "IP Whitelist", desc: "Restrict access to approved IP addresses", enabled: false },
  { label: "Audit Log Retention", desc: "Keep system logs for 90 days", enabled: true },
  { label: "Login Notifications", desc: "Email alert on new login from unknown device", enabled: true },
  { label: "Force Password Reset", desc: "Require password change every 90 days", enabled: false },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState("");
  const [toggles, setToggles] = useState<Record<number, boolean>>(
    Object.fromEntries(securitySettings.map((s, i) => [i, s.enabled]))
  );
  const [keyList, setKeyList] = useState(apiKeys);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleSaveProfile = () => toast("success", "Profile Saved", "Your profile changes have been saved");
  const handleUpdatePassword = () => toast("success", "Password Updated", "Your password has been changed successfully");
  const handleDeleteKey = (id: string) => {
    setKeyList((prev) => prev.filter((k) => k.id !== id));
    toast("warning", "API Key Deleted", `Key ${id} has been revoked`);
  };
  const handleGenerateKey = () => {
    const newId = `ZRO-API-${Math.floor(1000 + Math.random() * 9000)}`;
    setKeyList((prev) => [...prev, { id: newId, name: "New API Key", scopes: ["read:all"], created: "Today", lastUsed: "Never", status: "active" }]);
    toast("success", "API Key Generated", `New key ${newId} created`);
  };
  const handleNewRole = () => toast("info", "Coming Soon", "Role creation UI is under development");

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">Manage your account, security, and platform configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-52 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-[#FBD12D]/10 text-[#FBD12D] border border-[#FBD12D]/20"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="card p-6">
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-5">Admin Profile</h3>
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FBD12D] to-[#FBD12D] flex items-center justify-center shadow-gold">
                        <span className="text-2xl font-bold text-black">VV</span>
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-[#FBD12D] text-black flex items-center justify-center shadow-gold-sm hover:bg-[#FBD12D] transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[var(--foreground)]">Vivek Villuri</p>
                      <p className="text-sm text-[var(--muted)]">vivekvilluri31@gmail.com</p>
                      <span className="badge border text-[10px] border-[#FBD12D]/20 text-[#FBD12D] bg-[#FBD12D]/10 mt-1">Super Admin</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "First Name", value: "Vivek" },
                      { label: "Last Name", value: "Villuri" },
                      { label: "Email", value: "vivekvilluri31@gmail.com" },
                      { label: "Phone", value: "+91 98765 43210" },
                      { label: "Role", value: "Super Admin" },
                      { label: "Timezone", value: "Asia/Kolkata (IST)" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <label className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5 block">{label}</label>
                        <input
                          defaultValue={value}
                          className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] outline-none focus:border-[#FBD12D]/40 focus:ring-2 focus:ring-[#FBD12D]/10 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={handleSaveProfile} className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FBD12D] to-[#FBD12D] text-black text-sm font-semibold shadow-gold-sm">
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div key="security" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                {/* Password Change */}
                <div className="card p-6">
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-5">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-[11px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-1.5 block">{label}</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full px-3 py-2.5 pr-10 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] outline-none focus:border-[#FBD12D]/40 transition-all"
                          />
                          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={handleUpdatePassword} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FBD12D] to-[#FBD12D] text-black text-sm font-semibold shadow-gold-sm">
                      Update Password
                    </motion.button>
                  </div>
                </div>

                {/* 2FA */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">Two-Factor Authentication</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Protect your account with an authenticator app</p>
                    </div>
                    <span className="badge border border-success/20 text-success bg-success/10">Enabled</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-white p-2 shrink-0">
                      <div className="w-full h-full bg-[repeating-linear-gradient(0deg,_#000_0px,_#000_4px,_transparent_4px,_transparent_8px),_repeating-linear-gradient(90deg,_#000_0px,_#000_4px,_transparent_4px,_transparent_8px)] opacity-80 rounded" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">Scan with your authenticator app</p>
                      <p className="text-xs text-[var(--muted)] mt-1">Or enter code manually: <code className="font-mono text-[#FBD12D]">ZORO-4821-XKQP</code></p>
                      <motion.button whileTap={{ scale: 0.97 }} className="mt-2 px-3 py-1.5 rounded-lg bg-[#FBD12D]/10 text-[#FBD12D] text-xs font-semibold border border-[#FBD12D]/20 hover:bg-[#FBD12D]/20 transition-colors">
                        View Backup Codes
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Security toggles */}
                <div className="card p-6">
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    {securitySettings.map((setting, i) => (
                      <div key={setting.label} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{setting.label}</p>
                          <p className="text-xs text-[var(--muted)] mt-0.5">{setting.desc}</p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setToggles((prev) => ({ ...prev, [i]: !prev[i] }))}
                          className={cn("relative w-11 h-6 rounded-full transition-colors", toggles[i] ? "bg-[#FBD12D]" : "bg-[var(--border)]")}
                        >
                          <motion.div
                            animate={{ x: toggles[i] ? 22 : 2 }}
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "roles" && (
              <motion.div key="roles" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                    <h3 className="text-sm font-bold text-[var(--foreground)]">Roles & Permissions</h3>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={handleNewRole} className="px-4 py-2 rounded-xl bg-[#FBD12D]/10 text-[#FBD12D] border border-[#FBD12D]/20 text-xs font-semibold hover:bg-[#FBD12D]/20 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> New Role
                    </motion.button>
                  </div>
                  <div className="divide-y divide-[var(--border)]">
                    {roles.map((role, i) => (
                      <motion.div
                        key={role.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-[#FBD12D]/3 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn("badge border text-xs", role.color)}>{role.name}</span>
                            <span className="text-xs text-[var(--muted)]">{role.users} {role.users === 1 ? "user" : "users"}</span>
                          </div>
                          <p className="text-xs text-[var(--muted)] mt-1">{role.permissions}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button whileTap={{ scale: 0.9 }} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition-colors">
                            Edit
                          </motion.button>
                          {role.name !== "Super Admin" && (
                            <motion.button whileTap={{ scale: 0.9 }} className="w-7 h-7 rounded-lg border border-danger/20 bg-danger/5 text-danger flex items-center justify-center hover:bg-danger/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div key="api" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)]">API Keys</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Manage API access for integrations</p>
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={handleGenerateKey} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FBD12D] to-[#FBD12D] text-black text-xs font-semibold shadow-gold-sm flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> Generate Key
                    </motion.button>
                  </div>
                  <div className="divide-y divide-[var(--border)]">
                    {keyList.map((key, i) => (
                      <motion.div
                        key={key.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="px-6 py-5"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm font-bold text-[var(--foreground)]">{key.name}</p>
                            <p className="text-xs text-[var(--muted)] mt-0.5">Created {key.created} · Last used {key.lastUsed}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="badge border border-success/20 text-success bg-success/10 text-[10px]">{key.status}</span>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleDeleteKey(key.id)} className="w-7 h-7 rounded-lg border border-danger/20 bg-danger/5 text-danger flex items-center justify-center hover:bg-danger/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] mb-3">
                          <code className="text-xs font-mono text-[var(--muted)] flex-1">{key.id.replace(/(\w{8})$/, "••••••••")}</code>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopy(key.id, key.id)}
                            className="flex items-center gap-1 text-[10px] text-[#FBD12D] font-medium shrink-0"
                          >
                            {copied === key.id ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied === key.id ? "Copied" : "Reveal & Copy"}
                          </motion.button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {key.scopes.map((scope) => (
                            <span key={scope} className="px-2 py-0.5 rounded-md bg-[var(--border)] text-[10px] text-[var(--muted)] font-mono">{scope}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
