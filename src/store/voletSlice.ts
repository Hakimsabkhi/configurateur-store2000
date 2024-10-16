import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VoletState, Dimensions, Colors } from "../types/interfaces";

const initialState: VoletState = {
  lameSelected: "",
  dimensions: { Largeur: 1000, Hauteur: 1000 },
  selectedColor: {
    coulisse: "",
    tablier: "",
    lameFinale: "",
  },
  poseInstalled: "",
  manoeuvreSelected: "",
  commandeManualSelected: "",
  optionMotorisationSelected: "",
  optionTelecomandeSelected: "",
  optionInterrupteurSelected: "",
  sortieDeCableSelected: "",
  multiplier: 1,  // <-- Add this line

  // Add these new fields from FormData
  deliveryOption: "",
  fullNameOrCompany: "",
  email: "",
  phoneNumber: "",
  postalCode: "",
  city: "",
  deliveryAddress: "",
};

const voletSlice = createSlice({
  name: "volet",
  initialState,
  reducers: {
    setLameSelected: (state, action: PayloadAction<string>) => {
      state.lameSelected = action.payload;
    },
    setDimensions: (state, action: PayloadAction<Partial<Dimensions>>) => {
      state.dimensions = { ...state.dimensions, ...action.payload };
    },
    setColor: (
      state,
      action: PayloadAction<{ color: string; category: keyof Colors }>
    ) => {
      const { color, category } = action.payload;
      if (category in state.selectedColor) {
        state.selectedColor[category] = color;
      }
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = action.payload;
    },
    setPoseInstalled: (state, action: PayloadAction<string>) => {
      state.poseInstalled = action.payload;
    },
    setManoeuvreSelected: (state, action: PayloadAction<string>) => {
      state.manoeuvreSelected = action.payload;
    },
    setCommandeManualSelected: (state, action: PayloadAction<string>) => {
      state.commandeManualSelected = action.payload;
    },
    setOptionMotorisationSelected: (state, action: PayloadAction<string>) => {
      state.optionMotorisationSelected = action.payload;
    },
    setOptionTelecommandeSelected: (state, action: PayloadAction<string>) => {
      state.optionTelecomandeSelected = action.payload;
    },
    setOptionInterrupteurSelected: (state, action: PayloadAction<string>) => {
      state.optionInterrupteurSelected = action.payload;
    },
    setSortieDeCableSelected: (state, action: PayloadAction<string>) => {
      state.sortieDeCableSelected = action.payload;
    },
    setVoletFromDevis: (state, action: PayloadAction<VoletState>) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },
});

export const {
  setLameSelected,
  setDimensions,
  setColor,
  setPoseInstalled,
  setManoeuvreSelected,
  setCommandeManualSelected,
  setOptionMotorisationSelected,
  setOptionTelecommandeSelected,
  setOptionInterrupteurSelected,
  setSortieDeCableSelected,
  setMultiplier,
  setVoletFromDevis,
  reset,
} = voletSlice.actions;

// Selectors for individual properties
export const selectLameSelected = (state: { volet: VoletState }) =>
  state.volet.lameSelected;
export const selectPoseInstalled = (state: { volet: VoletState }) =>
  state.volet.poseInstalled;
export const selectSelectedColor = (state: { volet: VoletState }) =>
  state.volet.selectedColor;
export const selectDimensions = (state: { volet: VoletState }) =>
  state.volet.dimensions;
export const selectColorForCategory =
  (category: keyof Colors) =>
  (state: { volet: VoletState }): string =>
    state.volet.selectedColor[category];
export const selectManoeuvre = (state: { volet: VoletState }) =>
  state.volet.manoeuvreSelected;
export const selectManual = (state: { volet: VoletState }) =>
  state.volet.commandeManualSelected;
export const selectMotorise = (state: { volet: VoletState }) =>
  state.volet.optionMotorisationSelected;
export const selectTelecommande = (state: { volet: VoletState }) =>
  state.volet.optionTelecomandeSelected;
export const selectInterrupteur = (state: { volet: VoletState }) =>
  state.volet.optionInterrupteurSelected;
export const selectSortieDeCable = (state: { volet: VoletState }) =>
  state.volet.sortieDeCableSelected;
export const selectMultiplier = (state: { volet: VoletState }) =>
  state.volet.multiplier;

// Selector for the entire VoletState
export const selectVoletState = (state: { volet: VoletState }) => state.volet;

export default voletSlice.reducer;
