// src/config/ads.ts

export type VibeStatus = "VERIFIED" | "FAILED";
export type AdRole =
  | "AGENTIC_IDE"
  | "CODE_REFACTOR"
  | "INFRA_TOOLING"
  | "UNVERIFIED";

export interface AdEntry {
  id: string;
  name: string;
  role: AdRole;
  vibeStatus: VibeStatus;
  url: string;
  description: string;
  shortDescription: string; // New field for constrained spaces
}

export const AD_LIBRARY: AdEntry[] = [
  {
    id: "BOLT_001",
    name: "Bolt.new",
    role: "AGENTIC_IDE",
    vibeStatus: "VERIFIED",
    url: "https://bolt.new/",
    description: "A full-stack web development environment in your browser.",
    shortDescription: "Browser-based Full Stack IDE.",
  },
  {
    id: "REPO_002",
    name: "RepoLiner",
    role: "CODE_REFACTOR",
    vibeStatus: "VERIFIED",
    url: "https://github.com/davidtiberias/RepoLiner",
    description: "Lightweight script for consolidating codebases into a single file for LLMs.",
    shortDescription: "Codebase to Markdown converter.",
  },
  {
    id: "LOVABLE_003",
    name: "Lovable.dev",
    role: "AGENTIC_IDE",
    vibeStatus: "VERIFIED",
    url: "https://lovable.dev/",
    description: "Collaborative AI-native platform for building web applications.",
    shortDescription: "AI-Native App Builder.",
  },
  {
    id: "MOCK_FAIL_999",
    name: "Generic AI Tool",
    role: "UNVERIFIED",
    vibeStatus: "FAILED",
    url: "#",
    description: "This tool did not meet the quality standards for the Vibecoding workflow.",
    shortDescription: "Quality Standards Failed.",
  },
];