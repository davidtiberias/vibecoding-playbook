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
  // Default values
  let title = "Vibecoding Playbook";
  let description =
    "An interactive documentation platform for the Vibecoding Playbook v2.1, featuring step-by-step guidance, system invariants, and layered tool analysis.";

  // Dynamic values based on page data
  if (pageContext.data?.article) {
    // For Article Pages
    title = `${pageContext.data.article.title} - Vibecoding Playbook`;
    // Use the first 160 chars of content or a generic description
    description = `Read "${pageContext.data.article.title}" on the Vibecoding Playbook.`;
  } else if (
    pageContext.urlPathname === "/" ||
    pageContext.urlPathname === "/vibecoding-playbook/"
  ) {
    // For the Home/Index Page
    title = "Workflow Map - Vibecoding Playbook";
    description =
      "Explore the step-by-step Vibecoding Playbook, a verification-driven multi-AI loop designed for deterministic software development.";
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
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />

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
