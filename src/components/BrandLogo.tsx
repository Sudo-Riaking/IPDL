import React from "react";

interface BrandLogoProps {
  className?: string;
  /** Rendered height of the logo image in pixels. */
  height?: number;
  /**
   * Wrap the logo in an explicit white container so the black wordmark stays
   * visible on dark backgrounds (and looks like an official badge on light).
   * Defaults to true.
   */
  withChip?: boolean;
  /** Subtle hover lift, used in the navigation bar. */
  animated?: boolean;
}

/**
 * Official UMMISCO logo (raster). The brand mark is black text on a transparent
 * background, so on dark surfaces it must sit on an explicit white chip.
 *
 * NOTE: the project theme remaps the Tailwind `white` token to an adaptive
 * color (dark in light mode), so the chip background is set with an explicit
 * `#ffffff` inline style — never `bg-white`.
 */
export default function BrandLogo({
  className = "",
  height = 40,
  withChip = true,
  animated = false,
}: BrandLogoProps) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/logo_ummisco.png"
      alt="UMMISCO — Unité Mixte Internationale de Modélisation Mathématique et Informatique des Systèmes Complexes"
      style={{ height }}
      className="w-auto object-contain select-none"
      draggable={false}
    />
  );

  if (!withChip) {
    return <span className={`inline-flex items-center ${className}`}>{img}</span>;
  }

  return (
    <span
      style={{ backgroundColor: "#ffffff" }}
      className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1.5 ring-1 ring-black/5 shadow-sm ${
        animated ? "transition-transform duration-300 hover:scale-[1.03]" : ""
      } ${className}`}
    >
      {img}
    </span>
  );
}
