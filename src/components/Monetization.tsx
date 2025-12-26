import React, { useState, useRef, useLayoutEffect } from "react";
import { AD_LIBRARY } from "../config/ads";
import AdBrick from "./AdBrick";

interface BrickConfig {
  gridColumn: string;
  gridRow: string;
  gradient: string;
  animationDelay: string;
  colSpan: number;
  rowSpan: number;
}

const NEON_PALETTE = [
  "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500",
  "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600",
  "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
  "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400",
  "bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600",
  "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700",
];

const DEFAULT_BRICK_CONFIG: BrickConfig = {
  colSpan: 1,
  rowSpan: 1,
  gridColumn: "span 1",
  gridRow: "span 1",
  gradient: "bg-slate-800",
  animationDelay: "0ms",
};

// --- HELPER FUNCTIONS (Unchanged) ---

const getRandomGradient = () =>
  NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];

const generateFeatureBrick = (): BrickConfig => {
  // ... (logic remains the same)
  let colSpan, rowSpan, ratio;
  do {
    const archetype = Math.random();
    if (archetype > 0.8) {
      colSpan = Math.ceil(Math.random() * 2);
      rowSpan = Math.floor(Math.random() * 5) + 6;
    } else if (archetype > 0.6) {
      colSpan = Math.floor(Math.random() * 5) + 6;
      rowSpan = Math.ceil(Math.random() * 2);
    } else {
      colSpan = Math.ceil(Math.random() * 4);
      rowSpan = Math.ceil(Math.random() * 4);
    }
    const r1 = colSpan / rowSpan;
    const r2 = rowSpan / colSpan;
    ratio = Math.max(r1, r2);
  } while (ratio > 10);

  return {
    colSpan,
    rowSpan,
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
    gradient: getRandomGradient(),
    animationDelay: `${Math.floor(Math.random() * 800)}ms`,
  };
};

const generateGroutBrick = (): BrickConfig => {
  // ... (logic remains the same)
  const type = Math.random();
  let colSpan = 1;
  let rowSpan = 1;

  if (type > 0.7) {
    colSpan = 1;
    rowSpan = Math.floor(Math.random() * 3) + 3;
  } else if (type > 0.4) {
    colSpan = Math.floor(Math.random() * 3) + 2;
    rowSpan = 1;
  } else {
    colSpan = 1;
    rowSpan = 1;
  }

  return {
    colSpan,
    rowSpan,
    gridColumn: `span ${colSpan}`,
    gridRow: `span ${rowSpan}`,
    gradient: getRandomGradient(),
    animationDelay: `${Math.floor(Math.random() * 1200)}ms`,
  };
};

// --- MAIN COMPONENT (Updated) ---

const Monetization: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const FEATURE_COUNT = 50;
  const GROUT_COUNT = 50;
  const TOTAL_ITEMS = FEATURE_COUNT + GROUT_COUNT;

  // FIX: Use a lazy initializer function for useState to create the bricks
  // This computes the initial state once, before the first render,
  // and avoids the unnecessary re-render that the linter was warning about.
  const [bricks] = useState(() => {
    const featureBricks = Array.from({ length: FEATURE_COUNT }).map(
      generateFeatureBrick
    );
    const groutBricks = Array.from({ length: GROUT_COUNT }).map(
      generateGroutBrick
    );
    return [...featureBricks, ...groutBricks];
  });

  const displayAds = Array.from({ length: TOTAL_ITEMS }).map((_, i) => {
    return AD_LIBRARY[i % AD_LIBRARY.length];
  });

  // REMOVED: The useEffect that was causing the linting error is no longer needed.

  // ... (the rest of the component remains the same)
  useLayoutEffect(() => {
    const gridEl = gridRef.current;
    const container = gridEl?.parentElement;
    if (!container) return;

    const syncGridColumns = () => {
      const containerWidth = container.clientWidth;
      const fixedCellSize = 60;
      const colsThatFit = Math.max(
        1,
        Math.floor(containerWidth / fixedCellSize)
      );
      gridEl.style.setProperty("--grid-cols", String(colsThatFit));
    };

    syncGridColumns();

    const resizeObserver = new ResizeObserver(syncGridColumns);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 p-2 overflow-hidden">
      <div
        ref={gridRef}
        role="grid"
        className="grid gap-2 grid-flow-dense max-w-[1800px] mx-auto auto-rows-[60px]"
        style={{
          gridTemplateColumns: "repeat(var(--grid-cols, 18), 60px)",
        }}
      >
        {displayAds.map((ad, index) => {
          const config = bricks[index] || DEFAULT_BRICK_CONFIG;

          return (
            <div
              key={`${ad.id}-${index}`}
              role="gridcell"
              style={{
                gridColumn: config.gridColumn,
                gridRow: config.gridRow,
                animationDelay: config.animationDelay,
              }}
              className="relative animate-fade-in opacity-0 [animation-fill-mode:forwards]"
            >
              <AdBrick
                initialAd={ad}
                gradient={config.gradient}
                spanW={config.colSpan}
                spanH={config.rowSpan}
                className="h-full w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Monetization;
