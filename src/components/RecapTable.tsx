import React from "react";

interface RecapTableProps {
  lameSelected: string;
  lameSelectedPrice: number;
  dimensions: { Largeur: number; Hauteur: number };
  dimensionCost: number;
  poseInstalled: string;
  poseInstalledPrice: number;
  selectedCoulisseColor: string;
  selectedTablierColor: string;
  selectedLameFinaleColor: string;
  manoeuvreSelected: string;
  manoeuvreSelectedPrice: number;
  commandeManualSelected: string;
  commandeManualSelectedPrice: number;
  optionMotorisationSelected: string;
  optionMotorisationSelectedPrice: number;
  optionTelecomandeSelected: string;
  telecommandePrice: number;
  optionInterrupteurSelected: string;
  interrupteurPrice: number;
  sortieDeCableSelected: string;
  sortieDeCablePrice: number;
}

const RecapTable: React.FC<RecapTableProps> = ({
  lameSelected,
  lameSelectedPrice,
  dimensions,
  dimensionCost,
  poseInstalled,
  poseInstalledPrice,
  selectedCoulisseColor,
  selectedTablierColor,
  selectedLameFinaleColor,
  manoeuvreSelected,
  manoeuvreSelectedPrice,
  commandeManualSelected,
  commandeManualSelectedPrice,
  optionMotorisationSelected,
  optionMotorisationSelectedPrice,
  optionTelecomandeSelected,
  telecommandePrice,
  optionInterrupteurSelected,
  interrupteurPrice,
  sortieDeCableSelected,
  sortieDeCablePrice,
}) => {
  return (
    <table className="text-xs">
      <tbody>
        <tr>
          <th className="border-white p-2">Type de Lame</th>
          <td className="text-white pl-2">{lameSelected}</td>
          <td className="text-white pl-2">{lameSelectedPrice}€</td>
        </tr>
        <tr>
        <th className="border-white p-2">Couleurs</th>
          <td className="text-white pl-2">
            Largeur: {dimensions.Largeur} mm <br/> Hauteur: {dimensions.Hauteur} mm
          </td >
          <td className="text-white pl-2">{dimensionCost.toFixed(2)}€</td>
        </tr>
        <tr>
          <th className="border-white p-2">Type d&apos;Installation</th>
          <td className="text-white pl-2">{poseInstalled}</td>
          <td className="text-white pl-2">{poseInstalledPrice}€</td>
        </tr>
        <tr>
          <th className="border-white p-2">Couleurs</th>
          <td className="text-white pl-2">
            Coulisse: {selectedCoulisseColor} <br/> Tablier: {selectedTablierColor}{" "}
            <br/> Lame Finale: {selectedLameFinaleColor}
          </td>
          <td className="text-white pl-2">30€</td>
        </tr>
        <tr>
          <th className="border-white p-2">Type de Manoeuvre</th>
          <td className="text-white pl-2">{manoeuvreSelected}</td>
          <td className="text-white pl-2">{manoeuvreSelectedPrice}€</td>
        </tr>
        {manoeuvreSelected === "Manuel" && (
          <tr>
            <th className="border-white p-2">Outil de commande</th>
            <td className="text-white pl-2">{commandeManualSelected}</td>
            <td className="text-white pl-2">{commandeManualSelectedPrice}€</td>
          </tr>
        )}
        {manoeuvreSelected === "Motorisé" && (
          <>
            <tr>
              <th className="border-white p-2">Type de motorisation</th>
              <td className="text-white pl-2">{optionMotorisationSelected}</td>
              <td className="text-white pl-2">{optionMotorisationSelectedPrice}€</td>
            </tr>
            {optionMotorisationSelected === "Radio" && (
              <tr>
                <th className="border-white p-2">Télécommande</th>
                <td className="text-white pl-2">{optionTelecomandeSelected}</td>
                <td className="text-white pl-2">{telecommandePrice}€</td>
              </tr>
            )}
            {optionMotorisationSelected === "Filaire" && (
              <>
                <tr>
                  <th className="border-white p-2">Interrupteur</th>
                  <td className="text-white pl-2">{optionInterrupteurSelected}</td>
                  <td className="text-white pl-2">{interrupteurPrice}€</td>
                </tr>
                <tr>
                  <th className="border-white p-2">Sortie de cable</th>
                  <td className="text-white pl-2">{sortieDeCableSelected}</td>
                  <td className="text-white pl-2">{sortieDeCablePrice}€</td>
                </tr>
              </>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default RecapTable;
