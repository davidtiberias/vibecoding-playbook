// pages/monetization/+Page.tsx
import Monetization from "../../src/components/Monetization";

const MonetizationPage = () => {
  // FIX: Removed max-w-7xl, mx-auto, and padding to allow full-width immersive layout
  return (
    <main className="flex-1 w-full">
      <Monetization />
    </main>
  );
};

export default MonetizationPage;
