import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { reset } from "../store/voletSlice";
import StepsConfiguratorVolet from "./stepsConfiguratorVolet";
import StepsComponentHandler from "./StepsComponentHandler";
import StepNavigationButtons from "./StepNavigationButtons";
import WarningPopup from "./WarningPopup";
import { MultiStepMenuProps, EnabledSteps } from "../types/interfaces";
import Information from "./formulaire/info";

interface ConfiguratorMenuProps extends MultiStepMenuProps {
  initialStep: number; // Initial step passed from parent
  onStepChange?: (stepId: number) => void; // Optional callback to notify step change
}

const ConfiguratorMenu: React.FC<ConfiguratorMenuProps> = ({
  onSelectionsChange,
  initialStep, // Start with the initial step from props
  onStepChange, // Callback to notify the parent when the step changes
}) => {
  const [currentStepId, setCurrentStepId] = useState(initialStep); // Track the current step
  const [showInformation, setShowInformation] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [enabledSteps, setEnabledSteps] = useState<EnabledSteps>({ 1: true });
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [stepTitle, setStepTitle] = useState(""); // Current step title

  const dispatch = useDispatch(); // Redux dispatch

  // Update the current step when the initial step prop changes
  useEffect(() => {
    setCurrentStepId(initialStep);
  }, [initialStep]);

  // Trigger parent callback when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStepId);
    }
  }, [currentStepId, onStepChange]);

  // Enable or disable the Next button and update enabled steps
  const enableNextButton = useCallback(
    (isEnabled: boolean) => {
      setIsNextButtonEnabled(isEnabled);
      setEnabledSteps((prev) => ({
        ...prev,
        [currentStepId + 1]: isEnabled, // Enable the next step if possible
      }));
    },
    [currentStepId]
  );

  // Move to the next step if allowed, otherwise show the warning popup
  const nextStep = () => {
    if (isNextButtonEnabled && currentStepId < 5) {
      setCurrentStepId((prev) => prev + 1);
    } else {
      setShowWarningPopup(true); // Show the warning popup if Next button is disabled
    }
  };

  // Move to the previous step if possible
  const previousStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId((prev) => prev - 1);
    }
  };

  // Reset to the first step and hide information (for modify button)
  const modifyProduct = () => {
    setCurrentStepId(1);
    setShowInformation(false);
  };

  // Handle "Créer Nouvelle Devis" which resets the slice and goes to the first step
  const handleCreateNewDevis = () => {
    dispatch(reset()); // Reset the voletSlice state
    setCurrentStepId(1); // Reset to the first step (TypeDePose)
    setShowInformation(false); // Ensure the information display is hidden
  };

  return (
    <div className="flex flex-col max-lg:absolute max-lg:bottom-0 max-lg:left-0 p-4 max-lg:w-full pointer-events-auto">
      {/* Step navigation */}
      <StepsConfiguratorVolet
        currentStepId={currentStepId}
        setCurrentStepId={setCurrentStepId}
        enabledSteps={enabledSteps}
        onStepTitleChange={setStepTitle}
      />

      {/* Step content handler */}
      <StepsComponentHandler
        currentStepId={currentStepId}
        stepTitle={stepTitle}
        enableNextButton={enableNextButton}
      />

      {/* Navigation buttons */}
      <StepNavigationButtons
        currentStepId={currentStepId}
        stepsLength={5}
        previousStep={previousStep}
        nextStep={nextStep}
        modifyProduct={modifyProduct}
        toggleInformationDisplay={() => setShowInformation(!showInformation)}
        isNextButtonEnabled={isNextButtonEnabled}
        resetToFirstStep={handleCreateNewDevis}
      />

      {/* Information component */}
      {showInformation && <Information onClose={() => setShowInformation(false)} />}

      {/* Warning popup */}
      {showWarningPopup && (
        <WarningPopup
          message="Encore des options doivent être sélectionnées avant de passer à l'étape suivante!"
          onClose={() => setShowWarningPopup(false)}
        />
      )}
    </div>
  );
};

export default ConfiguratorMenu;
