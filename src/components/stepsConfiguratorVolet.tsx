import React, { useEffect, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface StepsConfiguratorVoletProps {
  currentStepId: number;
  setCurrentStepId: (stepId: number) => void;
  enabledSteps: { [key: number]: boolean };
  onStepTitleChange: (title: string) => void;
}

const StepsConfiguratorVolet: React.FC<StepsConfiguratorVoletProps> = ({
  currentStepId,
  setCurrentStepId,
  enabledSteps,
  onStepTitleChange,
}) => {
  const voletSteps = useMemo(() => [
    { id: 1, title: "Type de pose" },
    { id: 2, title: "Lame et Dimension" },
    { id: 3, title: "Couleurs" },
    { id: 4, title: "Manoeuvre" },
    { id: 5, title: "Recap de votre produit" },
  ], []);

  const totalSteps = voletSteps.length;
  const previousStep = currentStepId - 1;
  const nextStep = currentStepId + 1;

  useEffect(() => {
    const currentStep = voletSteps.find((step) => step.id === currentStepId);
    if (currentStep) {
      onStepTitleChange(currentStep.title);
    }
  }, [currentStepId, onStepTitleChange, voletSteps]);

  return (
    <div className="flex flex-col justify-center rounded-[16px] bg-primary p-[10px] gap-2 py-2 mb-2 max-lg:hidden">
    <h1 className="font-bold text-center uppercase max-xl:text-xs max-lg:text-[10px] text-cText">
      Volet roulant rénovation sur mesure
    </h1>
    <div className="flex justify-center items-center gap-[5px]">
      <AiOutlineLeft
        className={`cursor-pointer ${
          previousStep < 1 || !enabledSteps[previousStep]
            ? "text-secondary cursor-not-allowed"
            : "text-secondary"
        }`}
        onClick={() =>
          previousStep >= 1 && enabledSteps[previousStep] && setCurrentStepId(previousStep)
        }
        size={24} 
      />

      {voletSteps.filter(({ id }) => {
        if (currentStepId === 1) {
          return id === currentStepId || id === nextStep || id === nextStep + 1;
        } else if (currentStepId === totalSteps) {
          return id === currentStepId || id === previousStep || id === previousStep - 1;
        } else {
          return id === currentStepId || id === previousStep || id === nextStep;
        }
      }).map(({ id, title }) => {
        const isStepEnabled = enabledSteps[id];
        const isActive = currentStepId === id;

        return (
          <button
            key={id}
            onClick={() => isStepEnabled && setCurrentStepId(id)}
            disabled={!isStepEnabled}
            className={`text-sm max-xl:text-[14px] h-[60px] w-[180px] cursor-pointer rounded-full border-secondary py-2 font-bold border-2 ${
              isActive ? "bg-primary text-cText" : "bg-secondary"
            } ${!isStepEnabled ? "disabled" : ""}`}
          >
            {title}
          </button>
        );
      })}

      <AiOutlineRight
        className={`cursor-pointer ${
          nextStep > totalSteps || !enabledSteps[nextStep]
            ? "text-secondary cursor-not-allowed"
            : "text-secondary"
        }`}
        onClick={() =>
          nextStep <= totalSteps && enabledSteps[nextStep] && setCurrentStepId(nextStep)
        }
        size={24}
      />
    </div>
    </div>
  );
};

export default StepsConfiguratorVolet;
