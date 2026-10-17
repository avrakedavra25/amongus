import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldAlert, Compass } from 'lucide-react';
import { sound } from '../lib/sound';
import { EVENT_CONFIG } from '../config/eventConfig';

interface HeaderProps {
  onTriggerEmergency: () => void;
  onNavigateSection: (sectionId: string) => void;
  isRegistered?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onTriggerEmergency,
  onNavigateSection,
  isRegistered = false,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (sectionId: string) => {
    sound.playBlip();
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-md border-b-2 border-among-tableBorder/80 px-3 sm:px-4 py-2 sm:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Server Status Indicator (includes compact Brand on Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-1.5 sm:gap-2 bg-gray-900/90 hover:bg-gray-800 border border-gray-700 hover:border-gray-500 px-2.5 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-mono text-gray-300 shrink-0 transition-all cursor-pointer"
            title="Scroll to Top Overview"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-among-lime animate-pulse shrink-0" />
            <span className="md:hidden font-black text-white tracking-tight">AMONG US</span>
            <span className="md:hidden text-gray-500">•</span>
            <span className="hidden sm:inline font-bold text-gray-200">SERVER:</span>
            <span className="text-among-cyan font-bold truncate">IIIT Bhopal</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('cafeteria')}
            className="hidden lg:flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors uppercase font-mono px-2 py-1 shrink-0"
            title="Return to Cafeteria Hub"
          >
            <Compass className="w-3.5 h-3.5 text-among-cyan" />
            <span>Cafeteria Hub</span>
          </button>
        </div>

        {/* Center: Authentic Among Us Event Title (Visible on md+ where 3 columns fit cleanly) */}
        <div className="hidden md:flex flex-col items-center select-none text-center min-w-0 px-2">
          <div className="flex items-center gap-2">
            <h1 
              className="text-sm lg:text-xl font-black tracking-tight text-white uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: 'Press Start 2P, monospace',
                WebkitTextStroke: '1px black',
                textShadow: '0 2px 0 #000, 0 0 10px rgba(56,254,220,0.3)'
              }}
            >
              {EVENT_CONFIG.title.split(':')[0]}
            </h1>
            <span className="text-[10px] lg:text-xs bg-among-red text-white font-bold px-1.5 py-0.5 rounded border border-black shadow-sm uppercase font-mono tracking-widest whitespace-nowrap shrink-0">
              IRL EVENT
            </span>
          </div>
          <span className="text-[10px] lg:text-xs text-among-cyan tracking-widest uppercase font-mono font-semibold truncate max-w-md">
            {EVENT_CONFIG.title.split(':').slice(1).join(':').trim()} • {EVENT_CONFIG.organizer}
          </span>
        </div>

        {/* Right: Audio SFX Toggle & Emergency Register CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* SFX Mute / Unmute Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-mono font-bold border transition-all ${
              isMuted
                ? 'bg-gray-800 text-gray-400 border-gray-600 hover:border-gray-500'
                : 'bg-among-table/60 text-among-cyan border-among-cyan/60 hover:shadow-neon-cyan'
            }`}
            title={isMuted ? 'Unmute In-Game Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Turn sound effects on' : 'Turn sound effects off'}
            aria-pressed={!isMuted}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-among-cyan animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'SFX: OFF' : 'SFX: ON'}</span>
          </button>

          {/* Quick Emergency Register Button */}
          <button
            type="button"
            disabled={isRegistered}
            onClick={() => {
              if (isRegistered) return;
              sound.playButtonSlam();
              onTriggerEmergency();
            }}
            className={`flex items-center gap-1 sm:gap-1.5 font-bold text-[10px] sm:text-xs uppercase px-2.5 sm:px-3 py-1.5 rounded border-2 border-black transition-all whitespace-nowrap ${
              isRegistered
                ? 'bg-emerald-900/80 text-among-lime border-emerald-600 cursor-not-allowed opacity-90'
                : 'bg-among-red hover:bg-red-600 text-white shadow-game-button active:shadow-game-button-active active:translate-y-1'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            {isRegistered ? (
              <span>REGISTERED ✓</span>
            ) : (
              <>
                <span className="hidden sm:inline">EMERGENCY</span>
                <span>REGISTER</span>
              </>
            )}
          </button>
        </div>
      </div>

      <nav aria-label="Event sections" className="mx-auto flex max-w-7xl items-center justify-around sm:justify-center gap-1 sm:gap-3 border-t border-gray-800/80 px-1 sm:px-2 pt-1.5 pb-0.5 text-[10px] sm:text-xs font-mono uppercase">
        {[
          ['info', 'Event Info'],
          ['rules', 'Rules & Safety'],
          ['prizes', 'Prizes'],
          ['faq', 'FAQs']
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => handleNavClick(id)}
            className="shrink-0 rounded px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-gray-300 hover:text-among-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-among-cyan whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
};

