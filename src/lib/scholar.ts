/**
 * Helpers to reference publications through external scholarly services.
 *
 * UMMISCO does not host article PDFs: publications are validated by
 * international journals and simply *referenced* on the portal (exactly like
 * Google Scholar). These helpers build the outbound links the portal exposes
 * for every publication — a Google Scholar lookup and the canonical DOI.
 */

export interface ScholarLike {
  title: string;
  doi?: string;
}

/** Google Scholar lookup for a publication (by DOI when available, else title). */
export function scholarUrl(pub: ScholarLike): string {
  const query = pub.doi ? `doi:${pub.doi}` : pub.title;
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
}

/** Canonical DOI resolver URL, or undefined when no DOI is registered. */
export function doiUrl(doi?: string): string | undefined {
  return doi ? `https://doi.org/${doi}` : undefined;
}

/** Lab-wide Google Scholar listing of UMMISCO publications. */
export const UMMISCO_SCHOLAR_SEARCH =
  "https://scholar.google.com/scholar?q=UMMISCO+IRD+Sorbonne+complex+systems+modeling";
