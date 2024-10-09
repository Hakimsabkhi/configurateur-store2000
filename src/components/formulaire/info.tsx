import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector } from 'react-redux';
import { selectVoletState } from '@/store/voletSlice';
import exitIcon from '../../assets/exit.png';
import { InformationProps, FormData } from "../../types/interfaces";
import Image from 'next/image';
import InformationForm from './InformationForm';
import { AiOutlineLoading } from "react-icons/ai"; // Import the loading icon

const Information: React.FC<InformationProps> = ({ onClose }) => {
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState(false); // Loading state for button

  const citiesInFrance = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes"];

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "").slice(0, 9);
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      const formattedNumber = formatPhoneNumber(numericValue);

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
      const formattedPhone = value.replace(/\s+/g, "");
      const phoneRegex = /^[1-9]\d{8}$/;
      setPhoneError(phoneRegex.test(formattedPhone) ? null : "Entrez un numéro valide (9 chiffres après +33).");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading when submit is clicked
    setErrorMessage(null); // Reset the error message

    if (!emailError && !phoneError) {
      const combinedData = {
        ...voletState,
        ...formData,
      };

      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(combinedData),
        });

        const result = await res.json();
        if (res.ok && result.message === 'Email envoyé avec succès !') {
          setLoading(false); // Stop loading when email is sent
          setShowSuccessMessage(true);  // Show the success popup
        } else {
          throw new Error(result.error || "Une erreur s'est produite lors de l'envoi de l'email.");
        }
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'email:', error.message);
        setLoading(false); // Stop loading if email sending fails
        setErrorMessage(error.message || "Une erreur s'est produite lors de l'envoi de l'email.");
      }
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(true);
        if (onClose) onClose(); // Close the entire modal after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showSuccessMessage, onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[1000]">
      <div className="min-h-[20%] max-lg:min-h-[50%] flex flex-col items-center max-lg:gap-2 w-[40%] max-lg:w-[90%] h-fit p-2 bg-tertiary rounded-lg shadow-lg">
        <div className="flex justify-end w-full h-[40px]">
          <button type="button" className="close-button" onClick={onClose}>
            <Image src={exitIcon} loading="eager" alt="Close" width={40} height={40} />
          </button>
        </div>

        {!showSuccessMessage && !errorMessage ? (
          <>
            {!loading ? (
              <InformationForm
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                emailError={emailError}
                phoneError={phoneError}
                citiesInFrance={citiesInFrance}
              />
            ) : (
              <div className="flex my-auto text-cText"> 
                <AiOutlineLoading className="animate-spin text-4xl" /> {/* Spinner */}
              </div>
            )}
          </>
        ) : showSuccessMessage ? (
          <div className="my-auto text-cText flex flex-col gap-2 justify-center item-center text-center px-4">
            <h2 className="font-bold text-xl uppercase"> Devis envoyé :</h2>
            <p>Nous vous remercions sincèrement pour votre demande de devis concernant le volet roulant. Nous l&#39;avons bien reçue et nous vous contacterons dans les plus brefs délais pour vous apporter toute l&#39;assistance nécessaire.</p>
          </div>
        ) : (
          <div className="my-auto text-cText flex flex-col gap-2 justify-center item-center text-center px-4">
            <h2 className="font-bold text-xl uppercase">Erreur</h2>
            <p>Une erreur s&apos;est produite: {errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Information;
