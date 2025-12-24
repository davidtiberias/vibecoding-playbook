// src/vite-env.d.ts

/// <reference types="vite/client" />

// --- VIKE TYPE AUGMENTATION ---
declare module 'vike/types' {
  interface PageContext {
    // This tells Vike that Page will be a React Component.
    // This will solve the "'Page' cannot be used as a JSX component" error.
    Page: () => React.ReactElement;

    // We also need to tell Vike about the properties that are available on the server.
    // This will solve the "Property 'pageAssets' does not exist" error.
    pageAssets?: {
      tag: string;
      assetType: 'script' | 'style' | 'preload';
    }[];
  }
}

// --- OTHER TYPE DECLARATIONS ---
declare global {
  interface Window {
    Buffer: typeof import("buffer").Buffer;
  }
}

declare module "*.md" {
  const content: string;
  export default content;
}