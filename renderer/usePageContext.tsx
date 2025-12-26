// renderer/usePageContext.tsx
import React, { useContext, createContext } from 'react';
import type { PageContext } from 'vike/types';

// Create the React Context
const Context = createContext<PageContext | undefined>(undefined);

// Create the Provider component
export const PageContextProvider = ({ 
  pageContext, 
  children 
}: { 
  pageContext: PageContext; 
  children: React.ReactNode 
}) => {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
};

// Create the hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export const usePageContext = () => {
  const pageContext = useContext(Context);
  if (!pageContext) {
    throw new Error('usePageContext() must be used within <PageContextProvider>');
  }
  return pageContext;
};