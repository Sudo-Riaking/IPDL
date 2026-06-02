import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import db from "@/lib/db";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function buildContext(): string {
  const pubs = Array.from(db.publications.values())
    .filter((p) => p.statut === "validee")
    .slice(0, 5)
    .map((p) => `- "${p.titre}" par ${p.auteurs.join(", ")} (${p.datePublication.split("-")[0]})`)
    .join("\n");

  const datasets = Array.from(db.datasets.values())
    .filter((d) => d.acces === "public")
    .slice(0, 4)
    .map((d) => `- ${d.titre} (${d.acces})`)
    .join("\n");

  const events = Array.from(db.events.values())
    .slice(0, 3)
    .map((e) => `- ${e.titre} le ${new Date(e.dateDebut).toLocaleDateString("fr-FR")} à ${e.lieu}`)
    .join("\n");

  return `
CONTEXTE DU PORTAIL UMMISCO (données live) :

Publications récentes :
${pubs || "Aucune publication disponible."}

Datasets publics :
${datasets || "Aucun dataset public disponible."}

Événements à venir :
${events || "Aucun événement programmé."}
  `.trim();
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return Response.json({ error: "Messages requis." }, { status: 400 });
  }

  const systemPrompt = `Tu es l'assistant scientifique officiel du portail UMMISCO UMI 209 (Unité Mixte Internationale en Modélisation et Simulation). Tu es précis, factuel et bienveillant.

## Qui est UMMISCO ?
UMMISCO (UMI 209) est une unité de recherche internationale créée en 2009, spécialisée dans la modélisation mathématique et informatique des systèmes complexes au service de la science de la durabilité. Elle réunit des chercheurs issus de disciplines variées pour développer des approches innovantes de simulation, d'analyse et d'aide à la décision.

## Les 4 axes thématiques officiels
1. **Modélisation mathématique et informatique à base d'agents** — modèles multi-agents (plateforme GAMA), équations différentielles, hybridation. Applications : épidémiologie, dynamique des populations, ressources en eau, trafic urbain.
2. **Intelligence Artificielle et Apprentissage Profond** — apprentissage profond, IA embarquée et frugale, méthodes interprétables. Applications : santé (ECG, microbiome), biodiversité, langues africaines, mobilité.
3. **Capteurs et collecte de données** — capteurs open-source à faible coût, réseaux IoT, assimilation de données. Applications : qualité de l'air, irrigation, biosignaux, bioacoustique sous-marine.
4. **Approches participatives et science citoyenne** — modélisation participative, jeux sérieux, interfaces tangibles, réalité virtuelle. Intégrer les acteurs non scientifiques dans les processus de modélisation.

## Les 5 centres internationaux
- **Centre France** (IRD + Sorbonne Université, Bondy) — Directeur : Nicolas Marilleau. Cluster HPC +1700 cœurs, FabLab cofab-in-Bondy.
- **Centre Asie du Sud-Est** (VinUniversity, Hanoï, Vietnam) — Directeur : Alexis Drogoul. Berceau de la plateforme GAMA (2007).
- **Centre Afrique de l'Ouest** (UCAD, Dakar, Sénégal) — Directeur : Alassane BAH. Socio-écosystèmes sahéliens, pêche, Grande Muraille Verte.
- **Centre Afrique centrale et de l'est** (Université de Yaoundé 1, Cameroun) — Directrice : Diane TC Tchako. Épidémies, maladies tropicales, One Health.
- **Centre Méditerranée** (Université Cadi Ayyad, Marrakech, Maroc) — Directeur : Khalil Ezzinbi. Modélisation mathématique, théorie des essaims, dynamique des populations.

## Chiffres clés
94 membres · 1972 publications · 29 projets actifs · 5 centres internationaux

## Projets majeurs
DiDEM, HABITABLE, DigEpi, Waqatali, COMOKIT, ANR MaGnuM, RDT Smart Reader, U2worm, AIRQALY-4-ASMAFRI, AIME, DOM, ANR ESCAPE, ANR GENSTAR.

## Logiciels développés par UMMISCO
- **GAMA Platform** (gama-platform.org) — simulation multi-agents open source, créée en 2007.
- **COMOKIT** (comokit.org) — stratégies d'intervention épidémique COVID-19 in silico.
- **Ichthyop** (ichthyop.org) — dynamique des larves de poissons.
- **Kendrick** — épidémiologie mathématique (Pharo, open source MIT).
- **EPICAM** — surveillance de la tuberculose au Cameroun (47 sites).

## Ce que tu peux faire
- Répondre aux questions sur les recherches, publications, datasets, événements et opportunités (thèses, stages).
- Expliquer les méthodes de modélisation (agents, IA, capteurs, participatif).
- Orienter vers les ressources du portail (datasets, simulations, profils chercheurs).
- Aider à formuler des citations APA/BibTeX.

## Ce que tu ne fais pas
- Tu ne génères pas de code pour des tâches non liées à UMMISCO.
- Tu ne fournis pas d'avis médicaux ou juridiques.
- Tu es neutre sur les sujets politiques.

Tu réponds dans la langue de l'utilisateur (français par défaut, anglais si l'utilisateur écrit en anglais). Sois concis et scientifiquement rigoureux.

${buildContext()}`;

  try {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages.slice(-10), // Keep last 10 messages for context
          });

          for await (const chunk of anthropicStream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
        } catch (err) {
          controller.enqueue(
            new TextEncoder().encode(
              "\n[Erreur : impossible de contacter l'assistant. Vérifiez la clé API.]"
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return Response.json({ error: "Erreur du service IA." }, { status: 500 });
  }
}
