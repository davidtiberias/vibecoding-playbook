// src/vite-env.d.ts
/// <reference types="vite/client" />

declare module 'vike/types' {
  interface PageContext {
    Page: () => React.ReactElement;
    pageAssets?: {
      tag: string;
      assetType: 'script' | 'style' | 'preload';
    }[];
    data?: {
      // For the standalone page
      article?: {
        id: string;
        index: number;
        title: string;
        date: string;
        content: string;
      };
      prevArticle?: { title: string; slug: string } | null;
      nextArticle?: { title: string; slug: string } | null;

      // For the main list page
      articles?: {
        id: string;
        index: number;
        title: string;
        date: string;
        content: string;
      }[];
    };
    routeParams: Record<string, string>;
  }
}