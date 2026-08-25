import React from 'react';
import { FileText, Brain, Link, CheckCircle, Loader2 } from 'lucide-react';

interface ProcessingPipelineProps {
  currentStep: number; // 0-based index, -1 = not started
  steps?: string[];
}

const defaultSteps = [
  'Upload & Parse',
  'Extract Entities',
  'Generate Embeddings',
  'Build Relationships',
  'Update Graph',
];

const stepIcons = [FileText, Brain, Link, Link, CheckCircle];

const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({
  currentStep,
  steps = defaultSteps,
}) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-5 uppercase tracking-wider">
        Processing Pipeline
      </h3>
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-white/[0.06] rounded-full" />
        {/* Progress line filled */}
        <div
          className="absolute top-5 left-8 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
          style={{
            width: currentStep < 0 ? '0%' : `${Math.min((currentStep / (steps.length - 1)) * 100, 100)}%`,
            maxWidth: 'calc(100% - 4rem)',
          }}
        />

        {steps.map((step, i) => {
          const Icon = stepIcons[i] || CheckCircle;
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;
          const isPending = i > currentStep;

          return (
            <div
              key={i}
              className="flex flex-col items-center relative z-10"
              style={{ flex: 1 }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isComplete
                    ? 'bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/30'
                    : isCurrent
                    ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/40 animate-pulse-slow'
                    : 'bg-white/[0.04] text-slate-600 ring-1 ring-white/[0.08]'
                }`}
              >
                {isCurrent ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : isComplete ? (
                  <CheckCircle size={18} />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <span
                className={`text-[0.65rem] mt-2 font-medium text-center leading-tight ${
                  isComplete
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-blue-400'
                    : 'text-slate-600'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingPipeline;
