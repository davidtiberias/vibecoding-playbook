import { AdEntry } from "../config/ads";

// --- TYPES & CONFIG ---
export type LayoutMode = "stacked" | "inline" | "rotated" | "circle";
export type LayoutBucket = "COMPACT_STRIP" | "MEDIUM_STRIP" | "FULL_PANEL";

export interface AdLayoutConfig {
  // Ratios & Grace Zone
  ROTATION_RATIO: number;
  INLINE_RATIO: number;
  GRACE_ZONE: number;

  // Splitting Logic
  TARGET_MULTIPLIER: number;
  LONG_STRIP_MIN_LENGTH: number;
  MIN_SPLIT_BUCKET: number;
  MAX_DEPTH: number;

  // Text & Content
  CHAR_PER_UNIT: number;
  ROTATED_CLAMP_RANGES: {
    [key in LayoutBucket]: [number, number];
  };

  // Click Bait Mechanism
  MIN_CLICKS_TO_LINK: number;
  MAX_CLICKS_TO_LINK: number;
}

export const DEFAULT_AD_LAYOUT_CONFIG: AdLayoutConfig = {
  // Ratios & Grace Zone
  ROTATION_RATIO: 2.5,
  INLINE_RATIO: 6.0,
  GRACE_ZONE: 0.1,

  // Splitting Logic
  TARGET_MULTIPLIER: 3,
  LONG_STRIP_MIN_LENGTH: 4,
  MIN_SPLIT_BUCKET: 2,
  MAX_DEPTH: 4,

  // Text & Content
  CHAR_PER_UNIT: 5,
  ROTATED_CLAMP_RANGES: {
    COMPACT_STRIP: [8, 16],
    MEDIUM_STRIP: [12, 28],
    FULL_PANEL: [20, 60],
  },

  // Click Bait Mechanism
  MIN_CLICKS_TO_LINK: 1,
  MAX_CLICKS_TO_LINK: 3,
};

export interface LayoutDecision {
  mode: LayoutMode;
  bucket: LayoutBucket;
  logicalW: number;
  logicalH: number;
  canSplit: boolean;
  isShapeOnly: boolean;
  visibility: {
    showRole: boolean;
    showBadge: boolean;
    showDesc: boolean;
    useShortDesc: boolean;
    showAction: boolean;
  };
  ariaLabel: string;
  rotatedCharLimit?: number;
  childSpans?: [[number, number], [number, number]];
}

// --- HELPERS ---

export const truncateText = (text: string, limit: number) =>
  text.length > limit ? text.slice(0, limit - 1) + "…" : text;

/**
 * Determines the dimensions of the two children resulting from a split.
 * Implements special fixed splits first, then the general ceil/floor rule.
 * Returns null if no split is possible.
 */
const getSplitResult = (
  w: number,
  h: number,
  config: AdLayoutConfig,
  depth: number,
  maxDepth: number
): [[number, number], [number, number]] | null => {
  if (depth >= maxDepth) return null;

  const isLandscape = w >= h;
  const long = isLandscape ? w : h;
  const short = isLandscape ? h : w;
  const key = `${long}x${short}`;

  // Rule 5: Special fixed splits
  const specialSplits: Record<string, [[number, number], [number, number]]> = {
    '5x2': [[3, 2], [2, 2]],
    '4x2': [[2, 2], [2, 2]],
    '3x2': [[2, 2], [1, 2]],
    '2x2': [[2, 1], [2, 1]],
    '2x1': [[1, 1], [1, 1]],
  };

  if (specialSplits[key]) {
    const [[c1L, c1S], [c2L, c2S]] = specialSplits[key];
    return isLandscape
      ? [[c1L, c1S], [c2L, c2S]]
      : [[c1S, c1L], [c2S, c2L]];
  }

  // Rule 3 & 4: General splitting rules (Size trigger)
  const targetLongSide = config.TARGET_MULTIPLIER * short;
  const hasPotentialToSplit = long > targetLongSide && long > 1;
  const isSplittableStrip = short === 1 && long >= config.LONG_STRIP_MIN_LENGTH;
  
  const canSplitGenerally =
    (hasPotentialToSplit || isSplittableStrip) &&
    (short >= config.MIN_SPLIT_BUCKET || isSplittableStrip);

  if (canSplitGenerally) {
    const half = long / 2;
    const l1 = Math.ceil(half);
    const l2 = Math.floor(half);
    return isLandscape
      ? [[l1, short], [l2, short]]
      : [[short, l1], [short, l2]];
  }

  return null; // No split possible
};

