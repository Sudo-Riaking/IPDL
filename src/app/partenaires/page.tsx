"use client";

import React, { useState, useEffect } from "react";
import { Globe, ExternalLink, Filter } from "lucide-react";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";
import type { DBPartner } from "@/lib/db";

const TYPE_COLORS: Record<string, string> = {
  academique: "bg-blue-500/10 text-blue-400 border-blue-900/30",
  institutionnel: "bg-green-500/10 text-green-400 border-green-900/30",
  industriel: "bg-purple-500/10 text-purple-400 border-purple-900/30",
  bailleur: "bg-amber-500/10 text-amber-400 border-amber-900/30",
};

const TYPE_LABELS: Record<string, string> = {
  academique: "Académique",
  institutionnel: "Institutionnel",
  industriel: "Industriel",
  bailleur: "Bailleur",
};

export default function PartenairesPage() {
  const { t } = useLang();
  const [partners, setPartners] = useState<DBPartner[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then(setPartners)
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? partners : partners.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-b border-slate-900 pb-8 mb-10">
          <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
            Réseau International
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{t("partners.title")}</h1>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">{t("partners.description")}</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <Filter className="h-3 w-3" /> Type :
          </div>
          {["all", "academique", "institutionnel", "bailleur", "industriel"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border transition-all ${
                filter === f
                  ? "bg-blue-600/20 text-blue-400 border-blue-900/40"
                  : "border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
            >
              {f === "all" ? "Tous" : TYPE_LABELS[f]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">{t("common.loading")}</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-900 bg-slate-950 p-6 flex flex-col hover:border-slate-800 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-none">
                    <Globe className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${TYPE_COLORS[p.type]}`}>
                    {TYPE_LABELS[p.type]}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug mb-2">{p.nom}</h3>
                <p className="text-[10px] text-slate-500 mb-1">{t("partners.country")} : <strong className="text-slate-400">{p.pays}</strong></p>
                <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">{p.description}</p>

                {p.projets.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t("partners.projects")}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.projets.map((proj) => (
                        <span key={proj} className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 font-semibold mt-auto"
                >
                  {t("partners.viewSite")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-3 rounded-xl border border-slate-900 border-dashed p-12 text-center text-slate-500 text-xs">
                {t("common.noData")}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
