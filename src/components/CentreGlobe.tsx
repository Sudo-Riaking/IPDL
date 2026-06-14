import React from "react";

// Per-centre visual identity: an accent colour and the position of the location
// node on the stylised globe (0–100 coordinates). Designed in-house — not a copy
// of any existing site.
export const CENTRE_VISUALS: Record<string, { color: string; node: [number, number] }> = {
  france: { color: "#60a5fa", node: [60, 30] },
  asie: { color: "#fb7185", node: [74, 54] },
  "afrique-ouest": { color: "#4ade80", node: [40, 64] },
  "afrique-centrale": { color: "#fbbf24", node: [54, 70] },
  mediterranee: { color: "#a78bfa", node: [34, 46] },
};

interface CentreGlobeProps {
  color: string;
  node: [number, number];
  size?: number;
  className?: string;
}

/**
 * A lightweight, stylised wireframe globe (latitude/longitude curves) with a
 * glowing location node in the centre's accent colour. Pure SVG, scalable,
 * theme-independent.
 */
export default function CentreGlobe({ color, node, size = 88, className = "" }: CentreGlobeProps) {
  const [nx, ny] = node;
  const gid = `cg-${color.replace("#", "")}-${nx}-${ny}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={gid} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="65%" stopColor={color} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow */}
      <circle cx="50" cy="50" r="47" fill={`url(#${gid})`} />

      {/* Wireframe globe */}
      <g stroke={color} strokeWidth="1" opacity="0.55">
        <circle cx="50" cy="50" r="33" />
        <ellipse cx="50" cy="50" rx="33" ry="11" />
        <ellipse cx="50" cy="50" rx="33" ry="22" opacity="0.6" />
        <ellipse cx="50" cy="50" rx="11" ry="33" />
        <ellipse cx="50" cy="50" rx="22" ry="33" opacity="0.6" />
        <line x1="17" y1="50" x2="83" y2="50" opacity="0.4" />
      </g>

      {/* Location node */}
      <circle cx={nx} cy={ny} r="6" fill={color} opacity="0.25">
        <animate attributeName="r" values="5;8;5" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={nx} cy={ny} r="3" fill={color} />
    </svg>
  );
}
