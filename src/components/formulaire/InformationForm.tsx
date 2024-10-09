import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setVoletFromDevis, selectVoletState } from '@/store/voletSlice';
import { FormData } from "../../types/interfaces";

interface InformationFormProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  emailError: string | null;
  phoneError: string | null;
  citiesInFrance: string[];
}

const InformationForm: React.FC<InformationFormProps> = ({
  formData,
  handleChange,
  handleBlur,
  handleSubmit,
  emailError,
  phoneError,
  citiesInFrance,
}) => {
  return (
    <form className="flex flex-col w-[90%] justify-center items-center gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        {emailError && (
          <div className="text-red-500 font-bold w-full text-center text-xs">
            {emailError}
          </div>
        )}
        {phoneError && (
          <div className="text-red-500 font-bold w-full text-center text-xs">
            {phoneError}
          </div>
        )}
      </div>

      <div className="flex flex-col w-[90%] gap-[5px] text-cText font-bold max-lg:text-sm">
        <label htmlFor="fullNameOrCompany">Nom complet ou Société</label>
        <input
          className="w-full h-16 max-lg:h-10 py-2 px-2 text-cText border-secondary rounded-lg"
          type="text"
          id="fullNameOrCompany"
          name="fullNameOrCompany"
          value={formData.fullNameOrCompany}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
      </div>

      <div className="flex max-lg:flex-col w-[90%] gap-[10px]">
        <div className="flex flex-col gap-[5px] w-[40%] max-lg:w-full text-cText font-bold justify-end max-lg:text-sm">
          <label htmlFor="email">Email</label>
          <input
            className="w-full h-16 max-lg:h-10 py-2 px-2 text-cText border-secondary rounded-lg"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="flex flex-col gap-[5px] w-[60%] max-lg:w-full text-cText font-bold max-lg:text-sm">
          <label htmlFor="phoneNumber">Numéro de téléphone</label>
          <div className="flex">
            <select
              className="w-[20%] max-lg:w-[30%] h-16 max-lg:h-10 py-2 px-2 text-cText border-secondary rounded-l-lg"
              defaultValue="+33"
              disabled
            >
              <option value="+33">+33</option>
            </select>
            <input
              className="w-[80%] h-16 max-lg:h-10 py-2 px-2 text-cText border-secondary rounded-r-lg"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="6 12 34 56 78"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[90%] gap-[5px] text-cText font-bold max-lg:text-sm">
        <label htmlFor="deliveryOption">Option de livraison</label>
        <select
          id="deliveryOption"
          name="deliveryOption"
          value={formData.deliveryOption}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className="w-full h-16 max-lg:h-10 p-2 border-secondary rounded-lg"
        >
          <option value="">Sélectionnez une option</option>
          <option value="Retrait du magasin">Retrait du magasin</option>
          <option value="Livraison à domicile">Livraison à domicile</option>
        </select>
      </div>

      {formData.deliveryOption === "Livraison à domicile" && (
        <>
          <div className="flex flex-col w-[90%] gap-[5px] text-cText font-bold max-lg:text-sm">
            <label htmlFor="deliveryAddress">Adresse de livraison</label>
            <input
              className="w-full h-16 max-lg:h-10 p-2 text-cText border-secondary rounded-lg"
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <div className="flex w-[90%] gap-[10px]">
            <div className="flex flex-col w-[50%] gap-[5px] text-cText font-bold max-lg:text-sm">
              <label htmlFor="city">Ville</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="w-full h-16 max-lg:h-10 p-2 border-secondary rounded-lg"
              >
                <option value="">Sélectionnez une ville</option>
                {citiesInFrance.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-[50%] gap-[5px] text-cText font-bold max-lg:text-sm">
              <label htmlFor="postalCode">Code Postal</label>
              <input
                className="w-full h-16 max-lg:h-10 p-2 text-cText border-secondary rounded-lg max-lg:text-xs"
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>
        </>
      )}

      <div className="w-fit py-4 max-lg:py-2">
        <button type="submit" className="nav-btn px-8 rounded-full font-bold hover:bg-primary hover:text-cTextH max-md:text-xs max-xl:text-xs max-lg:text-[10px]">
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default InformationForm;