// --- CORE LOGIC ---

/**
 * A robust, deterministic layout engine based on the ELI5 specification.
 */
export const getLayoutDecision = (
  ad: AdEntry,
  spanW: number,
  spanH: number,
  depth: number,
  maxDepth: number,
  config: AdLayoutConfig = DEFAULT_AD_LAYOUT_CONFIG
): LayoutDecision => {
  const logicalW = Math.max(1, Math.round(spanW));
  const logicalH = Math.max(1, Math.round(spanH));

  const isLandscape = logicalW >= logicalH;
  const bucketKey = isLandscape ? logicalH : logicalW;
  const longSide = isLandscape ? logicalW : logicalH;
  const aspectRatio = bucketKey > 0 ? longSide / bucketKey : 0;

  const childSpans = getSplitResult(logicalW, logicalH, config, depth, maxDepth);
  const canSplit = childSpans !== null;

  // Rule 6: Shape-only tiny bricks
  const isShapeOnly = (logicalW === 1 && logicalH === 1) || (logicalW === 2 && logicalH === 1) || (logicalW === 1 && logicalH === 2);

  // Rule 1: Bucket mapping
  const bucket: LayoutBucket = bucketKey === 1 ? 'COMPACT_STRIP' : bucketKey === 2 ? 'MEDIUM_STRIP' : 'FULL_PANEL';

  // Rule 2: Mode selection
  let mode: LayoutMode = 'stacked';
  if (logicalW === 1 && logicalH === 1) {
    mode = 'circle';
  } else if (isLandscape && aspectRatio >= config.INLINE_RATIO - config.GRACE_ZONE) {
    mode = 'inline';
  } else if (!isLandscape && aspectRatio >= config.ROTATION_RATIO - config.GRACE_ZONE) {
    mode = 'rotated';
  }
  // Strip override
  if (bucketKey === 1 && longSide >= config.LONG_STRIP_MIN_LENGTH) {
    mode = isLandscape ? 'inline' : 'rotated';
  }

  // Rule 8: Accessibility and rendering visibility
  const visibility: LayoutDecision['visibility'] = {
      showRole: !isShapeOnly && bucket !== 'COMPACT_STRIP',
      showBadge: !isShapeOnly && bucket !== 'COMPACT_STRIP',
      showDesc: !isShapeOnly && bucket !== 'COMPACT_STRIP',
      useShortDesc: bucket !== 'FULL_PANEL',
      showAction: !isShapeOnly,
  };
  
  // ARIA label is generated dynamically in the component based on click state,
  // but we provide a default here. Shape-only bricks have no label.
  const ariaLabel = isShapeOnly ? "" : `Interact with ${ad.name}`;

  const decision: LayoutDecision = {
    mode, bucket, logicalW, logicalH, canSplit, isShapeOnly, visibility, ariaLabel, childSpans: childSpans || undefined,
  };

  if (mode === 'rotated') {
    const readingLength = logicalH;
    const baseBudget = Math.floor(readingLength * config.CHAR_PER_UNIT);
    const [min, max] = config.ROTATED_CLAMP_RANGES[bucket];
    decision.rotatedCharLimit = Math.max(min, Math.min(baseBudget, max));
  }

  return decision;
};