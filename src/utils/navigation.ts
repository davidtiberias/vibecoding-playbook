// src/utils/navigation.ts
import { ViewType } from "../types";
import { NAV_ITEMS } from "../config/navigation";

export const getActiveView = (urlPathname: string): ViewType => {
  // 1. Clean the path (remove base path if exists)
  const path = urlPathname.replace(/^\/vibecoding-playbook/, '') || '/';

  // 2. Handle Root Case
  if (path === '/' || path === '') {
    return 'workflow';
  }

  // 3. Find matching item based on prefix
  // We sort by length descending so specific routes (/articles/1) match before generic ones (/articles)
  const match = NAV_ITEMS.find(item => {
    const prefix = item.matchPrefix || item.href;
    return path.startsWith(prefix);
  });

  return match ? match.id : 'workflow';
};