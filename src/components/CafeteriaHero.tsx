import React, { useState } from 'react';
import { ChevronDown, Laptop, Sparkles } from 'lucide-react';
import { sound } from '../lib/sound';
import { Crewmate, CrewmateColor, HatType } from '../assets/crewmates';
import { TableSectionType } from './TaskTesterModal';
import { EVENT_CONFIG } from '../config/eventConfig';

interface CafeteriaHeroProps {
  onOpenSection: (section: TableSectionType) => void;
  onTriggerEmergency: () => void;
  onScrollDown: () => void;
}

interface TableCrewmate {
  id: string;
  color: CrewmateColor;
  hat: HatType;
  name: string;
  defaultQuote: string;
  urgentQuote: string;
  xPercent: number; // exact % in 1200x700 coordinate space
  yPercent: number;
  bubblePosition?: 'top' | 'bottom';
  flipX?: boolean;
}

// 4 Outer Corner Tables (1200x700 viewBox coordinates)
// Top-Left: (180, 190) -> left: 15%, top: 27.1%
// Top-Right: (1020, 190) -> left: 85%, top: 27.1%
// Bottom-Left: (180, 530) -> left: 15%, top: 75.7%
// Bottom-Right: (1020, 530) -> left: 85%, top: 75.7%
const OUTER_TABLES: Array<{
  id: TableSectionType;
  label: string;
  description: string;
  xPercent: number;
  yPercent: number;
}> = [
  { id: 'info', label: 'EVENT INFO', description: 'DATE • TIME • VENUE', xPercent: 15.0, yPercent: 27.1 },
  { id: 'rules', label: 'RULES & SAFETY', description: 'CREW PROTOCOL', xPercent: 85.0, yPercent: 27.1 },
  { id: 'faq', label: 'FAQS', description: 'NEWCOMER GUIDE', xPercent: 15.0, yPercent: 75.7 },
  { id: 'prizes', label: 'PRIZES', description: 'BOUNTIES & REWARDS', xPercent: 85.0, yPercent: 75.7 }
];

