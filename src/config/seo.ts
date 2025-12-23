// src/config/seo.ts
import { ViewType } from "../types";

interface SeoConfig {
    title: string;
    description: string;
}

export const seoConfig: Record<ViewType, SeoConfig> = {
    workflow: {
        title: "Workflow Map",
        description: "Explore the step-by-step Vibecoding Playbook, a verification-driven multi-AI loop designed for deterministic software development.",
    },
    invariants: {
        title: "System Invariants",
        description: "Learn the core rules and invariants that ensure stability and predictable outcomes in the Vibecoding process.",
    },
    analysis: {
        title: "Tool Analysis",
        description: "A detailed breakdown and comparison of the AI tools used in the workflow, including their strengths, weaknesses, and roles.",
    },
    strategy: {
        title: "AI Strategy",
        description: "Discover the pragmatic strategy for integrating Google AI Studio and Antigravity for optimal token efficiency and human bandwidth.",
    },
    articles: {
        title: "Vibecoding Articles",
        description: "Explore a collection of articles on AI development workflows, system invariants, and advanced tool analysis.",
    },
};