
import React from 'react';
import { WorkflowStep } from '../types';

interface SidebarProps {
  steps: WorkflowStep[];
  selectedStepIndex: number | null;
  onSelect: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ steps, selectedStepIndex, onSelect }) => {
  return (
    <div className="relative space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = selectedStepIndex === index;

        return (
          <div key={`${step.id}-${index}`} className="relative">
            {/* Connector Line */}
            {!isLast && (
              <div className={`absolute left-7 top-10 bottom-0 w-0.5 z-0 transition-colors duration-300 ${step.isSystem ? 'bg-rose-100' : 'bg-slate-200'}`} />
            )}

            <button
              onClick={() => onSelect(index)}
              className={`relative z-10 w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 group ${isActive
                ? 'bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 translate-x-1'
                : 'hover:bg-slate-100/80 hover:translate-x-1'
                }`}
            >
              {/* Icon Container */}
              <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border-2 transition-all duration-300 transform ${isActive
                ? step.isSystem
                  ? 'bg-rose-600 border-rose-600 text-white scale-110 shadow-rose-200'
                  : 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-indigo-200'
                : step.isSystem
                  ? 'bg-rose-50 border-rose-200 text-rose-600 group-hover:border-rose-400'
                  : 'bg-white border-slate-200 text-slate-500 group-hover:border-indigo-400 group-hover:text-indigo-600'
                }`}>
                <span className="material-symbols-outlined text-2xl">{step.icon}</span>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? (step.isSystem ? 'text-rose-600' : 'text-indigo-600') : (step.isSystem ? 'text-rose-400' : 'text-slate-400')}`}>
                    {step.isSystem ? 'Guardrail' : `Step ${step.displayId}`}
                  </span>
                  {step.isCritical && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-rose-100 text-rose-600 font-bold uppercase tracking-wider">Critical</span>
                  )}
                </div>
                <h3 className={`font-bold text-base truncate transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs truncate transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                  {step.tool}
                </p>
              </div>

              {isActive && (
                <div className={`w-1.5 h-1.5 rounded-full self-center ${step.isSystem ? 'bg-rose-600' : 'bg-indigo-600'}`} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
