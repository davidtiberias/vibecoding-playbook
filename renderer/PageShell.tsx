// renderer/PageShell.tsx
import React from 'react'
import type { PageContext } from 'vike/types'
// CHANGE: Import from your local file
import { PageContextProvider } from './usePageContext' 

export function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}