import React, { useState } from 'react';
import { X, ArrowLeft, Home, FileText, ChevronRight, ExternalLink } from 'lucide-react';
import { sound } from '../lib/sound';
import { EVENT_CONFIG } from '../config/eventConfig';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

export type TableSectionType = 'info' | 'rules' | 'faq' | 'prizes';

interface TaskTesterModalProps {
  section: TableSectionType;
  isOpen: boolean;
  onClose: () => void;
  onExpandSection: (sectionId: string) => void;
}

interface FileItem {
  id: string;
  name: string;
  isRed?: boolean;
  title: string;
  content: string;
  details?: string[];
  iconType?: string;
}

export const TaskTesterModal: React.FC<TaskTesterModalProps> = ({
  section,
  isOpen,
  onClose,
  onExpandSection
}) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeSection, setActiveSection] = useState(section);
  const [isAtHome, setIsAtHome] = useState(false);
  const dialogRef = useModalAccessibility<HTMLDivElement>({ onClose, enabled: isOpen });

  React.useEffect(() => {
    setActiveSection(section);
    setSelectedFile(null);
    setIsAtHome(false);
  }, [section]);

  if (!isOpen) return null;

  // Build the list of .exe files based on the active table section
  const getSectionData = (): { path: string; files: FileItem[]; folderTitle: string } => {
    switch (activeSection) {
      case 'info':
        return {
          path: 'Nav\\Info\\',
          folderTitle: 'Sector Event Logistics',
          files: EVENT_CONFIG.infoFiles.map((info) => ({
            id: info.id,
            name: info.name,
            title: info.title,
            content: info.value,
            details: [info.description]
          }))
        };

      case 'rules':
        return {
          path: 'Nav\\Rules\\',
          folderTitle: 'Safety & Code of Conduct',
          files: EVENT_CONFIG.rules.map(r => ({
            id: r.id,
            name: r.file,
            isRed: r.isCritical,
            title: r.title,
            content: r.summary,
            details: r.details
          }))
        };

      case 'faq':
        return {
          path: 'Nav\\FAQ\\',
          folderTitle: 'Newcomer Registration & Queries',
          files: EVENT_CONFIG.faqs.map(f => ({
            id: f.id,
            name: f.file,
            title: f.question,
            content: f.answer,
            details: [
              `Category: ${f.category}`,
              'Need more help? Sector Marshals are stationed across all hostel sectors.'
            ]
          }))
        };

      case 'prizes':
        return {
          path: 'Nav\\Prizes\\',
          folderTitle: 'Bounties & Survival Perks',
          files: EVENT_CONFIG.prizes.map((p, idx) => ({
            id: `prize-${idx}`,
            name: p.file,
            isRed: idx === 0 || idx === 2,
            title: `${p.rank}: ${p.title}`,
            content: p.reward,
            details: [
              `Badge: [ ${p.badge} ]`,
              'Prizes awarded during the post-game emergency debriefing at Cafeteria.'
            ]
          }))
        };
    }
  };

  const sectionData = getSectionData();
  const { path, files, folderTitle } = sectionData;
  const folders: Array<{ id: TableSectionType; label: string }> = [
    { id: 'info', label: 'Info\\' },
    { id: 'rules', label: 'Rules\\' },
    { id: 'faq', label: 'FAQ\\' },
    { id: 'prizes', label: 'Prizes\\' }
  ];

  const handleFileClick = (file: FileItem) => {
    sound.playBlip();
    setSelectedFile(file);
  };

  const handleExpand = () => {
    sound.playBlip();
    onClose();
    onExpandSection(activeSection);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Outer Retro OS Terminal Window (Authentic In-Game Task Tester 2000 style) */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-tester-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl rounded-lg overflow-hidden border-4 border-[#2B3C33] shadow-2xl bg-[#9BB8A7]"
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.4)'
        }}
      >
        {/* Top OS Window Header Bar */}
        <div className="bg-[#2B3C33] px-3 py-2 flex items-center justify-between border-b-2 border-[#1E2B24] select-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                sound.playBlip();
                if (selectedFile) setSelectedFile(null);
                else setIsAtHome(true);
              }}
              className="p-1 rounded bg-[#3D5246] hover:bg-[#4E6759] text-gray-200 transition-colors"
              title="Back"
              aria-label="Back to the current folder"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { sound.playBlip(); setSelectedFile(null); setIsAtHome(true); }}
              className="p-1 rounded bg-[#3D5246] hover:bg-[#4E6759] text-gray-200 transition-colors"
              title="Home"
              aria-label="Open Task Tester home"
            >
              <Home className="w-4 h-4" />
            </button>
            {/* Breadcrumb Path */}
            <div className="bg-[#19241E] px-3 py-1 rounded text-xs font-mono text-among-cyan tracking-wider border border-[#3D5246]">
              {isAtHome ? 'Nav\\' : selectedFile ? `${path}${selectedFile.name}` : path}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
              Task Tester 2000
            </span>
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playBlip();
                onClose();
              }}
              className="bg-among-red hover:bg-red-600 text-white p-1 rounded border border-black shadow transition-transform active:scale-90"
              title="Close Terminal"
              aria-label="Close Task Tester"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Interior OS Desktop Surface */}
        <div className="relative p-6 min-h-[380px] max-h-[75vh] overflow-y-auto font-mono text-gray-900">
          <div className="mb-4 flex items-center justify-between border-b border-[#7C9786] pb-2">
            <h2 id="task-tester-title" className="text-lg font-bold tracking-tight text-[#19241E] uppercase">
              {isAtHome ? 'Task Tester 2000 // Home' : folderTitle}
            </h2>
            <span className="text-xs bg-[#7C9786]/40 px-2 py-0.5 rounded text-[#19241E] font-semibold">
              {isAtHome ? `${folders.length} Folders` : `${files.length} Executables Loaded`}
            </span>
          </div>

          {isAtHome ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {folders.map((folder) => (
                <button
                  type="button"
                  key={folder.id}
                  onClick={() => { sound.playBlip(); setActiveSection(folder.id); setIsAtHome(false); setSelectedFile(null); }}
                  className="min-h-24 rounded-lg border-2 border-[#7C9786] bg-[#B1C8BB] p-4 font-bold text-[#19241E] hover:border-[#2B3C33] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#2B3C33]"
                >
                  <span aria-hidden="true" className="mb-2 block text-2xl">📁</span>
                  {folder.label}
                </button>
              ))}
            </div>
          ) : (
          <>
          {/* Grid of Files */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {files.map((file) => {
              const isSelected = selectedFile?.id === file.id;
              return (
                <button
                  type="button"
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  onMouseEnter={() => sound.playHover()}
                  className={`group cursor-pointer flex flex-col items-center p-3 rounded-lg border-2 transition-all select-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#2B3C33] ${
                    isSelected
                      ? 'bg-[#E1EDE5] border-[#19241E] shadow-md scale-105'
                      : 'bg-[#B1C8BB] hover:bg-[#C2D8CC] border-[#7C9786] hover:border-[#2B3C33] shadow-sm'
                  }`}
                >
                  {/* File Document Icon (Cyan or Red folded corner paper) */}
                  <div className="relative mb-2">
                    <div 
                      className={`w-12 h-14 rounded-sm border-2 border-black flex flex-col justify-between p-1.5 shadow transition-transform group-hover:scale-105 ${
                        file.isRed ? 'bg-among-red text-white' : 'bg-among-cyan text-black'
                      }`}
                    >
                      {/* Top folded corner notch */}
                      <div className="absolute top-0 right-0 w-3 h-3 bg-[#9BB8A7] border-l-2 border-b-2 border-black"></div>
                      <FileText className="w-4 h-4 opacity-75" />
                      <span className="text-[8px] font-black uppercase tracking-tighter">
                        EXE
                      </span>
                    </div>
                  </div>

                  {/* File Label */}
                  <span className="text-xs font-bold text-center break-all text-[#19241E] group-hover:text-black">
                    {file.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* File Preview Dialogue Box (Opens when an .exe file is selected) */}
          {selectedFile && (
            <aside role="dialog" aria-modal="false" aria-labelledby="file-preview-title" className="absolute left-1/2 top-1/2 z-30 max-h-[80%] w-[min(92%,36rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white/95 rounded-lg border-4 border-[#19241E] p-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${selectedFile.isRed ? 'bg-among-red' : 'bg-among-cyan'}`}></span>
                  <h3 id="file-preview-title" className="font-bold text-sm text-gray-900 uppercase">
                    {selectedFile.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">EXECUTION LOG: READY</span>
                  <button type="button" onClick={() => setSelectedFile(null)} aria-label="Close file preview" className="rounded border border-gray-400 px-2 py-1 text-xs text-gray-800 hover:bg-gray-100">[X]</button>
                </div>
              </div>

              <p className="text-sm font-semibold text-gray-800 mb-3 leading-relaxed">
                {selectedFile.content}
              </p>

              {selectedFile.details && (
                <ul className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                  {selectedFile.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-among-cyan mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          )}

          {/* Instruction text if no file clicked */}
          {!selectedFile && (
            <div className="text-center py-6 text-xs text-[#2B3C33] bg-[#89A896]/30 rounded border border-dashed border-[#7C9786] mb-6">
              {isAtHome
                ? 'Select a folder to open its event files.'
                : <>Click any executable (<span className="font-bold text-black">.exe</span>) above to inspect sector details, or expand below for the full deep-space wiki view.</>}
            </div>
          )}
          </>
          )}
        </div>

        {/* Bottom Action Footer with Expand Button */}
        <div className="bg-[#2B3C33] px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-[#1E2B24]">
          <span className="text-xs text-gray-300 font-mono">
            PRESS [ESC] OR CLOSE TO RETURN TO CAFETERIA
          </span>

          <button
            onClick={handleExpand}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-among-cyan hover:bg-[#4EFA94] text-black font-black text-xs uppercase px-5 py-2.5 rounded border-2 border-black shadow-game-button active:shadow-game-button-active active:translate-y-1 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>EXPAND FULL SECTION</span>
          </button>
        </div>
      </div>
    </div>
  );
};

