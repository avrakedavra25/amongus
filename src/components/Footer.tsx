import { ArrowUp, Terminal } from 'lucide-react';
import { sound } from '../lib/sound';
import { EVENT_CONFIG } from '../config/eventConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playBlip();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#070A10] border-t-2 border-gray-800 text-gray-400 font-mono text-xs py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Organization & Project */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
            <Terminal className="w-4 h-4 text-among-cyan" />
            <span>{EVENT_CONFIG.title}</span>
          </div>
          <p className="text-gray-500 text-[11px]">
            Organized by {EVENT_CONFIG.organizer} • All Rights Reserved
          </p>
          <p className="text-[10px] text-gray-600 mt-1 max-w-md">
            Fan-created event landing page inspired by Among Us (Innersloth LLC). Assets and thematic elements utilized for educational & campus event purposes.
          </p>
        </div>

        {/* Right: Return to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-900 border border-gray-700 text-gray-300 hover:text-among-cyan hover:border-among-cyan transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>TOP OF SHIP</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