export const CafeteriaHero: React.FC<CafeteriaHeroProps> = ({
  onOpenSection,
  onTriggerEmergency,
  onScrollDown
}) => {
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const [isButtonDepressed, setIsButtonDepressed] = useState(false);
  const [hoveredCrewmate, setHoveredCrewmate] = useState<string | null>(null);

  // 7 Crewmates positioned around the CENTRAL MEETING TABLE (center at 50%, 51.4%)
  // All standing comfortably OUTSIDE the table on the floor tiles
  const crewmates: TableCrewmate[] = [
    {
      id: 'red',
      color: 'red',
      hat: 'sprout',
      name: 'Red',
      defaultQuote: `Date & time to be announced soon! Venue: ${EVENT_CONFIG.venue}.`,
      urgentQuote: 'WHAT ARE YOU WAITING FOR, REGISTER NOW!!',
      xPercent: 50.0,
      yPercent: 32.5,
      bubblePosition: 'top',
      flipX: false
    },
    {
      id: 'yellow',
      color: 'yellow',
      hat: 'banana',
      name: 'Yellow',
      defaultQuote: 'Check the rules laptop before entering Electrical sector!',
      urgentQuote: 'REGISTER NOW BEFORE THE SLOTS FILL UP!',
      xPercent: 41.0,
      yPercent: 39.0,
      bubblePosition: 'top',
      flipX: false
    },
    {
      id: 'pink',
      color: 'pink',
      hat: 'flower',
      name: 'Pink',
      defaultQuote: `${EVENT_CONFIG.entryFee}; bring your student ID card!`,
      urgentQuote: 'HIT THAT BUTTON! REGISTER NOW!',
      xPercent: 59.0,
      yPercent: 39.0,
      bubblePosition: 'top',
      flipX: true
    },
    {
      id: 'green',
      color: 'green',
      hat: 'none',
      name: 'Green',
      defaultQuote: `Squad size: ${EVENT_CONFIG.squadSize}.`,
      urgentQuote: 'WHAT ARE YOU WAITING FOR?! SIGN UP NOW!!',
      xPercent: 36.5,
      yPercent: 50.0,
      bubblePosition: 'top',
      flipX: false
    },
    {
      id: 'cyan',
      color: 'cyan',
      hat: 'sprout',
      name: 'Cyan',
      defaultQuote: 'Never played Among Us before? Anyone can jump right in!',
      urgentQuote: 'DONT DELAY! COMPLETE YOUR CREWMATE REGISTRATION NOW!',
      xPercent: 63.5,
      yPercent: 50.0,
      bubblePosition: 'top',
      flipX: true
    },
    {
      id: 'blue',
      color: 'blue',
      hat: 'none',
      name: 'Blue',
      defaultQuote: 'Reporting a body pauses the sector for a 3-minute vote.',
      urgentQuote: 'PRESS THE BUTTON! JOIN THE LOBBY NOW!',
      xPercent: 41.5,
      yPercent: 65.5,
      bubblePosition: 'bottom',
      flipX: false
    },
    {
      id: 'purple',
      color: 'purple',
      hat: 'ninja',
      name: 'Purple',
      defaultQuote: 'Eliminations are strictly zero-contact tag only!',
      urgentQuote: 'QUICK! REGISTER BEFORE IMPOSTORS SABOTAGE!',
      xPercent: 58.5,
      yPercent: 65.5,
      bubblePosition: 'bottom',
      flipX: true
    }
  ];

  // Stage 1: Flip open protective glass case
  const handleGlassClick = () => {
    sound.playGlassOpen();
    setIsCaseOpen(true);
  };

  // Stage 2: Slam the red Emergency Button
  const handleButtonClick = () => {
    if (!isCaseOpen) {
      handleGlassClick();
      return;
    }
    sound.playButtonSlam();
    setIsButtonDepressed(true);
    window.setTimeout(() => {
      onTriggerEmergency();
      setIsButtonDepressed(false);
    }, 250);
  };

  return (
    <section
      id="cafeteria"
      className="relative min-h-[calc(100svh-4rem)] w-full flex flex-col items-center justify-center gap-2 overflow-hidden bg-[#05090d] px-2 py-2 select-none"
    >
      {/* Outer Space Background visible outside ship's cafeteria hull */}
      <div className="absolute inset-0 z-0 bg-[#040810] pointer-events-none" aria-hidden="true">
        <div className="absolute top-[8%] left-[6%] h-1.5 w-1.5 rounded-full bg-white star-twinkle" />
        <div className="absolute top-[20%] right-[10%] h-2 w-2 rounded-full bg-white star-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[18%] right-[8%] h-2 w-2 rounded-full bg-white star-twinkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] left-[10%] h-1.5 w-1.5 rounded-full bg-yellow-100 star-twinkle" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* THE SPATIOUS SKELD CAFETERIA HALL (Strictly bounded to 1200x700 aspect ratio) */}
      <div 
        className="cafeteria-room relative z-10 rounded-[2%] border-[4px] border-[#182329] shadow-[0_20px_70px_rgba(0,0,0,.9)] sm:border-[6px]"
      >
        {/* INLINE VECTOR SKELD CAFETERIA (100% immune to browser caching bugs) */}
        <svg 
          viewBox="0 0 1200 700" 
          className="w-full h-full block rounded-[2%] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Diamond Tile Pattern */}
            <pattern id="cafeteriaTilePattern" width="52" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="52" height="52" fill="#8E99A4"/>
              <path d="M0 0H52M0 0V52" fill="none" stroke="#78848F" strokeWidth="2"/>
              <path d="M26 0V52M0 26H52" fill="none" stroke="#A2ADB8" strokeWidth="1" opacity=".6"/>
            </pattern>

            {/* Wall Gradient */}
            <linearGradient id="cafeteriaWallGrad" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#557585"/>
              <stop offset="1" stopColor="#364E59"/>
            </linearGradient>

            {/* Space Window Gradient */}
            <linearGradient id="cafeteriaWindowGrad" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#020409"/>
              <stop offset="1" stopColor="#0B1320"/>
            </linearGradient>

            {/* Floor Boundary Clip */}
            <clipPath id="cafeteriaFloorClip">
              <path d="M120 70 H1080 L1155 145 V520 L1020 655 H680 V690 H520 V655 H180 L45 520 V145 Z"/>
            </clipPath>

            {/* Reusable Blue Outer Cafeteria Table */}
            <g id="cornerTable">
              {/* Crescent Outer Chairs */}
              <path d="M-45-55 A72 72 0 0 0 -72-20 L-90-25 A92 92 0 0 1 -56-72 Z" fill="#244F67" stroke="#122A38" strokeWidth="3"/>
              <path d="M45-55 A72 72 0 0 1 72-20 L90-25 A92 92 0 0 0 56-72 Z" fill="#244F67" stroke="#122A38" strokeWidth="3"/>
              <path d="M-72 20 A72 72 0 0 0 -45 55 L-56 72 A92 92 0 0 1 -90 25 Z" fill="#244F67" stroke="#122A38" strokeWidth="3"/>
              <path d="M72 20 A72 72 0 0 1 45 55 L56 72 A92 92 0 0 0 90 25 Z" fill="#244F67" stroke="#122A38" strokeWidth="3"/>
              
              {/* Main Blue Circular Tabletop (r = 66) */}
              <circle r="66" fill="#3A7293" stroke="#173446" strokeWidth="5"/>
              <path d="M-46-46 Q0-64 46-46" fill="none" stroke="#68A5C7" strokeWidth="3.5" opacity=".8"/>
              <circle r="60" fill="none" stroke="#2B5975" strokeWidth="2" opacity=".4"/>
            </g>

            {/* Papers / Folders on tables */}
            <g id="decorPaper" fill="#EAE4C8" stroke="#3D4542" strokeWidth="2">
              <path d="M-12-8 L10-12 L20 6 L-2 10 Z"/>
              <path d="M-6-3 L8-6" fill="none"/>
            </g>
          </defs>

          {/* Deep Space Background Behind Room */}
          <rect width="1200" height="700" fill="#03060B"/>

          {/* Ship Hull Outer Wall */}
          <path d="M110 30 H1090 L1175 125 V535 L1035 675 H690 V700 H510 V675 H165 L25 535 V125 Z" fill="#131B21" stroke="#080C0E" strokeWidth="14"/>
          
          {/* Metallic Teal Inner Rim */}
          <path d="M118 45 H1082 L1158 135 V525 L1022 660 H680 V692 H520 V660 H178 L42 525 V135 Z" fill="url(#cafeteriaWallGrad)" stroke="#22333B" strokeWidth="8"/>

          {/* Spacious Diamond Floor */}
          <rect x="20" y="60" width="1160" height="610" fill="url(#cafeteriaTilePattern)" clipPath="url(#cafeteriaFloorClip)"/>

          {/* Top Windows with Stars */}
          <g fill="#1F2F38" stroke="#121D23" strokeWidth="4">
            <rect x="260" y="48" width="80" height="36" rx="4"/>
            <rect x="355" y="48" width="80" height="36" rx="4"/>
            <rect x="450" y="48" width="80" height="36" rx="4"/>
            <rect x="545" y="48" width="110" height="36" rx="4"/>
            <rect x="670" y="48" width="80" height="36" rx="4"/>
            <rect x="765" y="48" width="80" height="36" rx="4"/>
            <rect x="860" y="48" width="80" height="36" rx="4"/>
          </g>
          <g fill="url(#cafeteriaWindowGrad)" opacity=".95">
            <rect x="266" y="53" width="68" height="26" rx="2"/>
            <rect x="361" y="53" width="68" height="26" rx="2"/>
            <rect x="456" y="53" width="68" height="26" rx="2"/>
            <rect x="551" y="53" width="98" height="26" rx="2"/>
            <rect x="676" y="53" width="68" height="26" rx="2"/>
            <rect x="771" y="53" width="68" height="26" rx="2"/>
            <rect x="866" y="53" width="68" height="26" rx="2"/>
          </g>
          <g fill="#FFFFFF" opacity=".7">
            <circle cx="280" cy="62" r="1.5"/><circle cx="395" cy="67" r="1.2"/>
            <circle cx="485" cy="58" r="1.5"/><circle cx="580" cy="65" r="2"/>
            <circle cx="615" cy="60" r="1.2"/><circle cx="710" cy="66" r="1.5"/>
            <circle cx="810" cy="59" r="1.2"/><circle cx="895" cy="63" r="1.5"/>
          </g>

          {/* Side Corridor Entrances */}
          <g fill="#435C66" stroke="#1D2A2F" strokeWidth="5">
            <rect x="24" y="270" width="20" height="120" rx="2"/>
            <rect x="1156" y="270" width="20" height="120" rx="2"/>
          </g>
          <g stroke="#263A42" strokeWidth="3">
            <path d="M28 280 V380 M34 280 V380 M1166 280 V380 M1172 280 V380"/>
          </g>

          {/* Bottom Entrance */}
          <path d="M520 655 H680 V692 H520 Z" fill="#2E444D" stroke="#18252B" strokeWidth="5"/>
          <rect x="535" y="662" width="130" height="24" rx="3" fill="#4B6975" stroke="#1D2C33" strokeWidth="3"/>
          <path d="M545 667 H655 M545 673 H655 M545 679 H655" stroke="#2E454F" strokeWidth="2"/>

          {/* 4 CORNER OUTER TABLES (Clean blue tables with only laptops) */}
          <g id="drawnTables">
            {/* Top-Left Table (180, 190) */}
            <g transform="translate(180 190)">
              <use href="#cornerTable"/>
            </g>

            {/* Top-Right Table (1020, 190) */}
            <g transform="translate(1020 190)">
              <use href="#cornerTable"/>
            </g>

            {/* Bottom-Left Table (180, 530) */}
            <g transform="translate(180 530)">
              <use href="#cornerTable"/>
            </g>

            {/* Bottom-Right Table (1020, 530) */}
            <g transform="translate(1020 530)">
              <use href="#cornerTable"/>
            </g>

            {/* CENTRAL EMERGENCY MEETING TABLE (600, 360) */}
            <g transform="translate(600 360)">
              {/* 6 Curved Crescent Benches for Crewmates */}
              <g fill="#244F67" stroke="#122A38" strokeWidth="3.5">
                <path d="M-55-80 A100 100 0 0 0 -90-30 L-110-38 A124 124 0 0 1 -70-100 Z"/>
                <path d="M55-80 A100 100 0 0 1 90-30 L110-38 A124 124 0 0 0 70-100 Z"/>
                <path d="M-105 0 A100 100 0 0 0 -90 45 L-110 55 A124 124 0 0 1 -124 0 Z"/>
                <path d="M105 0 A100 100 0 0 1 90 45 L110 55 A124 124 0 0 0 124 0 Z"/>
                <path d="M-55 80 A100 100 0 0 0 -25 95 L-30 118 A124 124 0 0 1 -70 100 Z"/>
                <path d="M55 80 A100 100 0 0 1 25 95 L30 118 A124 124 0 0 0 70 100 Z"/>
              </g>
              
              {/* Big Blue Cafeteria Tabletop (r = 85) */}
              <circle r="85" fill="#326B8C" stroke="#132F40" strokeWidth="6"/>
              <circle r="78" fill="none" stroke="#5294BA" strokeWidth="3.5" opacity=".7"/>
              <circle r="72" fill="#295B78"/>
              <circle r="38" fill="#1E455C" stroke="#112836" strokeWidth="2"/>
            </g>
          </g>
        </svg>

        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-20" aria-hidden="true" />

        {/* 4 OUTER TABLE LAPTOPS (Only the sleek laptop and floating label above) */}
        {OUTER_TABLES.map((table) => (
          <button
            type="button"
            key={table.id}
            onClick={() => {
              sound.playBlip();
              onOpenSection(table.id);
            }}
            onMouseEnter={() => sound.playHover()}
            style={{ left: `${table.xPercent}%`, top: `${table.yPercent}%`, transform: 'translate(-50%, -50%)' }}
            aria-label={`${table.label}. Open ${table.id} details.`}
            className="group absolute z-20 flex flex-col items-center justify-center rounded-xl bg-transparent transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-4 focus-visible:outline-among-cyan select-none"
          >
            {/* Floating Pixel Label above table */}
            <span className="mb-0.5 sm:mb-1 rounded-md border-2 border-black bg-[#162228]/95 px-1.5 sm:px-2.5 py-0.5 text-[6.5px] sm:text-[8px] md:text-[10px] font-mono font-bold tracking-wider text-white shadow-lg group-hover:border-among-cyan group-hover:text-among-cyan group-hover:shadow-neon-cyan transition-all whitespace-nowrap">
              {table.label}
            </span>

            {/* In-Game Lobby Laptop sitting cleanly on table */}
            <div className="relative flex flex-col items-center my-0.5">
              <div className="relative flex h-5.5 w-8 sm:h-7 sm:w-10 md:h-9 md:w-13 items-center justify-center rounded-sm border-2 border-black bg-[#1E2B24] shadow-[0_3px_0_#10181c] group-hover:shadow-neon-cyan transition-shadow">
                {/* Screen with Scanlines */}
                <div className="h-3.5 w-6 sm:h-4.5 sm:w-7.5 md:h-5.5 md:w-9 rounded-xs bg-[#081C15] group-hover:bg-among-cyan/25 border border-gray-600 flex items-center justify-center transition-colors">
                  <Laptop className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-among-cyan group-hover:scale-110 transition-transform" aria-hidden="true" />
                </div>
              </div>
              <div className="h-1 sm:h-1.5 w-9 sm:w-11 md:w-15 bg-gray-800 border-2 border-black rounded-b-xs" />
            </div>
          </button>
        ))}

        {/* 7 CREWMATES (Positioned around the central table at 50%, 51.4%, standing ON THE FLOOR) */}
        {crewmates.map((crew) => {
          const isHovered = hoveredCrewmate === crew.id;
          return (
            <div
              key={crew.id}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredCrewmate(crew.id);
              }}
              onMouseLeave={() => setHoveredCrewmate(null)}
              onClick={() => {
                sound.playHover();
                setHoveredCrewmate(isHovered ? null : crew.id);
              }}
              style={{ left: `${crew.xPercent}%`, top: `${crew.yPercent}%`, transform: 'translate(-50%, -50%)' }}
              className="absolute z-30 cursor-pointer flex flex-col items-center transition-transform hover:scale-115 select-none"
            >
              {/* Speech Bubble on Hover with directional tail pointing to speaker */}
              {isHovered && (
                <div 
                  className={`absolute z-40 w-44 sm:w-56 rounded-xl border-2 border-black bg-white p-1.5 sm:p-2 text-center text-[9px] sm:text-xs font-mono font-bold text-gray-900 shadow-2xl pointer-events-none animate-fadeIn ${
                    crew.bubblePosition === 'bottom' 
                      ? 'top-full mt-2.5 bubble-tail-top' 
                      : 'bottom-full mb-2.5 bubble-tail-bottom'
                  }`}
                >
                  <span className={isCaseOpen ? 'text-among-red animate-pulse' : 'text-gray-900'}>
                    {isCaseOpen ? crew.urgentQuote : crew.defaultQuote}
                  </span>
                </div>
              )}

              {/* Player Name Tag */}
              <span className="mb-0.5 rounded border border-gray-800 bg-black/85 px-0.5 sm:px-1 py-0.2 text-[6px] sm:text-[7px] md:text-[9px] font-mono font-bold text-white shadow">
                {crew.name}
              </span>

              {/* Crewmate Sprite */}
              <Crewmate
                color={crew.color}
                hat={crew.hat}
                flipX={crew.flipX}
                className="h-7 w-5.5 sm:h-10 sm:w-8 md:h-13 md:w-10 drop-shadow-md"
              />
            </div>
          );
        })}

        {/* CENTRAL EMERGENCY BUTTON CONSOLE (Dead Center of the Meeting Table: 50%, 50%) */}
        <div
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          className="absolute z-40 flex h-11 w-11 sm:h-14 sm:w-14 md:h-17 md:w-17 aspect-square items-center justify-center rounded-full border-2 sm:border-3 border-black bg-[#161f26] p-0.5 sm:p-1 shadow-[0_6px_20px_rgba(0,0,0,0.85)] perspective-container"
        >
          {/* Yellow & Black Circular Hazard Stripes Ring */}
          <div className="absolute inset-0 rounded-full hazard-stripes opacity-90 border border-black pointer-events-none" />

          {/* Inner Circular Metal Well */}
          <div className="relative z-10 flex h-full w-full aspect-square items-center justify-center rounded-full bg-[#0a1015] border-2 border-black p-0.5 shadow-inner">
            
            {/* The Red Emergency Button - Strictly Circular */}
            <button
              type="button"
              onClick={handleButtonClick}
              aria-label={isCaseOpen ? 'Press emergency button to register' : 'Emergency button locked under safety cover'}
              className={`relative z-10 flex aspect-square h-[84%] w-[84%] shrink-0 items-center justify-center rounded-full border-2 border-black text-white font-black select-none transition-all ${
                isButtonDepressed ? 'scale-95 shadow-none' : 'hover:scale-105 active:scale-95'
              }`}
              style={{
                backgroundColor: '#C51111',
                boxShadow: isButtonDepressed ? 'none' : '0 3.5px 0 #7A0838, 0 4px 8px rgba(0,0,0,0.75)'
              }}
              title={isCaseOpen ? 'Press to trigger Emergency Registration' : 'Click glass cover first'}
            >
              {/* Scalable Vector Label Guaranteed Never to Crop */}
              <svg viewBox="0 0 100 100" className="w-[88%] h-[88%] pointer-events-none select-none">
                <text
                  x="50"
                  y="46"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontWeight="900"
                  fontSize="12.5"
                  fontFamily="'Space Grotesk', sans-serif"
                  letterSpacing="-0.3"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.95))' }}
                >
                  EMERGENCY
                </text>
                <text
                  x="50"
                  y="65"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FEF08A"
                  fontWeight="800"
                  fontSize="10"
                  fontFamily="monospace"
                  letterSpacing="0.5"
                  style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.9))' }}
                >
                  {isCaseOpen ? 'PRESS' : 'LOCKED'}
                </text>
              </svg>
            </button>

            {/* 3D Circular Glass Safety Casing (Flips open backwards on Click 1) */}
            <button
              type="button"
              onClick={handleGlassClick}
              aria-label={isCaseOpen ? 'Safety cover open' : 'Open emergency button safety cover'}
              aria-expanded={isCaseOpen}
              disabled={isCaseOpen}
              className={`glass-cover absolute -inset-0.5 z-20 cursor-pointer rounded-full border-2 border-white/80 transition-all duration-500 origin-top flex items-center justify-center ${
                isCaseOpen
                  ? 'glass-cover-open pointer-events-none opacity-20'
                  : 'opacity-90 hover:border-among-cyan hover:shadow-neon-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'
              }`}
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, rgba(56,254,220,0.2) 50%, rgba(255,255,255,0.15) 100%)',
                backdropFilter: 'blur(1px)',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5), 0 3px 8px rgba(0,0,0,0.6)'
              }}
              title="Click to flip open glass safety cover"
            >
              {/* Curved Glass Specular Glint */}
              <div className="absolute top-1 left-2 right-2 h-1.5 sm:h-2 bg-white/50 rounded-full blur-[0.5px] pointer-events-none" />
              
              {!isCaseOpen && (
                <div className="bg-black/90 px-1 sm:px-1.5 py-0.5 rounded text-[5px] sm:text-[6.5px] font-mono font-bold text-among-yellow border border-yellow-500 whitespace-nowrap animate-pulse shadow-md">
                  OPEN
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR TO DEEP SPACE WIKI */}
      <button
        type="button"
        onClick={() => {
          sound.playBlip();
          onScrollDown();
        }}
        className="relative z-20 flex items-center gap-2 rounded-full border border-gray-700 bg-gray-950/90 px-4 py-1.5 text-center text-[10px] sm:text-xs font-mono font-bold text-gray-300 transition-all hover:border-among-cyan hover:text-among-cyan"
      >
        <Sparkles className="h-3.5 w-3.5 text-among-cyan" aria-hidden="true" />
        <span>SCROLL DOWN TO ACCESS DEEP SPACE WIKI</span>
        <ChevronDown className="h-4 w-4 text-among-cyan" aria-hidden="true" />
      </button>
    </section>
  );
};
