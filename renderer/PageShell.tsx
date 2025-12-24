// renderer/PageShell.tsx
import React from 'react'
import type { PageContext } from 'vike/types'


export function PageShell({ children }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      {children}
    </React.StrictMode>
  )
}