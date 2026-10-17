import React, { useEffect, useState } from 'react';
import { sound } from '../lib/sound';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface EmergencyCutsceneProps {
  onComplete: () => void;
}

export const EmergencyCutscene: React.FC<EmergencyCutsceneProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'slam' | 'hold' | 'fade'>('slam');
  const dialogRef = useModalAccessibility<HTMLDivElement>({ onClose: onComplete, enabled: true, closeOnEscape: false });

  useEffect(() => {
    // 1. Play authentic emergency alarm siren and dramatic stinger
    sound.playEmergencyAlarm();

    // 2. Banner impact slam completes in 300ms
    const slamTimer = setTimeout(() => {
      setStage('hold');
    }, 400);

    // 3. Fade out and proceed to map selection after 1800ms
    const finishTimer = setTimeout(() => {
      setStage('fade');
      setTimeout(onComplete, 400);
    }, 1900);

    return () => {
      clearTimeout(slamTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-cutscene-title"
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        stage === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Flashing Red Emergency Ambient Lighting */}
      <div className="absolute inset-0 bg-among-red/40 animate-strobe pointer-events-none" />

      {/* Screen Shake Container */}
      <div className="relative w-full flex items-center justify-center px-4">
        {/* Authentic In-Game Black & Yellow Hazard Banner */}
        <div
          className={`relative w-full max-w-4xl py-6 sm:py-8 border-y-8 border-black shadow-[0_0_80px_rgba(197,17,17,0.9)] transition-all duration-300 transform select-none ${
            stage === 'slam'
              ? 'scale-[2.4] opacity-80'
              : 'scale-100 opacity-100'
          }`}
          style={{
            backgroundColor: '#1E1F26',
            boxShadow: '0 0 60px #C51111, inset 0 0 30px #000'
          }}
        >
          {/* Top Yellow & Black Hazard Stripes Bar */}
          <div className="absolute top-0 left-0 right-0 h-3 hazard-stripes border-b border-black" />

          {/* Center Banner Text with In-Game Outline */}
          <div className="text-center py-2">
            <h1
              id="emergency-cutscene-title"
              className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-wider"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                WebkitTextStroke: '2px black',
                textShadow: '0 4px 0 #000, 0 0 30px #F5F557'
              }}
            >
              EMERGENCY MEETING
            </h1>
            <p className="mt-2 text-sm sm:text-base font-mono font-bold text-among-yellow uppercase tracking-widest animate-pulse">
              ALL CREWMATES ASSEMBLE — REGISTRATION PROTOCOL INITIATED
            </p>
          </div>

          {/* Bottom Yellow & Black Hazard Stripes Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-3 hazard-stripes border-t border-black" />
        </div>
      </div>
    </div>
  );
};

