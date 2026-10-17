import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, ShieldAlert, Users, Compass, AlertTriangle } from 'lucide-react';
import { sound } from '../lib/sound';
import { EVENT_CONFIG } from '../config/eventConfig';
import { Crewmate } from '../assets/crewmates';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface HostelMapSelectProps {
  onSelectHostel: (hostelId: string) => void;
  onClose: () => void;
}

export const HostelMapSelect: React.FC<HostelMapSelectProps> = ({
  onSelectHostel,
  onClose
}) => {
  const reduceMotion = useReducedMotion();
  const dialogRef = useModalAccessibility<HTMLDivElement>({ onClose, enabled: true });

  const handleHostelClick = (hostelId: string) => {
    sound.playMapSelect();
    onSelectHostel(hostelId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Map Selection Terminal Frame */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hostel-map-title"
        tabIndex={-1}
        className="relative w-full max-w-5xl rounded-xl border-4 border-among-tableBorder bg-[#0D121B] shadow-2xl p-4 sm:p-6 my-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-800 pb-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-among-red/20 border border-among-red text-among-red">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h2
                id="hostel-map-title"
                className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                SELECT MISSION SECTOR / HOSTEL
              </h2>
              <p className="text-xs font-mono text-among-cyan">
                CHOOSE YOUR OPERATIONAL BASE FOR THE HOSTEL TOURNAMENT
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            className="bg-among-red hover:bg-red-600 text-white p-1.5 rounded-lg border-2 border-black shadow active:scale-90 transition-transform"
            title="Cancel"
            aria-label="Cancel hostel selection"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* 6 Hostel Sector Cards Grid (2 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {EVENT_CONFIG.hostels.map((hostel, index) => {
            return (
              <motion.div
                key={hostel.id}
                onClick={() => handleHostelClick(hostel.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleHostelClick(hostel.id);
                  }
                }}
                onMouseEnter={() => sound.playHover()}
                role="button"
                tabIndex={0}
                aria-label={`Select ${hostel.name} as your sector. ${hostel.description}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.2, delay: index * 0.035 }}
                whileHover={reduceMotion ? undefined : { scale: 1.02, y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group relative flex cursor-pointer overflow-hidden rounded-xl border-2 border-gray-700 bg-gray-900/90 hover:border-among-cyan transition-colors duration-200 hover:shadow-neon-cyan focus-visible:outline focus-visible:outline-4 focus-visible:outline-among-cyan select-none"
              >
                {/* Sector Backdrop Art Illustration */}
                <div 
                  className="relative min-h-36 w-1/3 shrink-0 overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2"
                  style={{
                    backgroundColor: '#18202F',
                    backgroundImage: `radial-gradient(circle at 50% 50%, ${hostel.themeColor}33 0%, #111827 80%)`
                  }}
                >
                  {/* Subtle Grid and Sector Radar Lines */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38FEDC_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Authentic In-Game Map Title Badge - Placed ABOVE the character */}
                  <div className="relative z-10 bg-black/95 px-4 py-1.5 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5 group-hover:border-among-cyan transition-colors">
                    <ShieldAlert className="w-3.5 h-3.5 text-among-cyan" />
                    <span 
                      className="text-base sm:text-lg font-black text-white tracking-widest uppercase"
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {hostel.id}
                    </span>
                  </div>

                  {/* Crewmate stationed in this sector - Standing cleanly BELOW the title badge */}
                  <div className="relative z-10 opacity-90 group-hover:scale-110 transition-transform">
                    <Crewmate 
                      color={
                        hostel.id === 'H1' ? 'red' : 
                        hostel.id === 'H3' ? 'blue' : 
                        hostel.id === 'H4' ? 'green' : 
                        hostel.id === 'H5' ? 'orange' : 
                        hostel.id === 'PnT' ? 'purple' : 'pink'
                      }
                      className="w-10 h-12"
                    />
                  </div>
                </div>

                {/* Card Information Panel */}
                <div className="flex-1 p-4 bg-gray-900 border-l border-gray-800 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <h3 className="font-bold text-xs sm:text-sm text-gray-200 group-hover:text-among-cyan transition-colors leading-snug">
                        {hostel.name}
                      </h3>
                    </div>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                    {hostel.description}
                  </p>
                </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-gray-800/80 pt-2">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Users className="w-3.5 h-3.5 text-among-cyan" />
                      <span>SQUAD READY</span>
                    </div>
                    <span className="text-among-cyan font-bold group-hover:underline flex items-center gap-1">
                      DEPLOY HERE &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono bg-gray-950/80 px-4 py-2.5 rounded-lg border border-gray-800">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <AlertTriangle className="w-4 h-4 text-among-yellow shrink-0" />
            <span>Select any sector to proceed to the Admin Keycard Registration Task.</span>
          </div>
          <span className="text-among-cyan">6 SECTORS MONITORED</span>
        </div>
      </div>
    </div>
  );
};

