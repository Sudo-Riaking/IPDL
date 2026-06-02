import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  animated?: boolean;
}

export default function LogoUmmisco({
  className = "",
  width = 60,
  height = 60,
  animated = false,
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 200"
      width={width}
      height={height}
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Orbite / Cercle noir incomplet */}
      <path
        d="M 50 130 A 75 75 0 1 1 50 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className={animated ? "animate-[spin_40s_linear_infinite] origin-[115px_100px]" : ""}
      />

      {/* Point bleu en haut */}
      <circle
        cx="128"
        cy="26"
        r="8.5"
        fill="#205393"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Point vert en bas */}
      <circle
        cx="92"
        cy="174"
        r="8.5"
        fill="#007a23"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Texte UMMISCO au centre */}
      <text
        x="122"
        y="107"
        fill="currentColor"
        fontSize="17"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="600"
        letterSpacing="5"
        textAnchor="middle"
      >
        UMMISCO
      </text>

      {/* Lignes horizontales à droite */}
      {/* Ligne bleue */}
      <line
        x1="88"
        y1="82"
        x2="190"
        y2="82"
        stroke="#205393"
        strokeWidth="2.5"
        className={animated ? "origin-left hover:scale-x-110 transition-transform" : ""}
      />
      {/* Ligne verte */}
      <line
        x1="88"
        y1="118"
        x2="190"
        y2="118"
        stroke="#007a23"
        strokeWidth="2.5"
        className={animated ? "origin-left hover:scale-x-110 transition-transform" : ""}
      />

      {/* Blocs d'architecture à gauche */}
      <g stroke="currentColor" strokeWidth="2" fill="none">
        {/* Rectangle 1 en haut à gauche */}
        <rect x="25" y="70" width="10" height="10" />
        {/* Rectangle 2 en haut à droite */}
        <rect x="39" y="72" width="10" height="8" />
        {/* Rectangle 3 au milieu à gauche */}
        <rect x="25" y="84" width="10" height="14" />
        {/* Rectangle 4 en bas à gauche */}
        <rect x="25" y="102" width="24" height="6" />
      </g>
    </svg>
  );
}
