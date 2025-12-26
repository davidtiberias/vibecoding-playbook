// src/utils/adLayout.ts
import { AdEntry } from "../config/ads";

export type LayoutMode = "stacked" | "inline" | "rotated";
export type LayoutBucket = "COMPACT_STRIP" | "MEDIUM_STRIP" | "FULL_PANEL";

// --- CONFIGURATION ---
// A comprehensive, tunable configuration for the layout engine.
export interface AdLayoutConfig {
  ROTATION_RATIO: number;
  INLINE_RATIO: number;
  GRACE_ZONE: number;
  CHAR_PER_UNIT: number;
  LONG_STRIP_MIN_LENGTH: number;
  MAX_LEAVES: number;
  MAX_DEPTH: number;
}

export const DEFAULT_AD_LAYOUT_CONFIG: AdLayoutConfig = {
  ROTATION_RATIO: 2.5,
  INLINE_RATIO: 6.0,
  GRACE_ZONE: 0.1,
  CHAR_PER_UNIT: 5,
  LONG_STRIP_MIN_LENGTH: 4,
  MAX_LEAVES: 6, // The 2x3 grid cap
  MAX_DEPTH: 4, // A reasonable default max recursion depth
};

// --- TYPES ---

export interface LayoutDecision {
  mode: LayoutMode;
  bucket: LayoutBucket;
  logicalW: number;
  logicalH: number;
  canSplit: boolean;
  visibility: {
    showRole: boolean;
    showBadge: boolean;
    showDesc: boolean;
    useShortDesc: boolean;
    showAction: boolean;
  };
  ariaLabel: string;
  rotatedCharLimit?: number;
}

// --- HELPERS ---

export const normalizeSpan = (span: number) => Math.max(1, Math.round(span));

export const splitDimension = (dim: number): [number, number] => {
  const half = dim / 2;
  return [Math.ceil(half), Math.floor(half)];
};

export const truncateText = (text: string, limit: number) =>
  text.length > limit ? text.slice(0, limit - 1) + "…" : text;

// --- CORE LOGIC ---

/**
 * A robust, deterministic layout engine based on a bucket system.
 * This version is authoritative and uses runtime context (depth, leafCount)
 * to make final splitting decisions.
 */
export const getLayoutDecision = (
  ad: AdEntry,
  spanW: number,
  spanH: number,
  depth: number,
  leafCount: number,
  config: AdLayoutConfig = DEFAULT_AD_LAYOUT_CONFIG
): LayoutDecision => {
  const logicalW = normalizeSpan(spanW);
  const logicalH = normalizeSpan(spanH);
  const isLandscape = logicalW >= logicalH;

  const bucketKey = isLandscape ? logicalH : logicalW;
  const longSide = isLandscape ? logicalW : logicalH;
  const maxAspect = bucketKey > 0 ? longSide / bucketKey : 0;

  let bucket: LayoutBucket;
  let visibility: LayoutDecision["visibility"];

  // 1. Map Bucket Key to Layout and Base Visibility Rules
  switch (bucketKey) {
    case 1:
      bucket = "COMPACT_STRIP";
      visibility = { showRole: false, showBadge: false, showDesc: false, useShortDesc: true, showAction: true };
      break;
    case 2:
      bucket = "MEDIUM_STRIP";
      visibility = { showRole: true, showBadge: true, showDesc: true, useShortDesc: true, showAction: true };
      break;
    default:
      bucket = "FULL_PANEL";
      visibility = { showRole: true, showBadge: true, showDesc: true, useShortDesc: false, showAction: true };
      break;
  }

  // 2. Make Authoritative Splitting Decision
  const targetMaxLongSide = 3 * bucketKey;
  const hasPotentialToSplit = longSide > targetMaxLongSide && longSide > 1;
  const canSplit =
    bucketKey >= 2 && // Rule: Bucket 1 (A) never splits
    leafCount < config.MAX_LEAVES &&
    depth < config.MAX_DEPTH &&
    hasPotentialToSplit;

  // 3. Determine Visual Mode with Grace Zone and Strip Override
  let mode: LayoutMode = "stacked";
  const isLongStripOverride = bucketKey === 1 && longSide >= config.LONG_STRIP_MIN_LENGTH;
  if (isLandscape && (maxAspect >= config.INLINE_RATIO - config.GRACE_ZONE || isLongStripOverride)) {
    mode = "inline";
  } else if (!isLandscape && (maxAspect >= config.ROTATION_RATIO - config.GRACE_ZONE || isLongStripOverride)) {
    mode = "rotated";
  }

  // 4. Generate ARIA Label Safely
  const actionText = canSplit ? "Decompose" : "Visit";
  const name = ad.name || "Untitled Ad";
  const role = ad.role?.replace("_", " ") || "";
  let labelParts = [actionText, name];
  if (visibility.showRole && role) {
    labelParts.push(role);
  }
  if (visibility.showDesc) {
    const desc = visibility.useShortDesc
      ? ad.shortDescription || ad.description || ""
      : ad.description || ad.shortDescription || "";
    if (desc) {
      labelParts.push(truncateText(desc, 100));
    }
  }
  const ariaLabel = labelParts.join(" - ");

  // 5. Final Decision Object
  const decision: LayoutDecision = {
    mode, bucket, logicalW, logicalH, canSplit, visibility, ariaLabel,
  };

  // 6. Compute Dynamic Rotated Character Limit
  if (mode === "rotated") {
    const readingLength = logicalH;
    const baseLimit = Math.floor(readingLength * config.CHAR_PER_UNIT);
    switch (bucket) {
      case "COMPACT_STRIP":
        decision.rotatedCharLimit = Math.max(8, Math.min(16, baseLimit));
        break;
      case "MEDIUM_STRIP":
        decision.rotatedCharLimit = Math.max(12, Math.min(25, baseLimit));
        break;
      case "FULL_PANEL":
        decision.rotatedCharLimit = Math.max(20, Math.min(40, baseLimit));
        break;
    }
  }

  return decision;
};