"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoUmmisco from "@/components/LogoUmmisco";
import { Lock, Mail, ShieldCheck, ArrowLeft, KeyRound, UserPlus } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

type Tab = "login" | "register";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLang();

  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register state
  const [nom, setNom] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [role, setRole] = useState("etudiant");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("login.error"));
      } else {
        login(data.token, data.user);
        router.push("/dashboard");
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email: regEmail, password: regPassword, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("common.error"));
      } else {
        login(data.token, data.user);
        router.push("/dashboard");
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 mb-8 font-semibold absolute top-10 left-10">
          <ArrowLeft className="h-4 w-4" />
          <span>{t("common.back")}</span>
        </Link>

        <div className="w-full max-w-md space-y-6 rounded-2xl border border-slate-900 bg-slate-900/10 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <LogoUmmisco width={64} height={52} />
            <h2 className="mt-4 text-xl font-extrabold text-white">{t("login.title")}</h2>
            <p className="mt-1.5 text-[11px] text-slate-500">{t("login.subtitle")}</p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-lg border border-slate-800 bg-slate-950/50 p-1 gap-1">
            <button
              onClick={() => { setTab("login"); setError(""); }}
              className={`flex-1 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${tab === "login" ? "bg-ummisco-blue text-white shadow" : "text-slate-500 hover:text-slate-300"}`}
            >
              {t("nav.login")}
            </button>
            <button
              onClick={() => { setTab("register"); setError(""); }}
              className={`flex-1 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${tab === "register" ? "bg-ummisco-blue text-white shadow" : "text-slate-500 hover:text-slate-300"}`}
            >
              <UserPlus className="h-3 w-3" />
              {t("register.title")}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-900/30 px-4 py-3 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t("login.email")}</label>
                <div className="relative rounded-lg border border-slate-800 bg-slate-950/60 focus-within:border-blue-500/50">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <input
                    type="email"
                    required
                    placeholder={t("login.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-300 pl-9 pr-3 py-3 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t("login.password")}</label>
                  <a href="#" className="text-[9px] text-slate-500 hover:text-slate-300 font-semibold">{t("login.forgotPassword")}</a>
                </div>
                <div className="relative rounded-lg border border-slate-800 bg-slate-950/60 focus-within:border-blue-500/50">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-300 pl-9 pr-3 py-3 focus:outline-none"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-ummisco-blue text-xs font-semibold uppercase tracking-wider text-white hover:bg-ummisco-blue/90 disabled:opacity-60 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>{loading ? t("login.loading") : t("login.submit")}</span>
              </button>

              {/* Demo hint */}
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-3 text-[10px] text-slate-500 space-y-1">
                <p className="font-bold text-slate-400 uppercase tracking-wider">Comptes démo :</p>
                <p>admin@ummisco.sn / admin123 (directeur)</p>
                <p>chercheur@ummisco.sn / chercheur123</p>
                <p>etudiant@ummisco.sn / etudiant123</p>
              </div>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t("register.name")}</label>
                <input type="text" required placeholder={t("register.namePlaceholder")} value={nom} onChange={(e) => setNom(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950/60 text-xs text-slate-300 px-3 py-3 focus:outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t("register.email")}</label>
                <input type="email" required placeholder="email@ucad.edu.sn" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950/60 text-xs text-slate-300 px-3 py-3 focus:outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t("register.password")}</label>
                <input type="password" required placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950/60 text-xs text-slate-300 px-3 py-3 focus:outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">{t("register.role")}</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300 px-3 py-3 focus:outline-none focus:border-blue-500/50">
                  <option value="etudiant">{t("register.roles.etudiant")}</option>
                  <option value="chercheur">{t("register.roles.chercheur")}</option>
                  <option value="partenaire">{t("register.roles.partenaire")}</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-ummisco-blue text-xs font-semibold uppercase tracking-wider text-white hover:bg-ummisco-blue/90 disabled:opacity-60 active:scale-95 transition-all">
                {loading ? t("register.loading") : t("register.submit")}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-900 text-center">
            <span className="text-[9px] text-slate-600 flex items-center gap-1 uppercase tracking-widest font-bold justify-center">
              <ShieldCheck className="h-3.5 w-3.5" /> {t("login.secured")}
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
