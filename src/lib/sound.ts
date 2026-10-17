// Web Audio API Synthesized Sound System for Among Us Event
// 100% reliable, zero network latency, zero external asset dependencies

class SoundManager {
  private ctx: AudioContext | null = null;
  private shhhAudio: HTMLAudioElement | null = null;
  public isMuted: boolean = false;

  constructor() {
    try {
      this.isMuted = typeof window !== 'undefined' && window.localStorage.getItem('amongus_sound_muted') === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      try {
        this.ctx = new AudioCtx();
      } catch {
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => undefined);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('amongus_sound_muted', String(this.isMuted));
    } catch {
      // Sound can still be toggled for this page session when storage is unavailable.
    }
    if (!this.isMuted) {
      this.playBlip();
    }
    return this.isMuted;
  }

  // Quick UI Hover Pop
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // General Button / Menu Blip
  public playBlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.setValueAtTime(780, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  public playMapSelect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [659.25, 987.77].forEach((frequency, index) => {
      const oscillator = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const start = now + index * 0.07;
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
      oscillator.connect(gain);
      gain.connect(this.ctx!.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.17);
    });
  }

  // Mechanical Safety Glass Unlatch / Flip
  public playGlassOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Metallic latch click
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.14);
    osc2.stop(this.ctx.currentTime + 0.14);
  }

  // Heavy Emergency Red Button Slam
  public playButtonSlam() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Emergency Siren & Dramatic Stinger
  public playEmergencyAlarm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Dramatic Bass Stinger Impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(40, now + 1.2);
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.2);

    // 2. High Two-Tone Emergency Klaxon Siren
    for (let i = 0; i < 4; i++) {
      const cycleStart = now + (i * 0.45);
      const sirenOsc = this.ctx.createOscillator();
      const sirenGain = this.ctx.createGain();

      sirenOsc.type = 'triangle';
      // High pitch tone
      sirenOsc.frequency.setValueAtTime(880, cycleStart);
      // Low pitch tone
      sirenOsc.frequency.setValueAtTime(659.25, cycleStart + 0.22);

      sirenGain.gain.setValueAtTime(0.18, cycleStart);
      sirenGain.gain.exponentialRampToValueAtTime(0.001, cycleStart + 0.42);

      sirenOsc.connect(sirenGain);
      sirenGain.connect(this.ctx.destination);

      sirenOsc.start(cycleStart);
      sirenOsc.stop(cycleStart + 0.44);
    }
  }

  // Admin Card Swipe Friction
  public playCardSwipe() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // White noise buffer for swipe friction
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.2);
  }

  // Task Complete / Card Accepted Iconic Chime
  public playTaskComplete() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.36);
    });
  }

  // Card Bad Read / Too Fast / Too Slow Buzzer
  public playCardError() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.setValueAtTime(120, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.22);
  }

  // Iconic Among Us "Shhhhh..." Intro Sound (Official in-game audio with synthesized fallback)
  public playShhh() {
    if (this.isMuted) return;

    // 1. Attempt to play authentic in-game audio file
    try {
      if (typeof Audio !== 'undefined') {
        if (!this.shhhAudio) {
          this.shhhAudio = new Audio('/shhh.mp3');
          this.shhhAudio.preload = 'auto';
        }
        this.shhhAudio.currentTime = 0;
        this.shhhAudio.volume = 0.85;
        const playPromise = this.shhhAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback to synthesis if browser blocks file playback
            this.playSynthesizedShhh();
          });
          return;
        }
      }
    } catch {
      // Audio fallback
    }

    // 2. Synthesized fallback
    this.playSynthesizedShhh();
  }

  // Pure Web Audio synthesized fallback for the iconic shhh
  public playSynthesizedShhh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.3);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 1.15);
      filter.Q.setValueAtTime(2.2, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.24, this.ctx.currentTime + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 1.28);
    } catch {
      // Audio fallback
    }
  }
}

export const sound = new SoundManager();

