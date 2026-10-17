import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Crosshair, CheckCircle2 } from 'lucide-react';
import { sound } from '../lib/sound';

const SPAWN_INTERVAL_MS = 30000; // 1 asteroid every 30 seconds
const TARGET_DESTROY_COUNT = 20;

interface ActiveAsteroid {
  id: number;
  variant: 0 | 1 | 2;
  xPercent: number;  // -8 to 108 (% of container width)
  yPx: number;       // vertical position in px within DeepSpaceSections
  vxPercent: number; // horizontal speed in % per second
  vyPx: number;      // vertical drift in px per second
  size: number;      // px diameter (58 - 76)
  rotation: number;  // degrees
  vRot: number;      // degrees per second
}

interface ShatterEffect {
  id: number;
  xPercent: number;
  yPx: number;
  size: number;
  createdAt: number;
}

const SHARD_VECTORS = [
  { dx: -38, dy: -32, rot: -110, points: '12,2 26,8 22,24 6,20' },
  { dx: 42, dy: -26, rot: 95, points: '8,4 24,6 28,20 12,24' },
  { dx: 34, dy: 36, rot: 130, points: '6,8 22,4 26,18 10,26' },
  { dx: -40, dy: 28, rot: -140, points: '10,4 24,10 20,26 4,18' },
  { dx: 4, dy: -44, rot: 65, points: '8,6 20,2 24,16 10,20' },
];

