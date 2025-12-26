import React, { useState, useEffect } from "react";
import { AD_LIBRARY, AdEntry } from "../config/ads";
import {
  getLayoutDecision,
  truncateText,
  AdLayoutConfig,
  DEFAULT_AD_LAYOUT_CONFIG,
} from "../utils/adLayout";
import AdSenseBrick from "./AdSenseBrick";

// --- Types ---
interface AdBrickProps {
  initialAd: AdEntry;
  className?: string;
  usedIds?: Set<string>;
  gradient?: string;
  spanW?: number;
  spanH?: number;
  depth?: number;
  maxDepth?: number;
  showNoise?: boolean;
  config?: AdLayoutConfig;
}

const getRandomAd = (excludeIds: Set<string>): AdEntry | null => {
  const availableAds = AD_LIBRARY.filter((ad) => !excludeIds.has(ad.id));
  if (availableAds.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableAds.length);
  return availableAds[randomIndex];
};

// --- Main Component ---
const AdBrick: React.FC<AdBrickProps> = (props) => {
  const { initialAd, gradient = "bg-slate-800", className } = props;

  // FIX: All hooks are now called unconditionally at the top level.
  const [clicksToLink, setClicksToLink] = useState(() => {
    const { MIN_CLICKS_TO_LINK: min, MAX_CLICKS_TO_LINK: max } =
      props.config || DEFAULT_AD_LAYOUT_CONFIG;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  const [isSplit, setIsSplit] = useState(false);
  const [wasClicked, setWasClicked] = useState(false);

  useEffect(() => {
    if (wasClicked) {
      const timer = setTimeout(() => setWasClicked(false), 150);
      return () => clearTimeout(timer);
    }
  }, [wasClicked]);

  // Conditional rendering happens *after* all hooks have been called.
  if (initialAd.isAdSense && initialAd.adClient && initialAd.adSlot) {
    return (
      <AdSenseBrick
        adClient={initialAd.adClient}
        adSlot={initialAd.adSlot}
        gradient={gradient}
        className={className}
      />
    );
  }

  // Render the standard brick content if it's not an AdSense ad.
  return (
    <StandardBrick
      {...props}
      clicksToLinkState={[clicksToLink, setClicksToLink]}
      isSplitState={[isSplit, setIsSplit]}
      wasClickedState={[wasClicked, setWasClicked]}
    />
  );
};

// A new sub-component to contain the logic for a standard (non-AdSense) brick.
// This keeps the main component clean and respects the Rules of Hooks.
const StandardBrick: React.FC<
  AdBrickProps & {
    clicksToLinkState: [number, React.Dispatch<React.SetStateAction<number>>];
    isSplitState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    wasClickedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  }
> = ({
  initialAd,
  className = "",
  usedIds = new Set(),
  gradient = "bg-slate-800",
  spanW = 1,
  spanH = 1,
  depth = 1,
  maxDepth = 3,
  showNoise = true,
  config = DEFAULT_AD_LAYOUT_CONFIG,
  clicksToLinkState,
  isSplitState,
  wasClickedState,
}) => {
  const ad = initialAd;

  const [clicksToLink, setClicksToLink] = clicksToLinkState;
  const [isSplit, setIsSplit] = isSplitState;
  const [wasClicked, setWasClicked] = wasClickedState;

  const decision = getLayoutDecision(ad, spanW, spanH, depth, maxDepth, config);
  const { mode, visibility, isShapeOnly } = decision;

  // NEW: Derived state to determine the brick's current purpose
  const isNowALink = clicksToLink <= 0;
  // A brick can only split if it hasn't become a link yet.
  const canSplitNow = !isNowALink && decision.canSplit;

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();

    // Don't do anything for shape-only bricks that can't split
    if (isShapeOnly && !canSplitNow) return;

    // Trigger jiggle animation
    setWasClicked(true);

    const newClicksCount = clicksToLink - 1;
    setClicksToLink(newClicksCount);

    if (newClicksCount <= 0) {
      // Trap sprung! It's a link now.
      window.open(ad.url, "_blank", "noopener,noreferrer");
    } else if (canSplitNow) {
      // Not a link yet, but it can split.
      setIsSplit(true);
    }
    // If neither, the click is just absorbed.
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInteraction(e);
    }
  };

  if (isSplit && decision.childSpans) {
    // ... (Splitting logic remains the same)
    const currentUsedIds = new Set(usedIds);
    currentUsedIds.add(ad.id);
    const childAd1 = getRandomAd(currentUsedIds) || ad;

    const nextUsedIds = new Set(currentUsedIds);
    nextUsedIds.add(childAd1.id);
    const childAd2 = getRandomAd(nextUsedIds) || ad;

    const isHorizontalSplit = decision.logicalW > decision.logicalH;
    const flexClass = isHorizontalSplit ? "flex-row" : "flex-col";

    const [[w1, h1], [w2, h2]] = decision.childSpans;

    const commonProps = {
      gradient,
      depth: depth + 1,
      maxDepth,
      showNoise,
      config,
      className: "flex-1 min-w-0 min-h-0",
    };

    return (
      <div
        className={`flex ${flexClass} gap-1 h-full w-full overflow-hidden ${className}`}
      >
        <AdBrick
          initialAd={childAd1}
          spanW={w1}
          spanH={h1}
          usedIds={currentUsedIds}
          {...commonProps}
        />
        <AdBrick
          initialAd={childAd2}
          spanW={w2}
          spanH={h2}
          usedIds={nextUsedIds}
          {...commonProps}
        />
      </div>
    );
  }

  // ... (Shape-only rendering logic remains mostly the same)
  if (isShapeOnly) {
    const shapeClassName = `relative overflow-hidden shadow-lg transition-all duration-300 ${gradient} ${className} ${
      mode === "circle" ? "rounded-full" : "rounded-xl"
    }`;
    const isInteractive = canSplitNow || isNowALink;
    return (
      <div
        onClick={isInteractive ? handleInteraction : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={isInteractive ? "button" : undefined}
        aria-hidden="true"
        tabIndex={isInteractive ? 0 : -1}
        className={`${shapeClassName} ${
          isInteractive ? "cursor-pointer hover:scale-[1.05] hover:z-20" : ""
        } ${wasClicked ? "animate-jiggle" : ""}`}
      />
    );
  }

  // NEW: Dynamic action text and ARIA label
  const actionText = isNowALink ? "Visit" : "Decompose";
  const ariaLabel = `${actionText} - ${ad.name}${
    visibility.showRole ? ` - ${ad.role.replace("_", " ")}` : ""
  }`;

  return (
    <div
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 cursor-pointer group ${gradient} ${className} hover:shadow-2xl hover:scale-[1.02] hover:z-20 focus:outline-none focus:ring-4 focus:ring-indigo-500 ${
        wasClicked ? "animate-jiggle" : ""
      }`}
    >
      {/* ... (Inner rendering logic) ... */}
      {showNoise && (
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      )}
      <div className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 to-transparent rotate-45 transition-all duration-700 group-hover:top-[-50%] group-hover:left-[-50%] pointer-events-none" />

      {/* ... (stacked mode) ... */}
      {mode === "stacked" && (
        <div className="flex flex-col h-full justify-end p-4">
          <div className="min-w-0">
            <h3 className="text-xl font-black text-white drop-shadow-md line-clamp-2">
              {ad.name}
            </h3>
            {visibility.showDesc && (
              <p className="text-xs text-white/80 line-clamp-2">
                {visibility.useShortDesc ? ad.shortDescription : ad.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
            {visibility.showRole && (
              <span className="font-mono text-[10px] uppercase text-white/80 truncate mr-2">
                {ad.role.replace("_", " ")}
              </span>
            )}
            {visibility.showBadge && ad.vibeStatus === "VERIFIED" && (
              <span className="material-symbols-outlined text-base text-white">
                verified
              </span>
            )}
          </div>
        </div>
      )}

      {/* ... (inline mode) ... */}
      {mode === "inline" && (
        <div className="flex flex-row items-center h-full p-3 gap-3">
          <div className="w-[clamp(60px,25%,120px)] shrink-0 text-center">
            <h3 className="text-lg font-bold text-white truncate whitespace-nowrap">
              {ad.name}
            </h3>
          </div>
          <div className="flex-1 min-w-0 border-l border-white/20 pl-3">
            {visibility.showDesc && (
              <p className="text-[10px] text-white/80 truncate whitespace-nowrap">
                {visibility.useShortDesc ? ad.shortDescription : ad.description}
              </p>
            )}
            {visibility.showRole && (
              <p className="font-mono text-[10px] uppercase text-white/60 truncate whitespace-nowrap">
                {ad.role.replace("_", " ")}
              </p>
            )}
          </div>
          {visibility.showAction && (
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">
                {isNowALink ? "open_in_new" : "grid_view"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ... (rotated mode) ... */}
      {mode === "rotated" && (
        <div className="relative h-full w-full">
          <div className="absolute bottom-0 left-0 h-full w-full flex flex-col justify-end transform-origin-bottom-left [writing-mode:vertical-rl] rotate-180 p-2">
            <div className="flex items-center gap-2 opacity-80 mb-2">
              {visibility.showBadge && (
                <span className="material-symbols-outlined text-sm">
                  verified
                </span>
              )}
              {visibility.showRole && (
                <span className="font-mono text-[9px] uppercase tracking-widest">
                  {ad.role.replace("_", " ")}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white my-2">
              {truncateText(ad.name, decision.rotatedCharLimit || 20)}
            </h3>
          </div>
        </div>
      )}

      {visibility.showAction && mode !== "inline" && (
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-black/30 text-white rounded backdrop-blur-sm border border-white/20 px-2 py-0.5">
            {isNowALink ? "Visit" : "Decompose"}
          </span>
        </div>
      )}
    </div>
  );
};

export default AdBrick;
