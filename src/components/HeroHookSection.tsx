import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronDown, 
  Trophy, 
  Calendar, 
  MapPin, 
  Radio,
  Sparkles
} from 'lucide-react';
import { sound } from '../lib/sound';

interface HeroHookSectionProps {
  onTriggerEmergency: () => void;
  onExploreCafeteria: () => void;
  isRegistered?: boolean;
}

export const HeroHookSection: React.FC<HeroHookSectionProps> = ({
  onTriggerEmergency,
  onExploreCafeteria,
  isRegistered = false,
}) => {
  const [isShhhActive, setIsShhhActive] = useState(false);

  const triggerShhh = () => {
    if (isShhhActive) return;
    sound.playShhh();
    setIsShhhActive(true);
    window.setTimeout(() => {
      setIsShhhActive(false);
    }, 1800);
  };

  const handleEmergencyClick = () => {
    if (isRegistered) return;
    sound.playButtonSlam();
    onTriggerEmergency();
  };

  const handleCafeteriaClick = () => {
    sound.playBlip();
    onExploreCafeteria();
  };

  return (
    <section 
      id="hero"
      aria-label="Hero Overview"
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8 pt-8 pb-6 select-none"
    >
      {/* Deep Space Background with Atmospheric Twinkling Stars */}
      <div className="absolute inset-0 z-0 bg-[#020408] pointer-events-none" aria-hidden="true">
        <div className="absolute top-[5%] left-[12%] h-1.5 w-1.5 rounded-full bg-white star-twinkle" />
        <div className="absolute top-[18%] right-[14%] h-2 w-2 rounded-full bg-cyan-200 star-twinkle" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[52%] left-[6%] h-1 w-1 rounded-full bg-yellow-100 star-twinkle" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-[24%] right-[8%] h-2 w-2 rounded-full bg-white star-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[25%] h-1.5 w-1.5 rounded-full bg-red-200 star-twinkle" style={{ animationDelay: '1.6s' }} />
        <div className="absolute top-[35%] right-[32%] h-1 w-1 rounded-full bg-white star-twinkle" style={{ animationDelay: '2.5s' }} />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      </div>

      {/* Main 2-Column Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4">
        
        {/* Left Column: Typography, Hook & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Top Status Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0C121D] border-2 border-gray-700/80 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-among-lime animate-pulse shadow-[0_0_10px_#50EF39]" />
            <span className="text-gray-300 font-bold uppercase tracking-wider">IIIT BHOPAL</span>
            <span className="text-gray-600">•</span>
            <span className="text-among-cyan uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Radio className="w-3.5 h-3.5 text-among-cyan" />
              HOSTEL LOCKDOWN ACTIVE
            </span>
          </div>

          {/* Authentic Among Us Headline */}
          <div className="space-y-1">
            <h1 className="among-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.88] select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
              <span className="block text-among-red">WHO LIES</span>
              <span className="block text-among-cyan">AMONG US?</span>
            </h1>
          </div>

          {/* Compelling Subhead & Elevator Pitch */}
          <div className="space-y-2 max-w-2xl">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 tracking-wide font-sans">
              Hostel sectors under lockdown. Traitors right down your hallway.
            </p>
            <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed">
              The tournament happens <strong className="text-among-yellow font-semibold">right inside your hostels</strong> — zero travel required. Complete checkpoint tasks along your corridors, monitor the security feeds, and expose the impostors before your wing gets eliminated.
            </p>
          </div>

          {/* Authentic Among Us Metadata Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 bg-gray-900/90 border border-gray-700/80 px-3 py-1.5 rounded-md text-xs font-mono text-gray-200">
              <Calendar className="w-3.5 h-3.5 text-among-cyan" />
              <span>DATE & TIME: TO BE ANNOUNCED</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-900/90 border border-gray-700/80 px-3 py-1.5 rounded-md text-xs font-mono text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-among-lime" />
              <span>6 HOSTEL SECTORS</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-900/90 border border-gray-700/80 px-3 py-1.5 rounded-md text-xs font-mono text-among-yellow font-bold">
              <Trophy className="w-3.5 h-3.5 text-among-yellow" />
              <span>₹15,000 PRIZE POOL</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#1A1325] border border-purple-500/50 px-3 py-1.5 rounded-md text-xs font-mono text-purple-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ORGANIZED BY SPARK</span>
            </div>
          </div>

          {/* Action Button Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 w-full sm:w-auto">
            {/* Primary CTA: Emergency Registration */}
            <button
              onClick={handleEmergencyClick}
              disabled={isRegistered}
              className={`w-full sm:w-auto flex items-center justify-center gap-3 font-game text-sm sm:text-base px-7 py-3.5 rounded-lg border-2 transition-all uppercase tracking-wide group ${
                isRegistered
                  ? 'bg-emerald-900/80 text-among-lime border-emerald-600 cursor-not-allowed opacity-90'
                  : 'bg-among-red hover:bg-red-600 text-white border-among-darkred shadow-game-button active:shadow-game-button-active active:translate-y-1'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${isRegistered ? 'text-among-lime' : 'text-among-yellow animate-pulse group-hover:rotate-12'} transition-transform`} />
              <span>{isRegistered ? 'REGISTERED — BE READY ✓' : 'EMERGENCY REGISTER'}</span>
              {!isRegistered && <span className="text-among-yellow font-bold">→</span>}
            </button>

            {/* Secondary CTA: Enter Cafeteria */}
            <button
              onClick={handleCafeteriaClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-among-table hover:bg-among-tableHighlight text-white font-game text-sm sm:text-base px-6 py-3.5 rounded-lg border-2 border-among-tableBorder shadow-game-button active:shadow-game-button-active active:translate-y-1 transition-all uppercase tracking-wide text-gray-200 hover:text-white"
            >
              <span>ENTER CAFETERIA HUB</span>
              <ChevronDown className="w-4 h-4 text-among-cyan" />
            </button>
          </div>

        </div>

        {/* Right Column: The Iconic "SHHHHHHH!" Amogus Screen (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Subtle Ambient Radial Backlight */}
          <div 
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-600/30 via-yellow-500/20 to-red-600/25 blur-3xl pointer-events-none"
            aria-hidden="true" 
          />

          {/* The Shhhh Arcade Card */}
          <div 
            onMouseEnter={triggerShhh}
            onClick={triggerShhh}
            title="Hover to hear the iconic in-game Shhhhh sound!"
            className={`group relative cursor-pointer flex flex-col items-center justify-center p-3 sm:p-5 rounded-3xl bg-black/90 border-4 border-[#253342] shadow-[0_0_50px_rgba(239,125,13,0.3)] hover:border-among-orange transition-all duration-300 ${
              isShhhActive ? 'scale-105 border-among-yellow ring-4 ring-orange-500/40' : 'hover:scale-[1.02]'
            }`}
          >
            {/* Corner Decorative Rivets */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[#3F474E] border border-gray-600" />
            <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#3F474E] border border-gray-600" />
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-[#3F474E] border border-gray-600" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-[#3F474E] border border-gray-600" />

            {/* The Crisp Shhhh Screen Graphic */}
            <div className="relative overflow-hidden rounded-2xl bg-black flex items-center justify-center">
              <img 
                src="/shhh.png" 
                alt="Among Us Shhhhh screen"
                className={`w-64 sm:w-72 md:w-80 h-auto object-contain transition-transform duration-200 select-none ${
                  isShhhActive ? 'scale-105 rotate-[-1deg]' : 'group-hover:scale-[1.03]'
                }`}
                loading="eager"
              />

              {/* Scanline CRT Texture Overlay */}
              <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
            </div>

            {/* Crewmate Silence Directive */}
            <p className="mt-3 text-[11px] font-mono text-gray-400 text-center max-w-[260px] tracking-wide">
              CREW PROTOCOL: Silence is strictly enforced during live rounds.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Guidance: Smooth Scroll Indicator to Cafeteria Hub */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-4 pb-1">
        <button
          onClick={handleCafeteriaClick}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-among-cyan transition-all font-mono text-xs uppercase cursor-pointer"
          aria-label="Scroll down into the Cafeteria Hub"
        >
          <span className="tracking-widest font-bold text-[11px] group-hover:tracking-wider transition-all text-gray-300 group-hover:text-among-cyan">
            DESCEND INTO SKELD CAFETERIA HUB
          </span>
          <div className="w-7 h-7 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-among-cyan group-hover:bg-gray-800 transition-colors shadow-md">
            <ChevronDown className="w-4 h-4 text-among-cyan animate-bounce" />
          </div>
        </button>
      </div>

    </section>
  );
};
