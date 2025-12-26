// src/config/ads.ts

export type VibeStatus = "VERIFIED" | "FAILED";
export type AdRole =
  | "AGENTIC_IDE"
  | "CODE_REFACTOR"
  | "INFRA_TOOLING"
  | "UNVERIFIED"
  | "ADSENSE_AD";

export interface AdEntry {
  id: string;
  name: string;
  role: AdRole;
  vibeStatus: VibeStatus;
  url: string;
  description: string;
  shortDescription: string;
  isAdSense?: boolean;
  adClient?: string;
  adSlot?: string;
}

export const AD_LIBRARY: AdEntry[] = [
  // NEW: AdSense Placeholder Brick
  {
    id: "ADSENSE_001",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_002",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_003",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_004",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_005",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_006",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_007",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_008",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  {
    id: "ADSENSE_009",
    name: "Google AdSense",
    role: "ADSENSE_AD",
    vibeStatus: "VERIFIED",
    url: "#", // Not used for AdSense bricks
    description: "This is a placeholder for a Google AdSense ad unit.",
    shortDescription: "Advertisement",
    isAdSense: true,
    adClient: "ca-pub-YOUR_PUBLISHER_ID", // <-- REPLACE THIS
    adSlot: "YOUR_AD_SLOT_ID", // <-- REPLACE THIS
  },
  // == Dependencies ==
  {
    id: "PKG_GENAI",
    name: "@google/genai",
    role: "AGENTIC_IDE",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@google/genai",
    description:
      "The official Google AI SDK for Node.js, enabling access to Gemini and other generative models.",
    shortDescription: "Google AI SDK.",
  },
  {
    id: "PKG_BUFFER",
    name: "buffer",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/buffer",
    description:
      "A polyfill for Node.js's Buffer API, essential for cross-platform compatibility in browsers.",
    shortDescription: "Node.js Buffer polyfill.",
  },
  {
    id: "PKG_GRAY_MATTER",
    name: "gray-matter",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/gray-matter",
    description:
      "A library to parse front-matter from strings or files, commonly used in static site generators.",
    shortDescription: "Front-matter parser.",
  },
  {
    id: "PKG_REACT",
    name: "React",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/react",
    description:
      "A JavaScript library for building user interfaces with a component-based architecture.",
    shortDescription: "UI component library.",
  },
  {
    id: "PKG_REACT_DOM",
    name: "React DOM",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/react-dom",
    description:
      "Serves as the entry point to the DOM and server renderers for React.",
    shortDescription: "React DOM renderer.",
  },
  {
    id: "PKG_REACT_MARKDOWN",
    name: "react-markdown",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/react-markdown",
    description:
      "A React component to render Markdown, with support for plugins and custom components.",
    shortDescription: "Render Markdown in React.",
  },
  {
    id: "PKG_REMARK_GFM",
    name: "remark-gfm",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/remark-gfm",
    description:
      "A remark plugin to add support for GitHub Flavored Markdown features like tables and strikethrough.",
    shortDescription: "GitHub Flavored Markdown.",
  },
  {
    id: "PKG_VIKE",
    name: "Vike",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/vike",
    description:
      "A file-based routing and server-side rendering framework, acting as a Vite-native alternative to Next.js.",
    shortDescription: "Vite-native SSR framework.",
  },
  {
    id: "PKG_VIKE_REACT",
    name: "vike-react",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/vike-react",
    description:
      "The official React integration for the Vike framework, enabling seamless SSR and SPA experiences.",
    shortDescription: "React adapter for Vike.",
  },

  // == Dev Dependencies ==
  {
    id: "PKG_BABEL_PRESET_REACT",
    name: "@babel/preset-react",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@babel/preset-react",
    description:
      "A Babel preset for transforming JSX into JavaScript, a core part of the React toolchain.",
    shortDescription: "Babel preset for JSX.",
  },
  {
    id: "PKG_TAILWIND_TYPOGRAPHY",
    name: "@tailwindcss/typography",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@tailwindcss/typography",
    description:
      "A Tailwind CSS plugin that provides beautiful typographic defaults for prose content.",
    shortDescription: "Tailwind prose plugin.",
  },
  {
    id: "PKG_TYPES_NODE",
    name: "@types/node",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@types/node",
    description:
      "TypeScript definitions for Node.js, enabling static typing for Node's built-in modules.",
    shortDescription: "TypeScript types for Node.",
  },
  {
    id: "PKG_TYPES_REACT",
    name: "@types/react",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@types/react",
    description:
      "TypeScript definitions for React, providing type safety for components, hooks, and events.",
    shortDescription: "TypeScript types for React.",
  },
  {
    id: "PKG_TYPES_REACT_DOM",
    name: "@types/react-dom",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@types/react-dom",
    description:
      "TypeScript definitions for react-dom, covering DOM-specific rendering methods.",
    shortDescription: "TypeScript types for ReactDOM.",
  },
  {
    id: "PKG_TS_ESLINT_PLUGIN",
    name: "@typescript-eslint/eslint-plugin",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@typescript-eslint/eslint-plugin",
    description:
      "An ESLint plugin which provides lint rules for TypeScript codebases.",
    shortDescription: "ESLint rules for TypeScript.",
  },
  {
    id: "PKG_TS_ESLINT_PARSER",
    name: "@typescript-eslint/parser",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@typescript-eslint/parser",
    description:
      "An ESLint parser which allows ESLint to lint TypeScript source code.",
    shortDescription: "ESLint parser for TypeScript.",
  },
  {
    id: "PKG_VITE_PLUGIN_REACT",
    name: "@vitejs/plugin-react",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/@vitejs/plugin-react",
    description:
      "The official Vite plugin for React, enabling features like Fast Refresh and automatic JSX runtime.",
    shortDescription: "Official Vite plugin for React.",
  },
  {
    id: "PKG_AUTOPREFIXER",
    name: "Autoprefixer",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/autoprefixer",
    description:
      "A PostCSS plugin to parse CSS and add vendor prefixes to rules using values from Can I Use.",
    shortDescription: "Adds CSS vendor prefixes.",
  },
  {
    id: "PKG_ESLINT",
    name: "ESLint",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/eslint",
    description:
      "A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.",
    shortDescription: "Code linter.",
  },
  {
    id: "PKG_ESLINT_HOOKS",
    name: "eslint-plugin-react-hooks",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/eslint-plugin-react-hooks",
    description:
      "An ESLint plugin that enforces the Rules of Hooks, preventing common mistakes.",
    shortDescription: "Lints React Hooks usage.",
  },
  {
    id: "PKG_ESLINT_REFRESH",
    name: "eslint-plugin-react-refresh",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/eslint-plugin-react-refresh",
    description:
      "An ESLint plugin to validate that your components can be safely updated with Fast Refresh.",
    shortDescription: "Validates Fast Refresh.",
  },
  {
    id: "PKG_GHPAGES",
    name: "gh-pages",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/gh-pages",
    description:
      "A command-line utility to publish files to a gh-pages branch on GitHub.",
    shortDescription: "Deploy to GitHub Pages.",
  },
  {
    id: "PKG_POSTCSS",
    name: "PostCSS",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/postcss",
    description:
      "A tool for transforming CSS with JavaScript plugins, used by Tailwind and Autoprefixer.",
    shortDescription: "CSS transformer.",
  },
  {
    id: "PKG_TAILWIND",
    name: "Tailwind CSS",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/tailwindcss",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces without leaving your HTML.",
    shortDescription: "Utility-first CSS.",
  },
  {
    id: "PKG_TYPESCRIPT",
    name: "TypeScript",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/typescript",
    description:
      "A superset of JavaScript that adds static types, enabling more robust and maintainable code.",
    shortDescription: "Static types for JS.",
  },
  {
    id: "PKG_VITE",
    name: "Vite",
    role: "INFRA_TOOLING",
    vibeStatus: "VERIFIED",
    url: "https://www.npmjs.com/package/vite",
    description:
      "Next-generation frontend tooling that provides an extremely fast development environment and bundles for production.",
    shortDescription: "Fast frontend build tool.",
  },
];