const AsteroidSvg: React.FC<{ variant: 0 | 1 | 2; className?: string }> = ({ variant, className }) => {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        {/* Outer Angular Asteroid Polygon */}
        <polygon
          points="24,10 62,6 88,24 94,58 74,88 36,92 12,72 6,36"
          fill="#263B2D"
          stroke="#0A0F0C"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Inner Shaded Facet matching Skeld Weapons aesthetic */}
        <polygon
          points="28,16 60,12 80,28 66,52 34,46 16,36"
          fill="#35523F"
        />
        <polygon
          points="34,46 66,52 70,82 38,86 18,68"
          fill="#1B2B20"
        />
        {/* Craters & Angular Ridge Lines */}
        <polygon
          points="56,28 72,32 68,46 52,42"
          fill="#17241B"
          stroke="#497056"
          strokeWidth="2"
        />
        <polygon
          points="26,56 42,58 38,72 24,68"
          fill="#17241B"
          stroke="#497056"
          strokeWidth="2"
        />
        {/* Subtle Phosphor Green Rim Highlight */}
        <polyline
          points="24,10 62,6 88,24 94,58"
          stroke="#4E8762"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none">
        <polygon
          points="18,18 52,8 84,18 92,48 80,82 46,94 16,78 8,46"
          fill="#293E31"
          stroke="#0A0F0C"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <polygon
          points="22,22 52,14 78,22 60,48 24,44"
          fill="#3B5946"
        />
        <polygon
          points="24,44 60,48 74,78 46,88 20,74"
          fill="#1D2D23"
        />
        <polygon
          points="36,28 52,26 56,40 38,42"
          fill="#16221A"
          stroke="#527D61"
          strokeWidth="2"
        />
        <polygon
          points="54,58 70,62 64,76 50,70"
          fill="#16221A"
          stroke="#527D61"
          strokeWidth="2"
        />
        <polyline
          points="18,18 52,8 84,18"
          stroke="#58946D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <polygon
        points="32,8 70,12 92,36 86,72 58,92 22,86 8,56 14,24"
        fill="#24382B"
        stroke="#0A0F0C"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <polygon
        points="34,14 66,18 84,38 54,54 20,30"
        fill="#365440"
      />
      <polygon
        points="20,30 54,54 80,68 56,86 24,80 14,54"
        fill="#1A291F"
      />
      <polygon
        points="44,36 62,40 58,56 40,50"
        fill="#142018"
        stroke="#4B7559"
        strokeWidth="2"
      />
      <polyline
        points="32,8 70,12 92,36"
        stroke="#528A65"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const AsteroidField: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [asteroids, setAsteroids] = useState<ActiveAsteroid[]>([]);
  const [shatterEffects, setShatterEffects] = useState<ShatterEffect[]>([]);
  const [destroyedCount, setDestroyedCount] = useState<number>(0);
  const [isHudVisible, setIsHudVisible] = useState<boolean>(false);
  const [hudPulseKey, setHudPulseKey] = useState<number>(0);

  // Authoritative refs (immune to React 18 StrictMode double-invocations)
  const asteroidsRef = useRef<ActiveAsteroid[]>([]);
  const shatterEffectsRef = useRef<ShatterEffect[]>([]);
  const nextIdRef = useRef<number>(1);
  const destroyedCountRef = useRef<number>(0);
  const hudTimeoutRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const hasSpawnedFirstRef = useRef<boolean>(false);

  // Check if the DeepSpaceSections container is currently visible in the user's viewport
  const getVisibleSlice = useCallback((): { isVisible: boolean; spawnY: number } => {
    const container = containerRef.current;
    if (!container) return { isVisible: false, spawnY: 300 };

    const rect = container.getBoundingClientRect();
    const containerHeight = Math.max(container.offsetHeight, 600);
    const margin = 80;

    // Visible portion of DeepSpaceSections in container-local Y coordinates
    const visibleTop = Math.max(margin, -rect.top + 90);
    const visibleBottom = Math.min(containerHeight - margin, window.innerHeight - rect.top - 90);

    if (visibleBottom > visibleTop + 80) {
      const spawnY = visibleTop + Math.random() * (visibleBottom - visibleTop);
      return { isVisible: true, spawnY };
    }

    return {
      isVisible: false,
      spawnY: margin + Math.random() * Math.max(200, containerHeight - margin * 2),
    };
  }, []);

  // Create a single asteroid entering strictly from the left or right website edge
  const createEdgeAsteroid = useCallback((spawnY: number): ActiveAsteroid => {
    const fromLeft = Math.random() < 0.5;
    const speedPercentPerSec = 5.5 + Math.random() * 2.0; // ~15-19 seconds to cross from edge to edge
    const variant = Math.floor(Math.random() * 3) as 0 | 1 | 2;

    return {
      id: nextIdRef.current++,
      variant,
      xPercent: fromLeft ? -6 : 106,
      yPx: spawnY,
      vxPercent: fromLeft ? speedPercentPerSec : -speedPercentPerSec,
      vyPx: (Math.random() - 0.5) * 16,
      size: Math.round(60 + Math.random() * 18),
      rotation: Math.random() * 360,
      vRot: (Math.random() < 0.5 ? 1 : -1) * (20 + Math.random() * 25),
    };
  }, []);

  // Main animation & edge-spawner loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      // 1. Clean up expired shatter effects (> 450ms)
      if (shatterEffectsRef.current.length > 0) {
        const filteredShatters = shatterEffectsRef.current.filter(
          (fx) => now - fx.createdAt < 450
        );
        if (filteredShatters.length !== shatterEffectsRef.current.length) {
          shatterEffectsRef.current = filteredShatters;
          setShatterEffects(filteredShatters);
        }
      }

      // Stop spawning & moving if 20/20 Easter Egg is achieved
      if (destroyedCountRef.current >= TARGET_DESTROY_COUNT) {
        return;
      }

      const containerHeight = containerRef.current?.offsetHeight || 2000;

      // 2. Advance existing asteroids across the screen
      if (asteroidsRef.current.length > 0) {
        asteroidsRef.current = asteroidsRef.current
          .map((ast) => ({
            ...ast,
            xPercent: ast.xPercent + ast.vxPercent * dt,
            yPx: Math.max(60, Math.min(containerHeight - 60, ast.yPx + ast.vyPx * dt)),
            rotation: (ast.rotation + ast.vRot * dt) % 360,
          }))
          .filter((ast) => ast.xPercent >= -9 && ast.xPercent <= 109);
      }

      // 3. Spawn 1 asteroid every 30 seconds from the edge (and spawn the very first one immediately upon viewing Deep Space)
      const { isVisible, spawnY } = getVisibleSlice();
      const elapsedSinceLastSpawn = now - lastSpawnTimeRef.current;

      if (isVisible) {
        if (!hasSpawnedFirstRef.current || elapsedSinceLastSpawn >= SPAWN_INTERVAL_MS) {
          hasSpawnedFirstRef.current = true;
          lastSpawnTimeRef.current = now;
          asteroidsRef.current = [...asteroidsRef.current, createEdgeAsteroid(spawnY)];
        }
      }

      setAsteroids([...asteroidsRef.current]);
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [createEdgeAsteroid, getVisibleSlice]);

  // Cleanup HUD timeout on unmount
  useEffect(() => {
    return () => {
      if (hudTimeoutRef.current) {
        window.clearTimeout(hudTimeoutRef.current);
      }
    };
  }, []);

  const handleDestroyAsteroid = (asteroid: ActiveAsteroid, e: React.MouseEvent) => {
    e.stopPropagation();

    if (destroyedCountRef.current >= TARGET_DESTROY_COUNT) return;

    const newCount = destroyedCountRef.current + 1;
    destroyedCountRef.current = newCount;
    setDestroyedCount(newCount);

    // Play laser + rock shatter sound
    sound.playAsteroidDestroy();

    const now = performance.now();
    const newShatter: ShatterEffect = {
      id: asteroid.id,
      xPercent: asteroid.xPercent,
      yPx: asteroid.yPx,
      size: asteroid.size,
      createdAt: now,
    };

    // If 20/20 Easter Egg reached: play task complete chime & shatter any remaining asteroids
    if (newCount >= TARGET_DESTROY_COUNT) {
      const remainingShatters: ShatterEffect[] = asteroidsRef.current
        .filter((a) => a.id !== asteroid.id)
        .map((a) => ({
          id: a.id,
          xPercent: a.xPercent,
          yPx: a.yPx,
          size: a.size,
          createdAt: now,
        }));

      asteroidsRef.current = [];
      setAsteroids([]);

      shatterEffectsRef.current = [...shatterEffectsRef.current, newShatter, ...remainingShatters];
      setShatterEffects([...shatterEffectsRef.current]);

      window.setTimeout(() => {
        sound.playTaskComplete();
      }, 180);
    } else {
      asteroidsRef.current = asteroidsRef.current.filter((a) => a.id !== asteroid.id);
      setAsteroids([...asteroidsRef.current]);

      shatterEffectsRef.current = [...shatterEffectsRef.current, newShatter];
      setShatterEffects([...shatterEffectsRef.current]);
    }

    // Flash the bottom-right Clear Asteroids counter HUD
    setIsHudVisible(true);
    setHudPulseKey((prev) => prev + 1);

    if (hudTimeoutRef.current) {
      window.clearTimeout(hudTimeoutRef.current);
    }

    const displayDuration = newCount >= TARGET_DESTROY_COUNT ? 5000 : 3000;
    hudTimeoutRef.current = window.setTimeout(() => {
      setIsHudVisible(false);
    }, displayDuration);
  };

  const isTaskComplete = destroyedCount >= TARGET_DESTROY_COUNT;

  return (
    <>
      {/* Asteroid Layer Scoped to Deep Space Sections */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Drifting Clickable Asteroids */}
        {asteroids.map((asteroid) => (
          <button
            key={asteroid.id}
            type="button"
            onClick={(e) => handleDestroyAsteroid(asteroid, e)}
            title="Click to destroy asteroid!"
            aria-label="Destroy floating asteroid"
            style={{
              left: `${asteroid.xPercent}%`,
              top: `${asteroid.yPx}px`,
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="group absolute pointer-events-auto cursor-crosshair focus:outline-none transition-transform duration-75 active:scale-90"
          >
            {/* Hover Weapons Targeting Reticle Ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#38EF7D]/0 group-hover:border-[#38EF7D]/80 group-hover:scale-105 transition-all duration-150 pointer-events-none" />

            {/* Rotating Asteroid Graphic */}
            <div
              style={{ transform: `rotate(${asteroid.rotation}deg)` }}
              className="w-full h-full drop-shadow-[0_0_12px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_0_14px_rgba(56,239,125,0.45)] transition-all"
            >
              <AsteroidSvg variant={asteroid.variant} className="w-full h-full" />
            </div>
          </button>
        ))}

        {/* Shatter Fragments & Weapons Target Lock Flash */}
        {shatterEffects.map((fx) => (
          <div
            key={`shatter-${fx.id}`}
            style={{
              left: `${fx.xPercent}%`,
              top: `${fx.yPx}px`,
              width: `${fx.size}px`,
              height: `${fx.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute pointer-events-none"
          >
            {/* Green Laser Target Crosshair Flash (matching Skeld Weapons screen) */}
            <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-80">
              <div className="w-full h-full rounded-full border-2 border-[#38EF7D] shadow-[0_0_18px_#38EF7D]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#38EF7D] rotate-45 shadow-[0_0_12px_#38EF7D]" />
            </div>

            {/* 5 Outward Flying Angular Rock Shards */}
            {SHARD_VECTORS.map((shard, idx) => (
              <svg
                key={idx}
                viewBox="0 0 30 30"
                className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 asteroid-shard-burst"
                style={
                  {
                    '--shard-dx': `${shard.dx}px`,
                    '--shard-dy': `${shard.dy}px`,
                    '--shard-rot': `${shard.rot}deg`,
                  } as React.CSSProperties
                }
              >
                <polygon
                  points={shard.points}
                  fill="#2E4736"
                  stroke="#0A0F0C"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom-Right Flashing Skeld Weapons HUD Counter */}
      <div
        className={`fixed bottom-5 right-5 z-50 pointer-events-none select-none transition-all duration-300 ${
          isHudVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-3 scale-95'
        }`}
        aria-live="polite"
      >
        <div
          key={hudPulseKey}
          className={`relative overflow-hidden rounded-xl border-2 px-4 py-3 backdrop-blur-md asteroid-hud-flash ${
            isTaskComplete
              ? 'bg-[#082213]/95 border-[#F5F557] shadow-[0_0_30px_rgba(245,245,87,0.45)]'
              : 'bg-[#05180E]/95 border-[#38EF7D] shadow-[0_0_24px_rgba(56,239,125,0.35)]'
          }`}
        >
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

          {/* Corner Target Brackets */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#38EF7D]" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#38EF7D]" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#38EF7D]" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#38EF7D]" />

          <div className="relative z-10 flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                isTaskComplete
                  ? 'bg-[#F5F557]/20 border-[#F5F557] text-[#F5F557]'
                  : 'bg-[#38EF7D]/15 border-[#38EF7D]/60 text-[#38EF7D]'
              }`}
            >
              {isTaskComplete ? (
                <CheckCircle2 className="h-5 w-5 animate-bounce" />
              ) : (
                <Crosshair className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#38EF7D]/80">
                {isTaskComplete ? 'WEAPONS // TASK COMPLETE' : 'WEAPONS // CLEAR ASTEROIDS'}
              </span>
              <span
                className={`font-vcr text-xl sm:text-2xl font-bold tracking-wider leading-none mt-0.5 ${
                  isTaskComplete ? 'text-[#F5F557]' : 'text-white'
                }`}
              >
                {isTaskComplete
                  ? `TASK COMPLETE! (${destroyedCount}/${TARGET_DESTROY_COUNT})`
                  : `DESTROYED: ${destroyedCount} / ${TARGET_DESTROY_COUNT}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
