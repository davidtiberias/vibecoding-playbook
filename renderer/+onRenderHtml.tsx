// renderer/+onRenderHtml.tsx
import { renderToString } from 'react-dom/server';
import { PageShell } from './PageShell';
import type { PageContext } from 'vike/types';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';

export const onRenderHtml = async (pageContext: PageContext) => {
  const { Page } = pageContext;
  
  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  );

  // --- THIS IS THE FINAL, CORRECT LOGIC ---
  // Use a const with a ternary operator.
  // This allows TypeScript to correctly infer the type of pageAssets
  // as the union of the two possible return values: string | EscapedString.
  const pageAssets = pageContext.pageAssets
    ? dangerouslySkipEscape((await pageContext.pageAssets).map(asset => asset.tag).join(''))
    : '';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vibecoding-playbook/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    pageContext: {}
  };
};