import React from 'react';

export type CrewmateColor = 
  | 'red' | 'blue' | 'green' | 'pink' | 'orange' | 'yellow' 
  | 'black' | 'white' | 'purple' | 'brown' | 'cyan' | 'lime';

export interface ColorScheme {
  base: string;
  shadow: string;
  name: string;
}

export const CREWMATE_COLORS: Record<CrewmateColor, ColorScheme> = {
  red: { base: '#C51111', shadow: '#7A0838', name: 'Red' },
  blue: { base: '#132ED1', shadow: '#09158E', name: 'Blue' },
  green: { base: '#117F2D', shadow: '#0A4D1B', name: 'Green' },
  pink: { base: '#ED54BA', shadow: '#AB2C81', name: 'Pink' },
  orange: { base: '#EF7D0D', shadow: '#B33E15', name: 'Orange' },
  yellow: { base: '#F5F557', shadow: '#C28722', name: 'Yellow' },
  black: { base: '#3F474E', shadow: '#1E1F26', name: 'Black' },
  white: { base: '#D6E0F0', shadow: '#8394BF', name: 'White' },
  purple: { base: '#6B2FBC', shadow: '#3B177C', name: 'Purple' },
  brown: { base: '#71491E', shadow: '#46290E', name: 'Brown' },
  cyan: { base: '#38FEDC', shadow: '#24A8BE', name: 'Cyan' },
  lime: { base: '#50EF39', shadow: '#1D9828', name: 'Lime' },
};

export type HatType = 'none' | 'sprout' | 'fedora' | 'flower' | 'egg' | 'banana' | 'ninja' | 'mini';

interface CrewmateProps {
  color?: CrewmateColor;
  customBase?: string;
  customShadow?: string;
  hat?: HatType;
  flipX?: boolean;
  className?: string;
  isGhost?: boolean;
}

