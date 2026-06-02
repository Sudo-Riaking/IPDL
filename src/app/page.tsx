"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Database,
  Users,
  Calendar,
  Lock,
  Eye,
  Shield,
  Download,
  ArrowRight,
  Clipboard,
  Check,
  Cpu,
  UserCheck,
  ChevronRight,
  Mail,
  MessageSquare,
  Handshake,
  Send
} from "lucide-react";
import {
  AXES,
  RESEARCHERS,
  PUBLICATIONS,
  DATASETS,
  SEMINARS,
  Publication,
  Dataset,
  Researcher,
  DOCTORAL_CONTRACTS,
  UMMISCO_SITES,
  INTEGRATED_APPLICATIONS
} from "@/data/ummiscoData";
import Footer from "@/components/Footer";
import StatsCounter from "@/components/StatsCounter";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { t } = useLang();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);
  const [copiedPubId, setCopiedPubId] = useState<string | null>(null);
  const [citationModalPub, setCitationModalPub] = useState<Publication | null>(null);

  // States for interactive ACL request simulator
  const [aclName, setAclName] = useState("");
  const [aclEmail, setAclEmail] = useState("");
  const [aclDatasetId, setAclDatasetId] = useState(DATASETS[0].id);
  const [aclReason, setAclReason] = useState("");
  const [aclSubmitted, setAclSubmitted] = useState(false);

  // Contact form
  const [contactNom, setContactNom] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSujet, setContactSujet] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactDone, setContactDone] = useState(false);

  // Newsletter
  const [nlEmail, setNlEmail] = useState("");
  const [nlLoading, setNlLoading] = useState(false);
  const [nlDone, setNlDone] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: contactNom, email: contactEmail, sujet: contactSujet, message: contactMessage }),
      });
      setContactDone(true);
    } finally {
      setContactLoading(false);
    }
  };

  const handleDatasetDownload = async (datasetId: string) => {
    const res = await fetch(`/api/datasets/${datasetId}/download`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) { alert("Téléchargement refusé."); return; }
    const disposition = res.headers.get("Content-Disposition") ?? "";
    const match = disposition.match(/filename="([^"]+)"/);
    const filename = match ? match[1] : `dataset_${datasetId}.csv`;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail }),
      });
      setNlDone(true);
    } finally {
      setNlLoading(false);
    }
  };

  // Search filter logic
  const filteredPubs = searchQuery
    ? PUBLICATIONS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : PUBLICATIONS.slice(0, 3);

  const filteredResearchers = searchQuery
    ? RESEARCHERS.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : RESEARCHERS.slice(0, 3);

  const filteredDatasets = searchQuery
    ? DATASETS.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : DATASETS.slice(0, 3);

  const handleCopyCitation = (text: string, pubId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPubId(pubId);
    setTimeout(() => setCopiedPubId(null), 2000);
  };

  const handleAclSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAclSubmitted(true);
  };

  return (
    <>
      <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 font-sans">
        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-center min-h-[70vh] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial from-slate-900/80 via-slate-950 to-slate-950 border-b border-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
          
          <div className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-green-600/10 blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-4xl text-center relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-1 text-xs text-slate-400 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              {t("hero.title1")} <span className="text-blue-500">{t("hero.titleHighlight")}</span> {t("hero.title2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            {/* UNIFIED GLOBAL SEARCH BAR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 w-full max-w-2xl relative"
            >
              <div className="relative rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl focus-within:border-blue-500/50 transition-all duration-300">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  placeholder={t("hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Instant Search Results panel */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-2xl p-6 text-left z-30 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <span className="text-[10px] mono-text uppercase tracking-wider text-slate-500 font-bold">
                      {t("hero.searchRealtime")}
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[10px] text-slate-400 hover:text-slate-200"
                    >
                      {t("hero.searchClear")}
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Researchers */}
                    {filteredResearchers.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Users className="h-3 w-3" /> {t("hero.searchResearchers")}
                        </h4>
                        <div className="space-y-2">
                          {filteredResearchers.map((r) => (
                            <Link
                              key={r.id}
                              href={`/chercheurs/${r.id}`}
                              className="block p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                            >
                              <div className="text-xs font-bold text-slate-200">{r.name}</div>
                              <div className="text-[10px] text-slate-500">{r.title}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Publications */}
                    {filteredPubs.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3" /> {t("hero.searchPublications")}
                        </h4>
                        <div className="space-y-2">
                          {filteredPubs.map((p) => (
                            <Link
                              key={p.id}
                              href="/publications"
                              className="block p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                            >
                              <div className="text-xs font-bold text-slate-200 line-clamp-1">{p.title}</div>
                              <div className="text-[10px] text-slate-500">{p.authors.join(", ")} ({p.year})</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Datasets */}
                    {filteredDatasets.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Database className="h-3 w-3" /> {t("hero.searchDatasets")}
                        </h4>
                        <div className="space-y-2">
                          {filteredDatasets.map((d) => (
                            <a
                              key={d.id}
                              href="#datasets"
                              onClick={() => setSearchQuery("")}
                              className="block p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                            >
                              <div className="text-xs font-bold text-slate-200">{d.title}</div>
                              <div className="text-[10px] text-slate-500">{d.size} · {d.accessLevel}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredResearchers.length === 0 &&
                      filteredPubs.length === 0 &&
                      filteredDatasets.length === 0 && (
                        <div className="text-xs text-slate-500 text-center py-4">
                          Aucun résultat trouvé pour "{searchQuery}".
                        </div>
                      )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* STATS COUNTERS */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/20">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatsCounter value={1972} label={t("stats.publications")} />
              <StatsCounter value={94} label={t("stats.researchers")} />
              <StatsCounter value={29} label={t("stats.projects")} />
              <StatsCounter value={5} label={t("stats.centers")} />
            </div>
          </div>
        </section>

        {/* AXES THEMATIQUES */}
        <section id="axes" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                {t("axes.sectionTag")}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {t("axes.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400 text-sm leading-relaxed">
                Les travaux d'UMMISCO se structurent autour de cinq piliers alliant modélisation fondamentale et applications concrètes de terrain.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AXES.map((axis) => (
                <div
                  key={axis.id}
                  onClick={() => setSelectedAxis(selectedAxis === axis.id ? null : axis.id)}
                  className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 flex flex-col justify-between min-h-48 ${
                    selectedAxis === axis.id
                      ? "border-blue-500 bg-slate-900/60 shadow-lg shadow-blue-500/5 translate-y-[-4px]"
                      : "border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/20"
                  }`}
                >
                  <div>
                    <div className="h-2 w-10 rounded-full bg-blue-600 mb-4" />
                    <h3 className="text-sm font-bold text-slate-100 leading-snug">{axis.name}</h3>
                    <p className="mt-2 text-[10px] text-slate-500 leading-relaxed line-clamp-3">{axis.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-4">
                    <span>{axis.shortName}</span>
                    <ChevronRight className={`h-3 w-3 transition-transform ${selectedAxis === axis.id ? "rotate-90 text-blue-500" : ""}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Filtered inline view based on selected axis */}
            <AnimatePresence>
              {selectedAxis && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 rounded-xl border border-slate-900 bg-slate-900/30 p-6 overflow-hidden"
                >
                  <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    Publications liées à l'axe sélectionné :
                  </h4>
                  <div className="space-y-4">
                    {PUBLICATIONS.filter((p) => p.axis === selectedAxis).map((p) => (
                      <div key={p.id} className="border-b border-slate-900/60 pb-3 last:border-b-0 last:pb-0">
                        <div className="text-xs font-bold text-slate-200">{p.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{p.authors.join(", ")} — {p.year}</div>
                      </div>
                    ))}
                    {PUBLICATIONS.filter((p) => p.axis === selectedAxis).length === 0 && (
                      <div className="text-xs text-slate-500">Aucune publication indexée sur cet axe pour le moment.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* DERNIERES PUBLICATIONS */}
        <section id="publications" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                  {t("publications.sectionTag")}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  {t("publications.title")}
                </h2>
              </div>
              <Link
                href="/publications"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                <span>{t("publications.viewAll")}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PUBLICATIONS.slice(0, 3).map((pub) => (
                <div
                  key={pub.id}
                  className="rounded-xl border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between shadow-md hover:border-slate-800/80 transition-all"
                >
                  <div>
                    {/* Category tag & year */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-semibold text-slate-400 border border-slate-800 uppercase tracking-wider">
                        {AXES.find((a) => a.id === pub.axis)?.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{pub.year}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {pub.abstract}
                    </p>
                  </div>

                  {/* Authors & Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 italic truncate max-w-[60%]">
                      {pub.authors.join(", ")}
                    </span>
                    <button
                      onClick={() => setCitationModalPub(pub)}
                      className="inline-flex items-center gap-1.5 rounded bg-blue-600/10 px-2.5 py-1.5 text-[10px] font-bold text-blue-400 border border-blue-900/30 hover:bg-blue-600/20 active:scale-95 transition-all"
                    >
                      <Clipboard className="h-3 w-3" />
                      <span>{t("publications.cite")}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DATASETS DISPONIBLES */}
        <section id="datasets" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                {t("datasets.sectionTag")}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {t("datasets.title")}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400 text-sm leading-relaxed">
                Le laboratoire d'UMMISCO favorise la science ouverte tout en respectant scrupuleusement la confidentialité éthique à travers 3 niveaux de sécurité.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DATASETS.map((dataset) => {
                const isPublic = dataset.accessLevel === "public";
                const isProtected = dataset.accessLevel === "protected";
                const isPrivate = dataset.accessLevel === "private";

                return (
                  <div
                    key={dataset.id}
                    className="rounded-xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col justify-between hover:border-slate-800 transition-colors"
                  >
                    <div>
                      {/* Dataset Header line */}
                      <div className="flex justify-between items-start border-b border-slate-900/60 pb-3 mb-4">
                        <div>
                          <h3 className="text-sm font-bold text-white leading-snug">{dataset.title}</h3>
                          <span className="text-[10px] text-slate-500">
                            Créé par {RESEARCHERS.find((r) => r.id === dataset.creatorId)?.name} · {dataset.year}
                          </span>
                        </div>

                        {/* vis badge */}
                        <div className="flex items-center gap-1 pl-2">
                          {isPublic && (
                            <span className="inline-flex items-center gap-1 rounded bg-green-500/10 px-2 py-0.5 text-[9px] font-bold text-green-400 border border-green-900/30 uppercase tracking-wider">
                              <Eye className="h-2.5 w-2.5" /> Public
                            </span>
                          )}
                          {isProtected && (
                            <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold text-blue-400 border border-blue-900/30 uppercase tracking-wider">
                              <Lock className="h-2.5 w-2.5" /> Protégé
                            </span>
                          )}
                          {isPrivate && (
                            <span className="inline-flex items-center gap-1 rounded bg-red-500/10 px-2 py-0.5 text-[9px] font-bold text-red-400 border border-red-900/30 uppercase tracking-wider">
                              <Shield className="h-2.5 w-2.5" /> Privé
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {dataset.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>Taille : {dataset.size} · {dataset.downloads} téléchargements</span>
                      
                      {isPublic ? (
                        <button
                          onClick={() => handleDatasetDownload(dataset.id)}
                          className="inline-flex items-center gap-1.5 rounded bg-green-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-green-700 active:scale-95 transition-all"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{t("datasets.download")}</span>
                        </button>
                      ) : (
                        <Link
                          href="/connexion"
                          className="inline-flex items-center gap-1.5 rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200"
                        >
                          <Lock className="h-3 w-3" />
                          <span>{t("datasets.authRequired")}</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CHERCHEURS SECTION */}
        <section id="chercheurs" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                {t("researchers.sectionTag")}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {t("researchers.title")}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCHERS.map((res) => (
                <Link
                  key={res.id}
                  href={`/chercheurs/${res.id}`}
                  className="rounded-xl border border-slate-900 bg-slate-950 p-6 flex flex-col items-center text-center hover:border-slate-800 transition-colors group"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-blue-400 text-lg font-bold border border-blue-900/30 mb-4 group-hover:scale-105 transition-transform duration-300">
                    {res.avatarSeed}
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    {res.name}
                  </h3>
                  <p className="mt-1.5 text-[10px] text-slate-500 font-medium leading-normal">
                    {res.title}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1 justify-center">
                    {res.axes.map((a) => (
                      <span
                        key={a}
                        className="text-[8px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase"
                      >
                        {AXES.find((ax) => ax.id === a)?.name.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ACTUALITES & EVENEMENTS */}
        <section id="evenements" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                {t("events.sectionTag")}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {t("events.title")}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {SEMINARS.map((sem) => (
                <div
                  key={sem.id}
                  className="rounded-xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col justify-between hover:border-slate-800 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 text-blue-500 mb-4 text-[10px] font-bold tracking-wider uppercase">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(sem.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-200 leading-snug line-clamp-2">
                      {sem.title}
                    </h3>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {sem.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-900 pt-3">
                    <div className="text-[10px] text-slate-400">{t("events.speaker")} <strong className="text-slate-300 font-semibold">{sem.speaker}</strong></div>
                    <div className="text-[9px] text-slate-500 mt-0.5 truncate">{sem.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTRATS DE DOCTORAT */}
        <section id="contrats" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                06 // Opportunités Académiques
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Contrats de Doctorat & Thèses Disponibles
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400 text-sm leading-relaxed">
                Rejoignez UMMISCO. Consultez les offres de thèses en cours et postulez directement auprès des directeurs de recherche du laboratoire.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DOCTORAL_CONTRACTS.map((contract) => (
                <div
                  key={contract.id}
                  className="rounded-xl border border-slate-900 bg-slate-950 p-6 flex flex-col justify-between hover:border-slate-800 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-white leading-snug">{contract.title}</h3>
                      <span className="inline-flex items-center rounded-full bg-blue-600/10 px-2 py-0.5 text-[9px] font-semibold text-blue-400 border border-blue-900/30 whitespace-nowrap">
                        Date limite : {new Date(contract.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <div>Superviseur : <strong className="text-slate-400 font-semibold">{contract.supervisor}</strong></div>
                      <div className="mt-0.5">Financement : <strong className="text-slate-400 font-semibold">{contract.funding}</strong></div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {contract.description}
                    </p>

                    <div className="p-3 rounded bg-slate-900/60 border border-slate-900 text-[10px] text-slate-500">
                      <strong className="text-slate-400 block mb-1">Prérequis :</strong>
                      {contract.requirements}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900/60 flex justify-end">
                    <a
                      href="mailto:contact.ummisco@ucad.edu.sn"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-900/30 hover:bg-blue-600/20 active:scale-95 transition-all"
                    >
                      Candidater / Se renseigner
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEME UMMISCO (ENTITES GEOGRAPHIQUES & APPLICATIONS PARTENAIRES) */}
        <section id="ecosysteme" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                07 // Réseau de Recherche International
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Écosystème International UMMISCO
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400 text-sm leading-relaxed">
                UMMISCO est une Unité Mixte Internationale rattachée à plusieurs entités géographiques dans le monde et connectée à des plateformes partenaires sans redirection externe.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Sites Internationaux */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
                  Implantations Géographiques
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {UMMISCO_SITES.map((site) => (
                    <div key={site.id} className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white">{site.name}</h4>
                        <span className="text-[9px] text-slate-500">{site.location.split(" (")[0]}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        {site.description}
                      </p>
                      <a
                        href={site.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] text-blue-400 hover:underline font-semibold"
                      >
                        Consulter le site
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications Intégrées */}
              <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-6 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
                  Applications Partenaires
                </h3>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                  Accédez aux services et outils d'autres entités nationales et internationales directement liés.
                </p>
                <div className="space-y-3">
                  {INTEGRATED_APPLICATIONS.map((app) => (
                    <div key={app.id} className="rounded-lg border border-slate-900/80 bg-slate-950 p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-200">{app.name}</h4>
                        <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-500 px-1 py-0.5 rounded uppercase">
                          {app.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        {app.description}
                      </p>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Ouvrir le portail
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEMANDE D'ACCES ACL (SIMULATEUR INTERACTIF) */}
        <section id="demandes-acl" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                08 // Contrôle d'accès granulaire (ACL)
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Simulation de Demande d'Accès Datasets
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
                Le modèle d'accès d'UMMISCO repose sur des listes de contrôle d'accès (ACL). Remplissez ce formulaire pour simuler une demande de permission spécifique sur une ressource protégée.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-900 bg-slate-950 p-8 shadow-xl max-w-lg mx-auto">
              {aclSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="h-14 w-14 rounded-full bg-green-500/10 text-green-500 border border-green-950 flex items-center justify-center mx-auto">
                    <UserCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Demande ACL Enregistrée
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Votre demande de permission pour le jeu de données **{DATASETS.find((d) => d.id === aclDatasetId)?.title}** a été soumise avec succès au responsable d'axe. L'administrateur attribuera le privilège requis après examen scientifique de vos motivations.
                  </p>
                  <button
                    onClick={() => setAclSubmitted(false)}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold underline block mx-auto pt-2"
                  >
                    Faire une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAclSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Nom complet</label>
                      <input
                        type="text"
                        required
                        value={aclName}
                        onChange={(e) => setAclName(e.target.value)}
                        placeholder="Ex : Moustapha Fall"
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Adresse email</label>
                      <input
                        type="email"
                        required
                        value={aclEmail}
                        onChange={(e) => setAclEmail(e.target.value)}
                        placeholder="Ex : moustapha.fall@ucad.edu.sn"
                        className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Ressource demandée</label>
                    <select
                      value={aclDatasetId}
                      onChange={(e) => setAclDatasetId(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3 py-2.5 focus:outline-none focus:border-blue-500/50"
                    >
                      {DATASETS.map((d) => (
                        <option key={d.id} value={d.id} className="bg-slate-950 text-slate-300">
                          {d.title} ({d.accessLevel.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Motifs de la demande & Projet de Recherche</label>
                    <textarea
                      required
                      rows={3}
                      value={aclReason}
                      onChange={(e) => setAclReason(e.target.value)}
                      placeholder="Décrivez votre projet de recherche et pourquoi l'accès à ce dataset vous est nécessaire..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg bg-blue-600 text-xs font-semibold uppercase tracking-wider text-white hover:bg-blue-700 active:scale-95 transition-all shadow-md"
                  >
                    Soumettre la demande ACL
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* CITATION MODAL POPUP */}
        <AnimatePresence>
          {citationModalPub && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-2xl relative"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-6">
                  <h3 className="text-sm font-bold text-white">{t("publications.citeTitle")}</h3>
                  <button
                    onClick={() => setCitationModalPub(null)}
                    className="text-xs text-slate-500 hover:text-slate-200"
                  >
                    {t("common.close")}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* APA Format */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>{t("publications.citationApa")}</span>
                      <button
                        onClick={() => handleCopyCitation(citationModalPub.citationApa, "apa")}
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        {copiedPubId === "apa" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                        <span>{t("publications.copyApa")}</span>
                      </button>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-900 text-xs text-slate-300 leading-relaxed font-mono select-all">
                      {citationModalPub.citationApa}
                    </div>
                  </div>

                  {/* BibTeX Format */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <span>{t("publications.citationBibtex")}</span>
                      <button
                        onClick={() => handleCopyCitation(citationModalPub.citationBibtex, "bibtex")}
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        {copiedPubId === "bibtex" ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                        <span>{t("publications.copyBibtex")}</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-lg bg-slate-950 border border-slate-900 text-[10px] text-slate-300 leading-relaxed font-mono overflow-x-auto select-all max-h-40">
                      {citationModalPub.citationBibtex}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CONTACT + NEWSLETTER */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact form */}
              <div>
                <span className="text-[10px] mono-text uppercase tracking-widest text-slate-500 font-bold block mb-2">
                  09 // Contact
                </span>
                <h2 className="text-2xl font-extrabold text-white mb-6">Contacter UMMISCO</h2>
                {contactDone ? (
                  <div className="rounded-xl border border-green-900/30 bg-green-500/5 p-8 text-center space-y-3">
                    <Check className="h-10 w-10 text-green-500 mx-auto" />
                    <p className="text-sm text-green-400 font-semibold">Message envoyé avec succès.</p>
                    <p className="text-xs text-slate-400">Nous vous répondrons sous 48h.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Nom complet</label>
                        <input type="text" required value={contactNom} onChange={(e) => setContactNom(e.target.value)} placeholder="Prénom Nom" className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</label>
                        <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="email@example.com" className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Sujet</label>
                      <input type="text" value={contactSujet} onChange={(e) => setContactSujet(e.target.value)} placeholder="Collaboration, information, candidature..." className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Message</label>
                      <textarea required rows={4} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Votre message..." className="w-full rounded-lg border border-slate-800 bg-slate-900/50 text-xs text-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <button type="submit" disabled={contactLoading} className="inline-flex items-center gap-2 rounded-lg bg-ummisco-blue px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-ummisco-blue/90 disabled:opacity-60 active:scale-95 transition-all">
                      <Send className="h-3.5 w-3.5" />
                      {contactLoading ? "Envoi..." : "Envoyer le message"}
                    </button>
                  </form>
                )}
              </div>

              {/* Newsletter + chatbot CTA */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white">Restez informé(e)</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">Recevez nos dernières publications, événements et actualités du laboratoire UMMISCO.</p>
                  {nlDone ? (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="h-4 w-4" /> Inscription confirmée !
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletter} className="flex gap-2">
                      <input type="email" required value={nlEmail} onChange={(e) => setNlEmail(e.target.value)} placeholder="votre@email.com" className="flex-1 rounded-lg border border-slate-800 bg-slate-950/60 text-xs text-slate-200 px-3 py-2.5 focus:outline-none focus:border-blue-500/50" />
                      <button type="submit" disabled={nlLoading} className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60 active:scale-95 transition-all">
                        {nlLoading ? "..." : "S'abonner"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-900 bg-gradient-to-br from-blue-950/40 to-slate-900/20 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white">Assistant IA UMMISCO</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">Posez vos questions sur nos recherches, publications, datasets et événements. Notre assistant IA vous répond en temps réel, 24h/24.</p>
                  <div className="text-[10px] text-slate-500 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                    Assistant disponible · Cliquez sur l'icône en bas à droite
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}

