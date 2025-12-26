export interface WorkflowStep {
  id: number;
  displayId: string;
  title: string;
  tool: string;
  icon: string;
  colorClass: string;
  purpose: string;
  outputs: string[];
  invariant: string;
  isSystem: boolean;
  isCritical?: boolean;
  links?: { label: string; url: string }[];
}

export interface SystemInvariant {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ToolAnalysis {
  step: number;
  tool: string;
  role: string;
  strength: string;
  weakness: string;
  constraint?: string;
}

export type ViewType =
  | "workflow"
  | "invariants"
  | "analysis"
  | "strategy"
  | "articles"
  | "monetization";
