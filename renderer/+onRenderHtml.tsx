// renderer/+onRenderHtml.tsx
import { renderToString } from "react-dom/server";
import { PageShell } from "./PageShell";
import type { PageContext } from "vike/types";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

export const onRenderHtml = async (pageContext: PageContext) => {
  const { Page } = pageContext;

  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  );

  const pageAssets = pageContext.pageAssets
    ? dangerouslySkipEscape(
        (await pageContext.pageAssets).map((asset) => asset.tag).join("")
      )
    : "";

  // --- SEO LOGIC START ---
  const baseUrl = "https://davidtiberias.github.io/vibecoding-playbook";
  // Ensure urlPathname doesn't have a trailing slash for consistency, unless it's root
  const cleanPath = pageContext.urlPathname === "/" ? "" : pageContext.urlPathname.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  
  let title = "Vibecoding Playbook";
  let description = "An interactive documentation platform for the Vibecoding Playbook v2.1, featuring step-by-step guidance, system invariants, and layered tool analysis.";
  let keywords = "vibecoding, ai coding, software engineering, llm workflow"; // Default keywords

  // Schema.org JSON-LD Data
  // FIX: Added type annotation : Record<string, any> to allow different schema structures
  let jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vibecoding Playbook",
    "url": baseUrl,
  };

  if (pageContext.data?.article) {
    const article = pageContext.data.article;
    title = `${article.title} - Vibecoding Playbook`;
    description = `Read "${article.title}" on the Vibecoding Playbook.`;
    // Use article specific keywords if available
    if (article.keywords && article.keywords.length > 0) {
      keywords = article.keywords.join(", ");
    }
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": description,
      "keywords": keywords,
      "author": {
        "@type": "Person",
        "name": "David Tiberias",
        "url": "https://davidtiberias.github.io"
      },
      "datePublished": article.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };
  } else if (
    pageContext.urlPathname === "/" ||
    pageContext.urlPathname === "/vibecoding-playbook/"
  ) {
    // For the Home/Index Page
    title = "Workflow Map - Vibecoding Playbook";
    description = "Explore the step-by-step guide to Vibecoding within the Vibecoding Playbook, a verification-driven multi-AI loop designed for deterministic software development.";
    keywords = "vibecoding, google ai studio vs antigravity, ai coding workflow, repoliner, cursor vs windsurf";
  }
  // --- SEO LOGIC END ---

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vibecoding-playbook/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- SEO Tags Injected Directly into Head -->
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta name="keywords" content="${keywords}" />
        <link rel="canonical" href="${canonicalUrl}" />
        
        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="${pageContext.data?.article ? 'article' : 'website'}" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:site_name" content="Vibecoding Playbook" />
        
        <!-- Structured Data (JSON-LD) -->
        <script type="application/ld+json">
          ${dangerouslySkipEscape(JSON.stringify(jsonLd))}
        </script>

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EGH9SLL9D0"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EGH9SLL9D0');
        </script>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        </style>
        ${pageAssets}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
};
