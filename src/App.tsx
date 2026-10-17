import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroHookSection } from './components/HeroHookSection';
import { CafeteriaHero } from './components/CafeteriaHero';
import { TaskTesterModal, TableSectionType } from './components/TaskTesterModal';
import { EmergencyCutscene } from './components/EmergencyCutscene';
import { HostelMapSelect } from './components/HostelMapSelect';
import { SwipeCardRegistration } from './components/SwipeCardRegistration';
import { DeepSpaceSections } from './components/DeepSpaceSections';
import { Footer } from './components/Footer';
import { EVENT_CONFIG } from './config/eventConfig';

export const App: React.FC = () => {
  // Modal & Navigation States
  const [activeTableModal, setActiveTableModal] = useState<TableSectionType | null>(null);
  const [isEmergencyCutscene, setIsEmergencyCutscene] = useState(false);
  const [isMapSelectOpen, setIsMapSelectOpen] = useState(false);
  const [isSwipeRegistrationOpen, setIsSwipeRegistrationOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<string>('H1');

  useEffect(() => {
    document.title = EVENT_CONFIG.title;
  }, []);

  // Triggered by the 2nd click on the Emergency Button
  const handleTriggerEmergency = () => {
    // Close other open modals
    setActiveTableModal(null);
    setIsEmergencyCutscene(true);
  };

  // Called when the Emergency Meeting cutscene finishes
  const handleCutsceneComplete = () => {
    setIsEmergencyCutscene(false);
    setIsMapSelectOpen(true);
  };

  // Called when the player selects a Hostel Map
  const handleHostelSelected = (hostelId: string) => {
    setSelectedHostel(hostelId);
    setIsMapSelectOpen(false);
    setIsSwipeRegistrationOpen(true);
  };

  // Smooth scroll helper for sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-among-cyan selection:text-black">
      {/* Top Header */}
      <Header
        onTriggerEmergency={handleTriggerEmergency}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Pre-Cafeteria Attention-Grabbing Hero Hook Section */}
        <HeroHookSection
          onTriggerEmergency={handleTriggerEmergency}
          onExploreCafeteria={() => scrollToSection('cafeteria')}
        />

        {/* Hero Section: The Skeld Cafeteria Room */}
        <CafeteriaHero
          onOpenSection={(section) => setActiveTableModal(section)}
          onTriggerEmergency={handleTriggerEmergency}
          onScrollDown={() => scrollToSection('info')}
        />

        {/* Deep Space Content Sections (Wiki Archive) */}
        <DeepSpaceSections
          onTriggerEmergency={handleTriggerEmergency}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* 1. Task Tester 2000 OS Laptop Modal (Opens on outer table click) */}
      {activeTableModal && (
        <TaskTesterModal
          section={activeTableModal}
          isOpen={true}
          onClose={() => setActiveTableModal(null)}
          onExpandSection={(secId) => scrollToSection(secId)}
        />
      )}

      {/* 2. Emergency Meeting Cutscene Sequence (Alarm, Red Strobe, Slamming Banner) */}
      {isEmergencyCutscene && (
        <EmergencyCutscene
          onComplete={handleCutsceneComplete}
        />
      )}

      {/* 3. Hostel Map Selection Screen (H1, H3, H4, H5, PnT, Girls) */}
      {isMapSelectOpen && (
        <HostelMapSelect
          onSelectHostel={handleHostelSelected}
          onClose={() => setIsMapSelectOpen(false)}
        />
      )}

      {/* 4. Admin Swipe Card Task Registration Modal */}
      {isSwipeRegistrationOpen && (
        <SwipeCardRegistration
          selectedHostel={selectedHostel}
          isOpen={true}
          onClose={() => setIsSwipeRegistrationOpen(false)}
          onSuccess={() => {
            // Keep open to show the victory banner
          }}
        />
      )}
    </div>
  );
};

export default App;

