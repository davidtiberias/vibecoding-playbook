// renderer/+onRenderClient.tsx
import '../src/polyfills';
import { hydrateRoot } from 'react-dom/client';
import { PageShell } from './PageShell';
import type { PageContext } from 'vike/types';
import '../src/index.css';

// REMOVED: The ': OnRenderClient' type annotation is no longer needed.
export const onRenderClient = async (pageContext: PageContext) => {
  const { Page } = pageContext;
  hydrateRoot(
    document.getElementById('root')!,
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  );
};