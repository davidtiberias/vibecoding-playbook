import React, { useState } from "react";
import { WORKFLOW_STEPS, SYSTEM_INVARIANTS, TOOL_ANALYSIS } from "./constants";
import { ViewType, WorkflowStep } from "./types";
import Sidebar from "./components/Sidebar";
import StepDetail from "./components/StepDetail";
import Invariants from "./components/Invariants";
import AnalysisTable from "./components/AnalysisTable";
import Strategy from "./components/Strategy";
import Articles from "./components/Articles";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>("workflow");
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  const handleStepSelect = (index: number) => {
    setActiveView("workflow");
    setSelectedStepIndex(index);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <span className="material-symbols-outlined font-bold">hub</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">
                Vibecoding Playbook
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                DOCUMENTATION V2.1
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveView("workflow")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeView === "workflow"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              Workflow Map
            </button>
            <button
              onClick={() => setActiveView("invariants")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeView === "invariants"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              Invariants
            </button>
            <button
              onClick={() => setActiveView("analysis")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeView === "analysis"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveView("strategy")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeView === "strategy"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              Strategy
            </button>
            <button
              onClick={() => setActiveView("articles")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${activeView === "articles"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              Articles
            </button>
          </nav>
          <a
            href="https://davidtiberias.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100] group"
            title="Visit Portfolio"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
              Visit David Tiberias
            </span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        {activeView === "workflow" && (
          <>
            {/* Left Column: List */}
            <div className="w-full lg:w-1/3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Workflow</h2>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  A verification-driven multi-AI loop designed for determinism.
                  Features explicit context resetting via Repo Dumps to maintain
                  token stability.
                </p>
              </div>
              <Sidebar
                steps={WORKFLOW_STEPS}
                onSelect={handleStepSelect}
                selectedStepIndex={selectedStepIndex}
              />
            </div>

            {/* Right Column: Details */}
            <div className="w-full lg:w-2/3">
              <StepDetail
                step={
                  selectedStepIndex !== null
                    ? WORKFLOW_STEPS[selectedStepIndex]
                    : null
                }
              />
            </div>
          </>
        )}

        {activeView === "invariants" && (
          <div className="w-full">
            <Invariants invariants={SYSTEM_INVARIANTS} />
          </div>
        )}

        {activeView === "analysis" && (
          <div className="w-full">
            <AnalysisTable analysis={TOOL_ANALYSIS} />
          </div>
        )}
        {activeView === "strategy" && (
          <div className="w-full">
            <Strategy />
          </div>
        )}
        {activeView === "articles" && (
          <div className="w-full">
            <Articles />
          </div>
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-slate-200 p-2 rounded-2xl shadow-2xl flex items-center justify-around z-50">
        <button
          onClick={() => setActiveView("workflow")}
          className={`flex flex-col items-center gap-1 ${activeView === "workflow" ? "text-indigo-600" : "text-slate-400"
            }`}
        >
          <span className="material-symbols-outlined">account_tree</span>
          <span className="text-[10px] font-bold uppercase">Workflow</span>
        </button>
        <button
          onClick={() => setActiveView("invariants")}
          className={`flex flex-col items-center gap-1 ${activeView === "invariants" ? "text-indigo-600" : "text-slate-400"
            }`}
        >
          <span className="material-symbols-outlined">shield</span>
          <span className="text-[10px] font-bold uppercase">Invariants</span>
        </button>
        <button
          onClick={() => setActiveView("analysis")}
          className={`flex flex-col items-center gap-1 ${activeView === "analysis" ? "text-indigo-600" : "text-slate-400"
            }`}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold uppercase">Analysis</span>
        </button>
        <button
          onClick={() => setActiveView("strategy")}
          className={`flex flex-col items-center gap-1 ${activeView === "strategy" ? "text-indigo-600" : "text-slate-400"
            }`}
        >
          <span className="material-symbols-outlined">strategy</span>
          <span className="text-[10px] font-bold uppercase">Strategy</span>
        </button>
        <button
          onClick={() => setActiveView("articles")}
          className={`flex flex-col items-center gap-1 ${activeView === "articles" ? "text-indigo-600" : "text-slate-400"
            }`}
        >
          <span className="material-symbols-outlined">article</span>
          <span className="text-[10px] font-bold uppercase">Articles</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">
            © 2025 DAVIDTIBERIAS
          </p>
        </div>
      </footer>

      {/* Portfolio Link - Adjusted position to right-24 to avoid overlap with Chat FAB */}
      <a
        href="https://davidtiberias.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100] group"
        title="Visit Portfolio"
      >
        <span className="material-symbols-outlined text-2xl">person</span>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
          Visit David Tiberias
        </span>
      </a>
    </div>
  );
};

export default App;
