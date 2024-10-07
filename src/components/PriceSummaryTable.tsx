import React, { useState } from 'react';

interface PriceSummaryTableProps {
  multiplier: number;
  totalPrice: number;
}

const PriceSummaryTable: React.FC<PriceSummaryTableProps> = ({ multiplier: initialMultiplier, totalPrice }) => {
  const [multiplier, setMultiplier] = useState(initialMultiplier);

  const incrementMultiplier = () => {
    if (multiplier < 10) setMultiplier(prev => prev + 1); // Limit multiplier to 10
  };

  const decrementMultiplier = () => {
    if (multiplier > 1) setMultiplier(prev => prev - 1); // Ensure multiplier doesn't go below 1
  };

  return (
    <div className="w-[65%] text-right ml-auto mr-0 text-xl ">
      <div className="flex justify-between items-center p-2">
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

export default PriceSummaryTable;
