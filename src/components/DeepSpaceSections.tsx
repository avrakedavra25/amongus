import React from 'react';
import { 
  Calendar, Clock, MapPin, ShieldAlert, Award, 
  HelpCircle, ChevronRight, AlertOctagon, Terminal
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { Crewmate } from '../assets/crewmates';
import { sound } from '../lib/sound';
import { AsteroidField } from './AsteroidField';

interface DeepSpaceSectionsProps {
  onTriggerEmergency: () => void;
  isRegistered?: boolean;
}

export const DeepSpaceSections: React.FC<DeepSpaceSectionsProps> = ({
  onTriggerEmergency,
  isRegistered = false
}) => {
  const dateInfo = EVENT_CONFIG.infoFiles.find((item) => item.id === 'date');
  const timeInfo = EVENT_CONFIG.infoFiles.find((item) => item.id === 'time');
  const venueInfo = EVENT_CONFIG.infoFiles.find((item) => item.id === 'venue');
  const hostelIds = EVENT_CONFIG.hostels.map((hostel) => hostel.id).join(', ');
  const hostelCount = EVENT_CONFIG.hostels.length;
  return (
    <div className="relative w-full bg-black text-gray-200 overflow-hidden font-sans selection:bg-among-cyan selection:text-black">
      {/* DEEP OUTER SPACE EJECTION BACKDROP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040810] to-transparent" />
        {/* Pitch Black with Crisp Starfield Dots */}
        <div className="absolute inset-0 bg-[#02040A]" />

        {/* CSS Crisp Twinkling Stars */}
        <div className="absolute top-[5%] left-[12%] w-1.5 h-1.5 bg-white rounded-full star-twinkle" />
        <div className="absolute top-[12%] right-[18%] w-1 h-1 bg-white rounded-full star-twinkle" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[22%] left-[45%] w-2 h-2 bg-white rounded-full star-twinkle" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-[35%] right-[8%] w-1.5 h-1.5 bg-cyan-200 rounded-full star-twinkle" style={{ animationDelay: '2.4s' }} />
        <div className="absolute top-[48%] left-[20%] w-1 h-1 bg-white rounded-full star-twinkle" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[60%] right-[32%] w-2 h-2 bg-yellow-100 rounded-full star-twinkle" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-[75%] left-[10%] w-1.5 h-1.5 bg-white rounded-full star-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[88%] right-[15%] w-1 h-1 bg-white rounded-full star-twinkle" style={{ animationDelay: '1.5s' }} />

        {/* Tumbling Ejected Crewmate 1 (Red with Sprout Hat, matching the reference image) */}
        <div className="absolute top-[18%] -left-20 animate-tumble opacity-75">
          <Crewmate color="red" hat="sprout" className="w-16 h-20" />
        </div>

        {/* Tumbling Ejected Crewmate 2 (Cyan) */}
        <div 
          className="absolute top-[52%] -left-20 animate-tumble opacity-50"
          style={{ animationDuration: '32s', animationDelay: '8s' }}
        >
          <Crewmate color="cyan" hat="none" className="w-14 h-[72px]" />
        </div>

        {/* Tumbling Ejected Crewmate 3 (Yellow with Banana) */}
        <div 
          className="absolute top-[80%] -left-20 animate-tumble opacity-60"
          style={{ animationDuration: '28s', animationDelay: '14s' }}
        >
          <Crewmate color="yellow" hat="banana" className="w-12 h-16" />
        </div>
      </div>

      {/* INTERACTIVE FLOATING ASTEROIDS (Skeld Weapons: Clear Asteroids Add-on) */}
      <AsteroidField />

      {/* CONTENT PANELS STYLED LIKE THE AMONG US FANDOM WIKI / DATABASE */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        
        {/* ========================================================= */}
        {/* SECTION 1: EVENT INFO & LOGISTICS                         */}
        {/* ========================================================= */}
        <section id="info" className="scroll-mt-28">
          {/* Wiki Article Header */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-among-cyan tracking-widest uppercase mb-1">
              <Terminal className="w-4 h-4" />
              <span>ARCHIVE // MISSION_LOGISTICS_2026.LOG</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Event Briefing & Logistics
            </h2>
            <p className="mt-2 text-sm text-gray-300 font-mono">
              Complete operational briefing and registration guide for the upcoming IRL hostel tournament.
            </p>
          </div>

          {/* Quick Wiki Snapshot Grid (Inspired by the START button & Lobby options cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0E131E] border border-gray-800 rounded-lg p-4 hover:border-among-cyan/60 transition-colors">
              <div className="flex items-center gap-2 text-among-cyan mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">DATE</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">
                {dateInfo?.value ?? EVENT_CONFIG.eventDate}
              </p>
              <span className="text-xs text-gray-400 font-mono">Lobby opens {EVENT_CONFIG.reportingTime}</span>
            </div>

            <div className="bg-[#0E131E] border border-gray-800 rounded-lg p-4 hover:border-among-cyan/60 transition-colors">
              <div className="flex items-center gap-2 text-among-cyan mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">TIME</span>
              </div>
              <p className="text-lg font-bold text-white font-mono">
                {timeInfo?.value ?? EVENT_CONFIG.startTime}
              </p>
              <span className="text-xs text-gray-400 font-mono">{EVENT_CONFIG.gameDuration} game cycle</span>
            </div>

            <div className="bg-[#0E131E] border border-gray-800 rounded-lg p-4 hover:border-among-cyan/60 transition-colors">
              <div className="flex items-center gap-2 text-among-cyan mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">CENTRAL HUB</span>
              </div>
              <p className="text-sm font-bold text-white font-mono line-clamp-2">
                {venueInfo?.value ?? EVENT_CONFIG.venue}
              </p>
              <span className="text-xs text-gray-400 font-mono">Cafeteria Meeting Point</span>
            </div>

            <div className="bg-[#0E131E] border border-gray-800 rounded-lg p-4 hover:border-among-cyan/60 transition-colors">
              <div className="flex items-center gap-2 text-among-cyan mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase">SQUAD SPECS</span>
              </div>
              <p className="text-sm font-bold text-among-lime font-mono">
                10 - 15 Crewmates
              </p>
              <span className="text-xs text-among-red font-mono font-bold">2 Hidden Impostors / Sector</span>
            </div>
          </div>

          {/* Wiki Body Paragraphs with Keyword Highlights */}
          <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 bg-[#0A0E17]/80 border border-gray-800/90 rounded-xl p-6">
            <p>
              The <strong className="text-white">Hostel Protocol Event</strong> is a live, real-world adaptation of the classic 2020 social deduction phenomenon. Rather than traveling to main campus or sitting behind screens, participants are deployed physically across <span className="text-among-cyan font-bold">{hostelCount} verified hostel sectors</span> (<span className="text-gray-200">{hostelIds}</span>) right where you live — zero travel required.
            </p>
            <p>
              Each registered player is issued an authentic <strong className="text-among-yellow">Crewmate Identity Pass</strong> at the {EVENT_CONFIG.reportingLocation} check-in desk. Squads must traverse corridors, report to designated checkpoint stations, and complete physical micro-tasks (like card swipes, electrical reroutes, and puzzle decodes) to drive the sector-wide task meter to <span className="text-among-lime font-bold">100% completion</span>.
            </p>
            <div className="bg-gray-900 border-l-4 border-among-red p-4 rounded-r-lg">
              <p className="text-xs sm:text-sm text-gray-300">
                <span className="text-among-red font-bold uppercase font-mono">CRITICAL INTEL:</span> Two hidden <span className="text-among-red font-bold">Impostors</span> walk among your squad. Their directive is to disrupt task flow and quietly eliminate crewmates via non-contact tag without getting spotted. Whenever an eliminated crewmate is found, an emergency meeting is called to debate and vote someone out.
              </p>
            </div>
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 2: RULES & CODE OF CONDUCT                        */}
        {/* ========================================================= */}
        <section id="rules" className="scroll-mt-28">
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-among-orange tracking-widest uppercase mb-1">
              <AlertOctagon className="w-4 h-4" />
              <span>SECURITY_CLEARANCE // CODE_OF_CONDUCT</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Rules of Engagement
            </h2>
            <p className="mt-2 text-sm text-gray-300 font-mono">
              Mandatory safety and fair-play directives for all participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENT_CONFIG.rules.map((rule) => (
              <div 
                key={rule.id}
                className="bg-[#0A0E17]/90 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono bg-gray-900 text-gray-400 px-2 py-0.5 rounded border border-gray-800">
                      {rule.file}
                    </span>
                    {rule.isCritical && (
                      <span className="text-[10px] font-mono font-bold bg-among-red text-white px-2 py-0.5 rounded uppercase">
                        ZERO TOLERANCE
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">
                    {rule.summary}
                  </p>

                  <ul className="space-y-2 text-xs text-gray-300">
                    {rule.details.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-among-cyan shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 3: PRIZES & REWARDS                               */}
        {/* ========================================================= */}
        <section id="prizes" className="scroll-mt-28">
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-among-lime tracking-widest uppercase mb-1">
              <Award className="w-4 h-4" />
              <span>BOUNTY_REGISTRY // REWARDS_PERKS</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Prizes & Survival Perks
            </h2>
            <p className="mt-2 text-sm text-gray-300 font-mono">
              Rewards allocated for victorious crewmates and cunning impostors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EVENT_CONFIG.prizes.map((prize, idx) => (
              <div 
                key={idx}
                className="bg-[#0E131E] border-2 border-gray-800 rounded-xl p-5 hover:border-among-yellow/60 transition-all relative overflow-hidden"
              >
                {/* Top Rank Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded border uppercase"
                    style={{
                      color: prize.color,
                      borderColor: `${prize.color}66`,
                      backgroundColor: `${prize.color}15`
                    }}
                  >
                    [ {prize.badge} ]
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    {prize.rank}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {prize.title}
                </h3>

                <p className="text-sm font-mono font-bold text-gray-200">
                  {prize.reward}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ========================================================= */}
        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS                     */}
        {/* ========================================================= */}
        <section id="faq" className="scroll-mt-28">
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-among-cyan tracking-widest uppercase mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>TRANSMISSION // FREQUENTLY_ASKED_QUESTIONS</span>
            </div>
            <h2 
              className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-gray-300 font-mono">
              Clear answers for first-time players and hostel residents.
            </p>
          </div>

          <div className="space-y-4">
            {EVENT_CONFIG.faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-[#0A0E17]/90 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono bg-among-cyan/20 text-among-cyan px-2 py-0.5 rounded border border-among-cyan/40">
                    {faq.category}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 font-mono leading-relaxed pl-1 border-l-2 border-gray-700 ml-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION BANNER AT THE BOTTOM */}
        <div className="bg-gradient-to-r from-gray-900 via-[#18202F] to-gray-900 border-2 border-among-tableBorder rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 
              className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              READY TO BOARD THE SKELD?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-mono">
              Slots are capped across all 6 hostel sectors. Trigger the emergency meeting now to claim your crewmate pass.
            </p>
            <button
              disabled={isRegistered}
              onClick={() => {
                if (isRegistered) return;
                sound.playButtonSlam();
                onTriggerEmergency();
              }}
              className={`inline-flex items-center gap-2 font-black text-sm uppercase px-8 py-3.5 rounded-lg border-2 transition-all tracking-wider ${
                isRegistered
                  ? 'bg-emerald-900/80 text-among-lime border-emerald-600 cursor-not-allowed opacity-90'
                  : 'bg-among-red hover:bg-red-600 text-white border-black shadow-game-button active:shadow-game-button-active active:translate-y-1'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              <span>{isRegistered ? 'REGISTRATION COMPLETE — BE READY ✓' : 'TRIGGER EMERGENCY REGISTRATION'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
