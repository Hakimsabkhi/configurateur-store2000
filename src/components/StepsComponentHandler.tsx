import React from "react";
import TypeDePose from "./steps/typeDePose";
import LameEtDimension from "./steps/LameEtDimension";
import CouleurVolet from "./steps/couleurVolet";
import Manoeuvre from "./steps/manoeuvre";
import MultiStepInfoDisplay from "./MultiStepInfoDisplay";

interface StepsComponentHandlerProps {
  currentStepId: number;
  stepTitle: string;
  enableNextButton: (isEnabled: boolean) => void;
}

const StepsComponentHandler: React.FC<StepsComponentHandlerProps> = ({
  currentStepId,
  stepTitle,
  enableNextButton,
}) => {
  const rendercurrentStepId = () => {
    switch (currentStepId) {
      case 1:
        return <TypeDePose enableNextButton={enableNextButton} />;
      case 2:
        return <LameEtDimension enableNextButton={enableNextButton} />;
      case 3:
        return <CouleurVolet enableNextButton={enableNextButton} />;
      case 4:
        return <Manoeuvre enableNextButton={enableNextButton} />;
      case 5:
        return <MultiStepInfoDisplay />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-primary p-[10px] max-md:min-h-[10px] rounded-t-[16px] gap-2">
      <h1 className="font-bold text-center uppercase max-xl:text-xs max-lg:text-sm text-cText">
    {  stepTitle}
      </h1>
      {rendercurrentStepId()}
    </div>
  );
};

export default StepsComponentHandler;
