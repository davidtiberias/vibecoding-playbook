// src/components/Monetization.tsx
import React, { useState, useEffect } from "react";
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

// --- HELPER FUNCTIONS ---

const getRandomGradient = () =>
  NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];

const generateFeatureBrick = (): BrickConfig => {
  let colSpan, rowSpan, ratio;
  do {
    const archetype = Math.random();
    if (archetype > 0.8) {
      // Skyscraper (Vertical 1:10 focus)
      colSpan = Math.ceil(Math.random() * 2);
      rowSpan = Math.floor(Math.random() * 5) + 6;
    } else if (archetype > 0.6) {
      // Banner (Horizontal 10:1 focus)
      colSpan = Math.floor(Math.random() * 5) + 6;
      rowSpan = Math.ceil(Math.random() * 2);
    } else {
      // Standard Chunk
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
  const type = Math.random();
  let colSpan = 1;
  let rowSpan = 1;

  if (type > 0.7) {
    // Vertical Strip (1x3 to 1x5)
    colSpan = 1;
    rowSpan = Math.floor(Math.random() * 3) + 3;
  } else if (type > 0.4) {
    // Horizontal Strip (2x1 to 4x1)
    colSpan = Math.floor(Math.random() * 3) + 2;
    rowSpan = 1;
  } else {
    // Pure 1x1 Sand
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

// --- MAIN COMPONENT ---

const Monetization: React.FC = () => {
  const [bricks, setBricks] = useState<BrickConfig[]>([]);

  const FEATURE_COUNT = 50;
  const GROUT_COUNT = 50;
  const TOTAL_ITEMS = FEATURE_COUNT + GROUT_COUNT;

  const displayAds = Array.from({ length: TOTAL_ITEMS }).map((_, i) => {
    return AD_LIBRARY[i % AD_LIBRARY.length];
  });

  useEffect(() => {
    const featureBricks = Array.from({ length: FEATURE_COUNT }).map(
      generateFeatureBrick
    );
    const groutBricks = Array.from({ length: GROUT_COUNT }).map(
      generateGroutBrick
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setBricks([...featureBricks, ...groutBricks]);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 p-2 overflow-hidden">
      <div
        role="grid"
        className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-2 auto-rows-[50px] grid-flow-dense w-full max-w-[1800px] mx-auto"
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
