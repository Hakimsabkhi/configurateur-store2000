import React from "react";

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;  // Add loading prop
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ message, onConfirm, onClose, loading }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-1000 transition-opacity duration-300 ease-in-out opacity-100">
      <div className="bg-primary rounded-[10px] text-center w-[30%] max-md:w-[80%] h-fit flex gap-4 flex-col justify-center px-6 py-6 transition-transform duration-300 ease-in-out transform translate-y-0">
        <h3 className="text-2xl font-bold uppercase">Notification!</h3>
        <p className="text-lg">{message}</p>
        <div className="flex justify-around mt-4 gap-2">
        <button
            onClick={onConfirm}
            className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-4 max-xl:text-xs max-lg:text-[10px]"
            disabled={loading}  // Disable button during loading
          >
            {loading ? "Chargement..." : "Confirmer"} 
          </button>
          
          <button
            onClick={onClose}
            className="nav-btn hover:bg-NavbuttonH uppercase font-bold px-4 max-xl:text-xs max-lg:text-[10px]"
            disabled={loading}  // Disable button during loading
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
