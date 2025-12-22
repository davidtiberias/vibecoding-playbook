import React from "react";
import { WorkflowStep } from "../types";

interface StepDetailProps {
  step: WorkflowStep | null;
}

const StepDetail: React.FC<StepDetailProps> = ({ step }) => {
  if (!step) {
    return (
      <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center group bg-white/50">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ring-4 ring-slate-100">
          <span className="material-symbols-outlined text-slate-400 text-4xl">
            touch_app
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Explore the Workflow
        </h3>
        <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
          Select any step on the left to view specific tools, system invariants,
          and process logic.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 animate-fade-in sticky top-24">
      {/* Header */}
      <div
        className={`p-8 lg:p-10 text-white relative overflow-hidden transition-colors duration-500 ${
          step.isSystem ? "bg-rose-600" : "bg-indigo-600"
        }`}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em]">
              {step.isSystem ? "System Guardrail" : `Step ${step.displayId}`}
            </span>
            {step.isCritical && (
              <span className="px-3 py-1 rounded-full bg-black/30 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                Critical Phase
              </span>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-4xl">
                {step.icon}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {step.title}
              </h2>
              <p className="text-white/80 font-medium text-lg mt-1">
                {step.tool}
              </p>
            </div>
          </div>
        </div>
        {/* Abstract Background Design */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-12 -top-12 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
      </div>

      <div className="p-8 lg:p-10 space-y-10">
        {/* Purpose */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                step.isSystem
                  ? "bg-rose-100 text-rose-600"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              <span className="material-symbols-outlined text-sm">info</span>
            </div>
            <h4 className="font-bold text-slate-900 tracking-tight uppercase text-sm">
              Purpose & Logic
            </h4>
          </div>
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed text-lg font-medium bg-slate-50 p-5 rounded-2xl border border-slate-100 whitespace-pre-wrap">
              {step.purpose}
            </p>

            {/* Tool Links Section */}
            {step.links && step.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {step.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${link.label}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      step.isSystem
                        ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                        : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      open_in_new
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Repomix vs RepoLiner Comparison if applicable */}
        {step.isSystem && step.icon === "backup" && (
          <section className="grid md:grid-cols-2 gap-4">
            <a
              href="https://github.com/yamadashy/repomix"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Repomix</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                    Recommended
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-500 transition-colors text-sm">
                  open_in_new
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Packs repo into XML/MD/JSON. Includes token counting,
                compression, and secret detection. Best for deep code analysis.
              </p>
            </a>
            <a
              href="https://github.com/davidtiberias/RepoLiner"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-rose-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">RepoLiner</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                    Basic
                  </span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-rose-500 transition-colors text-sm">
                  open_in_new
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lightweight Python script for simple Markdown merging. Best for
                quick snapshots of small projects.
              </p>
            </a>
          </section>
        )}

        {/* Outputs & Invariant Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  step.isSystem
                    ? "bg-rose-100 text-rose-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  output
                </span>
              </div>
              <h4 className="font-bold text-slate-900 tracking-tight uppercase text-sm">
                Key Outputs
              </h4>
            </div>
            <ul className="space-y-3">
              {step.outputs.map((out, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
                >
                  <span
                    className={`material-symbols-outlined text-base mt-0.5 ${
                      step.isSystem ? "text-rose-500" : "text-indigo-500"
                    }`}
                  >
                    check_circle
                  </span>
                  <span className="text-slate-700 text-sm font-semibold">
                    {out}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  step.isSystem
                    ? "bg-rose-100 text-rose-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  shield
                </span>
              </div>
              <h4 className="font-bold text-slate-900 tracking-tight uppercase text-sm">
                Specific Invariant
              </h4>
            </div>
            <div
              className={`p-4 rounded-xl border-l-4 font-semibold text-sm h-fit ${
                step.isSystem
                  ? "bg-rose-50 border-rose-500 text-rose-900"
                  : "bg-indigo-50 border-indigo-500 text-indigo-900"
              }`}
            >
              {step.invariant}
            </div>
          </section>
        </div>

        {/* Critical Warnings for Dump Steps */}
        {step.isCritical && (
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex gap-4 animate-pulse shadow-sm shadow-rose-100">
            <span className="material-symbols-outlined text-rose-600 text-3xl shrink-0">
              delete_sweep
            </span>
            <div>
              <h5 className="font-bold text-rose-900 mb-1">
                Context Reset Guardrail
              </h5>
              <p className="text-rose-700 text-sm leading-relaxed">
                This step requires the repository to be converted to Markdown
                (via <strong>Repomix</strong> or <strong>RepoLiner</strong>) and
                re-fed.
                <strong> All previous chat history must be deleted </strong>
                in AI Studio before ingestion to prevent context window
                overflow.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepDetail;