export const Crewmate: React.FC<CrewmateProps> = ({
  color = 'red',
  customBase,
  customShadow,
  hat = 'none',
  flipX = false,
  className = 'w-16 h-20',
  isGhost = false
}) => {
  const scheme = CREWMATE_COLORS[color] || CREWMATE_COLORS.red;
  const baseColor = customBase || scheme.base;
  const shadowColor = customShadow || scheme.shadow;

  return (
    <div className={`relative inline-block select-none ${className} ${flipX ? 'scale-x-[-1]' : ''}`}>
      <svg
        viewBox="0 0 100 125"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hat Component Rendering on top */}
        {hat === 'sprout' && (
          <g transform="translate(42, 6)">
            {/* Sprout stem */}
            <path
              d="M10 22 C10 14, 11 8, 12 2"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M10 22 C10 14, 11 8, 12 2"
              stroke="#408920"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M12 4 C6 -4, -6 0, 0 8 C6 14, 11 8, 12 4 Z"
              fill="#52C42B"
              stroke="#000000"
              strokeWidth="3"
            />
            {/* Right Leaf */}
            <path
              d="M12 4 C18 -4, 30 0, 24 8 C18 14, 13 8, 12 4 Z"
              fill="#52C42B"
              stroke="#000000"
              strokeWidth="3"
            />
          </g>
        )}

        {hat === 'flower' && (
          <g transform="translate(45, 8)">
            <circle cx="12" cy="12" r="6" fill="#F5F557" stroke="#000000" strokeWidth="3" />
            <circle cx="12" cy="2" r="5" fill="#ED54BA" stroke="#000000" strokeWidth="2.5" />
            <circle cx="22" cy="12" r="5" fill="#ED54BA" stroke="#000000" strokeWidth="2.5" />
            <circle cx="12" cy="22" r="5" fill="#ED54BA" stroke="#000000" strokeWidth="2.5" />
            <circle cx="2" cy="12" r="5" fill="#ED54BA" stroke="#000000" strokeWidth="2.5" />
          </g>
        )}

        {hat === 'fedora' && (
          <g transform="translate(30, 8)">
            <ellipse cx="25" cy="20" rx="30" ry="6" fill="#2E2016" stroke="#000" strokeWidth="3" />
            <path d="M12 18 C14 2, 36 2, 38 18 Z" fill="#4A3423" stroke="#000" strokeWidth="3" />
            <path d="M14 14 L36 14 L37 17 L13 17 Z" fill="#C51111" />
          </g>
        )}

        {hat === 'egg' && (
          <g transform="translate(40, 10)">
            <ellipse cx="14" cy="14" rx="14" ry="10" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
            <circle cx="14" cy="13" r="6" fill="#F59E0B" stroke="#000" strokeWidth="2.5" />
            <circle cx="12" cy="11" r="2" fill="#FFFFFF" />
          </g>
        )}

        {hat === 'banana' && (
          <g transform="translate(38, 2)">
            {/* Banana stem & peel top */}
            <path
              d="M16 4 C14 10, 8 18, 2 22 C10 22, 16 18, 18 14 C20 18, 26 22, 34 22 C28 18, 22 10, 20 4 Z"
              fill="#FACC15"
              stroke="#000000"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <rect x="15" y="0" width="6" height="5" rx="1" fill="#713F12" stroke="#000000" strokeWidth="2" />
          </g>
        )}

        {hat === 'ninja' && (
          <g transform="translate(30, 16)">
            {/* Ninja knot tails */}
            <path
              d="M4 6 L-8 0 L-4 8 L-9 14 L5 10 Z"
              fill="#1E293B"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Headband strap */}
            <path
              d="M3 4 C15 1, 35 1, 47 4 L48 12 C35 9, 15 9, 2 12 Z"
              fill="#1E293B"
              stroke="#000000"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Metal forehead plate */}
            <rect x="16" y="4" width="18" height="6" rx="1.5" fill="#94A3B8" stroke="#000000" strokeWidth="2" />
          </g>
        )}

        {/* BACKPACK */}
        <path
          d="M18 42 C18 34, 25 34, 26 34 L26 84 C25 84, 18 84, 18 76 Z"
          fill={shadowColor}
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* MAIN BODY BEAN */}
        {isGhost ? (
          // Ghost tail
          <path
            d="M32 30 C32 12, 78 12, 78 30 L80 82 C74 76, 68 88, 60 82 C52 76, 44 88, 36 82 L32 76 Z"
            fill={baseColor}
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
            opacity="0.85"
          />
        ) : (
          // Standard Legs & Body
          <g>
            {/* Outer body outline */}
            <path
              d="M34 32 C34 14, 76 14, 76 32 L78 86 C78 94, 72 98, 64 98 C56 98, 56 90, 56 86 L54 78 L52 86 C52 90, 52 98, 44 98 C36 98, 30 94, 30 86 Z"
              fill={baseColor}
              stroke="#000000"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Body Shadow (bottom and between legs) */}
            <path
              d="M31 78 C31 86, 36 98, 44 98 C52 98, 52 90, 52 86 L54 78 L56 86 C56 90, 56 98, 64 98 C72 98, 78 94, 78 86 L78 72 C68 76, 42 74, 31 66 Z"
              fill={shadowColor}
            />
          </g>
        )}

        {/* VISOR (GLASS HELMET FACE) */}
        <g>
          {/* Visor Shadow */}
          <path
            d="M50 32 C78 32, 94 36, 94 48 C94 60, 78 64, 50 64 C42 64, 40 60, 40 48 C40 36, 42 32, 50 32 Z"
            fill="#224251"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Visor Main Glass (Cyan/Light Blue Gradient) */}
          <path
            d="M52 35 C76 35, 91 38, 91 48 C91 58, 76 61, 52 61 C45 61, 43 58, 43 48 C43 38, 45 35, 52 35 Z"
            fill="#7BE2E7"
          />
          {/* Visor Dark Lower Reflection */}
          <path
            d="M44 48 C44 58, 52 61, 62 61 C78 61, 90 56, 91 50 C80 54, 56 54, 44 48 Z"
            fill="#3F7A8D"
          />
          {/* Visor White Specular Glint */}
          <ellipse
            cx="60"
            cy="42"
            rx="12"
            ry="4.5"
            transform="rotate(-10 60 42)"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    </div>
  );
};

