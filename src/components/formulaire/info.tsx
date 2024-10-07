import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setVoletFromDevis, selectVoletState } from '@/store/voletSlice';
import exitIcon from '../../assets/exit.png';
import { InformationProps, FormData } from "../../types/interfaces";
import Image from 'next/image';

const Information: React.FC<InformationProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const voletState = useSelector(selectVoletState);

  const [formData, setFormData] = useState<FormData>({
    deliveryOption: "",
    fullNameOrCompany: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    city: "",
    deliveryAddress: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const citiesInFrance = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes"];
  
  // To format the phone number as 6 12 34 56 78
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "").slice(0, 9); // Remove non-numeric chars and limit to 9 digits
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5"); // Format visually
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, ""); // Only numbers
      const formattedNumber = formatPhoneNumber(numericValue); // Format visually as 12 34 56 78

      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedNumber,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? null : "Veuillez entrer un email valide.");
    }

    if (name === "phoneNumber") {
      // Validate phone number (removing spaces)
      const formattedPhone = value.replace(/\s+/g, "");
      const phoneRegex = /^[1-9]\d{8}$/; // Validate 9 digits after +33
      setPhoneError(phoneRegex.test(formattedPhone) ? null : "Entrez un numéro valide (9 chiffres après +33).");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailError && !phoneError) {
      const combinedData = {
        ...voletState,
        ...formData,
      };

      console.log('Combined Data:', combinedData);

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData),
      });

      const result = await res.json();
      if (result.message === 'Email sent successfully!') {
        console.log('Form data sent successfully:', combinedData);
      } else {
        console.error('Failed to send email:', result.error);
      }

      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[1000]">
      <form
        className="flex flex-col justify-around items-center gap-4 max-lg:gap-2 w-[40%] max-lg:w-[90%] p-2 bg-tertiary rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end w-full h-[40px]">
          <button type="button" className="close-button" onClick={onClose}>
            <Image src={exitIcon} loading="eager" alt="Close" width={40} height={40} />
          </button>
        </div>
        
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
              {/* Dropdown for +33 */}
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
    </div>
  );
};

export default Information;
