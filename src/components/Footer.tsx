import React from "react";
import Link from "next/link";
import LogoUmmisco from "./LogoUmmisco";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <LogoUmmisco width={48} height={40} />
              <span className="text-base font-extrabold tracking-wider uppercase">UMMISCO</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Unité Mixte Internationale UMI 209 — spécialisée dans la modélisation des systèmes complexes au service de la science de la durabilité. 5 centres internationaux, 94 membres, 1972 publications.
            </p>
          </div>

          {/* Research axes links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-ummisco-blue pl-2">
              Axes de Recherche
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/axes" className="hover:text-slate-200 transition-colors">Agents & Modélisation</Link>
              </li>
              <li>
                <Link href="/axes" className="hover:text-slate-200 transition-colors">IA & Apprentissage Profond</Link>
              </li>
              <li>
                <Link href="/axes" className="hover:text-slate-200 transition-colors">Capteurs & Collecte de données</Link>
              </li>
              <li>
                <Link href="/axes" className="hover:text-slate-200 transition-colors">Approches participatives</Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-ummisco-blue pl-2">
              Ressources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/publications" className="hover:text-slate-200 transition-colors">Publications Scientifiques</Link>
              </li>
              <li>
                <Link href="/simulations" className="hover:text-slate-200 transition-colors">Simulateurs Doctoraux</Link>
              </li>
              <li>
                <Link href="/#datasets" className="hover:text-slate-200 transition-colors">Catalogues de Datasets</Link>
              </li>
              <li>
                <Link href="/#chercheurs" className="hover:text-slate-200 transition-colors">Annuaire des Chercheurs</Link>
              </li>
              <li>
                <Link href="/connexion" className="hover:text-slate-200 transition-colors">Espace Connecté</Link>
              </li>
            </ul>
          </div>

          {/* Contacts & Locations */}
          <div className="space-y-3 text-xs text-slate-500">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-ummisco-blue pl-2">
              Contacts & Sites
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-slate-600 flex-none mt-0.5" />
              <span>**ESP UCAD** : Route de Ouakam, BP 5085, Dakar-Fann, Sénégal.</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-slate-600 flex-none mt-0.5" />
              <span>**Site de Hann** : Campus IRD de Hann, Route des Pères Maristes, Dakar.</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-600 flex-none" />
              <span>contact.ummisco@ucad.edu.sn</span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 gap-4">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} UMMISCO UMI 209 — Tous droits réservés.</span>
            <span>·</span>
            <span>IRD & Sorbonne Université</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            <span>Portail Institutionnel International</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
