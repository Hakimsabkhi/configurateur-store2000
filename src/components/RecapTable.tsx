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
  dimensions,
  poseInstalled,
  selectedCoulisseColor,
  selectedTablierColor,
  selectedLameFinaleColor,
  manoeuvreSelected,
  commandeManualSelected,
  optionMotorisationSelected,
  optionTelecomandeSelected,
  optionInterrupteurSelected,
  sortieDeCableSelected,
}) => {
  return (
    <table className="text-xs">
      <tbody>
        <tr>
          <th className="border-white p-2">Type de Lame</th>
          <td className="text-cText pl-2 font-bold border-black">{lameSelected}</td>
        </tr>
        <tr>
        <th className="border-white p-2">Couleurs</th>
          <td className="text-cText pl-2 font-bold border-secondary">
            Largeur: {dimensions.Largeur} mm <br/> Hauteur: {dimensions.Hauteur} mm
          </td >
        </tr>
        <tr>
          <th className="border-white p-2">Type d&apos;Installation</th>
          <td className="text-cText pl-2 font-bold">{poseInstalled}</td>
        </tr>
        <tr>
          <th className="border-white p-2">Couleurs</th>
          <td className="text-cText pl-2 font-bold">
            Coulisse: {selectedCoulisseColor} <br/> Tablier: {selectedTablierColor}{" "}
            <br/> Lame Finale: {selectedLameFinaleColor}
          </td>
        </tr>
        <tr>
          <th className="border-white p-2">Type de Manoeuvre</th>
          <td className="text-cText pl-2 font-bold">{manoeuvreSelected}</td>
        </tr>
        {manoeuvreSelected === "Manuel" && (
          <tr>
            <th className="border-white p-2">Outil de commande</th>
            <td className="text-cText pl-2 font-bold">{commandeManualSelected}</td>
          </tr>
        )}
        {manoeuvreSelected === "Motorisé" && (
          <>
            <tr>
              <th className="border-white p-2">Type de motorisation</th>
              <td className="text-cText pl-2 font-bold">{optionMotorisationSelected}</td>
            </tr>
            {optionMotorisationSelected === "Radio" && (
              <tr>
                <th className="border-white p-2">Télécommande</th>
                <td className="text-cText pl-2 font-bold">{optionTelecomandeSelected}</td>
              </tr>
            )}
            {optionMotorisationSelected === "Filaire" && (
              <>
                <tr>
                  <th className="border-white p-2">Interrupteur</th>
                  <td className="text-cText pl-2 font-bold">{optionInterrupteurSelected}</td>
                </tr>
                <tr>
                  <th className="border-white p-2">Sortie de cable</th>
                  <td className="text-cText pl-2 font-bold">{sortieDeCableSelected}</td>
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
