// src/config/navigation.ts
import { ViewType } from "../types";

export interface NavItem {
  id: ViewType;
  label: string;
  href: string;
  icon: string; // Material Symbol name
  // Optional: Define strict matching rules if startsWith isn't enough
  matchPrefix?: string; 
}

export const NAV_ITEMS: NavItem[] = [
  { 
    id: 'workflow', 
    label: 'Workflow Map', 
    href: '/workflow-map', 
    icon: 'account_tree',
    // Special case: matches root path too
    matchPrefix: '/workflow-map' 
  },
  { 
    id: 'invariants', 
    label: 'Invariants', 
    href: '/invariants', 
    icon: 'shield' 
  },
  { 
    id: 'analysis', 
    label: 'Analysis', 
    href: '/analysis', 
    icon: 'analytics' 
  },
  { 
    id: 'strategy', 
    label: 'Strategy', 
    href: '/strategy', 
    icon: 'strategy' 
  },
  { 
    id: 'articles', 
    label: 'Articles', 
    href: '/articles', 
    icon: 'article' 
  },
  { 
    id: 'monetization', 
    label: 'Infra Lab', 
    href: '/monetization', 
    icon: 'hub' 
  },
];