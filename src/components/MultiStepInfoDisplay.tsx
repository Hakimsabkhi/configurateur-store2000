import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "../store";
import PricingTable from "./RecapTable";
import {
  optionsMotorisations,
  optionsInterrupteur,
  optionsTelecomande,
  optionCommandeManuel,
  sortieDeCable,
  optionManoeuvre,
  poseOptions,
  lameChoices,
} from "../assets/Data";

// Utility function to calculate price based on options
const getPrice = (options: any[], selectedOption: string) => {
  const option = options.find((option) => option.label === selectedOption);
  return option ? option.price : 0;
};

const MultiStepInfoDisplay: React.FC = () => {
  const [dimensionCost, setDimensionCost] = useState(0);
  const [devisId, setDevisId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [saveAction, setSaveAction] = useState<"save" | "submit" | null>(null);
  const [loading, setLoading] = useState(false);
  const [multiplier, setMultiplier] = useState(1); // Added state for multiplier

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Get data from Redux store
  const selectedCoulisseColor = useSelector((state: RootState) => state.volet.selectedColor.coulisse);
  const selectedTablierColor = useSelector((state: RootState) => state.volet.selectedColor.tablier);
  const selectedLameFinaleColor = useSelector((state: RootState) => state.volet.selectedColor.lameFinale);
  const lameSelected = useSelector((state: RootState) => state.volet.lameSelected);
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const poseInstalled = useSelector((state: RootState) => state.volet.poseInstalled);
  const manoeuvreSelected = useSelector((state: RootState) => state.volet.manoeuvreSelected);
  const commandeManualSelected = useSelector((state: RootState) => state.volet.commandeManualSelected);
  const optionMotorisationSelected = useSelector((state: RootState) => state.volet.optionMotorisationSelected);
  const optionTelecomandeSelected = useSelector((state: RootState) => state.volet.optionTelecomandeSelected);
  const optionInterrupteurSelected = useSelector((state: RootState) => state.volet.optionInterrupteurSelected);
  const sortieDeCableSelected = useSelector((state: RootState) => state.volet.sortieDeCableSelected);

  // Calculate individual option prices
  const lameSelectedPrice = getPrice(lameChoices, lameSelected);
  const poseInstalledPrice = getPrice(poseOptions, poseInstalled);
  const manoeuvreSelectedPrice = getPrice(optionManoeuvre, manoeuvreSelected);
  const optionMotorisationSelectedPrice = getPrice(optionsMotorisations, optionMotorisationSelected);
  const telecommandePrice = getPrice(optionsTelecomande, optionTelecomandeSelected);
  const interrupteurPrice = getPrice(optionsInterrupteur, optionInterrupteurSelected);
  const sortieDeCablePrice = getPrice(sortieDeCable, sortieDeCableSelected);
  const commandeManualSelectedPrice = getPrice(optionCommandeManuel, commandeManualSelected);

  // Calculate the total price
  const totalPrice =
    lameSelectedPrice +
    poseInstalledPrice +
    manoeuvreSelectedPrice +
    optionMotorisationSelectedPrice +
    telecommandePrice +
    interrupteurPrice +
    sortieDeCablePrice +
    commandeManualSelectedPrice +
    dimensionCost;

  // Set devisId from query params
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setDevisId(id);
    }
  }, [searchParams]);

  // Create new Devis handler
  const handleSubmit = async () => {
    const data = {
      selectedCoulisseColor,
      selectedTablierColor,
      selectedLameFinaleColor,
      lameSelected,
      dimensions,
      poseInstalled,
      manoeuvreSelected,
      commandeManualSelected,
      optionMotorisationSelected,
      optionTelecomandeSelected,
      optionInterrupteurSelected,
      sortieDeCableSelected,
      dimensionCost,
      totalPrice,
      multiplier,
    };

    try {
      const response = await fetch("/api/devis/saveDevisData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error saving data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Show popup to confirm the action
  const handleAction = (action: "save" | "submit") => {
    setPopupMessage(
      action === "save"
        ? "Voulez-vous enregistrer les modifications et quitter ?"
        : "Voulez-vous enregistrer votre devis et quitter ?"
    );
    setSaveAction(action);
    setShowPopup(true); // Show the popup
  };

  const incrementMultiplier = () => {
    if (multiplier < 10) setMultiplier(prev => prev + 1); // Limit multiplier to 10
  };

  const decrementMultiplier = () => {
    if (multiplier > 1) setMultiplier(prev => prev - 1); // Ensure multiplier doesn't go below 1
  };

  return (
    <div className="flex flex-col text-left gap-[10px] font-normal">
      {/* Pricing Table */}
      <PricingTable
        lameSelected={lameSelected}
        lameSelectedPrice={lameSelectedPrice}
        dimensions={dimensions}
        dimensionCost={dimensionCost}
        poseInstalled={poseInstalled}
        poseInstalledPrice={poseInstalledPrice}
        selectedCoulisseColor={selectedCoulisseColor}
        selectedTablierColor={selectedTablierColor}
        selectedLameFinaleColor={selectedLameFinaleColor}
        manoeuvreSelected={manoeuvreSelected}
        manoeuvreSelectedPrice={manoeuvreSelectedPrice}
        commandeManualSelected={commandeManualSelected}
        commandeManualSelectedPrice={commandeManualSelectedPrice}
        optionMotorisationSelected={optionMotorisationSelected}
        optionMotorisationSelectedPrice={optionMotorisationSelectedPrice}
        optionTelecomandeSelected={optionTelecomandeSelected}
        telecommandePrice={telecommandePrice}
        optionInterrupteurSelected={optionInterrupteurSelected}
        interrupteurPrice={interrupteurPrice}
        sortieDeCableSelected={sortieDeCableSelected}
        sortieDeCablePrice={sortieDeCablePrice}
      />

      {/* Summary Table */}
        <div className="flex justify-end gap-4 items-center p-2">
          <div className="text-left font-semibold text-cText">Nombres d&apos;unités</div>
          <div className="flex items-center">
            <button className="px-4 py-1 bg-secondary text-white rounded-full mr-4" onClick={decrementMultiplier}>-</button>
            <span className="price text-cText font-bold">{multiplier}</span>
            <button className="px-4 py-1 bg-secondary text-white rounded-full ml-4" onClick={incrementMultiplier}>+</button>
          </div>
        </div>
      </div>
  );
};

export default MultiStepInfoDisplay;
