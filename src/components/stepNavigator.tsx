import React from 'react';
import { StepNavigatorProps} from "../types/interfaces"

const StepNavigator: React.FC<StepNavigatorProps> = ({ currentStep, setCurrentStep, totalSteps, titles, enabledSteps }) => {
  return (
    <div className=" flex justify-center gap-[5px]">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        // Determine if the step is enabled from the enabledSteps object
        const isStepEnabled = enabledSteps[stepNumber];
        return (
          <button
            key={stepNumber}
            className={` ${currentStep === stepNumber ? 'text-xs max-xl:text-[8px] px-1 border-none bg-[#ffffff] text-[#000] cursor-pointer focus:bg-[#ffffff] focus:text-[#000000] w-auto h-[40px]' : 'text-xs max-xl:text-[10px] px-1 border-none bg-secondary cursor-pointer focus:bg-[#ffffff] focus:text-[#000000] w-auto h-[40px]'} ${!isStepEnabled ? 'disabled' : ''}`}
            onClick={() => isStepEnabled && setCurrentStep(stepNumber)}
            disabled={!isStepEnabled}
          >
            {titles[stepNumber]}
          </button>
        );
      })}
    </div>
  );
}

export default StepNavigator;
