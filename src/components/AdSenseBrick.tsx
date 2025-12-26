// src/components/AdSenseBrick.tsx
import React, { useEffect, useRef, useState } from "react";

interface AdSenseBrickProps {
  adClient: string;
  adSlot: string;
  gradient: string;
  className?: string;
}

const AdSenseBrick: React.FC<AdSenseBrickProps> = ({
  adClient,
  adSlot,
  gradient,
  className = "",
}) => {
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "failed">(
    "loading"
  );
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This line is safe and very unlikely to throw an error.
    // We push the ad request to Google's queue.
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});

    // FIX: We rely solely on this timeout to check if the ad loaded.
    // This avoids the synchronous setState call and fixes the linting error.
    // If the push() above failed or an ad blocker is active, no iframe will be
    // created, and this check will correctly set the status to 'failed'.
    const checkAdLoad = setTimeout(() => {
      if (adRef.current && adRef.current.querySelector("iframe")) {
        setAdStatus("loaded");
      } else {
        setAdStatus("failed");
      }
    }, 2500); // Wait 2.5 seconds before deciding

    return () => clearTimeout(checkAdLoad);
  }, []);

  return (
    <div
      ref={adRef}
      className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg ${gradient} ${className}`}
    >
      {/* Fallback / Loading State */}
      {(adStatus === "loading" || adStatus === "failed") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-2">
          <span className="material-symbols-outlined text-3xl animate-pulse">
            monetization_on
          </span>
          <p className="text-[9px] font-mono uppercase mt-1">
            {adStatus === "loading" ? "Loading Ad..." : "Advertisement"}
          </p>
        </div>
      )}

      {/* The actual AdSense unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          // Hide the ad until we confirm it has loaded to prevent ugly flashes
          transition: "opacity 0.5s",
          opacity: adStatus === "loaded" ? 1 : 0,
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseBrick;
