import React from 'react';
import { Check } from 'lucide-react';

interface Step {
    label: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
    return (
        <div className={`flex items-center justify-center w-full max-w-2xl mx-auto ${className}`}>
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <React.Fragment key={index}>
                        {/* Step Circle + Label */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                                    ${isCompleted
                                        ? 'bg-emerald-500 text-white'
                                        : isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                                    }
                                `}
                            >
                                {isCompleted ? <Check size={18} strokeWidth={3} /> : stepNumber}
                            </div>
                            <span
                                className={`
                                    text-xs font-bold text-center whitespace-nowrap
                                    ${isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}
                                `}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                            <div className="flex-1 mx-3 mb-6">
                                <div
                                    className={`
                                        h-1 rounded-full transition-all
                                        ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}
                                    `}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Stepper;

//خطوات الفورم (Step 1 → 2 → 3)
//Stepper موحد