import React from "react";

const Strategy: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-200">
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Strategic Integration: AI Studio + Antigravity
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          A pragmatic strategy for leveraging both platforms in Vibecoding
          workflows.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-indigo-600 mb-3">
            🧮 Resource Optimization
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>AI Studio → Token Capital Efficiency:</strong> Best for
              long-context workflows where caching amortizes costs.
            </li>
            <li>
              <strong>Antigravity → Human Bandwidth Efficiency:</strong> Best
              for agentic execution where autonomy and orchestration matter.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-600 mb-3">
            ⚖️ Workflow Phase Alignment
          </h3>
          <table className="w-full border-collapse border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="border px-4 py-2">Phase</th>
                <th className="border px-4 py-2">Platform</th>
                <th className="border px-4 py-2">Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Architecture & Setup</td>
                <td className="border px-4 py-2">AI Studio</td>
                <td className="border px-4 py-2">
                  Context caching stabilizes large codebases.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Exploratory Prototyping</td>
                <td className="border px-4 py-2">Antigravity</td>
                <td className="border px-4 py-2">
                  Agentic fragmentation handles branching tasks.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Heavy Coding / Refactoring</td>
                <td className="border px-4 py-2">AI Studio</td>
                <td className="border px-4 py-2">
                  Linear persistence ensures coherent edits.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Integration & Testing</td>
                <td className="border px-4 py-2">Antigravity</td>
                <td className="border px-4 py-2">
                  Subagents validate outputs across environments.
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Final Polish & Docs</td>
                <td className="border px-4 py-2">AI Studio</td>
                <td className="border px-4 py-2">
                  Sequential chat avoids meta-waste.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-600 mb-3">
            🔄 Hybrid Strategy
          </h3>
          <p>
            Start in <strong>AI Studio</strong> to load repo dumps and establish
            deterministic tasks. Switch to <strong>Antigravity</strong> for
            execution and exploration. Return to <strong>AI Studio</strong> for
            consolidation and refinement.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-600 mb-3">
            🎯 Practical Rules
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use AI Studio when reproducibility and token efficiency matter.
            </li>
            <li>
              Use Antigravity when autonomy and multi-environment orchestration
              matter.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-indigo-600 mb-3">🚀 Outcome</h3>
          <p>
            Alternating between capital-efficient compounding (AI Studio) and
            bandwidth-efficient agency (Antigravity) avoids runaway token costs
            and micromanagement fatigue. This builds a dual-mode Vibecoding
            workflow: <strong>Architect Mode</strong> (Studio) and{" "}
            <strong>Visionary Mode</strong> (Antigravity).
          </p>
        </section>
      </div>
    </div>
  );
};

export default Strategy;
