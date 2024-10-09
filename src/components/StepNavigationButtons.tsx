import React from "react";
import { useDispatch } from "react-redux";
import { reset } from "../store/voletSlice"; // Update the path to your actual slice

interface StepNavigationButtonsProps {
  currentStepId: number;
  stepsLength: number;
  previousStep: () => void;
  nextStep: () => void;
  modifyProduct: () => void;
  toggleInformationDisplay: () => void;
  isNextButtonEnabled: boolean;
  resetToFirstStep: () => void; // New prop to reset to the first step
}

const StepNavigationButtons: React.FC<StepNavigationButtonsProps> = ({
  currentStepId,
  stepsLength,
  previousStep,
  nextStep,
  modifyProduct,
  toggleInformationDisplay,
  isNextButtonEnabled,
  resetToFirstStep, // Receive the new function to reset the step
}) => {
  const dispatch = useDispatch();

  const handleCreateNewDevis = () => {
    dispatch(reset()); // Reset state to initial values in voletSlice
    resetToFirstStep(); // Reset the current step to the first one
  };

  return (
    <div className="w-full flex gap-[10px] bg-primary p-[10px] pt-2 rounded-b-[16px]">
      {/* Show the "Previous" button if not on the first step and not on the last step */}
      {currentStepId > 1 && currentStepId < stepsLength && (
        <button
          onClick={previousStep}
          className="nav-btn previous hover:bg-NavbuttonH hover:text-cText rounded-full font-bold max-lg:text-sm max-lg:py-4"
        >
          Étape Précédente
        </button>
      )}

      {/* Conditionally render "Next" or finalization buttons */}
      {currentStepId < stepsLength ? (
        <button
          onClick={nextStep}
          className={`nav-btn rounded-full mx-auto text-NavbuttonText hover:bg-NavbuttonH hover:text-NavbuttonHText font-bold bg-primary max-w-[50%] max-lg:text-sm max-lg:py-4 ${!isNextButtonEnabled ? 'disabled-class' : ''}`}
          disabled={false}
        >
          {currentStepId === stepsLength - 1 ? "Finaliser" : "Étape Suivante"}
        </button>
      ) : (
        <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={modifyProduct}
            className="nav-btn rounded-full font-bold hover:bg-NavbuttonH hover:text-cTextH max-md:text-xs max-xl:text-xs max-lg:text-[10px] max-lg:py-4"
          >
            Modifier mon produit
          </button>
          <button
            onClick={toggleInformationDisplay}
            className="nav-btn rounded-full font-bold hover:bg-NavbuttonH hover:text-cTextH max-md:text-xs max-xl:text-xs max-lg:text-[10px] max-lg:py-4 "
          >
            Envoyer mon devis
          </button></div>
          <button
            onClick={handleCreateNewDevis}
            className="nav-btn rounded-full font-bold hover:bg-NavbuttonH hover:text-cTextH max-md:text-xs max-xl:text-xs max-lg:text-[10px] max-lg:py-4"
          >
            Créer Nouvelle Devis
          </button>
        </div>
      )}
    </div>
  );
};

export default StepNavigationButtons;
