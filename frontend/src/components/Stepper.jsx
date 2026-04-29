import React from 'react';
import { motion } from 'framer-motion';

const steps = ['planner', 'budget', 'hotel', 'transport', 'guide'];

const Stepper = ({ currentStepIndex }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 rounded"></div>
        
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;
          
          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isPast ? '#0d9488' : '#fff',
                  borderColor: isActive || isPast ? '#0d9488' : '#cbd5e1',
                  color: isActive || isPast ? '#fff' : '#94a3b8'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-colors duration-300`}
              >
                {index + 1}
              </motion.div>
              <div className="text-xs font-medium mt-2 text-slate-500 uppercase tracking-widest absolute -bottom-6">
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
