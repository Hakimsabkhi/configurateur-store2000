// SuccessPopup.tsx
import React from 'react';

interface SuccessPopupProps {
  show: boolean;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-[1100]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-green-500 text-center">Demande envoyée</h2>
        <p className="text-center text-sm">Merci pour votre demande. Nous vous contacterons dès que possible.</p>
        <button
          className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
