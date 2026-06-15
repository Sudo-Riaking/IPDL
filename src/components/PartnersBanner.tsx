"use client";

import React from "react";

interface PartnerEntry {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  category: "fondateur" | "academique" | "institutionnel" | "bailleur";
}

const PARTNERS: PartnerEntry[] = [
  // ── Fondateurs & tutelles ──────────────────────────────────────────────────
  {
    id: "ird",
    name: "IRD",
    logoUrl: "/logos/logo_ird.webp",
    website: "https://www.ird.fr/",
    category: "fondateur",
  },
  {
    id: "sorbonne",
    name: "Sorbonne Université",
    logoUrl: "/logos/logo_sorbonne.png",
    website: "https://www.sorbonne-universite.fr/",
    category: "fondateur",
  },
  // ── Partenaires académiques ────────────────────────────────────────────────
  {
    id: "ucad",
    name: "UCAD",
    logoUrl: "/logos/logo_ucad.png",
    website: "https://www.ucad.sn/",
    category: "academique",
  },
  {
    id: "ugb",
    name: "UGB",
    logoUrl: "/logos/logo_ugb.webp",
    website: "https://www.ugb.sn/",
    category: "academique",
  },
  {
    id: "esp",
    name: "ESP — UCAD",
    logoUrl: "/logos/logo_esp.jpg",
    website: "https://www.esp.sn/",
    category: "academique",
  },
  {
    id: "vinuniversity",
    name: "VinUniversity",
    logoUrl: "/logos/logo_vinuniversity.png",
    website: "https://vinuni.edu.vn/",
    category: "academique",
  },
  {
    id: "uy1",
    name: "Université de Yaoundé I",
    logoUrl: "/logos/logo_uy1.jpg",
    website: "https://www.uy1.cm/",
    category: "academique",
  },
  {
    id: "uca",
    name: "Université Cadi Ayyad",
    logoUrl: "/logos/logo_uca.png",
    website: "https://www.uca.ma/",
    category: "academique",
  },
  {
    id: "uadb",
    name: "Univ. Alioune Diop",
    logoUrl: "/logos/logo_uadb.jpg",
    website: "https://www.uadb.edu.sn/",
    category: "academique",
  },
  // ── Partenaires institutionnels & scientifiques ────────────────────────────
  {
    id: "cirad",
    name: "CIRAD",
    logoUrl: "/logos/logo_cirad.jpg",
    website: "https://www.cirad.fr/",
    category: "institutionnel",
  },
  {
    id: "inria",
    name: "INRIA",
    logoUrl: "/logos/logo_inria.jpg",
    website: "https://www.inria.fr/",
    category: "institutionnel",
  },
  {
    id: "cnrs",
    name: "CNRS",
    logoUrl: "/logos/logo_cnrs.png",
    website: "https://www.cnrs.fr/",
    category: "institutionnel",
  },
  // ── Bailleurs ─────────────────────────────────────────────────────────────
  {
    id: "anr",
    name: "ANR",
    logoUrl: "/logos/logo_anr.png",
    website: "https://anr.fr/",
    category: "bailleur",
  },
  {
    id: "irn",
    name: "Programme IRN",
    logoUrl: "/logos/logo_irn.png",
    website: "https://www.cnrs.fr/fr/les-instituts-de-recherche-nationaux",
    category: "bailleur",
  },
];

const CATEGORY_DOT: Record<PartnerEntry["category"], string> = {
  fondateur: "bg-amber-400",
  academique: "bg-blue-400",
  institutionnel: "bg-emerald-400",
  bailleur: "bg-violet-400",
};

function PartnerCard({ partner }: { partner: PartnerEntry }) {
  const inner = (
    <div className="flex-none flex items-center gap-3 px-6 py-3 rounded-lg border border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900/60 transition-colors select-none mx-2 group">
      {partner.logoUrl ? (
        <div className="h-8 w-20 flex-none flex items-center justify-center">
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-full max-w-full object-contain opacity-75 group-hover:opacity-100 transition-opacity dark:brightness-[1.15] brightness-90"
            draggable={false}
          />
        </div>
      ) : (
        <span className="h-2 w-2 rounded-full flex-none opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: "currentColor" }}>
          <span className={`block h-full w-full rounded-full ${CATEGORY_DOT[partner.category]}`} />
        </span>
      )}
      <span className="text-[13px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors whitespace-nowrap">
        {partner.name}
      </span>
    </div>
  );

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
        {inner}
      </a>
    );
  }
  return inner;
}

export default function PartnersBanner() {
  // Double la liste pour créer la boucle sans-couture
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="border-t border-slate-900 bg-slate-950/80 py-5 overflow-hidden relative">
      {/* Étiquette */}
      <p className="text-center text-[11px] mono-text uppercase tracking-widest text-slate-600 font-bold mb-4">
        Partenaires &amp; Tutelles
      </p>

      {/* Dégradés latéraux pour l'effet "fade" */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent" />

      {/* Bande défilante */}
      <div className="flex w-max animate-partners-scroll hover:[animation-play-state:paused]">
        {doubled.map((partner, i) => (
          <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </section>
  );
}
