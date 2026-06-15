"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, GitBranch } from "lucide-react";
import { SOFTWARE_TOOLS } from "@/data/ummiscoData";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";

export default function LogicielsPage() {
  const { t } = useLang();

  const toolImages: Record<string, string> = {
    gama: "/logiciels/gama.png",
    "comokit-tool": "/logiciels/comokit.png",
    ichthyop: "/logiciels/ichthyop.png",
    kendrick: "/logiciels/kendrick.png",
    epicam: "/logiciels/epicam.png",
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-blue-600/15 blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[110px] pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Nos <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">logiciels</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              UMMISCO conçoit et maintient des plateformes de modélisation et simulation reconnues mondialement. Utilisés dans des universités, centres de recherche et organisations internationales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {SOFTWARE_TOOLS.map((tool, i) => {
              const imageUrl = toolImages[tool.id];
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950 overflow-hidden hover:border-slate-700 transition-all group flex flex-col"
                >
                  {/* Image */}
                  {imageUrl && (
                    <div className="relative h-56 overflow-hidden bg-slate-800/50">
                      <img
                        src={imageUrl}
                        alt={tool.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-extrabold text-white leading-tight flex-1">{tool.name}</h3>
                      {tool.since && (
                        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap bg-slate-900/50 px-2.5 py-1 rounded">
                          depuis {tool.since}
                        </span>
                      )}
                    </div>

                    <p className="text-base text-slate-400 leading-relaxed mb-6 flex-1">{tool.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
                      {tool.website && (
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-900/30 px-4 py-2 text-sm font-semibold hover:bg-blue-600/20 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" /> Site officiel
                        </a>
                      )}
                      {tool.github && (
                        <a
                          href={tool.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-700 transition-colors"
                        >
                          <GitBranch className="h-4 w-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-slate-400 text-base mb-6">
            Intéressé par la modélisation et la simulation ? Explorez nos axes de recherche et projets actifs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/axes"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Axes de recherche <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 text-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-slate-700 hover:text-white transition-colors"
            >
              Projets actifs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
