import React from "react";
import { ToolAnalysis } from "../types";

interface AnalysisTableProps {
  analysis: ToolAnalysis[];
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ analysis }) => {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-200">
          <span className="material-symbols-outlined text-3xl">analytics</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Layered Analysis & Tool Reference
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          Comparing strengths, weaknesses, and operational roles.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-5 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Step
              </th>
              <th className="px-6 py-5 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Tool
              </th>
              <th className="px-6 py-5 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Role
              </th>
              <th className="px-6 py-5 text-sm font-bold text-slate-900 uppercase tracking-widest">
                Strengths & Weaknesses
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {analysis.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6">
                  {/* Conditionally render the step box. If step is 0, show a red box with "!", otherwise show the default. */}
                  {item.step === 0 ? (
                    <span className="w-8 h-8 rounded-lg bg-rose-600 text-white text-lg font-bold flex items-center justify-center">
                      !
                    </span>
                  ) : (
                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  )}
                </td>
                <td className="px-6 py-6">
                  <div className="font-bold text-slate-900">{item.tool}</div>
                </td>
                <td className="px-6 py-6">
                  <div className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
                    {item.role}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="space-y-4 max-w-md">
                    <div className="flex gap-3">
                      <span className="text-emerald-500 font-bold text-xs uppercase pt-1 shrink-0">
                        Pros:
                      </span>
                      <span className="text-slate-600 text-sm leading-relaxed">
                        {item.strength}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-red-500 font-bold text-xs uppercase pt-1 shrink-0">
                        Cons:
                      </span>
                      <span className="text-slate-600 text-sm leading-relaxed">
                        {item.weakness}
                      </span>
                    </div>
                    {item.constraint && (
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-xs italic leading-relaxed">
                        <span className="font-bold uppercase not-italic mr-1">
                          Note:
                        </span>{" "}
                        {item.constraint}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisTable;
