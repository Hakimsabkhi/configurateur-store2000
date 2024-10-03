import React from "react";

interface StepNavigationButtonsProps {
  currentStepId: number;
  stepsLength: number;
  previousStep: () => void;
  nextStep: () => void;
  modifyProduct: () => void;
  toggleInformationDisplay: () => void;
  isNextButtonEnabled: boolean;
}

const StepNavigationButtons: React.FC<StepNavigationButtonsProps> = ({
  currentStepId,
  stepsLength,
  previousStep,
  nextStep,
  modifyProduct,
  toggleInformationDisplay,
  isNextButtonEnabled,
}) => {
  return (
    <div className="w-full flex gap-[10px] bg-primary p-[10px] pt-2 rounded-b">
      {/* Show the "Previous" button if not on the first step and not on the last step */}
      {currentStepId > 1 && currentStepId < stepsLength && (
        <button
          onClick={previousStep}
          className="nav-btn previous hover:bg-NavbuttonH"
        >
          Étape Précédente
        </button>
      )}

      {/* Conditionally render "Next" or finalization buttons */}
      {currentStepId < stepsLength ? (
      <button
      onClick={nextStep} // Always call nextStep
      className={`nav-btn hover:bg-NavbuttonH ${!isNextButtonEnabled ? 'disabled-class' : ''}`}
      disabled={false} // Keep this false, as the logic is handled in nextStep
    >
      {currentStepId === stepsLength - 1 ? "Finaliser" : "Étape Suivante"}
    </button>
      ) : (
        <>
          <button
            onClick={modifyProduct}
            className="nav-btn hover:bg-NavbuttonH max-md:text-xs max-xl:text-xs max-lg:text-[10px]"
          >
            Modifier mon produit
          </button>
          <button
            onClick={toggleInformationDisplay}
            className="nav-btn hover:bg-NavbuttonH max-md:text-xs max-xl:text-xs max-lg:text-[10px]"
          >
            Approuver mon devis
          </button>
        </>
      )}
    </div>
  );
};

export default StepNavigationButtons;
