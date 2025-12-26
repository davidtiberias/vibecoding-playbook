// pages/index/+Page.tsx
import React, { useState } from "react";
import {
  WORKFLOW_STEPS,
  SYSTEM_INVARIANTS,
  TOOL_ANALYSIS,
} from "../../src/constants";
import { ViewType } from "../../src/types";
import { usePageContext } from "../../renderer/usePageContext";
import {
  AnalysisTable,
  Articles,
  Invariants,
  Sidebar,
  StepDetail,
  Strategy,
  Monetization,
} from "../../src/components";
// REMOVED: SeoManager import

const App: React.FC = () => {
  const pageContext = usePageContext();
  const { view } = pageContext.routeParams;

  const viewMap: Record<string, ViewType> = {
    "workflow-map": "workflow",
    invariants: "invariants",
    analysis: "analysis",
    strategy: "strategy",
    articles: "articles",
    monetization: "monetization",
  };
  const activeView: ViewType = viewMap[view] || "workflow";

  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  const handleStepSelect = (index: number) => {
    setSelectedStepIndex(index);
  };

  let content;
  switch (activeView) {
    case "invariants":
      content = (
        <div className="w-full">
          <Invariants invariants={SYSTEM_INVARIANTS} />
        </div>
      );
      break;
    case "analysis":
      content = (
        <div className="w-full">
          <AnalysisTable analysis={TOOL_ANALYSIS} />
        </div>
      );
      break;
    case "strategy":
      content = (
        <div className="w-full">
          <Strategy />
        </div>
      );
      break;
    case "articles":
      content = (
        <div className="w-full">
          <Articles />
        </div>
      );
      break;
    case "monetization":
      content = (
        <div className="w-full">
          <Monetization />
        </div>
      );
      break;
    case "workflow":
    default:
      content = (
        <>
          <div className="animate-fade-in w-full lg:w-1/3">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Workflow</h2>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                A verification-driven multi-AI loop designed for determinism.
              </p>
            </div>
            <Sidebar
              steps={WORKFLOW_STEPS}
              onSelect={handleStepSelect}
              selectedStepIndex={selectedStepIndex}
            />
          </div>
          <div className="animate-fade-in w-full lg:w-2/3">
            <StepDetail
              step={
                selectedStepIndex !== null
                  ? WORKFLOW_STEPS[selectedStepIndex]
                  : null
              }
            />
          </div>
        </>
      );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      {content}
    </main>
  );
};

export default App;
