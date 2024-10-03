import React, { useState, useCallback } from "react";
import StepsConfiguratorVolet from "./stepsConfiguratorVolet";
import StepsComponentHandler from "./StepsComponentHandler";
import StepNavigationButtons from "./StepNavigationButtons";
import TotalCostCalculateur from "./calculator/TotalCostCalculator";
import Information from "./formulaire/info";
import WarningPopup from "./WarningPopup";
import { MultiStepMenuProps, EnabledSteps } from "../types/interfaces";

const ConfiguratorMenu: React.FC<MultiStepMenuProps> = ({
  onSelectionsChange,
}) => {
  const [currentStepId, setCurrentStepId] = useState(1); // Manage the current step
  const [showInformation, setShowInformation] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [enabledSteps, setEnabledSteps] = useState<EnabledSteps>({ 1: true });
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [stepTitle, setStepTitle] = useState(""); // Store the current step title

  // Enable or disable the Next button and update enabled steps
  const enableNextButton = useCallback(
    (isEnabled: boolean) => {
      setIsNextButtonEnabled(isEnabled);
      setEnabledSteps((prev) => ({ ...prev, [currentStepId + 1]: isEnabled }));
    },
    [currentStepId]
  );

  // Handle step change
  const handleStepChange = (stepId: number) => {
    if (enabledSteps[stepId]) {
      setCurrentStepId(stepId);
      setShowInformation(false); // Hide information when changing steps
    }
  };

  // Move to the next step if allowed
// Move to the next step if allowed, otherwise show the warning popup
const nextStep = () => {
  if (isNextButtonEnabled && currentStepId < 5) {
    setCurrentStepId((prev) => prev + 1);
  } else {
    setShowWarningPopup(true); // Show the warning popup if not allowed to proceed
  }
};


  // Move to the previous step if possible
  const previousStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId((prev) => prev - 1);
    }
  };

  // Reset to the first step and hide information
  const modifyProduct = () => {
    setCurrentStepId(1);
    setShowInformation(false);
  };

  // Toggle the information display
  const toggleInformationDisplay = () => {
    setShowInformation((prev) => !prev);
  };

  // Close the warning popup
  const closeWarningPopup = () => {
    setShowWarningPopup(false);
  };

  return (
    <div className="flex flex-col">

      {/* Step navigation (pass necessary props to StepsConfiguratorVolet) */}
      <StepsConfiguratorVolet
        currentStepId={currentStepId}
        setCurrentStepId={setCurrentStepId}
        enabledSteps={enabledSteps}
        onStepTitleChange={setStepTitle}
      />

      {/* Component that handles the current step's content */}
      <StepsComponentHandler
        currentStepId={currentStepId}
        stepTitle={stepTitle}
        enableNextButton={enableNextButton}
      />

      {/* Navigation buttons for step navigation */}
      <StepNavigationButtons
        currentStepId={currentStepId}
        stepsLength={5}
        previousStep={previousStep}
        nextStep={nextStep}
        modifyProduct={modifyProduct}
        toggleInformationDisplay={toggleInformationDisplay}
        isNextButtonEnabled={isNextButtonEnabled}
      />

      {/* Information modal (conditionally displayed) */}
      {showInformation && <Information onClose={toggleInformationDisplay} />}

      {/* Warning popup (shown when the user tries to navigate without completing steps) */}
      {showWarningPopup && (
        <WarningPopup
          message="Encore des options doivent être sélectionnées avant de passer à l'étape suivante!"
          onClose={closeWarningPopup}
        />
      )}
    </div>
  );
};

export default ConfiguratorMenu;
