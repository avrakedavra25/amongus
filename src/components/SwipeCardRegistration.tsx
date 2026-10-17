import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, CreditCard, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../lib/sound';
import { submitRegistration, RegistrationData } from '../lib/supabase';
import { Crewmate, CrewmateColor, CREWMATE_COLORS } from '../assets/crewmates';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface SwipeCardRegistrationProps {
  selectedHostel: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SwipeCardRegistration: React.FC<SwipeCardRegistrationProps> = ({
  selectedHostel,
  isOpen,
  onClose,
  onSuccess
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [scholarNumber, setScholarNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [crewColor, setCrewColor] = useState<CrewmateColor>('red');
  const [hostel, setHostel] = useState(selectedHostel || 'H1');

  // Interactive Card & Swipe Task State
  const [lcdMessage, setLcdMessage] = useState('PLEASE ENTER DETAILS & SWIPE CARD');
  const [lcdStatus, setLcdStatus] = useState<'normal' | 'error' | 'success'>('normal');
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedData, setSavedData] = useState<RegistrationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOfflineSave, setIsOfflineSave] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  // Swipe gesture tracking
  const [isDragging, setIsDragging] = useState(false);
  const [cardX, setCardX] = useState(0);
  const slotRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const swipePendingRef = useRef(false);
  const swipeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useModalAccessibility<HTMLDivElement>({ onClose, enabled: isOpen, closeOnEscape: !isSubmitting });

  useEffect(() => {
    if (selectedHostel) {
      setHostel(selectedHostel);
    }
  }, [selectedHostel]);

  useEffect(() => () => {
    if (swipeTimerRef.current) clearTimeout(swipeTimerRef.current);
  }, []);

  // Calculate task progress bar percentage (0% to 100%)
  const fields = [fullName, scholarNumber, branch, email, phoneNumber];
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneDigitCount = phoneNumber.replace(/\D/g, '').length;
  const filledCount = [
    fullName.trim().length > 0,
    scholarNumber.trim().length > 0,
    branch.trim().length > 0,
    emailIsValid,
    phoneDigitCount >= 7 && phoneDigitCount <= 15
  ].filter(Boolean).length;
  const progressPercent = Math.round((filledCount / fields.length) * 100);
  const isFormComplete = filledCount === fields.length;

  if (!isOpen) return null;

  // Execute registration submission
  const executeSubmission = async () => {
    if (submittingRef.current || isSuccess) return;
    if (!formRef.current?.reportValidity()) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setLcdMessage('TRANSMITTING REGISTRATION...');
    setLcdStatus('normal');

    const result = await submitRegistration({
      fullName: fullName.trim(),
      scholarNumber: scholarNumber.trim(),
      branch: branch.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      hostelSector: hostel,
      crewmateColor: crewColor
    });

    submittingRef.current = false;
    setIsSubmitting(false);
    if (result.success) {
      setSavedData(result.registration);
      setIsOfflineSave(result.isOfflineMode);
      setLcdMessage(result.isOfflineMode ? 'SAVED ON THIS DEVICE.' : 'ACCEPTED. THANK YOU.');
      setLcdStatus('success');
      sound.playTaskComplete();

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // Confetti is decorative; registration has already been saved.
        }
      }
      setIsSuccess(true);
      onSuccess();
    } else {
      setLcdMessage('SAVE FAILED. PLEASE TRY AGAIN.');
      setLcdStatus('error');
    }
  };

  // Forgiving Drag & Swipe handlers
  const handleDragStart = () => {
    if (!isFormComplete) {
      sound.playCardError();
      setLcdMessage('INCOMPLETE REGISTRATION. ENTER FIELDS FIRST.');
      setLcdStatus('error');
      return;
    }

    sound.playBlip();
    setIsDragging(true);
    sound.playCardSwipe();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !slotRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = slotRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(rect.width - 120, clientX - rect.left - 40));
    setCardX(relativeX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const slotWidth = slotRef.current ? slotRef.current.clientWidth - 140 : 250;

    // Check if card traveled far enough across slot
    if (cardX > slotWidth * 0.7) {
      // The in-game task has no swipe-speed rule; only distance matters.
      executeSubmission();
    } else {
      // Didn't drag all the way
      setCardX(0);
    }
  };

  // Easy-Mode "Swipe For Me" Button
  const handleAutoSwipe = () => {
    if (swipePendingRef.current || submittingRef.current || isSubmitting) return;
    if (!isFormComplete) {
      formRef.current?.reportValidity();
      sound.playCardError();
      setLcdMessage('INCOMPLETE REGISTRATION. ENTER FIELDS FIRST.');
      setLcdStatus('error');
      return;
    }

    swipePendingRef.current = true;
    sound.playCardSwipe();
    setCardX(180);
    swipeTimerRef.current = setTimeout(() => {
      setCardX(300);
      swipePendingRef.current = false;
      swipeTimerRef.current = null;
      executeSubmission();
    }, 280);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-dialog-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Container holding Admin Console and Wallet */}
      <div className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[1.5rem] border-[7px] border-[#343a3d] bg-[#5c6265] shadow-[0_25px_80px_rgba(0,0,0,.85)] sm:border-[10px]">
        <h2 id="registration-dialog-title" className="sr-only">Admin swipe card registration</h2>
        {/* TOP LEFT: In-Game Total Tasks Completed Progress Bar */}
        <div className="flex items-center justify-between border-b-4 border-[#252b2e] bg-[#444a4d] p-2 text-xs font-mono text-gray-100 sm:p-3">
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-gray-200 sm:text-[11px]">
              TOTAL TASKS COMPLETED
            </span>
            {/* Task Green Progress Bar with Segments */}
            <div
              role="progressbar"
              aria-label="Registration fields completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              className="relative h-5 w-full overflow-hidden rounded-sm border-2 border-black bg-[#0d261f]"
            >
              <div 
                className="h-full bg-among-lime transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Segment Divider Lines */}
              <div className="absolute inset-0 flex justify-between pointer-events-none">
                <div className="w-[1px] h-full bg-black/60" />
                <div className="w-[1px] h-full bg-black/60" />
                <div className="w-[1px] h-full bg-black/60" />
                <div className="w-[1px] h-full bg-black/60" />
              </div>
            </div>
          </div>

          {/* Close Window [X] */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              sound.playBlip();
              onClose();
            }}
            aria-label="Close registration"
            className="ml-2 rounded-sm border-2 border-black bg-[#adb4b6] p-1 text-gray-900 shadow active:scale-95 transition-transform hover:bg-white"
            title="Cancel Registration"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* SUCCESS VIEW: SIMPLE COMPLETION BANNER */}
        {isSuccess ? (
          <div className="bg-[#92989a] p-3 text-center text-gray-900 sm:p-6">
            {/* Acceptance LCD */}
            <div role="status" aria-live="polite" className="mb-4 rounded-sm border-[5px] border-[#282e31] bg-[#0d332b] p-3 font-vcr text-xl font-bold uppercase tracking-widest text-among-lime shadow-inner sm:text-2xl">
              {isOfflineSave ? 'SAVED ON THIS DEVICE' : 'ACCEPTED. THANK YOU.'}
            </div>

            <div className="mx-auto mb-4 max-w-xl border-4 border-[#252b2e] bg-[#c7cbca] p-4 shadow-[inset_0_0_0_3px_#8e9495,0_8px_0_#4b5052] sm:p-6">
              <div className="w-16 h-16 bg-among-lime/20 border-2 border-among-lime rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-10 h-10 text-among-lime" />
              </div>
              <span className="mx-auto mb-3 block h-4 w-4 rounded-full border border-black bg-among-lime shadow-neon-cyan" aria-label="Green access light illuminated" />

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 mb-2">
                {isOfflineSave
                  ? 'TASK SAVED LOCALLY: REGISTRATION NEEDS CONFIRMATION'
                  : 'TASK COMPLETED: YOU ARE REGISTERED FOR THE EVENT!'}
              </h2>

              <p className="text-xs text-gray-600 font-mono mb-4">
                {isOfflineSave
                  ? 'SAVED IN THIS BROWSER ONLY. EVENT ORGANIZERS MAY NOT RECEIVE THIS REGISTRATION.'
                  : 'CREWMATE REGISTRATION SAVED TO THE HOSTEL SECTOR ARCHIVE.'}
              </p>

              {/* Registered Player Badge Summary */}
              {savedData && (
                <div className="bg-gray-100 rounded-lg p-4 text-left border border-gray-300 text-xs font-mono space-y-1.5 mb-4">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">PLAYER NAME:</span>
                    <span className="font-bold text-gray-900">{savedData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">SCHOLAR NO:</span>
                    <span className="font-bold text-gray-900">{savedData.scholarNumber}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">BRANCH:</span>
                    <span className="font-bold text-gray-900">{savedData.branch}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">ASSIGNED SECTOR:</span>
                    <span className="font-bold text-among-red">{savedData.hostelSector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CREWMATE PASS ID:</span>
                    <span className="font-bold text-among-cyan bg-black px-1.5 rounded">{savedData.id}</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  sound.playBlip();
                  onClose();
                }}
                className="w-full border-2 border-black bg-[#98d835] px-6 py-3 text-sm font-black uppercase tracking-wider text-black shadow-[0_4px_0_#45691b] transition-all hover:bg-lime-300 active:translate-y-1 active:shadow-none"
              >
                RETURN TO SHIP / CLOSE
              </button>
            </div>
          </div>
        ) : (
          /* MAIN ADMIN SWIPE CARD INTERFACE */
          <form
            ref={formRef}
            onSubmit={(event) => {
              event.preventDefault();
              handleAutoSwipe();
            }}
            className="space-y-3 bg-[#92989a] p-3 sm:space-y-4 sm:p-5 max-h-[calc(88vh-3.5rem)] overflow-y-auto"
          >
            {/* Top LCD Display Screen with Red & Green LED Indicators */}
            <div className="flex items-center justify-between rounded border-4 border-[#343a3d] bg-[#747b7e] p-2 shadow-[inset_0_0_0_2px_#aeb4b5] sm:p-3">
              {/* Green Screen Digital LCD Panel */}
              <div role={lcdStatus === 'error' ? 'alert' : 'status'} aria-live={lcdStatus === 'error' ? 'assertive' : 'polite'} className="flex-1 overflow-hidden border-[3px] border-black bg-[#0d332b] px-3 py-2 text-center font-vcr text-lg font-bold uppercase tracking-widest shadow-inner sm:text-2xl">
                <span className={
                  lcdStatus === 'error' ? 'text-among-red animate-pulse' :
                  lcdStatus === 'success' ? 'text-among-lime animate-bounce' : 'text-among-lime'
                }>
                  {lcdMessage}
                </span>
              </div>

              {/* Status LEDs (Red & Green) */}
              <div className="flex items-center gap-2 ml-3">
                {/* Red LED */}
                <div className={`w-4 h-4 rounded-full border border-black shadow ${
                  lcdStatus === 'error' ? 'bg-among-red shadow-neon-red animate-pulse' : 'bg-red-950 opacity-40'
                }`} />
                {/* Green LED */}
                <div className={`w-4 h-4 rounded-full border border-black shadow ${
                  lcdStatus === 'success' ? 'bg-among-lime shadow-neon-cyan animate-pulse' : 'bg-green-950 opacity-40'
                }`} />
              </div>
            </div>

            {!isCardRevealed ? (
              <button
                type="button"
                onClick={() => setIsCardRevealed(true)}
                className="group relative flex w-full items-center gap-4 overflow-hidden border-[5px] border-[#272d30] bg-[#bfc4c4] p-3 text-left text-gray-900 shadow-[inset_0_0_0_3px_#858c8f,0_5px_0_#4a5053] transition-colors hover:border-among-cyan focus-visible:outline focus-visible:outline-4 focus-visible:outline-among-cyan sm:p-4"
              >
                <span className="flex h-16 w-20 shrink-0 items-center justify-center border-2 border-black bg-[#ecece7] shadow-inner">
                  <Crewmate color={crewColor} className="h-12 w-10" />
                </span>
                <span>
                  <span className="block font-mono text-sm font-black uppercase">CREWMATE ID CARD · {hostel}</span>
                  <span className="block text-xs">Tap or press Enter to open the registration panel.</span>
                  <span className="mt-2 inline-block border border-black bg-[#343a3d] px-2 py-1 font-vcr text-base uppercase tracking-wider text-among-lime group-hover:bg-[#263d36]">OPEN REGISTRATION</span>
                </span>
              </button>
            ) : (
            <>
            {/* Form Fields: The 5 inputs required */}
            <div className="space-y-3 border-2 border-[#343a3d] bg-[#777e80] p-3 shadow-[inset_0_0_0_2px_#a9adae] sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="registration-full-name" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    1. Full Name *
                  </label>
                  <input
                    id="registration-full-name"
                    name="fullName"
                    type="text"
                    required
                    minLength={1}
                    maxLength={120}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs text-black focus:border-among-cyan focus:bg-white focus:outline-none"
                  />
                </div>

                {/* 2. Scholar Number */}
                <div>
                  <label htmlFor="registration-scholar-number" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    2. Scholar Number (ID) *
                  </label>
                  <input
                    id="registration-scholar-number"
                    name="scholarNumber"
                    type="text"
                    required
                    minLength={1}
                    maxLength={40}
                    value={scholarNumber}
                    onChange={(e) => setScholarNumber(e.target.value)}
                    placeholder="e.g. 211112040"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs text-black focus:border-among-cyan focus:bg-white focus:outline-none"
                  />
                </div>

                {/* 3. Branch */}
                <div>
                  <label htmlFor="registration-branch" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    3. Academic Branch *
                  </label>
                  <input
                    id="registration-branch"
                    name="branch"
                    type="text"
                    required
                    minLength={1}
                    maxLength={120}
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. CSE / ECE / MECH"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs text-black focus:border-among-cyan focus:bg-white focus:outline-none"
                  />
                </div>

                {/* 4. Email */}
                <div>
                  <label htmlFor="registration-email" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    4. Email Address *
                  </label>
                  <input
                    id="registration-email"
                    name="email"
                    type="email"
                    required
                    minLength={3}
                    maxLength={320}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@college.edu"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs text-black focus:border-among-cyan focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* 5. Phone Number & Hostel & Color Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="registration-phone" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    5. Phone Number *
                  </label>
                  <input
                    id="registration-phone"
                    name="phoneNumber"
                    type="tel"
                    required
                    minLength={7}
                    maxLength={30}
                    pattern="[+0-9 ()-]{7,30}"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs text-black focus:border-among-cyan focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Sector / Hostel Badge */}
                <div>
                  <label htmlFor="registration-hostel" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    Hostel Sector
                  </label>
                  <select
                    id="registration-hostel"
                    name="hostelSector"
                    value={hostel}
                    disabled
                    aria-describedby="registration-hostel-note"
                    className="w-full rounded-sm border-2 border-[#292e30] bg-[#e4e5e3] px-3 py-1.5 font-mono text-xs font-bold text-black focus:outline-none"
                  >
                    <option value={hostel}>{hostel} Sector</option>
                  </select>
                  <span id="registration-hostel-note" className="sr-only">Selected on the previous sector screen.</span>
                </div>

                {/* Crewmate Color Picker */}
                <div>
                  <span id="registration-color-label" className="block text-[11px] font-mono font-bold text-gray-900 uppercase mb-1">
                    Suit Color
                  </span>
                  <div role="group" aria-labelledby="registration-color-label" className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {(Object.keys(CREWMATE_COLORS) as CrewmateColor[]).slice(0, 7).map((colorKey) => (
                      <button
                        key={colorKey}
                        type="button"
                        onClick={() => { sound.playHover(); setCrewColor(colorKey); }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform ${
                          crewColor === colorKey ? 'border-black scale-125 ring-2 ring-white' : 'border-black/50 hover:scale-110'
                        }`}
                        style={{ backgroundColor: CREWMATE_COLORS[colorKey].base }}
                        title={CREWMATE_COLORS[colorKey].name}
                        aria-label={`${CREWMATE_COLORS[colorKey].name} suit color`}
                        aria-pressed={crewColor === colorKey}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </>
            )}

            {/* SWIPE CARD READER SLOT */}
            <div 
              ref={slotRef}
              className="relative flex h-16 items-center overflow-hidden rounded-sm border-[5px] border-[#212629] bg-[#424a4e] px-4 shadow-[inset_0_0_0_2px_#788184]"
            >
              {/* Yellow Guide Arrow */}
              <div className="absolute right-4 flex items-center gap-1 text-among-yellow font-mono text-xs font-bold tracking-widest opacity-80 select-none pointer-events-none">
                <span>SWIPE CARD HERE &rarr;&rarr;&rarr;</span>
              </div>

              {/* The Draggable Keycard (Inside Slot) */}
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                style={{ transform: `translateX(${cardX}px)` }}
                className={`absolute left-2 z-20 cursor-grab active:cursor-grabbing transition-transform ${
                  isDragging ? 'duration-0' : 'duration-200'
                }`}
              >
                {/* In-Game Keycard graphic */}
                <div className="w-28 h-12 bg-white rounded border-2 border-black shadow-md flex items-center p-1.5 gap-2 select-none">
                  <div className="w-8 h-8 rounded bg-gray-200 border border-black flex items-center justify-center shrink-0">
                    <Crewmate color={crewColor} className="w-6 h-7" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[9px] font-mono font-bold truncate text-black uppercase">
                      {fullName || 'CREWMATE'}
                    </span>
                    <span className="block text-[8px] font-mono text-gray-500">
                      SEC: {hostel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LEATHER WALLET & ASSIST BAR */}
            <div className="relative flex flex-col items-center justify-between gap-3 border-t-4 border-[#353b3e] bg-[#777e80] p-3 sm:flex-row sm:gap-4 sm:p-4">
              {/* Left flap: Wallet ID card pocket */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[#303638] bg-[#60696c] p-1 shadow-inner">
                  <CreditCard className="w-8 h-8 text-amber-200/60" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold uppercase text-gray-100">
                    CREWMATE IDENTITY WALLET
                  </span>
                  <span className="text-[11px] font-mono text-gray-200">
                    {isFormComplete ? 'Registration Ready for Scanner' : 'Fill all 5 fields above to enable swipe'}
                  </span>
                </div>
              </div>

              {/* Right: Easy-Mode Assist Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-sm border-2 border-black bg-[#98d835] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_4px_0_#45691b] transition-all hover:bg-lime-300 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60"
              >
                <span>SWIPE FOR ME</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
