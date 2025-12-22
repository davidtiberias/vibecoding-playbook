
import React from 'react';
import { SystemInvariant } from '../types';

interface InvariantsProps {
  invariants: SystemInvariant[];
}

const Invariants: React.FC<InvariantsProps> = ({ invariants }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-slate-200">
          <span className="material-symbols-outlined text-3xl">shield</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Invariants</h2>
        <p className="text-slate-500 mt-2 text-lg">Strict operational rules that govern the Vibecoding process.</p>
      </div>

      <div className="grid gap-6">
        {invariants.map((inv) => (
          <div key={inv.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm">
              <span className="material-symbols-outlined text-indigo-600 text-2xl">{inv.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-mono tracking-tight">{inv.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {inv.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invariants;
